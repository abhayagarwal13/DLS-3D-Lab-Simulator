import {
  ArrowRight,
  Beaker,
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

        <div className="lab-preview-stage home-3d-preview" aria-hidden="true">
          <div className="stage-grid" />
          <div className="home-lab-room-depth">
            <div className="home-back-wall">
              <span>DLS LABS</span>
            </div>
            <div className="home-3d-table">
              <div className="home-table-top">
                <div className="home-table-shine" />
              </div>
              <div className="home-table-front" />
              <div className="home-table-leg left" />
              <div className="home-table-leg right" />
              <div className="home-tool microscope-tool">
                <div className="scope-base" />
                <div className="scope-arm" />
                <div className="scope-neck" />
                <div className="scope-lens" />
                <div className="scope-stage" />
              </div>
              <div className="home-tool beaker-tool">
                <div className="beaker-glass">
                  <div className="beaker-liquid" />
                  <Beaker size={34} />
                </div>
              </div>
            </div>
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
