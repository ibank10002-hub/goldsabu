import Link from "next/link";
import styles from "../checkout.module.css";
import resultStyles from "../success/success.module.css";

export default async function FailPage(props: PageProps<"/checkout/fail">) {
  const params = await props.searchParams;
  const message =
    typeof params.message === "string" ? params.message : "결제가 취소되었습니다.";

  return (
    <div className={styles.wrap}>
      <div className={resultStyles.box}>
        <div className={`${resultStyles.icon} ${resultStyles.iconBad}`}>!</div>
        <p className={resultStyles.title}>결제가 완료되지 않았습니다</p>
        <p className={resultStyles.body}>{message}</p>
        <Link href="/" className={resultStyles.homeBtn}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
