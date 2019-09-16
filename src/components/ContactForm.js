import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import varStyles from "./styles/variables"

const ContactForm = props => (
  <Container>
    <div id="contact-form">
      <div className="title">
        <h2 style={varStyles.titleWrapperStyle}>
          <span style={varStyles.titleStyle}>Contact Us</span>
        </h2>
      </div>
      <form name="contact" method="POST" data-netlify="true">
        <div className="form-group">
          <label for="nameField">Your Name:</label>
          <input type="text" name="name" class="form-control" id="nameField" />
        </div>
        <div className="form-group">
          <label for="emailField">Your Email:</label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="emailField"
          />
        </div>
        <div className="form-group">
          <label for="emailField">Your Phone Number:</label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="emailField"
          />
        </div>
        <div className="form-group">
          <label for="message">Message:</label>
          <textarea
            className="form-control"
            name="message"
            id="message"
          ></textarea>
        </div>
        <p>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </p>
      </form>
    </div>
  </Container>
)

export default ContactForm
