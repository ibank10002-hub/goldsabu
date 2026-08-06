import SuccessClient from "./SuccessClient";

export default async function SuccessPage(props: PageProps<"/checkout/success">) {
  const params = await props.searchParams;
  const orderId = typeof params.orderId === "string" ? params.orderId : "";
  const paymentKey = typeof params.paymentKey === "string" ? params.paymentKey : "";
  const amount = typeof params.amount === "string" ? Number(params.amount) : 0;

  return <SuccessClient orderId={orderId} paymentKey={paymentKey} amount={amount} />;
}
