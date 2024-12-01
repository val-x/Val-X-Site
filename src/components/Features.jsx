import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "💻",
    title: "Custom Software Development",
    description: "Tailored solutions built to address your unique business challenges and opportunities."
  },
  {
    icon: "🌐",
    title: "Web Development",
    description: "Responsive and dynamic web applications that deliver exceptional user experiences."
  },
  {
    icon: "📱",
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that engage users and drive results."
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    description: "Intelligent solutions that automate processes and unlock valuable insights."
  },
  {
    icon: "☁️",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and services that power your digital transformation."
  },
  {
    icon: "🔒",
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets and data."
  }
];

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      }
    })

    animateWithGsap('#features_title', { y:0, opacity:1})
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGsap(
      '.g_text',
      {y:0, opacity: 1,ease: 'power2.inOut',duration: 1}
    )
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top center+=100',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-wdith">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">Our Projects</h1>
        </div>
        
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">Innovative Projects.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">Reliable Solutions.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="https://www.ihsray.com/" target="_blank" rel="noopener noreferrer" className="project-card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://m.media-amazon.com/images/I/818ff7KhYIL._AC_UY1100_.jpg" alt="IHS Ray" className="w-full h-48 object-cover" />
                <h3 className="project-title text-xl font-bold p-4 text-gray-800">IHS Ray</h3>
                <p className="project-description p-4 text-gray-600">IHS Ray is an eCommerce platform offering a wide range of family wear for men, women, and kids, focusing on quality and style.</p>
              </a>
              <a href="https://keracabs.com/" target="_blank" rel="noopener noreferrer" className="project-card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://keracabs.com/home/img/bg/2.webp" alt="Kera Cabs" className="w-full h-48 object-cover" />
                <h3 className="project-title text-xl font-bold p-4 text-gray-800">Kera Cabs</h3>
                <p className="project-description p-4 text-gray-600">Kera Cabs provides reliable and efficient transportation services, ensuring a comfortable travel experience for all customers.</p>
              </a>
              <a href="https://aapconstruction.in/" target="_blank" rel="noopener noreferrer" className="project-card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://as2.ftcdn.net/v2/jpg/02/01/96/59/1000_F_201965916_Sywvqm6bcX9Mv9lo10gHlBlaBpkLti1B.jpg" alt="AAP Construction" className="w-full h-48 object-cover" />
                <h3 className="project-title text-xl font-bold p-4 text-gray-800">AAP Construction</h3>
                <p className="project-description p-4 text-gray-600">AAP Construction specializes in high-quality construction services, focusing on residential and commercial projects with a commitment to excellence.</p>
              </a>
              <a href="https://bonderconnect.com/" target="_blank" rel="noopener noreferrer" className="project-card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://bonderconnect.com/assets/images/11.png" alt="Bonder Connect" className="w-full h-48 object-cover" />
                <h3 className="project-title text-xl font-bold p-4 text-gray-800">Bonder Connect</h3>
                <p className="project-description p-4 text-gray-600">Bonder Connect is a platform that connects businesses with reliable bonding solutions, enhancing operational efficiency and trust.</p>
              </a>
              <a href="https://amazetechglobal.com/" target="_blank" rel="noopener noreferrer" className="project-card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://ionexchangeglobal.com/app/uploads/2021/11/deminiralizer.jpg" alt="Amaze Tech Global" className="w-full h-48 object-cover" />
                <h3 className="project-title text-xl font-bold p-4 text-gray-800">Amaze Tech Global</h3>
                <p className="project-description p-4 text-gray-600">Amaze Tech Global is a pioneer in water treatment solutions in India, boasting a strong international presence and commitment to sustainability.</p>
              </a>
              <a href="https://www.brewbox.co/" target="_blank" rel="noopener noreferrer" className="project-card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="https://www.brewbox.co/cdn/shop/files/AdventExternal_300x300_crop_center.png?v=1730739794" alt="Brew Box" className="w-full h-48 object-cover" />
                <h3 className="project-title text-xl font-bold p-4 text-gray-800">Brew Box</h3>
                <p className="project-description p-4 text-gray-600">Brew Box is a subscription service that delivers premium coffee and brewing equipment, catering to coffee enthusiasts everywhere.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features