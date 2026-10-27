import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  ArrowsOut,
  ArrowsIn,
  ArrowClockwise,
  List,
} from "@phosphor-icons/react/dist/ssr";

const icons = {
  down: ArrowDown,
  right: ArrowRight,
  arrow: ArrowUpRight,
  check: Check,
  close: X,
  expand: ArrowsOut,
  collapse: ArrowsIn,
  retry: ArrowClockwise,
  menu: List,
};
export default function Icon({
  name = "arrow",
  size = 22,
}: {
  name?: keyof typeof icons;
  size?: number;
}) {
  const Component = icons[name];
  return (
    <Component
      size={size}
      weight="regular"
      aria-hidden="true"
      className="ui-icon"
    />
  );
}
