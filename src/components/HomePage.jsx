import {
  ArrowRight,
  Atom,
  Beaker,
  Droplets,
  FlaskConical,
  Gauge,
  Rocket,
  Sparkles,
  ThermometerSun,
  Waves,
} from 'lucide-react';

const labIcons = {
  'density-lab': Gauge,
  'vinegar-volcano': FlaskConical,
  'make-rainbow': Waves,
  'balloon-rocket': Rocket,
  'melting-chocolate': ThermometerSun,
};

const labAccents = {
  'density-lab': 'teal',
  'vinegar-volcano': 'coral',
  'make-rainbow': 'blue',
  'balloon-rocket': 'violet',
  'melting-chocolate': 'amber',
};

export default function HomePage({ labs, onOpenLab }) {
  const featuredLab = labs[0];

  return (
    <section className="home-page embedded-lab-home">
      <section className="lab-launch-hero" aria-label="DLS 3D lab selector">
        <div className="launch-copy">
          <div className="launch-kicker">
            <Sparkles size={18} />
            Interactive 3D Science Lab
          </div>
          <h1>Choose your virtual experiment.</h1>
          <p>
            Step into a focused 3D classroom built for hands-on discovery, guided by an AI teacher and designed for quick classroom launches.
          </p>
          <div className="launch-actions">
            <button type="button" onClick={() => onOpenLab(featuredLab.id)}>
              Launch Density Lab
              <ArrowRight size={20} />
            </button>
            <span>{labs.length} lab modules ready</span>
          </div>
        </div>

        <div className="lab-preview-stage" aria-hidden="true">
          <div className="stage-grid" />
          <div className="preview-panel panel-objective">
            <span>Objective</span>
            <strong>Measure. Observe. Explain.</strong>
          </div>
          <div className="preview-panel panel-score">
            <span>Progress</span>
            <strong>87%</strong>
          </div>
          <div className="preview-bench">
            <div className="bench-top" />
            <div className="bench-leg left" />
            <div className="bench-leg right" />
            <div className="preview-scale"><Gauge size={22} /></div>
            <div className="preview-tank">
              <div className="preview-water" />
              <Droplets size={24} />
            </div>
            <div className="preview-beaker"><Beaker size={26} /></div>
          </div>
          <div className="preview-teacher">
            <div className="teacher-head" />
            <div className="teacher-body"><Atom size={22} /></div>
            <div className="teacher-label">AI Teacher</div>
          </div>
          <div className="preview-lightbar" />
        </div>
      </section>

      <section className="lab-grid" aria-label="DLS lab selector">
        {labs.map((lab, index) => {
          const Icon = labIcons[lab.id] ?? FlaskConical;
          const accent = labAccents[lab.id] ?? 'teal';
          const cardClass = lab.id === 'density-lab' ? 'selector-card featured ' + accent : 'selector-card ' + accent;

          return (
            <article className={cardClass} key={lab.id}>
              <div className="selector-card-visual">
                <span className="module-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="lab-icon"><Icon size={30} /></span>
              </div>
              <div className="selector-card-top">
                <span>{lab.topic}</span>
                <small>{lab.status}</small>
              </div>
              <h2>{lab.title}</h2>
              <p>{lab.description}</p>
              <button type="button" onClick={() => onOpenLab(lab.id)}>
                Start lab
                <ArrowRight size={18} />
              </button>
            </article>
          );
        })}
      </section>
    </section>
  );
}
