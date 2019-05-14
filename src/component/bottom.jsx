import React, { Component } from 'react'
import {connect} from "react-redux"
var sum=0
var Sum=[]
 class bottom extends Component {
    constructor(props){
        super(props)
        this.state={
          flag:false
        }
    }
    handles(){
      this.setState({
        flag:true
      },()=>{
        this.props.handle(this.state.flag)
      })
    }
  render() {
    this.props.array.forEach((item,index)=>{
      Sum.splice(index,1,item.sum)
    })
    if(!this.props.array.length){
      Sum=[]
    }
    sum=0
   Sum.forEach((i,k)=>{
     sum+=i
   })
   console.log(sum)
      return (
        <div className="bottoms">
              <div className="car">
              <p className="titlesec" onClick={this.handles.bind(this)}>购物车</p>
              <p className={this.props.array.length<=0?'hidese numbers ':'showser numbers'}>{this.props.array.length}</p>
              </div>
              <div className="addPrice">
                  <p className="addresPrice">总价:{sum}</p>
              </div>
        </div>
      )

  }
}
const MapStateToProps=((state)=>{
  return state
})
export default connect(MapStateToProps)(bottom)

