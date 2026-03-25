import purposeStairs from '../assets/purpose.png'

const Purpose = () => {
  return (
    <section className="section purpose">
      <div className="text-content">
        <h1 className="title-large">Purpose</h1>
        <p className="description">
          Harsh Atelier exists to help culturally rooted fashion products become real brands. Across India, many extraordinary crafts and materials exist — yet most of them remain local and unrecognized. The purpose of the studio is to transform these products into strong brands and help them grow through branding, marketing, and global digital presence while representing Indian culture with authenticity.
        </p>
      </div>
      <div className="image-wrapper">
        <img src={purposeStairs} className="section-image" alt="Purpose" />
      </div>
    </section>
  )
}

export default Purpose
