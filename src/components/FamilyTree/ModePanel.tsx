import { ViewMode, PersonNode } from "@/lib/familyTree/types";
import { X } from "lucide-react";

interface ModePanelProps {
  mode: ViewMode;
  persons: PersonNode[];
  onApply: (person1?: PersonNode, person2?: PersonNode) => void;
  onCancel: () => void;
}

export const ModePanel = ({ mode, persons, onApply, onCancel }: ModePanelProps) => {
  if (mode === "tree") return null;

  const sortedPersons = [...persons].sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const person1Name = formData.get("person1") as string;
    const person2Name = formData.get("person2") as string;

    const person1 = persons.find((p) => p.name === person1Name);
    const person2 = person2Name ? persons.find((p) => p.name === person2Name) : undefined;

    if (mode === "path") {
      if (person1 && person2) {
        onApply(person1, person2);
      }
    } else if (person1) {
      onApply(person1, person2);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "ancestors":
        return "Ascendants de :";
      case "descendants":
        return "Descendants de :";
      case "path":
        return "Relation entre :";
      default:
        return "";
    }
  };

  return (
    <div className="fixed top-20 left-4 bg-card border border-border rounded-xl shadow-2xl p-6 z-40 max-w-sm animate-in slide-in-from-left duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{getTitle()}</h3>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-accent rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            name="person1"
            required
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">
              {mode === "path" ? "Personne 1" : "Sélectionner une personne"}
            </option>
            {sortedPersons.map((person) => (
              <option key={person.name} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {mode === "path" && (
          <div>
            <select
              name="person2"
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Personne 2</option>
              {sortedPersons.map((person) => (
                <option key={person.name} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Afficher
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};
