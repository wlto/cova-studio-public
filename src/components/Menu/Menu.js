import React, { useContext, useEffect, useRef } from "react"
import gsap from "gsap"

import "./Menu.scss"
import { AppContext } from "../../contexts/AppContext"

import InstagramIcon from "../../assets/icons/logo-instagram.svg"
import FacebookIcon from "../../assets/icons/logo-facebook.svg"
import TwitterIcon from "../../assets/icons/logo-twitter.svg"

import Navigation from "../Navigation"
import Socials from "../Socials"

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

const Menu = () => {
  const { state, dispatch } = useContext(AppContext)
  let menuRef = useRef(null)
  let menuOverlayBgRef = useRef(null)
  let navigationRefs = navItems.map(() => React.createRef())
  let socialRefs = socials.map(() => React.createRef())
  let contactEmailRef = useRef(null)
  let copyrightRef = useRef(null)
  
  useEffect(() => {
    if (state.menuVisible) {
      let revealTimeline = gsap.timeline({ paused: true })
      revealTimeline.to(menuRef, { display: `flex`, duration: 0 })
      revealTimeline.to(menuOverlayBgRef, { height: `100vh`, transformOrigin: `right top`, duration: 0.4, ease: `easeBoth` })
      revealTimeline.fromTo(
        navigationRefs,
        { opacity: 0, 
          translateY: 80,
        },
        { opacity: 1, 
          translateY: 0, 
          duration: 0.66,
          stagger: { each: 0.22, ease: `easeBoth` } 
        },
        0.3
      )
      revealTimeline.fromTo(
        contactEmailRef,
        { translateX: 40, opacity: 0, rotateZ: 90 }, 
        { translateX: 0, opacity: 1, duration: 0.7 },
        0.75
      )
      revealTimeline.fromTo(
        socialRefs,
        { translateY: 50, opacity: 0, }, 
        { translateY: 0, opacity: 1, duration: 0.7 },
        0.9
      )
      revealTimeline.fromTo(
        copyrightRef,
        { translateY: 50, opacity: 0, }, 
        { translateY: 0, opacity: 1, duration: 0.7 },
        1.05
      )
      revealTimeline.play()
    } else {
      if (!state.initialLoad) {
        const hideTimeline = gsap.timeline()
        hideTimeline.fromTo(
          navigationRefs,
          { opacity: 1, translateY: 0, 
          },
          { opacity: 0, translateY: -140, 
            duration: 0.6,
            stagger: { each: 0.2, ease: `easeBoth` }
          },
        )
        hideTimeline.to(
          copyrightRef,
          { translateY: 50, opacity: 0, duration: 0.4, ease: `easeBoth` },
          0.05
        )
        hideTimeline.to(
          socialRefs,
          { translateY: 50, opacity: 0, duration: 0.4, ease: `easeBoth` },
          0.15
        )
        hideTimeline.to(
          contactEmailRef,
          { translateX: 40, opacity: 0, duration: 0.4, ease: `easeBoth` },
          0.25
        )
        hideTimeline.to(menuOverlayBgRef, { height: 0, duration: 0.9 }, 0.7)
        hideTimeline.to([menuRef], { display: `none`, duration: 0 })

        hideTimeline.play()
      }
    }
    dispatch({ type: `TURN_OFF_INITIAL_LOAD` })
  }, [state.menuVisible])
  
  return (
    <div className="Menu" ref={el => menuRef = el}>
      <div className="Menu--overlay-bg" ref={el => menuOverlayBgRef = el}></div>
      <div className="Menu--content PageSection">
        <Navigation navItems={navItems} refs={navigationRefs}/>
        <div className="Contacts">
          <p className="Contacts--email" ref={el => contactEmailRef = el}>
            <a href="mailto:hello@williamto.com">hello@cova.studio</a>
          </p>
          <Socials socials={socials} refs={socialRefs} />
          <p className="Copyright" ref={el => copyrightRef = el}>
            Copyright &copy; 2020 William To
          </p>
        </div>
      </div>
    </div>
  )
}

export default Menu