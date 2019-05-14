import React,{Component} from "react"
import RouterView from "./RouterView"
import {BrowserRouter as Router} from "react-router-dom"
export default class Routers extends Component {
  render() {
    return (
      <Router>
          <RouterView routes={this.props.routes}></RouterView>
      </Router>
    )
  }
}
