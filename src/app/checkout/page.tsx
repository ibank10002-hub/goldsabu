import { redirect } from "next/navigation";
import { getTier } from "@/lib/tiers";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const params = await props.searchParams;
  const tierId = typeof params.tier === "string" ? params.tier : "pro";
  const tier = getTier(tierId);

  if (!tier || tier.price === 0) {
    redirect("/");
  }

  return <CheckoutClient tier={tier} />;
}
