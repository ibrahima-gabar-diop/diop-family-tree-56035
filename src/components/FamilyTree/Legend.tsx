export const Legend = () => {
  return (
    <div className="fixed bottom-4 left-4 bg-card border border-border rounded-xl shadow-lg p-4 z-40">
      <h3 className="font-semibold text-sm mb-3">Légende</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[hsl(var(--male))] to-blue-600" />
          <span className="text-xs text-muted-foreground">Homme</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[hsl(var(--female))] to-pink-600" />
          <span className="text-xs text-muted-foreground">Femme</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-0.5 bg-[hsl(var(--tree-link))] rounded-full" />
          <span className="text-xs text-muted-foreground">Parent-Enfant</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-0.5 bg-[hsl(var(--spouse-link))] rounded-full border-t-2 border-dashed border-[hsl(var(--spouse-link))]" />
          <span className="text-xs text-muted-foreground">Conjugal</span>
        </div>
      </div>
    </div>
  );
};
