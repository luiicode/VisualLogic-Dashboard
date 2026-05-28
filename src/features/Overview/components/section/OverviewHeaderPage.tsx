export default function OverviewHeaderPage() {
  return (
    <header className="flex items-end justify-between flex-wrap gap-3">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Resumen general de todas las secciones del workspace.
        </p>
      </div>
    </header>
  );
}
