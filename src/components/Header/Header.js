import React, { useRef, useEffect } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import gsap from "gsap"

import CovaLogo from "../../assets/icons/cova-logo.svg"
import "./Header.scss"

import Hamburger from "../Hamburger"

const Header = () => {
  let headerRef = useRef(null)

  useEffect(() => {
    let revealTimeline = gsap.timeline({ paused: true, delay: 0.2 })
    revealTimeline.from(headerRef, 
      { translateY: "-100px", opacity: 0, duration: 1.2, ease: `easeBoth` },
      0
    )
    revealTimeline.play()
  }, [])

  return (
    <header className="Header" ref={el => headerRef = el}>
      <Link to="/">
        <CovaLogo />
      </Link>
      <Hamburger />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
