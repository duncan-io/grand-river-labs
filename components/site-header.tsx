"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { BookCallLink } from "./book-call-link";
import {
  directorAreas,
  directorNav,
  standaloneNav,
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

/**
 * A hover/click dropdown in the desktop nav. Hover opens it; a click right
 * after hover-open is ignored so it doesn't immediately close again.
 */
function NavDropdown({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const expanded = open && !dismissed;

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDismissed(true);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
        setDismissed(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [expanded]);

  return (
    <div
      className={[
        "site-nav__item",
        expanded ? "site-nav__item--open" : "",
        dismissed ? "site-nav__item--dismissed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      onMouseEnter={() => {
        openedAt.current = Date.now();
        setDismissed(false);
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
        setDismissed(false);
      }}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
          setDismissed(false);
        }
      }}
    >
      <button
        type="button"
        className="site-nav__trigger"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => {
          if (Date.now() - openedAt.current < 400) return;

          if (expanded) {
            setOpen(false);
            setDismissed(true);
            return;
          }

          setDismissed(false);
          setOpen(true);
        }}
      >
        {label}
        <Chevron />
      </button>
      <div
        className={["site-nav__dropdown", className].filter(Boolean).join(" ")}
        id={id}
      >
        {children}
      </div>
    </div>
  );
}

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
          <NavDropdown label="Services" className="site-nav__dropdown--services">
            <div className="nav-group nav-group--featured">
              <a className="nav-group__parent" href={directorNav.href}>
                <span className="nav-group__label">{directorNav.label}</span>
                <span className="nav-group__desc">{directorNav.description}</span>
                <span className="nav-group__price">{directorNav.price}</span>
              </a>
              <span className="nav-group__areas-label">What the director oversees</span>
              <div
                className="nav-group__children"
                aria-label={`${directorNav.label} areas`}
              >
                {directorAreas.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="nav-group nav-group--standalone">
              <span className="nav-group__areas-label">Standalone</span>
              {standaloneNav.map((item) => (
                <a className="nav-group__parent" href={item.href} key={item.href}>
                  <span className="nav-group__label">{item.label}</span>
                  <span className="nav-group__desc">{item.summary}</span>
                  {"price" in item ? (
                    <span className="nav-group__price">{item.price}</span>
                  ) : null}
                </a>
              ))}
            </div>
          </NavDropdown>
          <a href="/industries">Industries</a>
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
            <span className="site-nav-panel__label">Services</span>
            <div className="site-nav-panel__industries">
              <div className="nav-group">
                <a
                  className="nav-group__parent"
                  href={directorNav.href}
                  onClick={closeMenu}
                >
                  <span className="nav-group__label">{directorNav.label}</span>
                  <span className="nav-group__desc">{directorNav.description}</span>
                </a>
                <span className="nav-group__areas-label">What the director oversees</span>
                <div
                  className="nav-group__children"
                  aria-label={`${directorNav.label} areas`}
                >
                  {directorAreas.map((item) => (
                    <a href={item.href} key={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="nav-group">
                <span className="nav-group__areas-label">Standalone</span>
                <div className="nav-group__children" aria-label="Standalone services">
                  {standaloneNav.map((item) => (
                    <a href={item.href} key={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <a href="/industries" onClick={closeMenu}>
            Industries
          </a>
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
