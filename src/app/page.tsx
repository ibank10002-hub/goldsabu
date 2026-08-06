import Link from "next/link";
import styles from "./page.module.css";
import { TIERS } from "@/lib/tiers";

const PAINS = [
  {
    num: "01",
    title: "유료 앱, 결과는 다 비슷비슷",
    body: "생년월일만 넣으면 나오는 자동생성 문구. 누구한테 붙여도 말이 되는 두루뭉술한 풀이에 돈을 낸 적 있다면.",
  },
  {
    num: "02",
    title: "무료 사주는 짧고 애매하다",
    body: "오늘의 운세, 한 줄 총평. 정작 궁금한 건 앞으로 10년, 올해 열두 달인데 거기까진 안 알려준다.",
  },
  {
    num: "03",
    title: "용어는 어려운데 설명이 없다",
    body: "정관, 편재, 형충회합 — 한자만 던져놓고 알아서 해석하라는 리포트. 초등학생도 읽을 수 있어야 진짜 풀이다.",
  },
];

const TOC = [
  "들어가며 · 황금돈사부가 다른 이유",
  "사주 원국 · 네 기둥 전체 해설",
  "오행 분포 · 균형과 용신/기신",
  "일간 분석 · 나라는 사람의 본질",
  "형충회합 · 사주 안의 충돌과 화합",
  "직업 · 재물운의 흐름",
  "인간관계 · 연애와 결혼",
  "건강 · 심리 패턴",
  "생애주기 사이클 차트",
  "대운 8개 · 31세부터 101세까지",
  "세운 5개년 · 2026~2030",
  "2026년 월운 · 열두 달 전체",
  "총평 · 지금 써야 할 전략 3가지",
];

const REVIEWS = [
  {
    name: "곽O솔",
    date: "2026.06.16",
    body: "사주 자체를 처음 보다보니 실제로 봐본 적은 없었지만, 단순히 \"돈 들어온다\", \"운이 좋다\"가 아니라 저한테 일어나는 일들에 대한 흐름과 구조를 설명해줘서 처음부터 끝까지 집중해서 읽었습니다. 좋은 말만 적어놓은 게 아니라 약점도 직설적으로 짚어준 부분이 오히려 신뢰가 갔습니다.",
    tag: "무료 원국 요약 체험 후기",
  },
  {
    name: "박O영",
    date: "2026.06.27",
    body: "무료라 솔직히 기대하지 않았는데 리포트를 받고 깜짝 놀랐습니다. 인생 전체 해석부터 월별 흐름까지 자세히 나와 있어서 웬만한 유료 사주보다 나은 것 같아요. 자세한 유료 리포트는 어떻게 봐주실지 엄청 궁금해졌어요.",
    tag: "무료 원국 요약 체험 후기",
  },
];

const PROCESS = [
  { title: "생년월일시 입력", body: "태어난 날짜와 시간, 성별만 알려주시면 됩니다." },
  { title: "만세력 대조 검증", body: "실제 만세력 데이터로 원국을 확정하고 오행을 계산합니다." },
  { title: "결제 및 확인", body: "등급을 고르고 결제하면 주문이 접수됩니다." },
  { title: "리포트 이메일 발송", body: "영업일 기준 1~2일 내 PDF 리포트를 보내드립니다." },
];

