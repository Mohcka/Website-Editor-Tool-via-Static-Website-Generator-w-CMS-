import CMS from "netlify-cms-app"
import React, { Component } from "react"
import PropTypes from "prop-types"

class Test extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: "",
  }

  render() {
    const { forID, value, onChange, classNameWrapper } = this.props

    return (
      <input
        type="text"
        id={forID}
        defaultValue={value || ""}
        className={classNameWrapper}
        onChange={e => onChange(e.target.value)}
      />
    )
  }
}

CMS.registerWidget("test", Test)
