import React from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

import varStyles, { Title } from "./styles/FlakeTheme"

const ContactForm = props => (
  <Container>
    <div id="contact-form">
      <div className="title">
        <Title>
          <span>Contact Us</span>
        </Title>
      </div>
      <Form name="contact" method="POST" data-netlify="true">
          {/* This is needed for gatsby to let netlify process the form submission */}
          
          <Form.Control type="hidden" name="form-name" value="contact"/>

          <Row>
            <Col>
              <Form.Group controlId="nameField">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="phoneField">
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="email" placeholder="555 555 555" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="emailField">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="johndoe@yahoo.com" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
    </div>
  </Container>
)

export default ContactForm
// {
//   /* <input type="hidden" name="form-name" value="contact" /> */
// }
// {
//   /* <div className="form-group">
//             <label for="nameField">Your Name:</label>
//             <input
//               type="text"
//               name="name"
//               class="form-control"
//               id="nameField"
//             />
//           </div> */
// }
// {
//   /* <div className="form-group">
//             <label for="emailField">Your Email:</label>
//             <input
//               type="email"
//               name="email"
//               class="form-control"
//               id="emailField"
//             />
//           </div> */
// }
// {
//   /* <div className="form-group">
//             <label for="phoneField">Your Phone Number:</label>
//             <input
//               type="tel"
//               name="phone"
//               class="form-control"
//               id="phoneField"
//             />
//           </div> */
// }
// {
//   /* <div className="form-group">
//             <label for="message">Message:</label>
//             <textarea
//               className="form-control"
//               name="message"
//               id="message"
//             ></textarea>
//           </div> */
// }
// {
//   /* <p>
//             <button type="submit" className="btn btn-primary">
//               Send
//             </button>
//           </p> */
// }