const FAQS = [
  {
    q: "AI가 자동으로 만드나요, 사람이 직접 보나요?",
    a: "만세력 검증 데이터를 기반으로 실제 상담 경험과 AI 분석을 함께 사용합니다. 신비주의적 표현 없이 근거를 밝히는 방식으로만 풀이합니다.",
  },
  {
    q: "타로도 같이 봐주나요?",
    a: "황금돈사부는 사주를 중심에 둔 서비스입니다. 타로가 필요하시면 별도로 안내해드리지만, 이 리포트는 사주 원국과 대운/세운 분석에 집중되어 있습니다.",
  },
  {
    q: "결제 후 리포트는 언제 받을 수 있나요?",
    a: "결제 확인 후 영업일 기준 1~2일 내 이메일로 PDF가 발송됩니다. 등급이 높을수록 검토 시간이 조금 더 걸릴 수 있습니다.",
  },
  {
    q: "환불이 가능한가요?",
    a: "리포트 발송 전에는 전액 환불이 가능합니다. 발송 후에는 콘텐츠 특성상 환불이 제한되니, 등급 선택 시 신중히 골라주세요.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navBrand}>황금돈사부</div>
          <Link href="#pricing" className={styles.navCta}>
            리포트 보기
          </Link>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroInner}>
            <div className={styles.ratingBadge}>
              <span className={styles.ratingDot} aria-hidden="true" />
              <span className={styles.ratingText}>
                네이버 엑스퍼트 <b>4.8</b> · 누적 상담 <b>19건+</b>
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              근거 없는 사주풀이는
              <br />
              <span className={styles.accent}>이제 그만.</span>
            </h1>

            <p className={styles.heroDeck}>
              생년월일 넣으면 똑같이 나오는 자동생성 리포트 말고, 사주 원국부터 10년
              대운, 올해 열두 달까지 — 왜 그런지 근거를 밝히는 리포트입니다.
            </p>

            <div className={styles.heroActions}>
              <Link href="#pricing" className={styles.btnPrimary}>
                내 리포트 받아보기
              </Link>
              <Link href="#sample" className={styles.btnGhost}>
                샘플 리포트 보기
              </Link>
            </div>

            <div className={styles.statRow}>
              <div className={styles.stat}>
                <span className={styles.statNum}>13</span>
                <span className={styles.statLabel}>섹션 완결 구성</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>8</span>
                <span className={styles.statLabel}>대운 전체 해설</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>12</span>
                <span className={styles.statLabel}>2026년 월운 전체</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>이런 경험, 있으셨을 겁니다</div>
            <h2 className={styles.sectionTitle}>사주풀이에 실망했던 이유</h2>
            <p className={styles.sectionDeck}>
              황금돈사부는 세 가지 문제를 정면으로 다르게 풀었습니다.
            </p>
          </div>
          <div className={styles.painGrid}>
            {PAINS.map((p) => (
              <div className={styles.painCard} key={p.num}>
                <span className={styles.painNum}>{p.num}</span>
                <div className={styles.painTitle}>{p.title}</div>
                <div className={styles.painBody}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="sample">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>리포트 미리보기</div>
            <h2 className={styles.sectionTitle}>13개 섹션, 끊김 없는 완결 구성</h2>
            <p className={styles.sectionDeck}>
              등급에 따라 포함되는 섹션은 다르지만, 구성 원칙은 모두 같습니다.
            </p>
          </div>

          <div className={styles.reportShowcase}>
            <div className={styles.tocList}>
              {TOC.map((t, i) => (
                <div className={styles.tocItem} key={t}>
                  <span className={styles.tocNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.tocLabel}>{t}</span>
                </div>
              ))}
            </div>

            <div className={styles.samplePreview}>
              <span className={styles.sampleTag}>SECTION 04 · 일간 분석</span>
              <h3 className={styles.sampleTitle}>갑목(甲木) 일간의 본질</h3>
              <p className={styles.sampleBody}>
                일주의 갑목(甲木)은 하늘로 곧게 뻗는 큰 나무의 기운입니다. 굽히기보다는
                곧게 나아가려는 성향이 강하고, 방향이 정해지면 좀처럼 흔들리지 않습니다.
                이 사주는 목(木) 기운이 셋으로 가장 강하고 토(土) 기운이 전혀 없어, 뿌리를
                내릴 흙을 스스로 찾아야 하는 구조입니다.
              </p>
              <div className={styles.sampleBox}>
                <b>핵심 요약</b>
                방향을 정하면 밀어붙이는 힘이 강점이지만, 토(土)가 없어 결과를 붙잡아 둘
                기반을 의식적으로 만들어야 합니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>실제 이용 후기</div>
            <h2 className={styles.sectionTitle}>먼저 받아보신 분들의 이야기</h2>
            <p className={styles.sectionDeck}>
              무료 원국 요약을 먼저 받아보신 분들이 남겨주신 후기입니다.
            </p>
          </div>
          <div className={styles.reviewGrid}>
            {REVIEWS.map((r) => (
              <div className={styles.reviewCard} key={r.name + r.date}>
                <div className={styles.reviewTop}>
                  <span className={styles.reviewStars} aria-label="5점 만점에 5점">
                    ★★★★★
                  </span>
                  <span className={styles.reviewMeta}>
                    <b>{r.name}</b> · {r.date}
                  </span>
                </div>
                <p className={styles.reviewBody}>{r.body}</p>
                <div className={styles.reviewSource}>{r.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="pricing">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>등급 선택</div>
            <h2 className={styles.sectionTitle}>어디까지 알고 싶으신가요</h2>
            <p className={styles.sectionDeck}>
              원국만 볼지, 10년 흐름까지 볼지, 올해 열두 달까지 볼지 — 필요한 만큼만
              고르세요.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {TIERS.map((tier) => {
              const featured = tier.id === "premium";
              return (
                <div
                  key={tier.id}
                  className={`${styles.priceCard} ${featured ? styles.featured : ""}`}
                >
                  {featured && <span className={styles.priceBadge}>가장 많이 선택</span>}
                  <span className={styles.priceTier}>{tier.tierLabel}</span>
                  <h3 className={styles.priceTierName}>{tier.name}</h3>
                  <div className={styles.priceAmount}>
                    {tier.price === 0 ? (
                      "무료"
                    ) : (
                      <>
                        {tier.price.toLocaleString("ko-KR")}
                        <span>원</span>
                      </>
                    )}
                  </div>
                  <p className={styles.priceDesc}>{tier.desc}</p>
                  <div className={styles.priceFeatures}>
                    {tier.features.map((f) => (
                      <div className={styles.priceFeature} key={f}>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={tier.price === 0 ? "/free" : `/checkout?tier=${tier.id}`}
                    className={`${styles.priceBtn} ${featured ? styles.solid : ""}`}
                  >
                    {tier.price === 0 ? "무료로 시작" : "이 등급으로 받기"}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>이용 방법</div>
            <h2 className={styles.sectionTitle}>네 단계면 끝납니다</h2>
          </div>
          <div className={styles.processRow}>
            {PROCESS.map((p, i) => (
              <div className={styles.processStep} key={p.title}>
                <div className={styles.processIndex}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={styles.processTitle}>{p.title}</div>
                <div className={styles.processBody}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>자주 묻는 질문</div>
            <h2 className={styles.sectionTitle}>궁금하신 점</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((f) => (
              <details className={styles.faqItem} key={f.q}>
                <summary className={styles.faqQ}>
                  {f.q}
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <p className={styles.faqA}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.wrap}>
          <h2 className={styles.finalCtaTitle}>
            내 사주, 이번엔 근거 있게 확인해보세요
          </h2>
          <p className={styles.finalCtaDeck}>
            원국 요약은 무료입니다. 마음에 들면 그때 등급을 고르셔도 됩니다.
          </p>
          <Link href="#pricing" className={styles.btnPrimary}>
            무료로 원국 확인하기
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerInner}>
            <span>황금돈사부 · GOLDSABU</span>
            <span>문의 · goldsabu@example.com</span>
          </div>
          <p className={styles.footerLegal}>
            본 리포트는 명리학 이론과 실제 상담 데이터를 기반으로 한 콘텐츠 서비스이며,
            의학적·법률적·재무적 조언을 대체하지 않습니다. 중요한 의사결정은 관련 분야
            전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
