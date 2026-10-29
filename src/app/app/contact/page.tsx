import Contact from "@/components/Contact";
import { Intro } from "@/components/site/Content";
export const metadata = { title: "Обсудить задачу" };
export default function Page() {
  return (
    <>
      <Intro label="Лично Сергею" title="Начнём с вашей задачи.">
        <p>
          Подготовьте сообщение и перейдите в Telegram. Отправку подтверждаете
          вы.
        </p>
      </Intro>
      <Contact />
    </>
  );
}
