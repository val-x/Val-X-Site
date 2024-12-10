import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    year: "2023",
    title: "Industry Innovation Award",
    description: "Recognized for groundbreaking AI implementation in healthcare",
    organization: "Tech Innovation Summit"
  },
  {
    year: "2022",
    title: "Best Digital Solution",
    description: "Award for exceptional e-commerce platform development",
    organization: "Digital Excellence Awards"
  },
  {
    year: "2022",
    title: "Top Software Development Company",
    description: "Ranked among top 10 development companies",
    organization: "TechReview Magazine"
  },
  {
    year: "2021",
    title: "Client Satisfaction Excellence",
    description: "Highest rated for client satisfaction and project delivery",
    organization: "Business Excellence Institute"
  }
];

const Achievements = () => {
  const timelineRef = useRef(null);

  useGSAP(() => {
    gsap.from(".achievement-item", {
      scrollTrigger: {
        trigger: ".achievements-container",
        start: "top center+=100",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });

    gsap.to(".timeline-line", {
      scrollTrigger: {
        trigger: ".achievements-container",
        start: "top center+=100",
        end: "bottom center",
        scrub: 1
      },
      scaleY: 1,
      transformOrigin: "top"
    });
  }, []);

  return (
    <section className="py-20 bg-black" id="achievements">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Achievements
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Recognition for our commitment to excellence and innovation
          </p>
        </div>

        <div className="achievements-container relative">
          <div 
            className="timeline-line absolute left-0 md:left-1/2 top-0 w-1 h-full bg-blue-600/20 transform scale-y-0"
            ref={timelineRef}
          ></div>

          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`achievement-item relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 md:text-right">
                <span className="inline-block px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full mb-4">
                  {achievement.year}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 mb-2">{achievement.description}</p>
                <p className="text-sm text-blue-400">{achievement.organization}</p>
              </div>

              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>

              <div className="flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements; 