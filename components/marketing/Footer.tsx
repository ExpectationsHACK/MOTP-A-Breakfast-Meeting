export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <p className="font-display font-bold text-ink">
          MEN OUGHT <span className="text-ember">TO PRAY</span>
        </p>
        <p className="text-sm text-ink-muted">
          A Breakfast Meeting for Every Man Who Needs Strength &middot; Saturday, September 19, 2026
        </p>
        <p className="font-display italic text-sm text-ink-faint">
          &ldquo;Men ought always to pray, and not to faint.&rdquo; (Luke 18:1)
        </p>
        <div className="mt-4 flex items-center gap-6 text-xs text-ink-faint">
          <span>&copy; {new Date().getFullYear()} Men Ought to Pray</span>
          <a href="/admin/login" className="hover:text-ink-muted transition-colors">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
