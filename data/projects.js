/* ==========================================================================
   프로젝트 (메인 "프로젝트" 카드 + /projects/<slug>/ 상세)
   - status: "dev"(진행 중) | "released"(출시)
   - detail: true 이면 카드에 "자세히" 링크가 생깁니다.
     이 경우 /projects/<slug>/index.html 파일도 만들어야 합니다. (README "프로젝트 상세 추가" 참고)
   - github / download / video 가 비어 있으면 버튼이 숨겨집니다. (github·video는 로컬에서 TODO 표시)
   - sections: 상세 페이지 본문. { heading, body(문단 문자열) | items(목록 배열) }
   - 메인에는 배열 순서대로 표시됩니다.
   ========================================================================== */
window.PROJECTS = [
  {
    slug: "cpu-benchmark",
    title: { ko: "cpu-bench · 진단형 CPU 벤치마크", en: "cpu-bench · Diagnostic CPU benchmark" },
    summary: {
      ko: "점수만 보여 주지 않고, 내 PC가 제 성능을 내는지와 그 이유, 나아지는 방법까지 알려 주는 Windows용 무료 CPU 벤치마크. 개발 과정을 유튜브 '버그로그'에 연재합니다.",
      en: "A free Windows CPU benchmark that tells you not just a score, but whether your PC performs as it should, why, and how to improve it. Built on camera for the YouTube channel BugLog."
    },
    status: "dev",
    tags: ["C/C++", "Windows", "DLL", "Named Pipe"],
    github: "https://github.com/song-circle/devlog-kr/tree/main/cpu-bench",
    download: "https://github.com/song-circle/devlog-kr/releases?q=cpu-bench",
    video: "https://www.youtube.com/@buglog_kr", // TODO(선택): 개발기 재생목록 URL이 생기면 교체
    detail: true,
    sections: [
      {
        heading: "무엇을 알려 주나",
        items: [
          "제 성능 발휘율(%)과 한눈에 보는 상태: 발열·성능 유지, 메모리 이론 속도 대비, 쉴 때 CPU 사용, 전원 설정, 그래픽카드·SSD·랜 연결",
          "측정 결과는 이 PC에만 저장하고 외부로 보내지 않음"
        ]
      },
      {
        heading: "구조",
        items: [
          "측정 러너: 측정만 하는 별도 프로세스. 우선순위 HIGH, 스레드를 코어에 고정, 하이브리드 CPU 대응",
          "부하 모듈: 공통 C 인터페이스를 구현한 DLL (int: CRC-32·SHA-256·정렬·파싱 / mem: 대역폭·캐시~DRAM 지연)",
          "제어 앱 ↔ 러너는 Named Pipe(JSON)로 통신 (제어 앱은 개발 예정)",
          "측정 절차: 워밍업 1회 → N회 측정 → 중앙값 채택, 회차 간 편차(CV)가 2%를 넘으면 경고"
        ]
      },
      {
        heading: "checksum으로 하는 두 가지 검증",
        items: [
          "계산이 실제로 일어났는지: 같은 계산을 Python으로 따로 구현한 기준값과 비교",
          "PC가 안정적인지: 반복 중 결과가 한 번이라도 달라지면 불안정한 오버클럭·메모리 설정(XMP)을 경고"
        ]
      },
      { heading: "다운로드", body: "GitHub Releases에서 cpu-bench-<버전>-win-x64.zip을 받아 압축을 풀고 cpu-bench.exe를 실행합니다. 아직 코드 서명 전 초기 버전입니다." }
    ]
  },
  {
    slug: "ai-office",
    title: { ko: "AI Office (가칭)", en: "AI Office (working title)" },
    summary: {
      ko: "요청 하나를 AI 팀(PM·개발·QA)이 나눠 실제 코드를 고치고, 테스트로 검증한 뒤 내가 승인해야만 반영되는 Windows 도구. 테스트 파일을 AI가 바꾸면 되돌리고 실패 처리합니다.",
      en: "Hand one request to an AI team (PM, dev, QA) that splits the work, edits real code, verifies with tests, and only lands changes after my approval."
    },
    status: "dev",
    tags: ["Go", "LLM", "AI Agent"],
    github: "https://github.com/song-circle/devlog-kr/tree/main/ai-office",
    video: "",
    detail: false
  },
  {
    slug: "tax-app",
    title: { ko: "내 세금 한눈에", en: "My taxes at a glance" },
    summary: {
      ko: "홈택스·위택스에 흩어진 환급금·납부할 세금·체납액을 한 화면에 모으고, AI가 놓친 환급·경정청구 대상·납부 우선순위·기한을 분석해 주는 본인용 웹앱.",
      en: "A personal web app that gathers refunds, taxes due and arrears from Korea's national and local tax portals, with AI analysis of missed refunds and deadlines."
    },
    status: "dev",
    tags: ["TypeScript", "Claude API"],
    github: "https://github.com/song-circle/tax_app",
    video: "",
    detail: false
  },
  {
    slug: "sql-genius",
    title: { ko: "SQL Genius", en: "SQL Genius" },
    summary: {
      ko: "자연어로 설명하면 SQL을 만들어 주고, 기존 쿼리를 분석해 더 빠른 버전을 제안하는 도구. MySQL·PostgreSQL·Oracle·SQL Server 지원, CLI와 웹 UI 제공.",
      en: "Turns plain language into SQL and suggests faster versions of existing queries. Supports MySQL, PostgreSQL, Oracle and SQL Server, with CLI and web UI."
    },
    status: "dev",
    tags: ["Go", "LLM", "Ollama"],
    github: "https://github.com/song-circle/sql-genius",
    video: "",
    detail: false
  },
  {
    slug: "account-monitor",
    title: { ko: "가상계좌 입금 모니터링", en: "Virtual account deposit monitor" },
    summary: {
      ko: "가상계좌 입금 내역을 실시간으로 확인하는 웹 애플리케이션. 계좌번호·인증키 로그인, 30초 자동 갱신.",
      en: "A web app for monitoring virtual account deposits in near real time, with key-based login and auto refresh."
    },
    status: "dev",
    tags: ["Go", "Svelte"],
    github: "https://github.com/song-circle/account_monitor",
    video: "",
    detail: false
  },
  {
    slug: "market-monitor",
    title: { ko: "시장 알리미", en: "Market notifier" },
    summary: {
      ko: "한국 주식시장 장 시작(09:00)·마감(15:30)에 환율·국제 유가·금 시세를 텔레그램으로 보내는 프로그램. 의존성 없는 단일 실행 파일.",
      en: "Sends FX rates, oil and gold prices to Telegram at the Korean market open and close. A single dependency-free executable."
    },
    status: "dev",
    tags: ["Go", "Telegram"],
    github: "https://github.com/song-circle/market_monitor",
    video: "",
    detail: false
  },
  {
    slug: "daily-log",
    title: { ko: "하루기록", en: "Daily Log" },
    summary: {
      ko: "삼성페이·카카오페이·카드사 앱 결제 알림을 자동으로 모아 하루 소비를 기록하는 Android 앱. 결제처별 자동 카테고리 분류.",
      en: "An Android app that collects payment notifications from Samsung Pay, Kakao Pay and card apps to log daily spending automatically."
    },
    status: "dev",
    tags: ["Android", "JavaScript"],
    github: "https://github.com/song-circle/daily-log",
    video: "",
    detail: false
  },
  {
    slug: "agent-workbench",
    title: { ko: "Agent Workbench", en: "Agent Workbench" },
    summary: {
      ko: "영어 유튜브 채널 'Agent Workbench'의 코드 저장소. Claude Code 스킬, MCP 서버, 훅 등을 영상마다 하나씩 실제로 만들고, 깨진 부분까지 기록합니다.",
      en: "Code from the Agent Workbench YouTube channel: real builds with Claude Code and AI agents — skills, MCP servers, hooks — one working thing per video."
    },
    status: "dev",
    tags: ["Python", "Claude Code", "MCP"],
    github: "https://github.com/song-circle/agent-workbench",
    video: "",
    detail: false
  },
  {
    slug: "game-prototype",
    title: { ko: "스포츠 커리어 시뮬레이션 (프로토타입)", en: "Sports career simulation (prototype)" },
    summary: {
      ko: "여러 종목의 선수 커리어를 시뮬레이션하는 웹 게임 프로토타입. 화면과 분리된 게임 엔진, 시드 기반으로 재현 가능한 난수, 1만 명 대량 시뮬레이션으로 밸런스를 검증합니다.",
      en: "A web prototype of a multi-sport career simulation, with a UI-independent engine, seeded RNG and 10,000-player batch simulations for balancing."
    },
    status: "dev",
    tags: ["TypeScript", "Game"],
    github: "https://github.com/song-circle/game-prototype",
    video: "",
    detail: false
  },
  {
    slug: "unity-game",
    title: { ko: "Unity 게임 (클라이언트 + 서버)", en: "Unity game (client + server)" },
    summary: {
      ko: "C# Unity 클라이언트와 Go 서버로 만드는 게임 프로젝트.",
      en: "A game built with a C# Unity client and a Go server."
    },
    status: "dev",
    tags: ["C#", "Unity", "Go"],
    github: "", // TODO: GitHub 저장소 URL (공개 시)
    video: "",
    detail: false
  }
];
