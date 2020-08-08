import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import gsap from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"

import "./TellUs.scss"

import CovaStudioLogo from "../../assets/icons/cova-studio-logo.svg"
import InstagramIcon from "../../assets/icons/logo-instagram.svg"
import FacebookIcon from "../../assets/icons/logo-facebook.svg"
import TwitterIcon from "../../assets/icons/logo-twitter.svg"

import Navigation from "../../components/Navigation"
import Socials from "../../components/Socials"

gsap.registerPlugin(CSSRulePlugin)

const navItems = [
  { name: `stories`, href: `#` },
  { name: `services`, href: `#` },
  { name: `contact us`, href: `#` }
]

const socials = [
  { name: `Instagram`, href: `#`, icon: <InstagramIcon /> },
  { name: `Facebook`, href: `#`, icon: <FacebookIcon /> },
  { name: `Twitter`, href: `#`, icon: <TwitterIcon /> }
]

const TellUs = () => {
  const data = useStaticQuery(graphql`
    query TellUsImages {
      allImageSharp(filter: {fluid: {originalName: {regex: "/TellUs.*/"}}}, sort: {fields: resolutions___originalName}) {
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
  let nameField = useRef(null)
  let emailField = useRef(null)
  let storyField = useRef(null)
  let sendBtn = useRef(null)
  let imageWrappers = [React.createRef(), React.createRef()]
  let logo = useRef(null)
  let navigationRefs = navItems.map(() => React.createRef())
  let emailLink = useRef(null)
  let socialRefs = socials.map(() => React.createRef())
  let footerDivider = useRef(null)

  useEffect(() => {
    let imageMask = CSSRulePlugin.getRule(`.TellUs__img:after`)
    let revealTimeline = gsap.timeline({
      scrollTrigger: `.TellUs`
    })

    revealTimeline.from(heading,
      {
        translateY: 90,
        opacity: 0,
        duration: 0.8,
        ease: `easeBoth`
      }
    )
    revealTimeline.from([nameField, emailField, storyField, sendBtn],
      {
        translateY: 90,
        opacity: 0,
        duration: 0.8,
        stagger: {
          each: 0.2,
          ease: `easeBoth`
        }
      },
      0.15
    )
    revealTimeline.to(imageMask,
      { height: `0%`, 
        duration: 1.9,
        ease: `easeBoth` },
      0
    )
    revealTimeline.fromTo(imageWrappers,
      { scale: 1.4  },
      { scale: 1, duration: 1.9, ease: `easeBoth`  },
      0
    )
    revealTimeline.from(logo,
      { translateY: 20, opacity: 0, duration: 0.6, ease: `easeBoth` },
      0
    )
    revealTimeline.from(navigationRefs,
      {
        translateY: 20,
        opacity: 0,
        duration: 0.6,
        stagger: {
          each: 0.2,
          ease: `easeBoth`
        }
      },
      0.3
    )
    revealTimeline.from(emailLink,
      {
        translateY: 20,
        opacity: 0,
        duration: 0.6
      },
      0.8
    )
    revealTimeline.from(socialRefs,
      {
        translateY: 20,
        opacity: 0,
        duration: 0.6,
        stagger: {
          each: 0.2,
          ease: `easeBoth`
        }
      },
      0.9
    )
    revealTimeline.from(footerDivider,
      {
        width: `0%`,
        duration: 1.9,
        ease: `easeBoth`
      },
      0
    )
  }, [])

  return (
    <section className="TellUs PageSection section SectionContainer">
      <div className="TellUs__wrapper">
        <h1 className="TellUs__heading" ref={el => heading = el}>
          tell us your story
        </h1>
        <form className="TellUs__form">
          <div className="TellUs__form-field" ref={el => nameField = el}>
            <label htmlFor="TellUs-name">Name</label>
            <input type="text" name="name" id="TellUs-name" />
          </div>
          <div className="TellUs__form-field" ref={el => emailField = el}>
            <label htmlFor="TellUs-email">Email</label>
            <input type="email" name="email" id="TellUs-email" />
          </div>
          <div className="TellUs__form-field" ref={el => storyField = el}>
            <label htmlFor="TellUs-story">Story</label>
            <textarea
              name="story"
              id="TellUs-story"
            />
          </div>
          <button className="TellUs__form-btn" type="submit" ref={el => sendBtn = el} disabled>Send</button>
        </form>

        {
          images.map((img, index) => {
            return (
              <div 
                className={`TellUs__img TellUs__img-${index+1}`}
                key={`TellUs-img-${index+1}`}
              >
                <div 
                  className="TellUs__img-wrapper" 
                  ref={el => imageWrappers[index] = el}
                >
                  <Image 
                    className={`TellUs__img-fluid TellUs__img-fluid-${index+1}`}
                    alt={`TellUs image ${index+1}`} 
                    fluid={img.fluid}
                  />
                </div>
              </div>
            )
          })
        }

        <div className="Footer">
          <hr className="Footer__divider" ref={el => footerDivider = el} />
          <div className="Footer__wrapper">
            <div className="Footer__sitemap">
              <div ref={el => logo = el}>
                <CovaStudioLogo className="Footer__sitemap-logo" />
              </div>
              <Navigation navItems={navItems} refs={navigationRefs} />
            </div>
            <div className="Footer__contacts">
              <p className="Footer__contacts-email" ref={el => emailLink = el}>
                <Link to="/thank-you">hello@cova.studio</Link>
              </p>
              <Socials socials={socials} refs={socialRefs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TellUs