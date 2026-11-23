/* ==========================================================================
   유튜브 영상 (메인 "유튜브" 섹션)
   - 채널 URL은 data/site.js 의 links.youtube 에서 관리합니다.
   - 새 영상 가져오기: python .github/scripts/update_videos.py (채널 피드에서 새 영상만 추가, 기존 항목은 그대로)
   - 메인에는 가로 본편을 먼저(최신순), 그다음 Shorts 순으로 최대 3개가 표시됩니다. short: true 가 Shorts 입니다.
   - id 에 유튜브 영상 ID(watch?v= 뒤 11자리)를 넣으면 썸네일과 링크가 자동으로 만들어집니다.

   항목 형식:
   {
     id: "dQw4w9WgXcQ",                          // 유튜브 영상 ID
     title: { ko: "제목", en: "Title" },
     date: "2026-12-01",                         // 공개일
     project: "cpu-benchmark"                    // (선택) 관련 프로젝트 slug
   }
   ========================================================================== */
window.VIDEOS = [
  { id: "SZgg3NOWT6c", title: "점수를 만들고, 화면을 만들고, 처음으로 배포했습니다 | cpu-bench 개발기 2편", date: "2026-11-21", short: false, project: "cpu-benchmark" },
  { id: "qidjb0Sqmww", title: "내 PC가 제 성능을 내는지 알려 주는 벤치마크를 만들고 있습니다 | cpu-bench 개발기 1편", date: "2026-11-19", short: false, project: "cpu-benchmark" },
  { id: "M4M-VqIyWUk", title: "PC를 느리게 하는 프로그램 1위… 제 벤치마크였습니다", date: "2026-11-22", short: true, project: "cpu-benchmark" },
  { id: "Ir85I4jv_Ts", title: "드라이버 없이 CPU 클럭 재는 법 — 덧셈 체인", date: "2026-11-21", short: true, project: "cpu-benchmark" },
  { id: "f_qSFiY8JKM", title: "CPU가 램에서 값 하나 읽는 데 100나노초 — 캐시 계단 직접 재 봤다", date: "2026-11-20", short: true, project: "cpu-benchmark" },
  { id: "esKnvY-ZjpQ", title: "같은 CPU인데 코어마다 클럭이 다르다? 깨어나는 중이었다", date: "2026-11-18", short: true, project: "cpu-benchmark" },
  { id: "Lsrqw_LAIQQ", title: "30번 중 6번 멈추는 벤치마크, 범인은 '기다리는 방법'", date: "2026-11-17", short: true, project: "cpu-benchmark" }
];
