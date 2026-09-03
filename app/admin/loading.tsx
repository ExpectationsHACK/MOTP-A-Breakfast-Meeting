export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="motp-spinner absolute inset-0 rounded-full border-4 border-line-strong border-t-ember" />
        <span className="font-display text-lg font-bold text-ember">M</span>
      </div>
      <p className="eyebrow">MOTP is loading&hellip;</p>
    </div>
  );
}
