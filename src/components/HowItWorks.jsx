import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from('#icon', {
      scrollTrigger: {
        trigger: '#icon',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="icon" className="flex-center w-full my-20">
          <img src={chipImg} alt="innovation icon" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            Innovative Solutions.
            <br /> Transforming Businesses.
          </h2>

          <p className="hiw-subtitle">
            Discover how our cutting-edge IT services can revolutionize your operations.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img 
                src={frameImg}
                alt="IT solutions showcase"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
                <video className="pointer-events-none" playsInline preload="none" muted autoPlay ref={videoRef}>
                  <source src={frameVideo} type="video/mp4" />
                </video>
              </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">Our AI-Powered Analytics Dashboard</p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              Our team of experts delivers {' '}
              <span className="text-white">
                tailored IT solutions
              </span>
              {' '}that drive efficiency and growth.
            </p>

            <p className="hiw-text g_fadeIn">
              From AI integration to cloud services, we {' '}
              <span className="text-white">
                empower your business
              </span>
              {' '}with cutting-edge technology.
            </p>
          </div>
        
          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">Achieve</p>
            <p className="hiw-bigtext">Digital Transformation</p>
            <p className="hiw-text">with our expertise</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks