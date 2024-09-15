export function Footer() {
  return (
    <footer className="mt-12 py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="select-none text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            SROOMY Team
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
