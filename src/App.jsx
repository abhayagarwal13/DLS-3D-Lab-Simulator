import { useMemo, useState } from 'react';
import LabScene from './components/LabScene.jsx';
import StudentHUD from './components/StudentHUD.jsx';
import LabReport from './components/LabReport.jsx';
import HomePage from './components/HomePage.jsx';
import './App.css';

const objects = {
  aluminum: { label: 'Aluminum Cylinder', mass: 54, volume: 20, color: '#b9c6d6' },
  acrylic: { label: 'Acrylic Block', mass: 36, volume: 30, color: '#89d7ff' },
  brass: { label: 'Brass Cube', mass: 85, volume: 10, color: '#d7a64a' },
};

const labCatalog = [
  {
    id: 'density-lab',
    title: 'Density Lab',
    topic: 'Water',
    description: 'Measure mass, water displacement, and density in the 3D virtual lab.',
    status: 'Playable MVP',
    playable: true,
  },
  {
    id: 'vinegar-volcano',
    title: 'Vinegar Volcano',
    topic: 'Matter & Interactions',
    description: 'Observe what happens when acids and bases react.',
    status: 'Lab module',
    kind: 'volcano',
    objective: 'Mix vinegar and baking soda to model an acid-base reaction.',
    steps: ['Add baking soda', 'Pour vinegar', 'Observe foam and gas', 'Explain acid-base reaction'],
  },
  {
    id: 'make-rainbow',
    title: 'Make a Rainbow',
    topic: 'Sunlight & Weather',
    description: 'Explore how rainbows form with light and water.',
    status: 'Lab module',
    kind: 'rainbow',
    objective: 'Model how light bends and separates into colors.',
    steps: ['Aim light', 'Add water/prism', 'Observe color bands', 'Explain refraction'],
  },
  {
    id: 'balloon-rocket',
    title: 'Balloon Rocket',
    topic: 'Motion',
    description: 'Investigate how rockets move using air thrust.',
    status: 'Lab module',
    kind: 'rocket',
    objective: 'Use escaping air to show action and reaction forces.',
    steps: ['Inflate balloon', 'Attach to string', 'Release air', 'Explain thrust'],
  },
  {
    id: 'melting-chocolate',
    title: 'Melting Chocolate Race',
    topic: 'Heat',
    description: 'Test which material conducts heat best.',
    status: 'Lab module',
    kind: 'chocolate',
    objective: 'Compare heat conduction across different materials.',
    steps: ['Place chocolate pieces', 'Heat materials', 'Compare melting speed', 'Identify best conductor'],
  },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [activeLabId, setActiveLabId] = useState('density-lab');
  const [selectedObject, setSelectedObject] = useState('aluminum');
  const [weighed, setWeighed] = useState(false);
  const [submerged, setSubmerged] = useState(false);
  const [teacherVisible, setTeacherVisible] = useState(true);
  const [hintCount, setHintCount] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [draggingSample, setDraggingSample] = useState(false);
  const [samplePlacement, setSamplePlacement] = useState('tray');
  const [moduleStep, setModuleStep] = useState(0);

  const sample = objects[selectedObject];
  const activeLab = labCatalog.find((lab) => lab.id === activeLabId) ?? labCatalog[0];
  const density = weighed && submerged ? sample.mass / sample.volume : null;
  const score = useMemo(() => {
    let value = 15;
    if (selectedObject) value += 20;
    if (weighed) value += 25;
    if (submerged) value += 25;
    if (density) value += 15;
    return Math.min(value, 100);
  }, [density, selectedObject, submerged, weighed]);

  const resetLab = () => {
    setWeighed(false);
    setSubmerged(false);
    setSamplePlacement('tray');
    setHintCount(0);
    setTeacherVisible(true);
    setReportOpen(false);
    setModuleStep(0);
  };

  const chooseObject = (id) => {
    setSelectedObject((currentId) => {
      if (currentId !== id) {
        setWeighed(false);
        setSubmerged(false);
        setSamplePlacement('tray');
        setReportOpen(false);
      }
      return id;
    });
  };

  const state = {
    objects,
    sample,
    selectedObject,
    weighed,
    submerged,
    teacherVisible,
    hintCount,
    draggingSample,
    samplePlacement,
    moduleStep,
    density,
    score,
    activeLab,
  };

  const actions = {
    setSelectedObject: chooseObject,
    setWeighed,
    setSubmerged,
    setTeacherVisible,
    setHintCount,
    setReportOpen,
    setDraggingSample,
    setSamplePlacement,
    setModuleStep,
    advanceModuleStep: () => setModuleStep((step) => Math.min(step + 1, (activeLab.steps?.length ?? 1))),
    resetLab,
  };

  const openLab = (labId) => {
    setActiveLabId(labId);
    setModuleStep(0);
    setHintCount(0);
    setTeacherVisible(true);
    setReportOpen(false);
    setScreen('lab');
  };

  if (screen === 'home') {
    return (
      <main className="app-shell home-shell">
        <HomePage labs={labCatalog} onOpenLab={openLab} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <LabScene state={state} actions={actions} activeLab={activeLab} />
      <StudentHUD state={state} actions={actions} activeLab={activeLab} onExit={() => setScreen('home')} />
      <div className={teacherVisible ? 'dls-labs-badge guide-open' : 'dls-labs-badge'}>DLS LABS</div>
      {reportOpen && <LabReport state={state} actions={actions} />}
    </main>
  );
}
