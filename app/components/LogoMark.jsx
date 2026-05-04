export default function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
      <svg
        viewBox="0 0 64 64"
        className="h-11 w-11 sm:h-12 sm:w-12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M14 26h34l-5 17H21L14 26Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-zinc-950" />
        <path d="M48 29l9-7M17 43l-8 8M41 43l9 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-zinc-950" />
        <circle cx="27" cy="51" r="5" stroke="currentColor" strokeWidth="4" className="text-zinc-950" />
        <path d="M25 23c3-8 9-13 17-15 0 8-4 14-12 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-800" />
        <path d="M31 20c-4-5-9-7-15-7 1 7 5 11 12 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-800" />
      </svg>
    </div>
  );
}