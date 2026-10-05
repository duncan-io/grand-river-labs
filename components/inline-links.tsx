import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Renders `[anchor](/path)` markers in a string as in-body links. */
export function renderInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    out.push(
      <Link key={index} className="inline-link" href={match[2]}>
        {match[1]}
      </Link>,
    );
    last = index + match[0].length;
  }

  if (last === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return out.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}
