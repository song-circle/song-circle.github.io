/* ==========================================================================
   사이트 공통 정보 (이름·링크·이메일·폼 엔드포인트)
   - 값이 빈 문자열("")이면 해당 링크/버튼은 화면에서 자동으로 숨겨지거나 비활성화됩니다.
   - 문자열 대신 { ko: "...", en: "..." } 형태로 쓰면 언어별로 다르게 표시됩니다.
   ========================================================================== */
window.SITE = {
  // 사이트 기본 URL (참고용). HTML 메타·sitemap·robots 의 주소는 README "도메인 연결" 6단계의 일괄 치환으로 바꿉니다.
  baseUrl: "https://song-circle.github.io", // TODO: 커스텀 도메인 연결 시 교체

  name: {
    ko: "송원형",
    en: "송원형" // TODO: 영문 이름 표기
  },

  // 연락처
  email: "junk2393@naver.com",

  links: {
    github: "https://github.com/song-circle",
    youtube: "https://www.youtube.com/@buglog_kr", // 대표 채널 (푸터·구조화 데이터에 사용)
    linkedin: "" // TODO(선택): 링크드인 등 추가 링크
  },

  // 유튜브 섹션에 보여줄 채널 목록 (url이 비어 있으면 숨김)
  youtubeChannels: [
    {
      name: "버그로그",
      url: "https://www.youtube.com/@buglog_kr",
      desc: { ko: "한국어 개발 일지. 프로그램을 만들고 버그를 찾아 고치는 과정", en: "Korean dev log: building programs and fixing their bugs" }
    },
    {
      name: "Agent Workbench",
      url: "", // TODO: Agent Workbench 채널 URL
      desc: { ko: "영어 채널. Claude Code와 AI 에이전트로 실제로 만들어 보는 과정", en: "Real builds with Claude Code and AI agents, one working thing per video" }
    }
  ],

  // 외부 폼 서비스(Formspree 등) 엔드포인트. 비어 있으면 메일 앱(mailto)으로 대체됩니다.
  forms: {
    outsourcing: "", // TODO: 외주 문의 폼 엔드포인트 (예: https://formspree.io/f/xxxxxxx)
    recruit: ""      // TODO: 채용 제안 폼 엔드포인트
  },

  // © 표기
  copyrightName: "song-circle",
  copyrightSince: 2026
};
