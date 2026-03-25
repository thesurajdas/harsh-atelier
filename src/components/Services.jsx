import servicesInstruments from '../assets/services.png'

const Services = ({ onBrandingClick, onMarketingClick }) => {
  return (
    <section className="section services">
      <div className="services-content">
        <h1 className="title-large">Services</h1>
        <div className="service-item">
          <h3>Branding</h3>
          <p className="description">
            Design focuses on shaping the identity and visual presence of a fashion brand. From brand strategy to visual identity and website design, the goal is to create a clear and recognizable brand{" "}
            <span className="see-more" onClick={onBrandingClick}> See more</span>
          </p>
        </div>
        <div className="service-item">
          <h3>Marketing</h3>
          <p className="description">
            Digital marketing focused on expanding your brand, reaching the right audience, and driving real sales through strategic campaigns and performance-driven growth{" "}
            <span className="see-more" onClick={onMarketingClick}> See more</span>
          </p>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={servicesInstruments} className="section-image services-image" alt="Services" />
      </div>


    </section>
  )
}

export default Services
