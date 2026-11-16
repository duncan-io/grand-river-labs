/** A point in an SVG scene's viewBox coordinates. */
export type Point = { cx: number; cy: number };

/** Path data for a quadratic curve from one point to another, bowed by `bend` units. */
export function curveTo(from: Point, to: Point, bend: number) {
  const midX = (from.cx + to.cx) / 2 + bend;
  const midY = (from.cy + to.cy) / 2 - bend * 0.4;
  return `M${from.cx} ${from.cy} Q${midX} ${midY} ${to.cx} ${to.cy}`;
}
