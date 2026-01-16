import { CheckCircle, ArrowRight, Play } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Scene from '../assets/Scene.mp4'
// import Scene3 from '../assets/Scene3.mp4'
import HomeVideo from '../assets/HomeVideo.mp4';

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const stats = [
    { number: '1000+', label: 'Global Inspectors' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Countries Covered' },
    { number: '24/7', label: 'Platform Support' }
  ];

  const features = [
    "Raise Inspection query",
    "Choose the best quote", 
    "Better transparency and reporting of cargo",
    "Reach out to global inspectors",
    "AI based suggestions for quality of cargo",
    "Market analytics tool with AI based insights for your trade decisions"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const threshold = heroHeight * 0.3; // Show content when scrolled 30% of viewport
      
      if (isMobile) {
        // On mobile, always show content and hide fullscreen video
        setIsScrolled(true);
      } else {
        setIsScrolled(scrollY > threshold);
      }
    };

    // Check on mount
    checkMobile();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      checkMobile();
      handleScroll();
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const heroStyles = {
    hero: {
      background: '#000000ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: isMobile ? '80px' : '80px',
      fontFamily: 'Jost, sans-serif'
    },
    fullscreenVideoContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      opacity: isScrolled ? 0 : 1,
      transition: 'opacity 1s ease-in-out',
      pointerEvents: isScrolled ? 'none' : 'auto',
      display: isMobile ? 'none' : 'block'
    },
    fullscreenVideo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    mobileHomeVideo: {
      position: 'relative',
      width: 'calc(100% - 2rem)',
      height: '250px',
      marginBottom: '2rem',
      borderRadius: '15px',
      overflow: 'hidden',
      margin: '1rem',
      marginTop: '20px',
      zIndex: 10
    },
    mobileHomeVideoElement: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '15px'
    },
    globeBackground: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: isScrolled ? '0.2' : '0',
      zIndex: 2,
      transition: 'opacity 2s ease-in-out, transform 3s ease-in-out'
    },
    heroBackground: {
      position: 'absolute',
      top: '-20%',
      right: '-20%',
      width: '120%',
      height: '140%',
      background: 'radial-gradient(circle at center, rgba(40, 40, 40, 0.3) 0%, rgba(20, 20, 20, 0.15) 40%, transparent 70%)',
      animation: 'float 20s ease-in-out infinite',
      zIndex: 3,
      opacity: isScrolled ? 1 : 0,
      transition: 'opacity 1.5s ease-in-out'
    },
    heroBackgroundSecondary: {
      position: 'absolute',
      bottom: '-20%',
      left: '-20%',
      width: '120%',
      height: '140%',
      background: 'radial-gradient(circle at center, rgba(60, 60, 60, 0.3) 0%, rgba(30, 30, 30, 0.15) 40%, transparent 70%)',
      animation: 'float 25s ease-in-out infinite reverse',
      zIndex: 3,
      opacity: isScrolled ? 1 : 0,
      transition: 'opacity 1.5s ease-in-out'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : 'unset',
      gridTemplateColumns: isMobile ? 'unset' : '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 15,
      opacity: isScrolled ? 1 : 0,
      transform: isScrolled ? 'translateY(0)' : 'translateY(50px)',
      transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
      textAlign: isMobile ? 'center' : 'left'
    },
    heroText: {
      color: '#FFFFFF',
      order: isMobile ? 2 : 'unset'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(40, 40, 40, 0.2), rgba(60, 60, 60, 0.2))',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '1rem 2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(80, 80, 80, 0.3)',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: '700',
      color: '#CCCCCC',
      fontFamily: 'Jost, sans-serif'
    },
    title: {
      fontSize: isMobile ? '3rem' : '5.5rem',
      fontWeight: '900',
      lineHeight: '1.05',
      marginBottom: '2rem',
      color: '#FFFFFF',
      fontFamily:'Jost, sans-serif',
      letterSpacing: '-0.03em'
    },
    highlight: {
      background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem',
      fontWeight: '500',
      lineHeight: '1.6',
      fontFamily: 'Jost, sans-serif'
    },
    featureList: {
      listStyle: 'none',
      marginBottom: '3rem',
      padding: 0,
      textAlign: isMobile ? 'left' : 'left'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontFamily: 'Jost, sans-serif',
      justifyContent: isMobile ? 'flex-start' : 'flex-start'
    },
    featureIcon: {
      width: '28px',
      height: '28px',
      background: 'linear-gradient(135deg, #666666, #888888)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      color: 'white',
      fontSize: '0.8rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'center' : 'flex-start',
      flexDirection: isMobile ? 'column' : 'row'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #333333, #666666)',
      color: 'white',
      padding: '1.3rem 2.8rem',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '700',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontFamily: 'Jost, sans-serif',
      width: isMobile ? '100%' : 'auto'
    },
    secondaryButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '1.3rem 2.8rem',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '700',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontFamily:'Jost, sans-serif',
      width: isMobile ? '100%' : 'auto'
    },
    visualContainer: {
      position: 'relative',
      order: isMobile ? 3 : 'unset',
      display: isMobile ? 'none' : 'block'
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '500px',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    },
    heroVideo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '25px',
      borderColor:"rgba(255, 255, 255, 0.1)",
      borderWidth: '2px',
    },
    mobileSceneVideo: {
      width: 'calc(100% - 2rem)',
      height: '300px',
      borderRadius: '15px',
      overflow: 'hidden',
      margin: '2rem 1rem 1rem 1rem',
      order: 4
    },
    mobileSceneVideoElement: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '15px'
    },
    statsContainer: {
      position: 'absolute',
      bottom: '-30px',
      left: '-30px',
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      padding: '2rem',
      borderRadius: '20px',
      border: '1px solid rgba(80, 80, 80, 0.2)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontFamily: 'Jost, sans-serif'
    },
    statLabel: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem',
      fontWeight: '500',
      fontFamily:'Jost, sans-serif'
    }
  };

  useEffect(() => {
    if (!document.querySelector('#hero-styles')) {
      const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes float {
          0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          25% { 
            transform: translate(-30px, -20px) rotate(90deg);
            opacity: 0.5;
          }
          50% { 
            transform: translate(-50px, -40px) rotate(180deg);
            opacity: 0.3;
          }
          75% { 
            transform: translate(30px, -20px) rotate(270deg);
            opacity: 0.5;
          }
          100% { 
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.3;
          }
        }
        
        @keyframes floatReverse {
          0% { 
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translate(25px, 30px) rotate(-90deg) scale(1.1);
            opacity: 0.5;
          }
          50% { 
            transform: translate(50px, 30px) rotate(-180deg) scale(1);
            opacity: 0.3;
          }
          75% { 
            transform: translate(-25px, 30px) rotate(-270deg) scale(0.9);
            opacity: 0.5;
          }
          100% { 
            transform: translate(0, 0) rotate(-360deg) scale(1);
            opacity: 0.3;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            filter: blur(0px) brightness(1);
          }
          50% {
            filter: blur(2px) brightness(1.2);
          }
        }

        @keyframes subtleShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .hero-background-enhanced {
          animation: float 20s ease-in-out infinite, pulseGlow 8s ease-in-out infinite;
        }

        .hero-background-secondary-enhanced {
          animation: floatReverse 25s ease-in-out infinite, pulseGlow 12s ease-in-out infinite;
        }

        .globe-background-enhanced {
          animation: subtleShift 30s ease-in-out infinite;
          transition: opacity 2s ease-in-out, transform 3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `;
      const style = document.createElement('style');
      style.id = 'hero-styles';
      style.textContent = styles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section style={heroStyles.hero} id="home">
      {!isMobile && (
        <div style={heroStyles.fullscreenVideoContainer}>
          <video
            style={heroStyles.fullscreenVideo}
            src={HomeVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isMobile && (
        <div style={heroStyles.mobileHomeVideo}>
          <video
            style={heroStyles.mobileHomeVideoElement}
            src={HomeVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div 
        style={heroStyles.globeBackground}
        className="globe-background-enhanced"
      ></div>
      <div 
        style={heroStyles.heroBackground}
        className="hero-background-enhanced"
      ></div>
      <div 
        style={heroStyles.heroBackgroundSecondary}
        className="hero-background-secondary-enhanced"
      ></div>
      
      <div style={heroStyles.container}>
        <div style={heroStyles.heroText}>
         
          
          <h1 style={heroStyles.title}>
            Global <span >Quality Inspections</span> For Global Trade
          </h1>

          <p style={heroStyles.description}>
            Global Quality Inspections solved at one platform. Qualty AI is a marketplace for global quality inspections bringing together global traders and inspectors worldwide.
          </p>

          <ul style={heroStyles.featureList}>
            {features.map((feature, index) => (
              <li key={index} style={heroStyles.featureItem}>
                <div style={heroStyles.featureIcon}>
                  <CheckCircle size={16} />
                </div>
                <span>{feature}</span>
              </li> 
            ))}
          </ul>

          <div style={heroStyles.buttonContainer}>
            <button 
              style={heroStyles.primaryButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 35px rgba(80, 80, 80, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Get Started Today
              <ArrowRight size={20} />
            </button>
            <button 
              style={heroStyles.secondaryButton}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = '#CCCCCC';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <Play size={20} />
              Watch Demo
            </button>
             <div style={heroStyles.badge}>
            🌍 Global Quality Inspections Marketplace
          </div>
          </div>
        </div>

        <div style={heroStyles.visualContainer}>
          <div style={heroStyles.videoContainer}>
            <video
              style={heroStyles.heroVideo}
              src={Scene}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {isMobile && (
        <div style={heroStyles.mobileSceneVideo}>
          <video
            style={heroStyles.mobileSceneVideoElement}
            src={Scene}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
};

export default Hero;