import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import gsap from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"

import "./YourFuture.scss"

gsap.registerPlugin(CSSRulePlugin)

const YourFuture = () => {
  const data = useStaticQuery(graphql`
    query YourFutureImages {
      allImageSharp(filter: {fluid: {originalName: {regex: "/YourFuture.*/"}}}, sort: {fields: fluid___originalName}) {
        nodes {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)
  const images = data.allImageSharp.nodes
  let heading = useRef(null)
  let body = useRef(null)
  let underline = useRef(null)
  let imageWrappers = [React.createRef(), React.createRef()]

  useEffect(() => {
    let imageMask = CSSRulePlugin.getRule(`.YourFuture__img:after`)
    let revealTimeline = gsap.timeline({
      scrollTrigger: { trigger: `.YourFuture` }
    })
    revealTimeline.from([heading, body],
      {
        translateY: `120px`,
        opacity: 0,
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
    revealTimeline.fromTo(underline,
      { width: `0%`}, 
      {
        width: `100%`,
        duration: 0.9,
        ease: `easeBoth` },
      1.5
    )
  }, [])

  return (
    <section className="YourFuture PageSection section">
      <div className="YourFuture__wrapper">
        <h1 className="YourFuture__heading" ref={el => heading = el}>your future is our success</h1>
        <p className="YourFuture__body" ref={el => body = el}>
          Roses are red.<br />
          Violets are blue.<br />
          <span className="YourFuture__body--underline">
            Just fall in love.<span className="YourFuture__body--underline-inline" ref={el => underline = el}></span>
          </span><br/>
          We're rooting for you.<br />
        </p>
        {
          images.map((img, index) => {
            return (
              <div 
                className={`YourFuture__img YourFuture__img-${index+1}`}
                key={`YourFuture-img-${index+1}`}
              >
                <div 
                  className="YourFuture__img-wrapper" 
                  ref={el => imageWrappers[index] = el}
                >
                  <Image 
                    className={`YourFuture__img-fluid YourFuture__img-fluid-${index+1}`}
                    alt={`YourFuture image ${index+1}`} 
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

export default YourFuture