import Image from "next/image";

/** Logo mark plus the "Grand River Labs" wordmark, as shown in the header and footer. */
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
