import Link from "next/link";

export function ReturnLink({
  href = "/",
  label = "return",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link className="return-link" href={href}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 4v7a4 4 0 0 1-4 4H4" />
        <path d="m9 10-5 5 5 5" />
      </svg>
      {label}
    </Link>
  );
}
