/* ==========================================================================
   게임 (메인 "게임" 미리보기 + /games/ 목록 + /games/<slug>/ 상세 + /games/<slug>/privacy/)
   - 새 게임을 추가하면 /games/<slug>/index.html 과 /games/<slug>/privacy/index.html 도
     만들어야 합니다. (README "새 게임 추가" 참고 — 템플릿 복사 후 slug만 바꾸면 됩니다)
   - status: "dev"(개발 중) | "released"(출시) | "soon"(준비 중)
   - 링크(play/download/stores)가 비어 있으면 버튼이 숨겨집니다.
   - 텍스트는 문자열 또는 { ko, en } 객체 모두 가능합니다.

   privacy (게임별 개인정보처리방침) — 법률 검토 전 초안입니다.
   스토어에 제출하기 전에 실제 사용하는 SDK와 수집 항목에 맞게 반드시 확인하세요.
   ========================================================================== */
window.GAMES = [
  {
    slug: "sample-game",
    title: { ko: "프로젝트 G (가칭)", en: "Project G (working title)" }, // TODO: 실제 게임명
    tagline: { ko: "개발 중인 게임입니다. 구조 예시용 항목입니다.", en: "A game in development. Placeholder entry." }, // TODO
    status: "dev",
    listed: false, // true 로 바꾸면 목록·메인에 표시. false 로 바꾸면 목록·메인에서 숨김 (상세·privacy 페이지 URL은 계속 동작)
    cover: "", // TODO: 대표 이미지 경로 (예: /games/sample-game/cover.png, 16:9 권장)
    platforms: [], // TODO: 예) ["Android", "iOS", "Windows", "Web"]
    genre: "", // TODO: 장르
    description: [
      "" // TODO: 게임 소개 문단 (여러 문단이면 배열에 추가)
    ],
    features: [
      // TODO: 특징 목록 (예: "실시간 멀티플레이")
    ],
    screenshots: [
      // TODO: 스크린샷 경로 (예: "/games/sample-game/shot-1.png")
    ],
    links: {
      play: "",     // TODO(선택): 웹에서 바로 플레이 URL
      download: "", // TODO(선택): 직접 다운로드 URL
      stores: [
        // 예) { name: "Google Play", url: "https://play.google.com/store/apps/details?id=..." }
        // 예) { name: "App Store", url: "https://apps.apple.com/app/id..." }
        // 예) { name: "Steam", url: "https://store.steampowered.com/app/..." }
      ]
    },
    supportEmail: "", // TODO: 게임 문의 이메일 (비우면 site.js 의 email 사용)

    privacy: {
      // 시행일 (YYYY-MM-DD)
      effectiveDate: "", // TODO
      // 운영자(개인정보 처리자) 표기
      operator: "", // TODO: 개인/상호명
      // 수집 항목: 무엇을, 어떻게 수집하는지
      collected: [
        // 예) { item: "기기 식별자(광고 ID)", method: "광고 SDK가 자동 수집" },
        // 예) { item: "게임 진행 데이터", method: "게임 서버에 저장" }
      ],
      // 이용 목적
      purposes: [
        // 예) "게임 진행 상태 저장", "광고 제공", "오류 분석 및 서비스 개선"
      ],
      // 보관 기간
      retention: "", // TODO: 예) "회원 탈퇴 또는 앱 삭제 요청 시 지체 없이 파기"
      // 제3자 제공·처리 위탁 (광고 SDK, 애널리틱스 등)
      thirdParties: [
        // 예) { name: "Google AdMob", purpose: "광고 제공", items: "광고 ID, 기기 정보", policy: "https://policies.google.com/privacy" },
        // 예) { name: "Unity Analytics", purpose: "이용 통계", items: "기기 정보, 이용 기록", policy: "https://unity.com/legal/privacy-policy" }
      ],
      // 데이터 삭제 요청 방법 (스토어 정책상 필요할 수 있음)
      deletion: "", // TODO: 예) "아래 이메일로 요청하면 7일 이내 삭제"
      // 아동 개인정보
      children: "", // TODO: 예) "만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다."
      // 문의처 (비우면 supportEmail → site.js email 순서로 사용)
      contact: ""
    }
  }
];
