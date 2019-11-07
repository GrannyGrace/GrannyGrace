import React from 'react'
import './homepage.css'

const Homepage = props => {
  return (
    <>
      <div className="row">
        <div className="image-container">
          <img
            className="apple-banner"
            alt="apple-banner"
            src="/apples_banner.jpg"
          />
          <div className="centered">
            <span className="top-title-row">APPLES FOR ALL</span>
            <span className="bottom-title-row">
              DISTRIBUTING HIGH QUALITY APPLES NATION-WIDE
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
