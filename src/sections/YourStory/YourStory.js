import React, { useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import gsap from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"
import ScrollTrigger from "gsap/ScrollTrigger"

import "./YourStory.scss"

gsap.registerPlugin(CSSRulePlugin)
gsap.registerPlugin(ScrollTrigger)

const YourStory = () => {
  const data = useStaticQuery(graphql`
    query YourStoryImages {
      allImageSharp(filter: {fluid: {originalName: {regex: "/YourStory.*/"}}}, sort: {fields: resolutions___originalName}) {
        nodes {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)
  const images = data.allImageSharp.nodes

  let headingRef = useRef(null)
  let bodyRef = useRef(null)
  let bodyUnderline1 = useRef(null)
  let bodyUnderline2 = useRef(null)
  let imageWrappers = [React.createRef(), React.createRef()]

  useEffect(() => {
    let imageMask = CSSRulePlugin.getRule(`.YourStory__img:after`)
    let revealTimeline = gsap.timeline({
      scrollTrigger: { trigger: `.YourStory` } 
    })
    revealTimeline.fromTo(headingRef,
      { translateY: `116px`, opacity: 0 },
      {
        translateY: 0,  
        opacity: 1,
        duration: 1.55,
        ease: `easeBoth`,
      },
      0
    )
    revealTimeline.fromTo(bodyRef,
      { translateY: `189px`, opacity: 0 },
      {
        translateY: 0,  
        opacity: 1,
        duration: 1.55,
        ease: `easeBoth`,
      },
      0
    )
    revealTimeline.to(imageMask,
      { height: `0%`, 
        duration: 1.55,
        ease: `easeBoth` },
      0
    )
    revealTimeline.fromTo(imageWrappers,
      { scale: 1.4  },
      { scale: 1, duration: 1.55, ease: `easeBoth`  },
      0
    )
    revealTimeline.fromTo(bodyUnderline1,
      { width: `0%`}, 
      {
        width: `100%`,
        duration: 0.9,
        ease: `easeBoth` },
      1.5
    )
    revealTimeline.fromTo(bodyUnderline2,
      { width: `0%` },
      {
        width: `100%`,
        duration: 0.6,
        ease: `easeBoth` },
      2.2
    )
  }, [])

  return (
    <section className="YourStory PageSection section">
      <div className="YourStory__wrapper">
        <h1 className="YourStory__heading" ref={el => headingRef = el}>
          your story is our mission
        </h1>
        <p className="YourStory__body" ref={el => bodyRef = el}>
          With over&nbsp;
          <span className="YourStory__body--underline">
            12 years of experience in videography and
            <span className="YourStory__body--underline-inline" ref={el => bodyUnderline1 = el}></span>
          </span> 
          <span className="YourStory__body--underline">
            photography
            <span className="YourStory__body--underline-inline" ref={el => bodyUnderline2 = el}></span>
          </span> 
          &nbsp;on the hands of our hard-working staffs, our mission is to create the best experience for the best moment of your life inspired by the story of you two, whether it's that first coffee they offered you, or the uncontrollable laughs that bonded you two together.
        </p>
        {
          images.map((img, index) => {
            return (
              <div 
                className={`YourStory__img YourStory__img-${index+1}`}
                key={`YourStory-img-${index+1}`}
              >
                <div 
                  className="YourStory__img-wrapper" 
                  ref={el => imageWrappers[index] = el}
                >
                  <Image 
                    className={`YourStory__img-fluid YourStory__img-fluid-${index+1}`}
                    alt={`YourStory image ${index+1}`} 
                    fluid={img.fluid}
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default YourStory