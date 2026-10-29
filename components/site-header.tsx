"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { BookCallLink } from "./book-call-link";
import {
  fractionalDepartmentNav,
  fractionalDepartmentServices,
  industriesNav,
} from "./what-we-do-nav";

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

const ChevronRight = () => (
  <svg
    aria-hidden="true"
    className="nav-flyout__chevron"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M4.25 2.5 7.75 6l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function IndustriesMoreNote() {
  return (
    <p className="nav-industries-more">
      <span className="nav-group__label">And more</span>
      <span className="nav-group__desc">
        We work with any business. We specialize in lead-based companies.
      </span>
    </p>
  );
}

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
        <Image
          src="/brand-mark.png"
          alt="Grand River Labs logo"
          width={76}
          height={76}
        />
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
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [whatWeDoDismissed, setWhatWeDoDismissed] = useState(false);
  const panelId = useId();
  const whatWeDoId = useId();
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const whatWeDoOpenedAt = useRef(0);
  const whatWeDoExpanded = whatWeDoOpen && !whatWeDoDismissed;

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

  useEffect(() => {
    if (!whatWeDoExpanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWhatWeDoOpen(false);
        setWhatWeDoDismissed(true);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!whatWeDoRef.current?.contains(event.target as Node)) {
        setWhatWeDoOpen(false);
        setWhatWeDoDismissed(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [whatWeDoExpanded]);

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
          <div
            className={[
              "site-nav__item",
              whatWeDoExpanded ? "site-nav__item--open" : "",
              whatWeDoDismissed ? "site-nav__item--dismissed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            ref={whatWeDoRef}
            onMouseEnter={() => {
              whatWeDoOpenedAt.current = Date.now();
              setWhatWeDoDismissed(false);
              setWhatWeDoOpen(true);
            }}
            onMouseLeave={() => {
              setWhatWeDoOpen(false);
              setWhatWeDoDismissed(false);
            }}
            onBlur={(event) => {
              if (!whatWeDoRef.current?.contains(event.relatedTarget as Node)) {
                setWhatWeDoOpen(false);
                setWhatWeDoDismissed(false);
              }
            }}
          >
            <button
              type="button"
              className="site-nav__trigger"
              aria-expanded={whatWeDoExpanded}
              aria-controls={whatWeDoId}
              onClick={() => {
                if (Date.now() - whatWeDoOpenedAt.current < 400) return;

                if (whatWeDoExpanded) {
                  setWhatWeDoOpen(false);
                  setWhatWeDoDismissed(true);
                  return;
                }

                setWhatWeDoDismissed(false);
                setWhatWeDoOpen(true);
              }}
            >
              What we do
              <Chevron />
            </button>
            <div className="site-nav__dropdown" id={whatWeDoId}>
              <div className="nav-group">
                <a className="nav-group__parent" href={fractionalDepartmentNav.href}>
                  <span className="nav-group__label">{fractionalDepartmentNav.label}</span>
                  <span className="nav-group__desc">{fractionalDepartmentNav.description}</span>
                </a>
                <span className="nav-group__areas-label">What the work can touch</span>
                <div
                  className="nav-group__children"
                  aria-label={`${fractionalDepartmentNav.label} areas of work`}
                >
                  {fractionalDepartmentServices.map((item) => (
                    <a href={item.href} key={item.href}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="nav-group nav-flyout">
                <button type="button" className="nav-flyout__trigger" aria-haspopup="true">
                  Industries
                  <ChevronRight />
                </button>
                <div className="nav-flyout__panel">
                  <div aria-label="Industries">
                    {industriesNav.map((item) => (
                      <a
                        className="nav-group__parent"
                        href={item.href}
                        key={item.href}
                      >
                        <span className="nav-group__label">{item.label}</span>
                        <span className="nav-group__desc">{item.description}</span>
                      </a>
                    ))}
                  </div>
                  <IndustriesMoreNote />
                </div>
              </div>
            </div>
          </div>
          <a href="/work">Work</a>
          <a href="/about">About</a>
          <BookCallLink className="button button-primary">
            Book a call
            <Arrow />
          </BookCallLink>
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
          <div className="site-nav-panel__group">
            <span className="site-nav-panel__label">What we do</span>
            <div className="site-nav-panel__industries">
              <div className="nav-group">
                <a
                  className="nav-group__parent"
                  href={fractionalDepartmentNav.href}
                  onClick={closeMenu}
                >
                  <span className="nav-group__label">{fractionalDepartmentNav.label}</span>
                  <span className="nav-group__desc">{fractionalDepartmentNav.description}</span>
                </a>
                <span className="nav-group__areas-label">What the work can touch</span>
                <div
                  className="nav-group__children"
                  aria-label={`${fractionalDepartmentNav.label} areas of work`}
                >
                  {fractionalDepartmentServices.map((item) => (
                    <a href={item.href} key={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  ))}
                </div>
                <span className="nav-group__areas-label">Industries</span>
                <div className="nav-group__children" aria-label="Industries">
                  {industriesNav.map((item) => (
                    <a href={item.href} key={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  ))}
                </div>
                <IndustriesMoreNote />
              </div>
            </div>
          </div>
          <a href="/work" onClick={closeMenu}>
            Work
          </a>
          <a href="/about" onClick={closeMenu}>
            About
          </a>
          <BookCallLink
            className="button button-primary site-nav-panel__cta"
            onClick={closeMenu}
          >
            Book a call
            <Arrow />
          </BookCallLink>
        </nav>
      </div>
    </header>
  );
}

export { Arrow };
