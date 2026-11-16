import Link from "next/link";
import type { ComponentProps } from "react";
import { BrandMark } from "./brand-mark";
import { industriesNav, standaloneNav, whatWeDoNav } from "./what-we-do-nav";

/** Internal footer link. Not prefetched: there are ~20 on every page and few are clicked. */
function FooterLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <FooterLink href="/" aria-label="Grand River Labs, home">
            <BrandMark />
          </FooterLink>
          <p>© {new Date().getFullYear()} GR Labs LLC</p>
        </div>
        <div className="site-footer__links">
          <FooterLink href="/chat">Ask us</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/work">Work</FooterLink>
          <FooterLink href="/lead-leak-audit">Lead leak audit</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/#contact">Contact</FooterLink>
          <a href="mailto:hello@grandriverlabs.io">
            hello@grandriverlabs.io
          </a>
          <a href="#top">Back to top</a>
        </div>
      </div>
      <div className="shell site-footer__groups">
        <div className="site-footer__group">
          <span className="site-footer__row-label">Services</span>
          <div className="site-footer__group-links">
            {whatWeDoNav.map((item) => (
              <FooterLink href={item.href} key={item.href}>
                {item.label}
              </FooterLink>
            ))}
            {standaloneNav.map((item) => (
              <FooterLink href={item.href} key={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/white-label">White-label</FooterLink>
          </div>
        </div>
        <div className="site-footer__group">
          <span className="site-footer__row-label">Industries</span>
          <div className="site-footer__group-links">
            {industriesNav.map((item) => (
              <FooterLink href={item.href} key={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/industries">All industries</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
