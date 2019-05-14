import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import Map from "./config"


class RouterView extends React.Component{
    render(){
        const maparr=this.props.routes?this.props.routes:Map
        const defaultComp=<Route key={1} path="/" component={()=>{
            return <Redirect to="/home"></Redirect>
        }} exact></Route>
        return <Switch>
            {
                maparr.map((item,index)=>{
                    const Comp=item.component
                   return <Route path={item.path} key={index} component={(api)=>{
                       return item.children?<Comp routes={item.children} {...api}></Comp>:<Comp {...api}></Comp>
                   }}></Route> 
                }).concat(defaultComp)
            }
        </Switch>
    }
}

export default RouterView