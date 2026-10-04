import './WhyChooseUsSection.css';

function IconUserHeart({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M19 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  );
}

function IconFeather({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  );
}

function IconMonitor({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function IconClock({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconShield({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function WhyChooseUsSection() {
  const features = [
    {
      title: 'Patient-Focused Care',
      description: "Personalized treatment based on each patient's needs.",
      icon: <IconUserHeart />
    },
    {
      title: 'Gentle Treatment',
      description: 'A calm and comfortable environment.',
      icon: <IconFeather />
    },
    {
      title: 'Modern Technology',
      description: 'Digital imaging and modern dental equipment.',
      icon: <IconMonitor />
    },
    {
      title: 'Flexible Scheduling',
      description: 'Convenient appointment times.',
      icon: <IconClock />
    },
    {
      title: 'Transparent Care',
      description: 'Clear treatment information and pricing/payment guidance.',
      icon: <IconShield />
    }
  ];

  return (
    <section className="why-choose-us" id="why-choose-us">
      <div className="container">
        <div className="why-choose-us__header">
          <span className="why-choose-us__label">The Bright Smiles Difference</span>
          <h2 className="why-choose-us__heading">Why Choose Us</h2>
        </div>

        <div className="why-choose-us__grid">
          {features.map((feature, index) => (
            <div className="why-choose-us__card" key={index}>
              <div className="why-choose-us__icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="why-choose-us__title">{feature.title}</h3>
              <p className="why-choose-us__desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
