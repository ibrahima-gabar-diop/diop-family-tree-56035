import { useState, useEffect, useCallback } from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { PersonInfoPanel } from "./PersonInfoPanel";
import { Legend } from "./Legend";
import { ModePanel } from "./ModePanel";
import { FamilyTreeCanvas } from "./FamilyTreeCanvas";
import { Dedication } from "./Dedication";
import { FamilyTreeEngine } from "@/lib/familyTree/FamilyTreeEngine";
import { familyData } from "@/lib/familyTree/data";
import { ViewMode, PersonNode, TreeDimensions } from "@/lib/familyTree/types";

const getResponsiveDimensions = (): TreeDimensions => {
  const width = window.innerWidth;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;
  
  return {
    width: window.innerWidth,
    height: window.innerHeight - 80,
    nodeWidth: isMobile ? 160 : isTablet ? 200 : isDesktop ? 240 : 260,
    nodeHeight: isMobile ? 120 : isTablet ? 140 : isDesktop ? 150 : 160,
    levelHeight: isMobile ? 200 : isTablet ? 240 : isDesktop ? 280 : 300,
    coupleSpacing: isMobile ? 20 : isTablet ? 40 : isDesktop ? 50 : 60,
    siblingSpacing: isMobile ? 60 : isTablet ? 100 : isDesktop ? 140 : 160,
  };
};

const DIMENSIONS = getResponsiveDimensions();

export const FamilyTreeViewer = () => {
  const [engine] = useState(() => new FamilyTreeEngine(familyData, DIMENSIONS));
  const [currentMode, setCurrentMode] = useState<ViewMode>("tree");
  const [selectedPerson, setSelectedPerson] = useState<PersonNode | null>(null);
  const [selectedPerson2, setSelectedPerson2] = useState<PersonNode | null>(null);
  const [visiblePersons, setVisiblePersons] = useState<PersonNode[]>([]);
  const [allPersons, setAllPersons] = useState<PersonNode[]>([]);
  const [dimensions, setDimensions] = useState(DIMENSIONS);

  // Initialize
  useEffect(() => {
    engine.initializeExpanded(3);
    updateTree();
    setAllPersons(engine.getAllPersons());

    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateTree = useCallback(() => {
    engine.updateVisibility(currentMode, selectedPerson || undefined, selectedPerson2 || undefined);
    engine.calculatePositions();
    setVisiblePersons([...engine.getVisiblePersons()]);
  }, [engine, currentMode, selectedPerson, selectedPerson2]);

  useEffect(() => {
    updateTree();
  }, [updateTree]);

  const handleModeChange = (mode: ViewMode) => {
    setCurrentMode(mode);
    if (mode === "tree") {
      setSelectedPerson(null);
      setSelectedPerson2(null);
    }
  };

  const handleNodeClick = (person: PersonNode) => {
    if (person.enfants.length > 0) {
      engine.toggleExpand(person);
      updateTree();
    }
    setSelectedPerson(person);
  };

  const handleSearchSelect = (person: PersonNode) => {
    engine.expandToRoot(person);
    updateTree();
    setSelectedPerson(person);
    
    // Focus on person
    setTimeout(() => {
      if ((window as any).__treeFit) {
        const scale = 0.8;
        const translateX = dimensions.width / 2 - person.x * scale;
        const translateY = dimensions.height / 2 - person.y * scale;
        // Would need to expose zoom transform - simplified for now
        (window as any).__treeFit();
      }
    }, 100);
  };

  const handleToggleExpand = (person: PersonNode) => {
    engine.toggleExpand(person);
    updateTree();
    setSelectedPerson(person);
  };

  const handleModeApply = (person1?: PersonNode, person2?: PersonNode) => {
    if (person1) {
      setSelectedPerson(person1);
      setSelectedPerson2(person2 || null);
    }
  };

  const handleModeCancel = () => {
    setCurrentMode("tree");
    setSelectedPerson(null);
    setSelectedPerson2(null);
  };

  const handleReset = () => {
    if ((window as any).__treeReset) {
      (window as any).__treeReset();
    }
  };

  const handleFit = () => {
    if ((window as any).__treeFit) {
      (window as any).__treeFit();
    }
  };

  const generations = new Set(visiblePersons.map((p) => p.level)).size;

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <Header
        totalMembers={visiblePersons.length}
        totalGenerations={generations}
        currentMode={currentMode}
        onModeChange={handleModeChange}
        onReset={handleReset}
        onFit={handleFit}
      />

      <Dedication />

      <div className="fixed top-20 left-0 right-0 px-4 sm:px-6 z-30 pointer-events-none">
        <div className="max-w-[1800px] mx-auto pointer-events-auto">
          <SearchBar persons={allPersons} onSelectPerson={handleSearchSelect} />
        </div>
      </div>

      <div className="w-full h-[calc(100vh-5rem)] mt-20">
        <FamilyTreeCanvas
          persons={visiblePersons}
          links={engine.getLinks()}
          dimensions={dimensions}
          selectedPerson={selectedPerson}
          onNodeClick={handleNodeClick}
          onReset={handleReset}
          onFitToScreen={handleFit}
        />
      </div>

      <PersonInfoPanel
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onToggleExpand={handleToggleExpand}
      />

      <ModePanel
        mode={currentMode}
        persons={allPersons}
        onApply={handleModeApply}
        onCancel={handleModeCancel}
      />

      <Legend />
    </div>
  );
};
