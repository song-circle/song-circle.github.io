# song-circle.github.io

원형(song-circle)의 개인 사이트. 외주 문의 · 채용 제안 · 게임 브랜드 홈페이지 · 유튜브 연계용.

- 순수 HTML/CSS/JS 정적 사이트 (빌드 도구·npm 없음). 레포를 그대로 GitHub Pages에 올리면 동작합니다.
- 내용(경력·프로젝트·게임·영상·문구)은 모두 `data/*.js` 에서 관리합니다.
- 모든 경로는 루트 기준(`/assets/...`)이라 커스텀 도메인을 붙여도 깨지지 않습니다.

## 폴더 구조

```
/                         index.html       메인 (원페이지 + 섹션 앵커)
/projects/<slug>/         index.html       프로젝트 상세
/games/                   index.html       게임 목록
/games/<slug>/            index.html       게임 상세
/games/<slug>/privacy/    index.html       게임별 개인정보처리방침
/privacy/                 index.html       사이트 공통 개인정보처리방침
/404.html

data/
  site.js       이름, 이메일, GitHub·YouTube 링크, 폼 엔드포인트
  i18n.js       화면 문구 (한국어/영어)
  services.js   "할 수 있는 일" 카드 목록·순서
  career.js     경력 타임라인
  skills.js     기술 스택
  projects.js   프로젝트 카드 + 상세 내용
  games.js      게임 목록·상세 + 게임별 개인정보처리방침 데이터
  videos.js     유튜브 영상 목록

assets/
  css/style.css 스타일 (라이트/다크 자동)
  js/core.js    공통: 헤더·푸터, 언어 전환, 헬퍼
  js/home.js    메인 페이지 렌더링·연락 폼
  js/games.js   게임 목록·상세·privacy 렌더링
  js/project.js 프로젝트 상세 렌더링
  og.png        공유 미리보기 이미지 (임시, 1200×630)

_templates/     새 게임 페이지 템플릿 + 생성 스크립트 (밑줄 폴더라 Pages에 배포되지 않음)
```

## 로컬에서 확인하기

경로가 `/`로 시작하므로 파일을 더블클릭(`file://`)하면 CSS·JS를 못 찾습니다. 간단한 로컬 서버로 여세요.

```bash
cd C:\study\song-circle.github.io
python -m http.server 8000
```

브라우저에서 http://localhost:8000 을 엽니다.

- **로컬(localhost)에서는 비어 있는 항목이 빨간 `TODO:` 표시로 보입니다.** 배포된 사이트에서는 숨겨지므로, 로컬에서 빨간 표시가 없어질 때까지 채우면 됩니다.
- 영어 화면 확인: http://localhost:8000/?lang=en (또는 우측 상단 `EN` 버튼. 선택은 브라우저에 저장됨)
- python 의 http.server 는 404.html 을 쓰지 않으므로 404 페이지는 http://localhost:8000/404.html 로 직접 확인합니다.

## 내용 수정하기

모든 텍스트 값은 문자열 또는 `{ ko: "...", en: "..." }` 로 쓸 수 있습니다. `en`이 없으면 한국어가 표시됩니다.
빈 문자열 `""` 은 배포 사이트에서 숨겨집니다.

| 바꾸려는 것 | 파일 | 위치 |
| --- | --- | --- |
| 이메일, GitHub·YouTube 링크 | `data/site.js` | `email`, `links` |
| 문의 폼 전송 주소 | `data/site.js` | `forms.outsourcing`, `forms.recruit` |
| Hero 소개 문구, 서비스 카드 문구, 폼 라벨 | `data/i18n.js` | `hero.*`, `services.*`, `contact.*` |
| 서비스 카드 순서·추가·삭제 | `data/services.js` | 배열 (문구는 i18n.js에 같은 id로) |
| 경력 | `data/career.js` | 배열. **위가 최신**. 항목 형식은 파일 상단 주석 참고 |
| 기술 스택 | `data/skills.js` | `{ name, use }` |
| 프로젝트 | `data/projects.js` | 배열. `status: "dev"`(진행 중) / `"released"`(출시) |
| 유튜브 영상 | `data/videos.js` | 배열 맨 앞에 `{ id, title, date }` 추가 (메인엔 앞 3개) |
| 게임 | `data/games.js` | 아래 "새 게임 추가" 참고 |

### 경력 추가 예시

