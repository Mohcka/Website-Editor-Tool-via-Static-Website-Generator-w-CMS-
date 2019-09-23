import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import varStyles, { Title } from "./styles/FlakeTheme"

const ContactForm = props => (
  <Container>
    <div id="contact-form">
      <div className="title">
        <Title>
          <span>Contact Us</span>
        </Title>
      </div>
      <form name="contact" method="POST" data-netlify="true">
        {/* This is needed for gatsby to let netlify process the form submission */}
        <input type="hidden" name="form-name" value="contact" />
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
          <label for="phoneField">Your Phone Number:</label>
          <input type="tel" name="phone" class="form-control" id="phoneField" />
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
