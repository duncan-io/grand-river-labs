import { industries } from "./industries";

const Arrow = () => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Chevron = () => (
  <svg
    aria-hidden="true"
    className="site-nav__chevron"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M2.5 4.25 6 7.75l3.5-3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function BrandMark() {
  return (
    <span className="wordmark">
      <span className="wordmark__mark" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M2.5 6.5c2.8-2.8 5.2-2.8 7.2 0s3.9 2.8 5.8 0M2.5 11.5c2.8-2.8 5.2-2.8 7.2 0s3.9 2.8 5.8 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      Grand River Labs
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a href="/" aria-label="Grand River Labs, home">
          <BrandMark />
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="/what-we-do">What we do</a>
          <div className="site-nav__item">
            <a className="site-nav__trigger" href="/use-cases">
              Use cases
              <Chevron />
            </a>
            <div className="site-nav__dropdown" role="list">
              {industries.map((item) => (
                <a
                  href={`/use-cases/${item.slug}`}
                  key={item.slug}
                  role="listitem"
                >
                  {item.industry}
                </a>
              ))}
            </div>
          </div>
          <a href="/whitelabel">White-label</a>
          <a
            className="button button-primary"
            href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
          >
            Book a call
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}

export { Arrow };
