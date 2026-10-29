import type { ReactNode } from "react";
import { BOOK_CALL_HREF } from "@/lib/site";

export function BookCallLink({
  className,
  children,
  onClick,
  href = BOOK_CALL_HREF,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
