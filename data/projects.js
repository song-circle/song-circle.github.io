/* ==========================================================================
   프로젝트 (메인 "프로젝트" 카드 + /projects/<slug>/ 상세)
   - status: "dev"(진행 중) | "released"(출시)
   - detail: true 이면 카드에 "자세히" 링크가 생깁니다.
     이 경우 /projects/<slug>/index.html 파일도 만들어야 합니다. (README "프로젝트 상세 추가" 참고)
   - github / video 가 비어 있으면 버튼이 숨겨지고, 로컬에서는 TODO로 표시됩니다.
   - sections: 상세 페이지 본문. { heading, body(문단 문자열) | items(목록 배열) }
   ========================================================================== */
window.PROJECTS = [
  {
    slug: "cpu-benchmark",
    title: { ko: "Windows CPU 벤치마크", en: "Windows CPU Benchmark" },
    summary: {
      ko: "C/C++ 부하 모듈과 제어·리포트 앱으로 구성된 Windows용 CPU 벤치마크 프로그램. 시스템 사양을 인식해 결과와 함께 보여줍니다. 개발 과정은 유튜브에 연재할 예정입니다.",
      en: "A CPU benchmark for Windows with a C/C++ load module and a control & report app that detects system specs. Development will be documented on YouTube."
    },
    status: "dev",
    tags: ["C/C++", "Windows"], // TODO: 제어·리포트 앱에 쓰는 언어/프레임워크 추가
    github: "", // TODO: GitHub 저장소 URL (공개 시)
    video: "",  // TODO: 관련 유튜브 영상/재생목록 URL
    detail: true,
    sections: [
      {
        heading: "구성",
        items: [
          "부하 모듈 (C/C++): CPU에 부하를 걸고 측정",
          "제어·리포트 앱: 테스트 실행 제어와 결과 리포트",
          "사양 인식: 실행 환경의 CPU 등 시스템 사양 확인"
        ]
      },
      { heading: "진행 상황", body: "" }, // TODO: 현재 진행 상황
      { heading: "개발기 영상", body: "개발 과정을 유튜브에 연재할 예정입니다." }
    ]
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
    video: "",  // TODO: 관련 영상 URL
    detail: false
  }
];
