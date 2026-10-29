import { BrandMark } from "./site-header";
import { industriesNav, whatWeDoNav } from "./what-we-do-nav";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <a href="/" aria-label="Grand River Labs, home">
            <BrandMark />
          </a>
          <p>© {new Date().getFullYear()} GR Labs LLC</p>
        </div>
        <div className="site-footer__links">
          <a href="/chat">Ask us</a>
          <a href="/blog">Blog</a>
          <a href="/work">Work</a>
          <a href="/fractional-digital-team-calculator">Cost calculator</a>
          <a href="/about">About</a>
          <a href="/#contact">Contact</a>
          <a href="mailto:hello@grandriverlabs.com">
            hello@grandriverlabs.com
          </a>
          <a href="#top">Back to top</a>
        </div>
      </div>
      <div className="shell site-footer__groups">
        <div className="site-footer__group">
          <span className="site-footer__row-label">Services</span>
          <div className="site-footer__group-links">
            {whatWeDoNav.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <a href="/white-label">White-label</a>
          </div>
        </div>
        <div className="site-footer__group">
          <span className="site-footer__row-label">Industries</span>
          <div className="site-footer__group-links">
            {industriesNav.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
