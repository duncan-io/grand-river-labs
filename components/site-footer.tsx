import { BrandMark } from "./site-header";
import { industries } from "./industries";
import { whatWeDoNav } from "./what-we-do-nav";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <a href="/" aria-label="Grand River Labs, home">
            <BrandMark />
          </a>
          <p>© {new Date().getFullYear()} Grand River Labs</p>
        </div>
        <div className="site-footer__links">
          <a href="/chat">Ask us</a>
          <a href="/#contact">Contact</a>
          <a href="mailto:hello@grandriverlabs.com">
            hello@grandriverlabs.com
          </a>
          <a href="#top">Back to top</a>
        </div>
      </div>
      <div className="shell site-footer__row">
        <span className="site-footer__row-label">Services</span>
        {whatWeDoNav.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a href="/white-label">White-label</a>
      </div>
      <div className="shell site-footer__row">
        <span className="site-footer__row-label">Industries</span>
        {industries.map((item) => (
          <a href={`/use-cases/${item.slug}`} key={item.slug}>
            {item.industry}
          </a>
        ))}
      </div>
    </footer>
  );
}
