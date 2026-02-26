import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-[20vh] px-10 md:px-32">
      <div className="max-w-4xl">
        <h1 className="text-[8vw] md:text-[6vw] font-light uppercase tracking-tighter leading-none mb-10">
          We Predict <br />
          <span className="italic opacity-30 font-serif lowercase">the future of flow.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 mt-20 border-t border-white/10 pt-12">
          <p className="text-white/60 text-lg leading-relaxed">
            Our mission is to integrate AI intelligence into urban infrastructure. 
            By analyzing real-time data, we help cities breathe and move better.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            From traffic prediction to seamless transit integration, we are 
            building the nervous system of the smart cities of tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;