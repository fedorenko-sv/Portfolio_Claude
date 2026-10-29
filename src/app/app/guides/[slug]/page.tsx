import Link from "next/link";
import { notFound } from "next/navigation";
import { pocketGuides } from "@/content/pocket-guides";
import CopyBlock from "@/components/miniapp/CopyBlock";
import Icon from "@/components/site/Icon";
import s from "@/components/miniapp/Pocket.module.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return pocketGuides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: pocketGuides.find((g) => g.slug === slug)?.title || "Материал",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = pocketGuides.find((g) => g.slug === slug);
  if (!guide) notFound();
  return (
    <article className={s.guide}>
      <div className={s.guideCover}>
        <p>
          {guide.category}
          <span>{guide.time}</span>
        </p>
        <h1>{guide.title}</h1>
        <div className={s.coverLines} aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <span>Рабочая памятка</span>
      </div>
      <p className={s.guideIntro}>{guide.intro}</p>
      {guide.sections.map((section) => (
        <section className={s.guideSection} key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      <section className={s.checklist}>
        <h2>Перед первым шагом</h2>
        {guide.checklist.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </section>
      <h2 className={s.sectionTitle}>Возьмите заготовку с собой</h2>
      <CopyBlock text={guide.template} />
      <Link className={s.inlineLink} href={guide.next.href}>
        {guide.next.label}
        <Icon />
      </Link>
      <Link className={s.backLibrary} href="/app/library">
        ← Все материалы
      </Link>
    </article>
  );
}
