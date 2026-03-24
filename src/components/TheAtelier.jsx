import atelierWomen from '../assets/atelier.png'

const TheAtelier = ({ onReadMoreClick }) => {
  return (
    <section className="section atelier">
      <div className="text-content">
        <h1 className="title-large">The Atelier</h1>
        <p className="description">
          For me, luxury has never meant a label or a fast-fashion br--and. Real luxury lies in craftsmanship — in the hands that weave, embroider, and shape a product with patience and precision. A handcrafted piece carries a story, a region, and a tradition within it <span className="read-more" onClick={onReadMoreClick}>Read more</span>
        </p>
      </div>
      <div className="image-wrapper">
        <img src={atelierWomen} className="section-image" alt="The Atelier" />
      </div>
    </section>
  )
}

export default TheAtelier
