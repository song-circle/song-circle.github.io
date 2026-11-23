"""버그로그 채널의 공개 RSS 피드에서 새 영상을 찾아 data/videos.js 에 추가합니다.

- 레포 루트에서 실행:
      python .github/scripts/update_videos.py
- 이미 있는 항목(제목·프로젝트 등 손으로 고친 값)은 그대로 두고, 새 영상만 추가합니다.
- Shorts 여부(short: true)를 확인해 기록합니다. 메인 화면은 가로 본편을 먼저 보여줍니다.
- 바뀐 게 있으면 0, 없으면 0으로 끝나고, 바뀌었는지는 stdout 마지막 줄(changed=true/false)로 알립니다.
"""
import json
import pathlib
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL_ID = "UCtE1V0O8sAyNf-A8pO2Xnrg"  # 버그로그 (@buglog_kr)
FEED = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
ROOT = pathlib.Path(__file__).resolve().parents[2]
DATA = ROOT / "data" / "videos.js"
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
UA = {"User-Agent": "Mozilla/5.0 (site video updater)"}

# 제목에 이 단어가 있으면 해당 프로젝트 영상으로 연결
PROJECT_HINTS = {"cpu-bench": "cpu-benchmark", "AI Office": "ai-office"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def is_short(video_id: str) -> bool | None:
    """/shorts/<id> 가 200이면 Shorts, 리디렉트(303)면 일반 영상. 판단 못 하면 None."""
    opener = urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(f"https://www.youtube.com/shorts/{video_id}", headers=UA, method="HEAD")
    try:
        return opener.open(req, timeout=15).status == 200
    except urllib.error.HTTPError as e:
        return False if e.code in (301, 302, 303, 307, 308) else None
    except Exception:
        return None


def read_existing(text: str) -> tuple[str, list[dict]]:
    head, sep, body = text.partition("window.VIDEOS = ")
    if not sep:
        sys.exit("data/videos.js 에서 'window.VIDEOS = ' 를 찾지 못했습니다.")
    arr = body.strip().rstrip(";")
    # JS 객체 리터럴 → JSON (키에 따옴표, 주석·끝 콤마 제거)
    arr = re.sub(r"//[^\n]*", "", arr)
    arr = re.sub(r"([{,]\s*)([A-Za-z_]\w*)\s*:", r'\1"\2":', arr)
    arr = re.sub(r",\s*([}\]])", r"\1", arr)
    return head, json.loads(arr)


def write(head: str, items: list[dict]) -> str:
    keys = ["id", "title", "date", "short", "project"]
    lines = []
    for it in items:
        parts = [f"{k}: {json.dumps(it[k], ensure_ascii=False)}" for k in keys if k in it]
        parts += [f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in it.items() if k not in keys]
        lines.append("  { " + ", ".join(parts) + " }")
    return head + "window.VIDEOS = [\n" + ",\n".join(lines) + "\n];\n"


def main() -> None:
    text = DATA.read_text(encoding="utf-8")
    head, items = read_existing(text)
    known = {it["id"] for it in items}

    with urllib.request.urlopen(urllib.request.Request(FEED, headers=UA), timeout=20) as r:
        root = ET.fromstring(r.read())

    added = []
    for e in root.findall("a:entry", NS):
        vid = e.findtext("yt:videoId", namespaces=NS)
        if not vid or vid in known:
            continue
        title = (e.findtext("a:title", namespaces=NS) or "").strip()
        item = {"id": vid, "title": title, "date": (e.findtext("a:published", namespaces=NS) or "")[:10]}
        short = is_short(vid)
        if short is not None:
            item["short"] = short
        for hint, slug in PROJECT_HINTS.items():
            if hint.lower() in title.lower():
                item["project"] = slug
        added.append(item)

    # 기존 항목 중 short 표시가 없는 것도 채워 둠
    filled = 0
    for it in items:
        if "short" not in it:
            s = is_short(it["id"])
            if s is not None:
                it["short"] = s
                filled += 1

    if not added and not filled:
        print("changed=false")
        return
    added.sort(key=lambda x: x["date"], reverse=True)
    DATA.write_text(write(head, added + items), encoding="utf-8", newline="\n")
    for a in added:
        print(f"added {a['id']} short={a.get('short')} {a['title']}")
    print("changed=true")


if __name__ == "__main__":
    main()
