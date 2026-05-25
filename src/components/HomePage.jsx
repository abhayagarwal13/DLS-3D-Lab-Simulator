import { ArrowRight, BookOpen, FlaskConical, Search } from 'lucide-react';

export default function HomePage({ labs, onOpenLab }) {
  return (
    <section className="home-page lab-select-page">
      <header className="site-nav">
        <div className="site-brand">
          <span className="site-logo"><BookOpen size={28} /></span>
          <span className="site-wordmark">
            <strong>Daily<span>Life</span>Science</strong>
          </span>
        </div>
        <nav className="site-links" aria-label="Daily Life Science navigation">
          <a className="active">Interactive Lab</a>
          <a>Topics</a>
          <a>Experiments</a>
          <a>Quizzes</a>
          <Search size={25} color="#8aa1bc" />
        </nav>
        <button className="join-button compact" type="button">Join for Free</button>
      </header>

      <section className="lab-select-hero">
        <div>
          <div className="age-pill">🚀 Fun Science for Ages 8-14</div>
          <h1>Select a DLS Lab</h1>
          <p>Choose an everyday science experiment and enter a focused 3D virtual lab.</p>
        </div>
        <div className="lab-select-callout">
          <FlaskConical size={34} />
          <span>Interactive labs based on Daily Life Science topics</span>
        </div>
      </section>

      <section className="lab-grid" aria-label="DLS lab selector">
        {labs.map((lab) => (
          <article className={lab.id === 'density-lab' ? 'selector-card featured' : 'selector-card'} key={lab.id}>
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
        ))}
      </section>
    </section>
  );
}
