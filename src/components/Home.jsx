import pantherLogo from '../assets/home.png'

const Home = ({ onContactClick }) => {
  return (
    <section className="section landing">
     <img src={pantherLogo} alt="Logo" style={{ width: '370px', marginBottom: '1rem' }} />
      <div style={{ marginTop: '3rem', fontFamily: 'var(--font-serif)', opacity: '100%' }}>scroll down to move right &rarr;</div>
      <div className="contact-button" onClick={onContactClick}>Contact us</div>
    </section>
  )
}

export default Home
