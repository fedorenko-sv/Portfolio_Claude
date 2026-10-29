import Library from "@/components/miniapp/Library";
import { miniappLibrary } from "@/content/miniapp";
import { Intro } from "@/components/site/Content";
export const metadata = { title: "Библиотека практики" };
export default function Page() {
  return (
    <>
      <Intro label="Сохраните то, что пригодится" title="Под рукой." />
      <Library entries={miniappLibrary()} />
    </>
  );
}
