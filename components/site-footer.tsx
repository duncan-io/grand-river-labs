import { BrandMark } from "./site-header";
import { industries } from "./industries";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <a href="/" aria-label="Grand River Labs, home">
          <BrandMark />
        </a>
        <p>© {new Date().getFullYear()} Grand River Labs</p>
        <div className="site-footer__links">
          <a href="/what-we-do">What we do</a>
          <a href="/whitelabel">White-label</a>
          <a href="/chat">Ask us</a>
          <a href="/#contact">Contact</a>
          <a href="mailto:hello@grandriverlabs.com">
            hello@grandriverlabs.com
          </a>
          <a href="#top">Back to top</a>
        </div>
      </div>
      <div className="shell site-footer__industries">
        <span className="site-footer__industries-label">Industries</span>
        {industries.map((item) => (
          <a href={`/use-cases/${item.slug}`} key={item.slug}>
            {item.industry}
          </a>
        ))}
      </div>
    </footer>
  );
}
