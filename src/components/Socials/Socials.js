import React from "react"
import { Link } from "gatsby"

import "./Socials.scss"

const Socials = ({ socials, refs }) => {
  return (
    <ul className="Socials">
      {
        socials.map((social, index) => (
          <li 
            className="Socials-icon" 
            key={`Socials-${index}`}
            ref={el => refs[index] = el}
          >
            <Link to="/thank-you">
              {social.icon}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export default Socials