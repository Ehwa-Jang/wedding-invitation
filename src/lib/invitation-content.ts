// All invitation copy is editable here; decoration and layout live in styles.css.
export const invitation = {
  groom: "고민석",
  bride: "장이화",
  groomEnglish: "Minseok",
  brideEnglish: "Ehwa",
  englishNames: "Minseok ✶ Ehwa",
  date: { year: 2026, month: 3, day: 22, time: "오후 12시 30분", english: "2026.03.22. SUN 12:30 PM" },
  venue: "웨딩시그니처 트리니티홀",
  venueEnglish: ["WEDDING SIGNATURE", "TRINITY HALL"],
  // Leave address empty to hide the address line and copy button.
  address: "",
  // Each item: { title, lines[] }. Leave empty to hide the transport guide.
  transport: [] as { title: string; lines: string[] }[],
  poem: "우리는 유구한 시간 속에서\n우연히 같은 세기에 태어나\n서로의 인생을 보내던 중 교차했고,\n그 순간 삶을 축복하게 됐어.\n잘 자,\n이제 매일을 기다리며 네 생각에 잠들래.\n-시즈쿠이 슈스케",
  greeting: "마주 잡은 두 손이 그리는 풍경 속에\n귀한 당신의 진심을 더해 주시면\n더 없는 기쁨이겠습니다.",
  families: [
    { parents: "고재휘 & 노정란의", child: "아들 민석", message: "아들. 어느새 이렇게 멋지게 성장해\n이런 감격스러운 순간을 맞이하게 되었네.\n이제는 아빠·엄마의 아들에서\n한 여인의 남편으로서 든든하게 지켜주며 항상\n웃음가득한 행복한 가정만들어가길 바란다.\n나의 보물 축하해요..." },
    { parents: "장영기 & 이미진의", child: "딸 이화", message: "사랑하는 이화.\n제대로 보듬어 주지도 못했는데\n이렇게 건강하고 예쁘게 성장해 주어서 고마워.\n앞으로 긴 여정의 삶도 지혜롭게\n잘 헤쳐 나가길 바란다.\n건강하고 행복하길 바란다. 사랑해." },
  ],
  letters: [
    { to: "TO. EHWA", message: "항상 밝은 미소로 나의 곁을\n지켜줘서 고마워.\n앞으로도 계속 우리의 미래를\n천천히 행복으로 물들여 나가자.\n사랑해 ♥" },
    { to: "TO. MINSEOK", message: "내 곁에서 묵묵히 사랑을\n이야기 하는 사람.\n지금처럼 평생 나와 함께 살아요.\n내 삶에 나타나줘서 고마워요.\n사랑해요." },
  ],
  // Background music: put an mp3 in public/ (e.g. "/music.mp3"). Leave empty to hide the music button.
  musicSrc: "",
  bank: "카카오뱅크",
  accountNumber: "123-12-12345",
};

export const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

export function calendarDays(year: number, month: number) {
  const offset = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return [...Array.from({ length: offset }, () => null), ...Array.from({ length: count }, (_, index) => index + 1)];
}