import CMS from "netlify-cms-app"
import * as FontawesomeWidget from "netlify-cms-widget-fontawesome"

import React, { Component } from "react"
import PropTypes from "prop-types"

import { SketchPicker } from "react-color"

CMS.registerWidget(
  "fontawesome",
  FontawesomeWidget.Solid,
  FontawesomeWidget.Preview
);

class ColorPickerWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: "#fff",
    }

    this.handleColorChange = this.handleColorChange.bind(this)
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: "",
  }

  componentDidMount() {
    this.setState({ background: this.props.value || "#fff" })
  }

  handleColorChange = color => {
    this.setState({ background: color.hex })
    this.props.onChange(color.hex)
    console.log(this.state.background)
  }

  render() {
    const { forID, classNameWrapper } = this.props

    return (
      <>
        <SketchPicker
          color={this.state.background}
          onChangeComplete={this.handleColorChange}
        />
        <input
          type="text"
          style={{ display: "none" }}
          id={forID}
          value={this.state.background}
          className={classNameWrapper}
          readOnly
        />
      </>
    )
  }
}

CMS.registerWidget("colorpicker", ColorPickerWidget)
