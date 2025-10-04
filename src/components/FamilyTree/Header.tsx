import { ViewMode } from "@/lib/familyTree/types";

interface HeaderProps {
  totalMembers: number;
  totalGenerations: number;
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onReset: () => void;
  onFit: () => void;
}

export const Header = ({
  totalMembers,
  totalGenerations,
  currentMode,
  onModeChange,
  onReset,
  onFit,
}: HeaderProps) => {
  const modes: { value: ViewMode; label: string }[] = [
    { value: "tree", label: "Arbre" },
    { value: "ancestors", label: "Ascendants" },
    { value: "descendants", label: "Descendants" },
    { value: "path", label: "Relation" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50 shadow-lg">
      <div className="max-w-[1800px] mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex-1">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
              Arbre Généalogique - Famille Diop
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              {totalMembers} membres • {totalGenerations} générations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <div className="flex bg-muted rounded-lg p-0.5 sm:p-1">
              {modes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onModeChange(mode.value)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs md:text-sm font-medium transition-all ${
                    currentMode === mode.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <button
              onClick={onReset}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap"
            >
              Centrer
            </button>

            <button
              onClick={onFit}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap"
            >
              Ajuster
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
