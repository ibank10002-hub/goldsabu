"use client";

import { useEffect, useRef, useState } from "react";
import {
  loadTossPayments,
  ANONYMOUS,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import type { Tier } from "@/lib/tiers";
import styles from "./checkout.module.css";

const CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ??
  "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

function generateOrderId() {
  return `GSB${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
}

export default function CheckoutClient({ tier }: { tier: Tier }) {
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const tossPayments = await loadTossPayments(CLIENT_KEY);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      if (cancelled) return;
      widgetsRef.current = widgets;

      await widgets.setAmount({ currency: "KRW", value: tier.price });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#toss-payment-methods",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#toss-agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      if (!cancelled) setReady(true);
    }

    init().catch((err) => {
      console.error(err);
      if (!cancelled) setError("결제 위젯을 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.");
    });

    return () => {
      cancelled = true;
    };
  }, [tier.price]);

  async function handlePay() {
    if (!widgetsRef.current) return;
    setSubmitting(true);
    setError(null);
    try {
      const orderId = generateOrderId();

      const createRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, tierId: tier.id }),
      });
      if (!createRes.ok) {
        throw new Error("주문 생성 실패");
      }

      sessionStorage.setItem(
        "gsb_pending_order",
        JSON.stringify({ orderId, tierId: tier.id, tierName: tier.name, amount: tier.price })
      );

      await widgetsRef.current.requestPayment({
        orderId,
        orderName: `황금돈사부 인생사주리포트 · ${tier.name}`,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (err) {
      console.error(err);
      setError("결제 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.summary}>
        <span className={styles.summaryTier}>{tier.tierLabel}</span>
        <h1 className={styles.summaryTitle}>인생사주리포트 · {tier.name}</h1>
        <span className={styles.summaryPrice}>{tier.price.toLocaleString("ko-KR")}원</span>
      </div>

      <div id="toss-payment-methods" className={styles.widgetArea} />
      <div id="toss-agreement" className={styles.widgetArea} />

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.payBtn}
        onClick={handlePay}
        disabled={!ready || submitting}
      >
        {submitting ? "결제 진행 중..." : `${tier.price.toLocaleString("ko-KR")}원 결제하기`}
      </button>

      <p className={styles.notice}>
        테스트 환경입니다 — 실제 금액은 차감되지 않습니다. 결제 완료 후 리포트는 이메일로
        발송됩니다.
      </p>
    </div>
  );
}
