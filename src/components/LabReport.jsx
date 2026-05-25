export default function LabReport({ state, actions }) {
  const { sample, density, score } = state;

  return (
    <div className="report-backdrop">
      <section className="lab-report">
        <header>
          <span>Daily Life Science</span>
          <button type="button" onClick={() => actions.setReportOpen(false)}>Close</button>
        </header>
        <h2>Density Lab Report</h2>
        <div className="report-grid">
          <div>
            <small>Material</small>
            <strong>{sample.label}</strong>
          </div>
          <div>
            <small>Mass</small>
            <strong>{sample.mass} g</strong>
          </div>
          <div>
            <small>Displaced Volume</small>
            <strong>{sample.volume} mL</strong>
          </div>
          <div>
            <small>Density</small>
            <strong>{density.toFixed(2)} g/mL</strong>
          </div>
        </div>
        <p>
          The selected sample has a density of {density.toFixed(2)} g/mL. The calculation used measured mass divided
          by volume from water displacement.
        </p>
        <div className="score-line">
          <span>Completion Score</span>
          <strong>{score}%</strong>
        </div>
      </section>
    </div>
  );
}
