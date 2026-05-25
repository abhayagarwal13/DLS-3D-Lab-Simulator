import { ArrowLeft, ArrowRight, Atom, ClipboardCheck, Lightbulb, Minus, RefreshCw, UserRoundPlus, X } from 'lucide-react';

export default function StudentHUD({ state, actions, activeLab, onExit }) {
  const { sample, weighed, submerged, density, score, teacherVisible, hintCount, moduleStep } = state;
  const isDensityLab = activeLab?.id === 'density-lab';
  const moduleSteps = activeLab?.steps ?? [];
  const steps = isDensityLab ? [
    { label: 'Choose a sample', done: Boolean(sample) },
    { label: 'Drag sample to digital scale', done: weighed },
    { label: 'Drag sample into water tank', done: submerged },
    { label: 'Calculate density', done: Boolean(density) },
  ] : moduleSteps.map((label, index) => ({ label, done: moduleStep > index }));
  const progress = isDensityLab ? score : Math.round((Math.min(moduleStep, moduleSteps.length) / Math.max(moduleSteps.length, 1)) * 100);
  const currentInstruction = isDensityLab
    ? 'Drag the sample to the digital scale, then drag it into the water tank.'
    : moduleStep >= moduleSteps.length
      ? 'Lab complete. Review what changed in the model and explain the result.'
      : `Next: ${moduleSteps[moduleStep]}. Use the floating action button in the 3D scene.`;
  const aiMessage = isDensityLab
    ? density
      ? `Nice. Your density is ${density.toFixed(2)} g/mL. Now compare that number to water at 1.00 g/mL.`
      : weighed
        ? 'Good. You measured mass. Now drag the same sample into the water tank to measure displaced volume.'
        : 'Start by choosing a sample, then drag it onto the digital scale so we can measure mass.'
    : moduleStep >= moduleSteps.length
      ? `Great work. Explain the result: ${activeLab?.objective}`
      : `AI Teacher: ${moduleSteps[moduleStep]} is your next step. Click the floating button in the 3D scene to do it.`;

  return (
    <section className="hud">
      <div className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark"><Atom size={19} /></span>
          <span>
            <strong>Daily Life Science</strong>
            <small>{activeLab?.topic ?? '3D Virtual Lab'}</small>
          </span>
        </div>
        <button className="home-return" type="button" onClick={onExit}>
          <ArrowLeft size={16} />
          Labs
        </button>
        <div className={teacherVisible ? 'teacher-status online' : 'teacher-status'}>
          {teacherVisible ? 'AI Teacher Online' : 'Solo Lab Mode'}
        </div>
      </div>

      <aside className="objective-panel">
        <h1>{activeLab?.title ?? 'Density Lab'}</h1>
        <p>{isDensityLab ? 'Measure mass and water displacement to calculate the density of the selected material.' : activeLab?.objective}</p>
        <div className="instruction-callout">
          <span>Current task</span>
          <strong>{currentInstruction}</strong>
        </div>
        <div className="progress-block">
          <span>Progress</span>
          <strong>{progress}%</strong>
          <div className="progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
        {isDensityLab ? <div className="metrics-grid">
          <div>
            <span>Mass</span>
            <strong>{weighed ? `${sample.mass} g` : '--'}</strong>
          </div>
          <div>
            <span>Volume</span>
            <strong>{submerged ? `${sample.volume} mL` : '--'}</strong>
          </div>
          <div>
            <span>Density</span>
            <strong>{density ? `${density.toFixed(2)} g/mL` : '--'}</strong>
          </div>
        </div> : <div className="metrics-grid">
          <div>
            <span>Mode</span>
            <strong>Guided</strong>
          </div>
          <div>
            <span>Topic</span>
            <strong>{activeLab?.topic}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{moduleStep >= moduleSteps.length ? 'Complete' : 'Active'}</strong>
          </div>
        </div>}
      </aside>

      <aside className="steps-panel">
        <h2>Lab Steps</h2>
        {steps.map((step) => (
          <div className={step.done ? 'step done' : 'step'} key={step.label}>
            <span>{step.done ? '✓' : ''}</span>
            {step.label}
          </div>
        ))}
        <button type="button" onClick={() => actions.setHintCount(hintCount + 1)}>
          <Lightbulb size={17} />
          Hint
        </button>
        <button type="button" onClick={() => actions.setTeacherVisible(true)}>
          <UserRoundPlus size={17} />
          AI Teacher
        </button>
        <button type="button" onClick={() => actions.setReportOpen(true)} disabled={!isDensityLab || !density}>
          <ClipboardCheck size={17} />
          Lab Report
        </button>
        <button type="button" className="secondary" onClick={actions.resetLab}>
          <RefreshCw size={16} />
          Reset
        </button>
      </aside>

      {hintCount > 0 && (
        <div className="hint-toast">
          <strong>Hint {hintCount}</strong>
          <span>{isDensityLab ? "Use the equation density = mass / volume. Water displacement gives the object's volume." : currentInstruction}</span>
        </div>
      )}

      {(teacherVisible || hintCount > 0) && (
        <div className="ai-guide-panel">
          <img src="./DLS_Teacher.png" alt="DLS AI Teacher" className="ai-guide-teacher" />
          <div className="ai-guide-window">
            <div className="ai-guide-controls" aria-hidden="true">
              <Minus size={24} />
              <X size={24} />
            </div>
            <div className="ai-guide-copy">
              <span>AI Teacher</span>
              <strong>{aiMessage}</strong>
            </div>
            <button type="button" className="ai-guide-continue" onClick={() => actions.setHintCount(hintCount + 1)}>
              Continue
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      )}

      <div className="camera-note">{isDensityLab ? 'Drag empty space to orbit • Drag samples to scale or tank • Scroll to zoom' : 'Drag empty space to orbit • Click the floating lab action button • Scroll to zoom'}</div>
    </section>
  );
}
