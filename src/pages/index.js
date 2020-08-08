import React from "react"
import ReactFullpage from "@fullpage/react-fullpage"

import "./index.scss"
import { AppContextProvider } from "../contexts/AppContext"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import Hero from "../sections/Hero"
import YourStory from "../sections/YourStory"
import YourFuture from "../sections/YourFuture"
import TellUs from "../sections/TellUs"

import "../animations/easings"

const IndexPage = () => (
  <AppContextProvider>
    <Layout>
      <SEO title="Home" />
      <ReactFullpage
        licenseKey={process.env.GASTBY_APP_FULLPAGE_LICENSE}
        navigation
        scrollBar={true}
        scrollingSpeed={1000}
        normalScrollElements={`.Menu, #TellUs-story`}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <Hero />
              <YourStory />
              <YourFuture />
              <TellUs />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </Layout>
  </AppContextProvider>
)

export default IndexPage
