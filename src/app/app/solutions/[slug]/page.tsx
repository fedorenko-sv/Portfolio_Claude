import { notFound } from "next/navigation";
import { catalogFor } from "@/content/catalog";
import { CaseDetail } from "@/components/site/Content";
export const dynamicParams = false;
export function generateStaticParams() {
  return catalogFor().cases.map(({ slug }) => ({ slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalogFor().cases.find((x) => x.slug === slug);
  if (!item) notFound();
  return <CaseDetail item={item} />;
}
