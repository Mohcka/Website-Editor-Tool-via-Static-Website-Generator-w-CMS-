import CMS from "netlify-cms-app"
import React from "react"

const Test = props => <input type="text" defaultValue={`${props.vlaue}`} />

CMS.registerWidget("test", Test)
