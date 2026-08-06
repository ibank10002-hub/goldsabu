import Link from "next/link";
import styles from "../checkout/checkout.module.css";
import resultStyles from "../checkout/success/success.module.css";

export default function FreePage() {
  return (
    <div className={styles.wrap}>
      <div className={resultStyles.box}>
        <div className={`${resultStyles.icon} ${resultStyles.iconGood}`}>✓</div>
        <p className={resultStyles.title}>무료 원국 요약 신청 접수</p>
        <p className={resultStyles.body}>
          생년월일시 입력 폼은 준비 중입니다.
          <br />
          곧 이메일로 사주 원국 요약을 받아보실 수 있습니다.
        </p>
        <Link href="/" className={resultStyles.homeBtn}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
