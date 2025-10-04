export const Legend = () => {
  return (
    <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 bg-card/5 backdrop-blur-sm border border-border/20 rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-4 z-40 max-w-[140px] sm:max-w-none">
      <h3 className="font-semibold text-[10px] sm:text-sm mb-2 sm:mb-3">Légende</h3>
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-gradient-to-br from-[hsl(var(--male))] to-blue-600 flex-shrink-0" />
          <span className="text-[9px] sm:text-xs text-muted-foreground">Homme</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-gradient-to-br from-[hsl(var(--female))] to-pink-600 flex-shrink-0" />
          <span className="text-[9px] sm:text-xs text-muted-foreground">Femme</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 sm:w-8 h-0.5 bg-[hsl(var(--tree-link))] rounded-full flex-shrink-0" />
          <span className="text-[9px] sm:text-xs text-muted-foreground whitespace-nowrap">Parent-Enfant</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 sm:w-8 h-0.5 bg-[hsl(var(--spouse-link))] rounded-full border-t-2 border-dashed border-[hsl(var(--spouse-link))] flex-shrink-0" />
          <span className="text-[9px] sm:text-xs text-muted-foreground">Conjugal</span>
        </div>
      </div>
    </div>
  );
};
