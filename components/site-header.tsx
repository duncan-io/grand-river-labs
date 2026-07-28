"use client";

import { useEffect, useId, useState } from "react";
import { BOOK_CALL_HREF } from "@/lib/site";
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

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className="site-nav-toggle__icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    {open ? (
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M3.5 6.5h13M3.5 10h13M3.5 13.5h13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    )}
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

export function SiteHeader({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 901px)").matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const headerClass = [
    "site-header",
    embedded ? "site-header--embedded" : "",
    menuOpen ? "site-header--menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="shell site-header__inner">
        <a href="/" aria-label="Grand River Labs, home" onClick={closeMenu}>
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
          <a href="/white-label">White-label</a>
          <a
            className="button button-primary"
            href={BOOK_CALL_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
            <Arrow />
          </a>
        </nav>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <div
        id={panelId}
        className="site-nav-panel"
        hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <nav className="site-nav-panel__nav" aria-label="Mobile navigation">
          <a href="/what-we-do" onClick={closeMenu}>
            What we do
          </a>
          <div className="site-nav-panel__group">
            <a href="/use-cases" onClick={closeMenu}>
              Use cases
            </a>
            <div className="site-nav-panel__industries" role="list">
              {industries.map((item) => (
                <a
                  href={`/use-cases/${item.slug}`}
                  key={item.slug}
                  role="listitem"
                  onClick={closeMenu}
                >
                  {item.industry}
                </a>
              ))}
            </div>
          </div>
          <a href="/white-label" onClick={closeMenu}>
            White-label
          </a>
          <a
            className="button button-primary site-nav-panel__cta"
            href={BOOK_CALL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
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
