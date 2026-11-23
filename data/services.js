/* ==========================================================================
   할 수 있는 일 (메인 "서비스" 카드)
   - 카드 제목/설명 문구는 data/i18n.js 의 "services.<id>.title" / "services.<id>.desc" 에 있습니다.
   - 순서를 바꾸거나 카드를 빼려면 이 배열만 고치면 됩니다.
   - 새 카드를 추가하면 i18n.js 의 ko(필수)·en(선택)에 문구도 추가하세요.
   ========================================================================== */
window.SERVICES = [
  { id: "backend", tags: ["Go", "MySQL", "REST API"] },
  { id: "payment", tags: ["PG", "Webhook"] },
  { id: "integration", tags: ["REST", "WebSocket"] },
  { id: "risk", tags: ["Real-time", "Risk"] },
  { id: "ocr", tags: ["OCR", "LLM"] },
  { id: "cicd", tags: ["Jenkins"] }
];