`data/career.js` 배열 맨 앞에 추가:

```js
{
  period: "2025.01 – 현재",
  company: "",                // 비공개면 비워두고 domain만 사용
  domain: "핀테크",
  role: "백엔드 개발",
  title: "한 줄 요약",
  current: true,
  points: ["어떤 문제를 어떤 기술로 풀었는지"],
  stack: ["Go", "MySQL"]
}
```

### 영상 추가 예시

`https://www.youtube.com/watch?v=ABCDEFGHIJK` 의 `ABCDEFGHIJK` 가 id 입니다.

```js
window.VIDEOS = [
  { id: "ABCDEFGHIJK", title: "CPU 벤치마크 개발기 #1", date: "2026-12-01", project: "cpu-benchmark" },
];
```

### 프로젝트 상세 페이지 추가

1. `data/projects.js` 의 항목에 `detail: true` 와 `sections` 를 넣습니다.
2. `projects/cpu-benchmark/index.html` 을 `projects/<새 slug>/index.html` 로 복사합니다.
3. 복사한 파일에서 `data-slug="..."`, `<title>`, `description`, `canonical`, `og:*` 를 새 프로젝트에 맞게 바꿉니다.
4. `sitemap.xml` 에 URL을 추가합니다.

## 새 게임 추가 (상세 + privacy 페이지)

게임 페이지는 **템플릿 HTML 1개 + `data/games.js` 데이터**로 만들어집니다. HTML에는 검색·공유용 제목만 있고 본문은 데이터에서 렌더링됩니다.

1. `data/games.js` 에 항목 추가 (기존 `sample-game` 을 복사해서 `slug` 변경). slug 는 영문 소문자·숫자·하이픈.
2. 페이지 파일 생성 — 둘 중 하나:
   - 스크립트: `python _templates/new_game.py <slug> "<게임 이름>" "<한 줄 설명>"`
   - 직접: `_templates/game/index.html` → `games/<slug>/index.html`,
     `_templates/game-privacy/index.html` → `games/<slug>/privacy/index.html` 로 복사 후 `{{slug}}`, `{{title}}`, `{{description}}` 을 바꿉니다.
3. 이미지(커버·스크린샷)는 `games/<slug>/` 폴더에 넣고 `data/games.js` 에 `/games/<slug>/파일명.png` 로 적습니다.
4. `sitemap.xml` 에 `/games/<slug>/` 와 `/games/<slug>/privacy/` 를 추가합니다.
5. 스토어(Google Play 등)에 등록할 때 개인정보처리방침 URL은 `https://<도메인>/games/<slug>/privacy/` 를 씁니다.

- 목록·메인에서 숨기려면 `listed: false` (페이지 URL은 계속 동작). 예시 게임 `sample-game` 은 실제 게임을 넣을 때 지우거나 `listed: false` 로 바꾸세요.
- **개인정보처리방침은 법률 검토 전 초안입니다.** 실제로 쓰는 SDK(광고·애널리틱스·로그인 등)와 수집 항목에 맞게 `privacy` 를 채우고, 출시 전 검토를 받으세요.

## 문의 폼 연결 (Formspree 예시)

1. https://formspree.io 에서 폼 2개(외주 문의, 채용 제안)를 만듭니다.
2. 각 폼의 엔드포인트(`https://formspree.io/f/xxxxxxx`)를 `data/site.js` 의 `forms.outsourcing`, `forms.recruit` 에 넣습니다.
3. `privacy/index.html` 의 "외부 서비스" 목록에 폼 서비스 이름·방침 링크를 적습니다.

엔드포인트가 비어 있으면 폼은 메일 앱(mailto)을 여는 방식으로 동작합니다. 이메일도 비어 있으면 "준비 중" 안내만 나옵니다.

## GitHub Pages 배포

