import Link from "next/link";
import EditorialHero from "@/components/site/EditorialHero";
import LiveProduct from "@/components/site/LiveProduct";
import Workroom from "@/components/site/Workroom";
import ProjectStage from "@/components/site/ProjectStage";
import SpeakingProof from "@/components/site/SpeakingProof";
import Icon from "@/components/site/Icon";
import styles from "@/components/site/Editorial.module.css";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <EditorialHero />
      <LiveProduct />
      <Workroom />
      <ProjectStage />
      <SpeakingProof />
      <section className={styles.closing}>
        <div className="wrap">
          <div className={styles.closingGrid}>
            <div>
              <h2>
                Давайте начнём
                <br />с вашей задачи.
              </h2>
              <p>
                Проект, обучение или выступление — расскажите, что хотите
                сделать.
              </p>
            </div>
            <Link className="button" href="/contact">
              Написать Сергею
              <Icon />
            </Link>
          </div>
          <Link className={styles.pocketLink} href="/app">
            <small>Хотите сначала попробовать сами?</small>
            <strong>
              Практика и материалы в приложении
              <Icon size={20} />
            </strong>
          </Link>
        </div>
      </section>
    </>
  );
}
