"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../checkout.module.css";
import resultStyles from "./success.module.css";

type ConfirmState = "checking" | "success" | "error";

export default function SuccessClient({
  orderId,
  paymentKey,
  amount,
}: {
  orderId: string;
  paymentKey: string;
  amount: number;
}) {
  const paramsValid = Boolean(orderId && paymentKey && amount);
  const [state, setState] = useState<ConfirmState>(
    paramsValid ? "checking" : "error"
  );
  const [message, setMessage] = useState(
    paramsValid ? "" : "결제 정보가 올바르지 않습니다."
  );

  useEffect(() => {
    if (!paramsValid) return;

    let cancelled = false;

    async function confirmPayment() {
      const pendingRaw = sessionStorage.getItem("gsb_pending_order");
      if (pendingRaw) {
        const pending = JSON.parse(pendingRaw);
        if (pending.orderId === orderId && pending.amount !== amount) {
          if (!cancelled) {
            setState("error");
            setMessage("결제 금액이 일치하지 않습니다. 고객센터로 문의해주세요.");
          }
          return;
        }
      }

      try {
        const res = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });
        const data = await res.json();
        if (cancelled) return;

        if (data.ok) {
          setState("success");
          sessionStorage.removeItem("gsb_pending_order");
        } else {
          setState("error");
          setMessage(data.message ?? "결제 승인에 실패했습니다.");
        }
      } catch {
        if (!cancelled) {
          setState("error");
          setMessage("서버와 통신 중 문제가 발생했습니다.");
        }
      }
    }

    confirmPayment();

    return () => {
      cancelled = true;
    };
  }, [paramsValid, orderId, paymentKey, amount]);

  return (
    <div className={styles.wrap}>
      {state === "checking" && (
        <div className={resultStyles.box}>
          <div className={resultStyles.spinner} />
          <p className={resultStyles.title}>결제를 확인하고 있습니다</p>
          <p className={resultStyles.body}>잠시만 기다려주세요.</p>
        </div>
      )}

      {state === "success" && (
        <div className={resultStyles.box}>
          <div className={`${resultStyles.icon} ${resultStyles.iconGood}`}>✓</div>
          <p className={resultStyles.title}>결제가 완료되었습니다</p>
          <p className={resultStyles.body}>
            주문번호 <b>{orderId}</b> · {amount.toLocaleString("ko-KR")}원
            <br />
            리포트는 영업일 기준 1~2일 내 이메일로 발송됩니다.
          </p>
          <Link href="/" className={resultStyles.homeBtn}>
            홈으로 돌아가기
          </Link>
        </div>
      )}

      {state === "error" && (
        <div className={resultStyles.box}>
          <div className={`${resultStyles.icon} ${resultStyles.iconBad}`}>!</div>
          <p className={resultStyles.title}>결제 확인에 실패했습니다</p>
          <p className={resultStyles.body}>{message}</p>
          <Link href="/" className={resultStyles.homeBtn}>
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
