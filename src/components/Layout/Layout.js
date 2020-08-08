/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import "./Layout.scss"
import Header from "../Header"
import Menu from "../Menu"

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      <Menu />
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
