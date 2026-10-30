import Link from "next/link";
import PhoneScene from "./PhoneScene";
import Icon from "./Icon";
import styles from "./Editorial.module.css";
export default function LiveProduct() {
  return (
    <section
      className={styles.live}
      id="live-menu"
      aria-label="Ресторанное меню в работе"
    >
      <div className={`wrap ${styles.liveGrid}`}>
        <div className={styles.liveCopy}>
          <span className={styles.liveBadge}>
            <span />
            Работающее приложение
          </span>
          <h2>
            Сайт можно <br />
            не только <br />
            рассматривать.
          </h2>
          <p>
            Откройте блюдо, полистайте меню, добавьте что-нибудь в свой выбор.
            Всё работает прямо на экране телефона.
          </p>
          <p className={styles.liveInstruction}>
            <Icon name="right" size={28} />
            Нажимайте на экран
          </p>
          <Link href="/cases/gastro" className="text-link">
            Как устроен проект
            <Icon />
          </Link>
        </div>
        <div className={styles.liveDevice}>
          <span className={styles.deviceBackdrop} aria-hidden />
          <div className="hero-device">
            <PhoneScene interactive />
          </div>
        </div>
      </div>
    </section>
  );
}
