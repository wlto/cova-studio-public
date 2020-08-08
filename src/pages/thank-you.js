import React, { useEffect, useRef } from "react"
import gsap from "gsap"

import "./thank-you.scss"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { AppContextProvider } from "../contexts/AppContext"

const NotFoundPage = () => {
  let paragraph = useRef(null)

  useEffect(() => {
    let revealTimeline = gsap.timeline()
    revealTimeline.from(paragraph,
      {
        translateY: 120,
        opacity: 0,
        duration: 1,
        ease: `easeBoth`
      },
      0
    )
  }, [])

  return (
    <AppContextProvider>
      <Layout>
        <SEO title="Thank you" />
        <div className="ThankYou PageSection" ref={el => paragraph = el}>
          <h1>
            Hey there! 👋 <br /><br />
            Thanks for visiting my project.<br /><br />
            This is a project I made as part of my portfolio. I am currently open for full-time opportunities
            in software development in Canada. If you like my work and happen to be hiring, you can check out <a href="https://www.dropbox.com/s/f4fdzpnybr38xc9/WilliamTo_Resume.pdf?dl=0">my resume</a> or
            contact me via <a href="mailto:hello@williamto.com">my email</a> and <a href="https://www.linkedin.com/in/william-to/">LinkedIn</a>.
            <br /><br />
            Thank you! Stay safe and have a good day!
          </h1>
          <p>PS: You can also check out the code for this website <a href="https://github.com/wlto/cova-studio-public" target="_blank">here</a>.</p>
        </div>
      </Layout>
    </AppContextProvider>
  )
}

export default NotFoundPage
