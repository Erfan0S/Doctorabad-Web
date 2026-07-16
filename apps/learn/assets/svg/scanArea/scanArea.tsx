export const ScanArea = () => {
  return (
    <svg
      className="scan-region-highlight-svg absolute start-1/4 top-1/4 h-1/2 w-1/2 animate-scan-pulse fill-none stroke-green stroke-[4] [stroke-linecap:round] [stroke-linejoin:round]"
      viewBox="0 0 238 238"
      preserveAspectRatio="none"
    >
      <path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"></path>
    </svg>
  );
};
