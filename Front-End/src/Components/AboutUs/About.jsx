/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
// eslint-disable-next-line no-unused-vars
import React from "react";
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>Welcome to Calm Corner</h1>
      
      <div className="about-section">
        <div className="about-text">
          <p>
            A serene digital sanctuary dedicated to nurturing mental well-being
            and fostering a sense of inner peace. At Calm Corner, we understand
            the importance of prioritizing mental health in today's fast-paced
            world, and we're here to provide you with the tools, resources, and
            support you need to embark on your journey towards greater mental
            wellness.
          </p>
          <p>
            Our platform was born out of a shared vision to create a safe and
            inclusive space where individuals can explore, learn, and grow in
            their mental health journey. Whether you're looking to track your
            daily mood, monitor symptoms, or access a wealth of resources
            dedicated to mental wellness, Calm Corner is your go-to destination
            for all things related to mental health.
          </p>
        </div>
        <div className="about-image">
          <img src="https://img.freepik.com/premium-photo/illustration-human-brain-with-flowers-world-day-mental-physical-health-ai_564714-2939.jpg" alt="Mental Health" />
        </div>
      </div>

      <div className="about-section">
        <div className="about-image-con">
          <img src="https://t3.ftcdn.net/jpg/05/70/90/46/360_F_570904658_ogDkDaBxoFvRFacVGfgf3yOktU1MDUzt.jpg" alt="Wellness" />
        </div>
        <div className="about-text">
          <p>
            Our mission at Calm Corner is simple yet profound: To empower
            individuals to take proactive steps towards managing their mental
            health and accessing the support they need. Whether you're seeking
            relaxation exercises, self-care tips, or simply a space to share your
            personal experiences, Calm Corner is here to support you every step of
            the way.
          </p>
          <p>
            Join us on this journey towards inner peace and well-being. Together,
            we can create a brighter, more compassionate world—one where mental
            health is valued, prioritized, and celebrated.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
