import { Intro } from "@/components/site/Content";
import Practice from "@/components/Practice";
export default function Page() {
  return (
    <>
      <Intro
        label="Бесплатная практика"
        title="Выберите первую задачу для ИИ"
      />
      <Practice app />
    </>
  );
}
