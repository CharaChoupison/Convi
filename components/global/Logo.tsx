export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="55"
      height="51"
      viewBox="0 0 55 51"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.5 50.5H32L55 29.5V20.5L32 41H21.5L0 20.5V29.5L21.5 50.5Z"
        fill="inherit"
      />
      <path
        d="M21.5001 30H32.0001L55.0001 9V0L32.0001 20.5H21.5001L6.10352e-05 0V9L21.5001 30Z"
        fill="inherit"
      />
    </svg>
  );
}
