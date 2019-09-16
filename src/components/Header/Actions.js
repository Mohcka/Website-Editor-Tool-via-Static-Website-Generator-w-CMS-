import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import styleVars from "../styles/variables"

const Actions = props => {
  let data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "Settings" } } }
      ) {
        edges {
          node {
            frontmatter {
              address
              email
              phone
              title
              socialmedia {
                title
                type
                url
                icon
              }
            }
          }
        }
      }
    }
  `)

  let socialData = data.allMarkdownRemark.edges[0].node.frontmatter

  console.log(socialData)

  return (
    <div style={styleVars.darkBackground}>
      <div
        className="actions"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div className="contact-info">
          <ul>
            <li>
              <div className="address">
                <i class="fas fa-map-marker-alt"></i> {socialData.address}
              </div>
            </li>
            <li>
              <div className="phone">
                <i class="fas fa-phone"></i> {socialData.phone}
              </div>
            </li>
            <li>
              <div className="email">
                <i class="fas fa-envelope"></i> {socialData.email}
              </div>
            </li>
          </ul>
        </div>
        <div className="social-medias">
          <ul>
            {/* <li>
              <div className="fb-icon icon">
                <i class="fab fa-facebook-square"></i>
              </div>
            </li>
            <li>
              <div className="gp-icon icon">
                <i class="fab fa-google-plus"></i>
              </div>
            </li>
            <li>
              <div className="ig-icon icon">
                <i class="fab fa-instagram"></i>
              </div>
            </li> */}
            {socialData.socialmedia.map(s => {
              if (s.url)
                return (
                  <li>
                    <div className={`${s.type}-icon icon`}>
                      <a href={`${s.url}`} target="_blank">
                        <span
                          dangerouslySetInnerHTML={{ __html: s.icon }}
                        ></span>
                      </a>
                    </div>
                  </li>
                )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Actions
