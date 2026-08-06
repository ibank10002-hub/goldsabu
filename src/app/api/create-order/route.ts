import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getTier } from "@/lib/tiers";

export async function POST(request: Request) {
  const body = await request.json();
  const { orderId, tierId } = body as { orderId?: string; tierId?: string };

  if (!orderId || !tierId) {
    return NextResponse.json(
      { ok: false, message: "orderId, tierId는 필수입니다." },
      { status: 400 }
    );
  }

  const tier = getTier(tierId);
  if (!tier || tier.price === 0) {
    return NextResponse.json(
      { ok: false, message: "유효하지 않은 등급입니다." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("orders").insert({
    order_id: orderId,
    tier_id: tier.id,
    tier_name: tier.name,
    amount: tier.price,
    status: "pending",
  });

  if (error) {
    console.error("[주문 생성 실패]", error);
    return NextResponse.json(
      { ok: false, message: "주문 생성에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
