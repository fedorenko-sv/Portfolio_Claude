import { catalogFor } from "@/content/catalog";
import MiniProjects from "@/components/miniapp/MiniProjects";
export const metadata = { title: "Проекты в работе" };
export default function Page() {
  return <MiniProjects items={catalogFor().cases} />;
}
