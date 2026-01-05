import React from 'react';
const TimelineSection = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">


      <div className="max-w-7xl mx-auto relative z-10">

        {/* Timeline Image */}
        <div className="relative w-full max-w-7xl mx-auto"
        >
          <img
            src="/timeline3.png"
            alt="24-Hour Hackathon Timeline"
            className="w-full max-h-[400px] object-contain"

          />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
