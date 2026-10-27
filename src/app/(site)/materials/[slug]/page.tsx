import { notFound } from "next/navigation";
import { catalogFor } from "@/content/catalog";
import { MaterialDetail } from "@/components/site/Content";
export const dynamicParams = false;
export function generateStaticParams() {
  return catalogFor().materials.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalogFor().materials.find((x) => x.slug === slug);
  return {
    title: item?.title,
    description: item?.summary,
    alternates: { canonical: `/materials/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalogFor().materials.find((x) => x.slug === slug);
  if (!item) notFound();
  return <MaterialDetail item={item} />;
}
