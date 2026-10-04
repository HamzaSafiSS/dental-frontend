import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../ui/Icons';
import './FamilyCareSection.css';

export default function FamilyCareSection() {
  const cards = [
    {
      title: 'Children',
      icon: '👧',
      description: 'Gentle, friendly dental care that helps children build healthy habits for a lifetime of strong smiles.',
      ctaText: 'Pediatric Dentistry',
      link: '/services/pediatric-dentistry'
    },
    {
      title: 'Teenagers',
      icon: '🧑',
      description: 'Preventive care, orthodontics and guidance during important stages of development and growth.',
      ctaText: 'Teen Dental Care',
      link: '/services/teen-dentistry'
    },
    {
      title: 'Adults',
      icon: '👨',
      description: 'Comprehensive preventive, restorative and cosmetic dental care tailored to adult needs.',
      ctaText: 'Adult Dental Care',
      link: '/services/general-dentistry'
    }
  ];

  return (
    <section className="family-care" id="family-care">
      <div className="container">
        
        <div className="family-care__header">
          <span className="family-care__label">For Every Age</span>
          <h2 className="family-care__heading">Care for the Whole Family</h2>
        </div>

        <div className="family-care__grid">
          {cards.map((card, index) => (
            <Link to={card.link} className="family-card" key={index}>
              <div className="family-card__icon-wrapper" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="family-card__title">{card.title}</h3>
              <p className="family-card__description">{card.description}</p>
              <div className="family-card__link">
                {card.ctaText}
                <IconArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
