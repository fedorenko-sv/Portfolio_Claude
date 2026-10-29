import AppHome from "@/components/miniapp/AppHome";
import { miniappLibrary } from "@/content/miniapp";
export default function Page() {
  return <AppHome ids={miniappLibrary().map((e) => e.id)} />;
}
