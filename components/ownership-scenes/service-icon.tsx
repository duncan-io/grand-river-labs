export function ServiceIcon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
    className: "fwd-services__icon-svg",
  };

  switch (label) {
    case "Guide":
      return (
        <svg {...common}>
          <path
            d="M12 36V14c0-1.1.9-2 2-2h14l8 8v16c0 1.1-.9 2-2 2H14c-1.1 0-2-.9-2-2Z"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M28 12v8h8M18 24h12M18 30h8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Ship":
      return (
        <svg {...common}>
          <path
            d="M14 30h20l4 6H10l4-6Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M18 30V18l6-6 6 6v12"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M24 20v6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Build":
      return (
        <svg {...common}>
          <rect
            x="10"
            y="14"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <rect
            x="26"
            y="22"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M22 20h4M32 22V18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Own":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M24 18v8M24 30.5v.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Grow":
      return (
        <svg {...common}>
          <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M28.5 28.5 36 36"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Route":
      return (
        <svg {...common}>
          <rect
            x="16"
            y="8"
            width="16"
            height="32"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M21 12h6M22 33h4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Rank":
      return (
        <svg {...common}>
          <path
            d="M24 8 34 12v9.5c0 6.2-4.2 10.6-10 14.5-5.8-3.9-10-8.3-10-14.5V12L24 8Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="m18.5 23 3.5 3.5 7.5-8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Advise":
      return (
        <svg {...common}>
          <path
            d="M14 8.5 32 20.5l-7.2 1.6 4.4 8.2-3.6 1.9-4.5-8.2-6.1 5.4V8.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Target":
      return (
        <svg {...common}>
          <path
            d="M24 42s11-9.2 11-17.2A11 11 0 1 0 13 24.8C13 32.8 24 42 24 42Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "Site":
      return (
        <svg {...common}>
          <rect
            x="15"
            y="6"
            width="18"
            height="36"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <rect
            x="18"
            y="12"
            width="12"
            height="8"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M18 24.5h12M18 29h8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M22 37.5h4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Convert":
      return (
        <svg {...common}>
          <path
            d="M10 12h28L30 23H18L10 12Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M18 23h12l-2.2 6.5h-7.6L18 23Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M21.2 29.5h5.6L24 37l-2.8-7.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Compound":
      return (
        <svg {...common}>
          <path
            d="M8 34 18 24l6 6 14-16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 14h10v10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M14 32V16c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v16"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M18 32h12M20 26l4-8 4 8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
