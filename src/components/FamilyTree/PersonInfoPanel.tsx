import { PersonNode } from "@/lib/familyTree/types";
import { X, Users, Heart, Baby } from "lucide-react";

interface PersonInfoPanelProps {
  person: PersonNode | null;
  onClose: () => void;
  onToggleExpand: (person: PersonNode) => void;
}

export const PersonInfoPanel = ({
  person,
  onClose,
  onToggleExpand,
}: PersonInfoPanelProps) => {
  if (!person) return null;

  const initial = person.name.charAt(0).toUpperCase();
  const avatarColor =
    person.genre === "Homme"
      ? "bg-gradient-to-br from-[hsl(var(--male))] to-blue-600"
      : "bg-gradient-to-br from-[hsl(var(--female))] to-pink-600";

  return (
    <div className="fixed top-20 right-2 sm:right-4 w-[calc(100vw-1rem)] sm:w-full max-w-sm bg-card border border-border rounded-xl shadow-2xl z-50 max-h-[calc(100vh-6rem)] overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-border">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0 ${avatarColor}`}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base sm:text-lg truncate">{person.name}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {person.genre} • Génération {person.level}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parents */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            <Users className="w-4 h-4" />
            Parents ({person.parents.length})
          </div>
          {person.parents.length > 0 ? (
            <ul className="space-y-2">
              {person.parents.map((parent) => (
                <li
                  key={parent}
                  className="px-3 py-2 bg-muted rounded-lg text-sm"
                >
                  {parent}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun</p>
          )}
        </div>

        {/* Spouses */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            <Heart className="w-4 h-4" />
            Conjoint(s) ({person.spouses.length})
          </div>
          {person.spouses.length > 0 ? (
            <ul className="space-y-2">
              {person.spouses.map((spouse) => (
                <li
                  key={spouse}
                  className="px-3 py-2 bg-muted rounded-lg text-sm"
                >
                  {spouse}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun</p>
          )}
        </div>

        {/* Children */}
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            <Baby className="w-4 h-4" />
            Enfants ({person.enfants.length})
          </div>
          {person.enfants.length > 0 ? (
            <ul className="space-y-2">
              {person.enfants.map((child) => (
                <li key={child} className="px-3 py-2 bg-muted rounded-lg text-sm">
                  {child}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun</p>
          )}
        </div>

        {/* Expand/Collapse Button */}
        {person.enfants.length > 0 && (
          <button
            onClick={() => onToggleExpand(person)}
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {person.expanded ? "Replier" : "Déplier"} les descendants
          </button>
        )}
      </div>
    </div>
  );
};
