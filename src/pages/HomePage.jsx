import React from 'react'
import HeroSection from '../components/HeroSection'
import PartnersSection from '../components/PartnersSection'
import WhyParticipate from '../components/WhyParticipate'
import ProblemStatementsSection from '../components/ProblemStatementsSection'
import ScheduleSection from '../components/ScheduleSection'
import TimelineSection from '../components/TimelineSection'
import PricingSection from '../components/PricingSection'

const HomePage = () => {
  return (
     <>
      <section id="home">
        <HeroSection />
      </section>
      <section id="partners">
        <PartnersSection />
      </section>
      <section id="about">
        <WhyParticipate />
      </section>
      <section id="problems">
        <ProblemStatementsSection />
      </section>
      <section id="schedule">
        <ScheduleSection />
      </section>
      <section id="timeline">
        <TimelineSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
    </>
  )
}

export default HomePage