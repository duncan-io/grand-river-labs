import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** Standard page frame: site header, the page's sections inside <main>, site footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div id="top">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
