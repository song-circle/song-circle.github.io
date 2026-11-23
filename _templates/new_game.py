"""새 게임의 상세 페이지와 privacy 페이지를 템플릿에서 만들어 줍니다. (선택 도구)

사용법 (레포 루트에서):
    python _templates/new_game.py <slug> "<게임 이름>" "<한 줄 설명>"

예:
    python _templates/new_game.py star-runner "스타 러너" "우주를 달리는 러닝 게임"

만들어지는 파일:
    games/<slug>/index.html
    games/<slug>/privacy/index.html

그 다음 data/games.js 에 같은 slug로 항목을 추가하고, sitemap.xml 에 두 URL을 추가하세요.
파이썬이 없으면 _templates 안의 두 index.html 을 직접 복사해 {{slug}} 등을 바꿔도 됩니다.
"""
import html
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATES = {
    ROOT / "_templates" / "game" / "index.html": "games/{slug}/index.html",
    ROOT / "_templates" / "game-privacy" / "index.html": "games/{slug}/privacy/index.html",
}


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1
    slug, title = sys.argv[1], sys.argv[2]
    desc = sys.argv[3] if len(sys.argv) > 3 else title
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
        print("slug는 영문 소문자·숫자·하이픈만 사용하세요. 예: star-runner")
        return 1

    values = {"slug": slug, "title": html.escape(title), "description": html.escape(desc)}
    for src, dst in TEMPLATES.items():
        out = ROOT / dst.format(slug=slug)
        if out.exists():
            print(f"이미 있음, 건너뜀: {out.relative_to(ROOT)}")
            continue
        text = src.read_text(encoding="utf-8")
        # 템플릿 설명 주석(사용법)은 빼고, 법률 검토 주석은 남김
        text = re.sub(r"<!--\n  (게임 상세 페이지 템플릿).*?-->\n", "", text, flags=re.S)
        text = re.sub(r"\n  (사용법|본문은)[^\n]*", "", text)
        for k, v in values.items():
            text = text.replace("{{" + k + "}}", v)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(text, encoding="utf-8", newline="\n")
        print(f"생성: {out.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
