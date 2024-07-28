import React, { useState, useEffect }  from 'react';
import Scene from './wobble';
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import './fonts/fonts.css';
import './glass.css';
import './widget.css';
import './socials.css';
import './screen.css';

function App() {
  const [{ background, fill}, black] = useSpring({ background: '#070604', fill: '#283635'}, [])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div style={{width: '100%', height: '100%', overflowY: 'scroll', scrollSnapType: 'y mandatory', overflow: 'visible' }}>
      <a.main style={{ background, width: '100%', height: '100vh'}}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Canvas className="canvas" dpr={[1, 2]}>
            <Scene setBg={black} pos = {0.5} sphere = {'#7FFFD4'} fov = {70} width = {windowWidth}/>
            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Canvas>
          <div style={{ position: 'absolute', top: '15%', left: '10%', color: 'white', zIndex: 1,fontFamily: 'welcome', fontSize: '5rem',
                        textAlign: 'left', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', color: '#d1c5ad'}}>
            Mohit
            <br/>
            Agrawal
          </div>
          
          <p class = "intro-p" style={{ position: 'absolute', top: '50%', left: '10%', color: 'white', zIndex: 1,fontFamily: 'welcome', fontSize: '2.4rem',
                        textAlign: 'left', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', color: 'gray'}}>
              Full-stack Engineer and Masters student with over 3 years of experience hacking up awesome products
            </p>
          <div class = "container glass">
            <div class="widget">
              <div class = "title">
                The Difference
              </div>
              <p class = "paragraph">
                Software engineer working on both our Flutter application to help users lose weight and our Laravel API to connect with our MySQL Server to get users the data they need as quick as possible
              </p>
            </div>

            <div class="widget">
              <div class = "title">
                Projects
              </div>
              <div class="grid-container">
                  <div class="grid-item">
                    <div class="left-side">
                      <h2>Customer Service Application</h2>
                      
                    </div>
                    <div class="right-side">
                        <img src="Customer.jpg" alt="Customer"/>
                    </div>
                  </div>
                  <div class="grid-item">
                  <div class="left-side">
                      <h2>Resume Parsing Platform</h2>
                      
                    </div>
                    <div class="right-side">
                        <img src="Resume.jpg" alt="Resume"/>
                    </div>
                  </div>
                  <div class="grid-item">
                  <div class="left-side">
                      <h2>Online Meeting Scheduler</h2>
                      
                    </div>
                    <div class="right-side">
                        <img src="Meeting.png" alt="Meeting"/>
                    </div>
                  </div>
                  <div class="grid-item">
                  <div class="left-side">
                      <h2>View More at GitHub</h2>
                      
                    </div>
                    <div class="right-side">
                        <img src="github.png" alt="Github"/>
                    </div>
                  </div>
              </div>
            </div>

            <div class="widget">
              <div class = "title">
                Where to Find Me
              </div>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/mohit-agrawal-58a548206/" target="_blank" rel="noopener noreferrer">
                  <img src="LinkedIn.png" alt="LinkedIn" />
                </a>
                <a href="https://github.com/MohitAgrawal404" target="_blank" rel="noopener noreferrer">
                  <img src="GithubLogo.png" alt="GitHub" />
                </a>
                <a href="mailto:HiMohitA@gmail.com">
                  <img src="Mail.webp" alt="Mail" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </a.main>
      <a.main style={{ background, width: '100%', height: '80vh' }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Canvas className="canvas" dpr={[1, 2]}>
            <Scene setBg={black} pos = {-0.5} sphere = {'#F88379'} fov = {55} width = {windowWidth}/>
            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Canvas>
          
          
        </div>
      </a.main>

      <a.main style={{ background, width: '100%', height: '80vh' }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Canvas className="canvas" dpr={[1, 2]}>
            <Scene setBg={black} pos = {0.5} sphere = {'#E0B0FF'} fov = {55} width = {windowWidth}/>
            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Canvas>
          
          
        </div>
      </a.main>

      <a.main style={{ background, width: '100%', height: '80vh' }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Canvas className="canvas" dpr={[1, 2]}>
            <Scene setBg={black} pos = {-0.5} sphere = {'#89CFF0'} fov = {55} width = {windowWidth}/>
            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Canvas>
          
          
        </div>
      </a.main>

    </div>
  );
}

export default App;