import React from "react"
import ReactDom from "react-dom"
import Routers from "./router/Routers"
import "./css/style.css"
import Store from "./store/index"
import {Provider} from "react-redux"
ReactDom.render(
    <div className="box">
    <Provider store={Store}>
    <Routers></Routers>
    </Provider>
    </div>,
    document.getElementById('root')
)