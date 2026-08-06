import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const SECRET_KEY =
  process.env.TOSS_SECRET_KEY ?? "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

export async function POST(request: Request) {
  const body = await request.json();
  const { paymentKey, orderId, amount } = body as {
    paymentKey?: string;
    orderId?: string;
    amount?: number;
  };

  if (!paymentKey || !orderId || typeof amount !== "number") {
    return NextResponse.json(
      { ok: false, message: "paymentKey, orderId, amount는 필수입니다." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // 클라이언트가 보낸 금액이 실제로 create-order에서 저장한 금액과 같은지 서버에서 대조합니다.
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("amount, status")
    .eq("order_id", orderId)
    .single();

  if (fetchError || !order) {
    return NextResponse.json(
      { ok: false, message: "주문 정보를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  if (order.amount !== amount) {
    return NextResponse.json(
      { ok: false, message: "결제 금액이 주문 금액과 일치하지 않습니다." },
      { status: 400 }
    );
  }

  if (order.status === "paid") {
    return NextResponse.json({ ok: true, alreadyConfirmed: true });
  }

  const encodedKey = Buffer.from(`${SECRET_KEY}:`).toString("base64");

  const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const data = await tossRes.json();

  if (!tossRes.ok) {
    await supabase
      .from("orders")
      .update({ status: "failed", raw_payment_response: data })
      .eq("order_id", orderId);

    return NextResponse.json(
      { ok: false, code: data.code, message: data.message },
      { status: tossRes.status }
    );
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      payment_key: paymentKey,
      raw_payment_response: data,
    })
    .eq("order_id", orderId);

  if (updateError) {
    console.error("[주문 상태 갱신 실패]", updateError);
  }

  return NextResponse.json({ ok: true, payment: data });
}