1. GitHub에서 **`song-circle.github.io`** 이름으로 public 저장소를 만듭니다. (이 이름이어야 `https://song-circle.github.io/` 루트로 배포됩니다)
2. 로컬 레포에 원격을 연결하고 푸시합니다.
   ```bash
   git remote add origin https://github.com/song-circle/song-circle.github.io.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment** 에서 Source: `Deploy from a branch`, Branch: `main` / `/ (root)` 선택.
4. 1~2분 뒤 https://song-circle.github.io/ 에서 확인합니다. 이후로는 `main` 에 푸시할 때마다 자동 배포됩니다.

## Cloudflare 도메인 연결

예시 도메인을 `example.com` 이라고 하면:

1. **CNAME 파일 추가**: 레포 루트에 `CNAME` 파일을 만들고 도메인 한 줄만 적은 뒤 커밋·푸시합니다.
   ```
   example.com
   ```
   (Settings → Pages → Custom domain 에 입력해도 같은 효과입니다)
2. **Cloudflare DNS** (대시보드 → 도메인 → DNS → Records) 에 추가. 이때 **Proxy status 는 모두 `DNS only`(회색 구름)** 로 둡니다.

   | Type | Name | Content |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `song-circle.github.io` |

   (선택) IPv6 AAAA: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
3. GitHub **Settings → Pages → Custom domain** 에 `example.com` 이 들어가 있는지 확인하고 DNS check 가 통과될 때까지 기다립니다 (수 분 ~ 수십 분).
4. HTTPS 인증서가 발급되면 **Enforce HTTPS** 를 켭니다. (체크박스가 비활성화되어 있으면 아직 발급 중입니다. 최대 24시간)
5. (선택) 이후 Cloudflare 프록시(주황 구름)를 켜고 싶다면, Cloudflare **SSL/TLS 모드를 `Full (strict)`** 로 먼저 설정하세요. `Flexible` 이면 무한 리다이렉트가 납니다.
6. **사이트 안의 주소 바꾸기**: canonical·OG·sitemap·robots 에 `https://song-circle.github.io` 가 들어 있습니다. 한 번에 바꿉니다.
   ```bash
   # Git Bash 에서 레포 루트 기준
   grep -rl "https://song-circle.github.io" --include=*.html --include=*.xml --include=*.txt --include=*.js . \
     | xargs sed -i "s#https://song-circle.github.io#https://example.com#g"
   ```
   index.html 의 JSON-LD `url` 도 함께 바뀝니다.
7. (권장) GitHub **계정 Settings → Pages → Verified domains** 에서 도메인을 인증해 두면 다른 사람이 도메인을 가로채는 것을 막을 수 있습니다.

## TODO 목록 (채워야 할 것)

로컬 서버에서 빨간 `TODO:` 표시로도 확인할 수 있습니다. `grep -rn "TODO" data index.html privacy` 로 전체 목록을 볼 수 있습니다.

### 기본 정보 — `data/site.js`
- [ ] `email` 공개용 이메일 주소
- [ ] `links.youtube` 유튜브 채널 URL
- [ ] `forms.outsourcing`, `forms.recruit` 폼 엔드포인트
- [ ] `name.en` 영문 이름 표기
- [ ] (선택) `links.linkedin`

### 경력 — `data/career.js` (4개 항목 모두)
- [ ] `period` 기간
- [ ] `company` 회사명 (공개 가능한 경우만)
- [ ] `role` 직무/직급
- [ ] 결제·가상자산·증권사 항목의 `points` 구체화, `stack` 사용 기술
- [ ] 성과 수치가 있으면 추가

### 기술 스택 — `data/skills.js`
- [ ] Python 사용처
- [ ] (선택) MySQL·C/C++ 사용처 보강

### 프로젝트 — `data/projects.js`
- [ ] 두 프로젝트의 `github`, `video` 링크
- [ ] CPU 벤치마크: 제어·리포트 앱 기술 태그, "진행 상황" 본문

### 유튜브 — `data/videos.js`
- [ ] 영상 추가

### 게임 — `data/games.js`
- [ ] 예시 게임(`sample-game`)을 실제 게임으로 교체하거나 `listed: false`
- [ ] 게임 소개·커버·스크린샷·플랫폼·장르·링크
- [ ] `privacy` 전체 (시행일, 운영자, 수집 항목, 목적, 보관 기간, 제3자 SDK, 삭제 방법, 아동 정책)

### 사이트 개인정보처리방침 — `privacy/index.html`
- [ ] 시행일, 보관 기간, 폼 서비스명

### 기타
- [ ] `index.html` JSON-LD `sameAs` 에 유튜브 URL, `email` 추가
- [ ] 외주 폼 예산 구간이 원하는 기준인지 확인 (`data/i18n.js` 의 `contact.budget.*`)
- [ ] `assets/og.png` 임시 이미지 교체 (1200×630)
- [ ] 도메인 연결 후 주소 일괄 변경 (위 6단계)
