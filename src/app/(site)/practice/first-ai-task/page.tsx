import { Intro } from "@/components/site/Content";
import Practice from "@/components/Practice";
export const metadata = {
  title: "Выберите первую задачу для ИИ",
  alternates: { canonical: "/practice/first-ai-task" },
};
export default function Page() {
  return (
    <>
      <Intro label="Бесплатная практика" title="Выберите первую задачу для ИИ">
        <p>
          Получите карточку задачи: исходные данные, ожидаемый результат и
          способ проверки. Прогресс — только на вашем устройстве.
        </p>
      </Intro>
      <Practice />
    </>
  );
}
