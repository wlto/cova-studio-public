import React from "react"
import { Link } from "gatsby"

import "./Navigation.scss"

const Navigation = ({ navItems, refs }) => {
  return (
    <nav className="Navigation">
      <ul>
        {
          navItems && navItems.map((item, index) => (
            <li key={`navItem-${index}`} ref={el => refs[index] = el}>
              <Link to="/thank-you">{item.name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Navigation