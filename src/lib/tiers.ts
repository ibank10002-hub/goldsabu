export type Tier = {
  id: string;
  tierLabel: string;
  name: string;
  price: number;
  desc: string;
  features: string[];
};

export const TIERS: Tier[] = [
  {
    id: "free",
    tierLabel: "FREE",
    name: "프리",
    price: 0,
    desc: "무엇을 받을지 먼저 확인하고 싶다면",
    features: ["사주 원국 4기둥 요약", "오행 분포 그래프", "일간 성향 한 줄 풀이"],
  },
  {
    id: "pro",
    tierLabel: "PRO",
    name: "프로",
    price: 19900,
    desc: "원국과 오행의 기본기를 제대로",
    features: [
      "사주 원국 전체 해설",
      "오행 균형 · 용신/기신 분석",
      "명리 용어 해설집 23개 포함",
      "PDF로 저장 및 인쇄 가능",
    ],
  },
  {
    id: "premium",
    tierLabel: "PREMIUM",
    name: "프리미엄",
    price: 49900,
    desc: "10년 단위 흐름까지 알고 싶다면",
    features: [
      "프로 리포트 전체 포함",
      "대운 8개 전체 해설 (31세~101세)",
      "세운 5개년 흐름 분석",
      "직업 · 재물 · 인간관계 섹션",
    ],
  },
  {
    id: "vip",
    tierLabel: "VIP",
    name: "VIP",
    price: 99900,
    desc: "올해 열두 달까지 촘촘하게",
    features: [
      "프리미엄 리포트 전체 포함",
      "2026년 월운 12개월 전체 해설",
      "생애주기 사이클 차트 (전체·재물·건강·관계)",
      "핵심 전략 3가지 총평 리포트",
    ],
  },
];

export function getTier(id: string) {
  return TIERS.find((t) => t.id === id);
}
