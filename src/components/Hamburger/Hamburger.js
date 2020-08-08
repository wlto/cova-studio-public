import React, { useContext, useState, useEffect, useRef } from "react"
import gsap from "gsap"

import "./Hamburger.scss"
import { AppContext } from "../../contexts/AppContext"

const Hamburger = () => {
  const { state, dispatch } = useContext(AppContext)
  const [disabled, setDisabled] = useState(false)
  let hamburgerSpan1 = useRef(null)
  let hamburgerSpan2 = useRef(null)

  useEffect(() => {
    if (state.menuVisible) {
      gsap.to(hamburgerSpan1, {
        transform: "translateY(5px)",
        backgroundColor: "#FF8D8D",
        boxShadow: "0 0 20px 0 #ccc"
      })
      gsap.to(hamburgerSpan2, {
        transform: "translateY(-5px)",
        backgroundColor: "#FF8D8D",
        boxShadow: "0 0 20px 0 #ccc"
      })
    } else {
      gsap.to([hamburgerSpan1, hamburgerSpan2], {
        transform: "translateY(0)",
        backgroundColor: "#000"
      })
    }
  }, [state.menuVisible])

  const toggleMenu = () => {
    if (!disabled) {
      setDisabled(true)
      dispatch({ type: `TOGGLE_MENU` })

      setTimeout(() => {
        setDisabled(false)
      }, 1200)
    }
  }

  return (
    <div className="Hamburger" onClick={toggleMenu}>
      <span ref={el => (hamburgerSpan1 = el)}></span>
      <span ref={el => (hamburgerSpan2 = el)}></span>
    </div>
  )
}

export default Hamburger