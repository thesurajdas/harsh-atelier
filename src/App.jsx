import { useEffect, useRef, useState } from 'react'
import './App.css'
import Home from './components/Home'
import TheAtelier from './components/TheAtelier'
import Purpose from './components/Purpose'
import Services from './components/Services'
import Modal from './components/Modal'

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [scrollOffset, setScrollOffset] = useState(0)
  const scrollSceneRef = useRef(null)
  const trackRef = useRef(null)
  const snapTimeoutRef = useRef(null)
  const unlockTimeoutRef = useRef(null)
  const snapPointsRef = useRef([])
  const isAutoSnappingRef = useRef(false)

  const openModal = (type) => setActiveModal(type)
  const closeModal = () => setActiveModal(null)

  useEffect(() => {
    const scene = scrollSceneRef.current
    const track = trackRef.current

    if (!scene || !track) return

    let frameId = 0
    let maxOffset = 0

    const updateScrollState = () => {
      frameId = 0

      const rawOffset = window.scrollY - scene.offsetTop
      const nextOffset = Math.max(0, Math.min(rawOffset, maxOffset))
      setScrollOffset(nextOffset)
    }

    const snapToNearestSection = () => {
      const rawOffset = window.scrollY - scene.offsetTop
      const currentOffset = Math.max(0, Math.min(rawOffset, maxOffset))
      const snapPoints = snapPointsRef.current

      if (!snapPoints.length) return

      const nearestPoint = snapPoints.reduce((closestPoint, point) => {
        return Math.abs(point - currentOffset) < Math.abs(closestPoint - currentOffset)
          ? point
          : closestPoint
      }, snapPoints[0])

      if (Math.abs(nearestPoint - currentOffset) < 12) return

      isAutoSnappingRef.current = true
      window.scrollTo({
        top: scene.offsetTop + nearestPoint,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })

      window.clearTimeout(unlockTimeoutRef.current)
      unlockTimeoutRef.current = window.setTimeout(() => {
        isAutoSnappingRef.current = false
      }, 500)
    }

    const requestScrollUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateScrollState)
      }

      window.clearTimeout(snapTimeoutRef.current)

      if (!isAutoSnappingRef.current) {
        snapTimeoutRef.current = window.setTimeout(snapToNearestSection, 140)
      }
    }

    const syncSceneHeight = () => {
      maxOffset = Math.max(track.scrollWidth - window.innerWidth, 0)
      const panels = Array.from(track.children)
      const sectionPoints = panels.slice(0, -1).map((panel) => Math.min(panel.offsetLeft, maxOffset))
      snapPointsRef.current = [...new Set([...sectionPoints, maxOffset])]
      scene.style.height = `${window.innerHeight + maxOffset}px`
      updateScrollState()
    }

    syncSceneHeight()
    window.addEventListener('resize', syncSceneHeight)
    window.addEventListener('scroll', requestScrollUpdate, { passive: true })

    return () => {
      window.removeEventListener('resize', syncSceneHeight)
      window.removeEventListener('scroll', requestScrollUpdate)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      window.clearTimeout(snapTimeoutRef.current)
      window.clearTimeout(unlockTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <div ref={scrollSceneRef} className="scroll-scene">
        <div className="scroll-stage">
          <div
            ref={trackRef}
            className="horizontal-container"
            style={{ transform: `translate3d(-${scrollOffset}px, 0, 0)` }}
          >
            <Home onContactClick={() => openModal('contact')} />
            <TheAtelier onReadMoreClick={() => openModal('about')} />
            <Purpose />
            <Services
              onBrandingClick={() => openModal('branding')}
              onMarketingClick={() => openModal('marketing')}
            />
            <section className="section footer">
              <div className="footer-drawer-content">
                <a href="https://medium.com/@harsh.consultent">Medium</a>
                <a href="https://www.behance.net/harshatelier">Behance</a>
                <a href="https://www.linkedin.com/company/harsh-atelier/">LinkedIn</a>
                <a href="https://www.instagram.com/harshatelier/">Instagram</a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal isOpen={activeModal === 'contact'} onClose={closeModal}>
        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Contact us</h2>
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea></textarea>
          </div>
          <div style={{ marginTop: '1rem', opacity: '0.6', fontSize: '0.9rem' }}>Email - hello@harshatelier.com</div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'about'} onClose={closeModal}>
        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>About us</h2>
        <div className="about-text">
          Harsh Atelier is a branding and marketing studio focused on heritage and slow fashion brands. The studio helps transform meaningful craftsmanship into strong, modern brands by building clear identities, creating digital presence, and guiding brands through thoughtful marketing.
          {"\n\n"}
          Across India, countless crafts carry generations of skill, culture, and meaning. The craftsmanship is exceptional, the materials are rare, and the process often takes days or even weeks. Yet without clear branding and modern presence, these creations remain invisible in the market.
          {"\n\n"}
          The goal is simple: build brands that honor craft, culture, and long-term value.
          {"\n\n"}
          <strong>The Bengal Cat</strong>
          {"\n\n"}
          The cat is one of Bengal's most understated symbols. Despite its elegance and remarkable presence, many people are still unfamiliar with this extraordinary breed. Known for its refined appearance and rare beauty, the Bengal cat is considered one of the most exclusive and expensive breeds in the world. Its elegance, rarity, and distinctive character naturally reflect ideas of luxury and exclusivity, while its origins remain deeply connected to Bengal. 
          {"\n\n"}
          This is why the Bengal cat became the symbol of Harsh Atelier — a studio based in Kolkata, choosing an emblem that reflects both its cultural roots and its connection to Bengal.
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'branding'} onClose={closeModal}>
        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Branding</h2>
        <div className="about-text">
          <strong>Designing</strong>
          {"\n"}- Brand strategy
          {"\n"}- Brand identity design
          {"\n"}- Website design
          {"\n"}- Social media design
          {"\n"}- Packaging design
          {"\n"}- Illustration design
          {"\n\n"}
          <strong>Production</strong>
          {"\n"}- Fashion Photoshoots
          {"\n"}- Content creation
          {"\n"}- Creative direction
          {"\n"}- Video editing
          {"\n"}- Model coordination
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'marketing'} onClose={closeModal}>
        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Marketing</h2>
        <div className="about-text">
          <strong>Social Media</strong>
          {"\n"}- Social media strategy
          {"\n"}- Social media management
          {"\n"}- Content creation
          {"\n"}- Meta Ads (Instagram & Facebook)
          {"\n"}- Performance marketing
          {"\n"}- Influencer collaborations
          {"\n\n"}
          <strong>Search Engine</strong>
          {"\n"}- Google Ads
          {"\n"}- Search Engine Optimization (SEO)
          {"\n"}- Website conversion optimization
          {"\n"}- E-commerce website management
          {"\n"}- Marketplace management
        </div>
      </Modal>
    </>
  )
}

export default App
