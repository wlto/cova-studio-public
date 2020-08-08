import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import gsap from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"

import "./Hero.scss"

gsap.registerPlugin(CSSRulePlugin)

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroImages {
      allImageSharp(filter: {fluid: {originalName: {regex: "/Hero.*/"}}}) {
        nodes {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)
  const heroImage = data.allImageSharp.nodes[0].fluid

  let heroHeading1 = useRef(null)
  let heroHeading2 = useRef(null)
  let heroHeading3 = useRef(null)
  let heroImageWrapper = useRef(null)
  let scrollDown = useRef(null)

  useEffect(() => {
    let heroImageMask = CSSRulePlugin.getRule(`.Hero__img:after`)
    let revealTimeline = gsap.timeline({ paused: true, delay: 0.2 })

    revealTimeline.fromTo(heroHeading1, 
      { width: 0 },
      { width: `100%`, duration: 1.62, ease: `easeBoth` },
      0
    )
    revealTimeline.fromTo(heroHeading2,
      { width: 0 },
      { width: `100%`, duration: 1.32, ease: `easeBoth` },
      0.44
    )
    revealTimeline.fromTo(heroHeading3,
      { width: 0 },
      { width: `100%`, duration: 1.27, ease: `easeBoth` },
      0.58
    )
    revealTimeline.to(heroImageMask, 1.3, { width: `0%`, ease: `easeBoth` }, 0.1)
    revealTimeline.fromTo(heroImageWrapper,
      { transform: "scale(1.4)" },
      { transform: "scale(1)", duration: 1.3, ease: `easeBoth`  },
      0
    )
    revealTimeline.from(scrollDown,
      { translateY: `44px`, opacity: 0, duration: 1.2, ease: `easeBoth` },
      0
    )

    revealTimeline.play()
  }, [])

  return (
    <section className="Hero PageSection section">
      <div className="Hero__wrapper">
        <div className="Hero__heading">
          <div className="Hero__heading-line" ref={el => heroHeading1 = el}>
            <h1>experience and capture</h1>
          </div>
          <div className="Hero__heading-line" ref={el => heroHeading2 = el}>
            <h1>memories that</h1>
          </div>
          <div className="Hero__heading-line" ref={el => heroHeading3 = el}>
            <h1>last forever</h1>
          </div>
        </div>
        <p className="Hero__scroll-down" ref={el => scrollDown = el}>
          SCROLL DOWN
          <span></span>
          <span></span>
        </p>
        <div className="Hero__img">
          <div
            className="Hero__img-wrapper"
            ref={el => heroImageWrapper = el}
          >
            <Image 
              className="Hero__img-fluid"
              alt="Hero" 
              fluid={heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero