import React from 'react'
import HeroSection from '../components/HeroSection'
import WhyParticipate from '../components/WhyParticipate'
import MentorsSection from '../components/MentorsSection'
import ScheduleSection from '../components/ScheduleSection'
import PricingSection from '../components/PricingSection'

const HomePage = () => {
  return (
     <>
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <WhyParticipate />
      </section>
      <section id="mentors">
        <MentorsSection />
      </section>
      <section id="schedule">
        <ScheduleSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
    </>
  )
}

export default HomePage