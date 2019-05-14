import {createStore} from "redux"
var sum=0
var Sum=[]
var defaultState={
    list:[],
    addSum:0
}
const store=createStore((state=defaultState,action)=>{
    const {type,payload}=action
    switch (type) {
        case 'Newlist':
        return {...state,list:payload}
        case 'addnumber':
        return {...state,list:payload}
        case 'jiannumber':
        return {...state,list:payload}
        case 'NUMBERADD':
        return {...state,list:payload}
        // case 'Number':
        // sum=0
        // payload.forEach((item,index)=>{
        //     Sum.splice(index,1,item.sum)
        // })
        // if (!payload.length){
        //     Sum = []
        // }
        // for(let i=0;i<Sum.length;i++){
        //     sum+=Sum[i]
        //     return {...state,addSum:sum}
        // }
        default:
        return state
    }
})
export default store