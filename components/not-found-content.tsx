import { BookCallLink } from "./book-call-link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/fractional-digital-department", label: "Fractional Digital Department" },
] as const;

export function NotFoundContent() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section not-found">
          <div className="shell not-found__content">
            <p className="eyebrow">404</p>
            <h1 className="section-heading">That page isn&apos;t here.</h1>
            <p className="section-copy">
              The link may be out of date, or the page may have moved. Try one
              of these instead.
            </p>
            <ul className="not-found__links">
              {links.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <BookCallLink>Book a call</BookCallLink>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
