export default function Icon({ name = 'arrow', size = 16, className = '' }) {
  const paths = {
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5m6-6-6 6 6 6" />
      </>
    ),
    up: (
      <>
        <path d="M12 19V5m-6 6 6-6 6 6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    code: (
      <>
        <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" />
      </>
    ),
    book: (
      <>
        <path d="M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" />
      </>
    ),
    sprout: (
      <>
        <path d="M12 21v-9M12 15C4 15 3 10 3 5c7 0 9 3 9 7m0 0c0-6 4-9 9-9 0 6-3 9-9 9" />
      </>
    ),
    star: (
      <>
        <path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" />
      </>
    ),
    flag: (
      <>
        <path fill="#45805c" stroke="none" d="M3 5h6v14H3zm12 0h6v14h-6z" />
        <path fill="#fff" stroke="none" d="M9 5h6v14H9z" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      className={`inline-block shrink-0 align-middle ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
