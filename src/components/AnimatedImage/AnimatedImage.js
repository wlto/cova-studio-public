import React, { useRef } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"

import "./AnimatedImage.scss"

gsap.registerPlugin(CSSRulePlugin)

const AnimatedImage = ({ direction, duration, startAt, imageSrc, alt }) => {
  return (
    <div className="AnimatedImage">
      <img 
        src={imageSrc}
        alt={alt}
        className="AnimatedImage--image" 
        ref={el => yourFutureImageSelf = el}
      />
    </div>
  )
}

AnimatedImage.propTypes = {
  direction: PropTypes.oneOf([`leftToRight`, `topToBottom`, `rightToLeft`, `bottomToTop`]),
  duration: PropTypes.number,
  imageSrc: PropTypes.object.isRequired,
  alt: PropTypes.string
}

AnimatedImage.defaultProps = {
  direction: `leftToRight`,
  duration: 1,
  alt: `Alternative text`
}

export default AnimatedImage