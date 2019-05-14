import Home from "../component/home"
import A from "../component/A"
import B from "../component/B"
const list=[{
    path:'/home',
    component:Home,
    children:[{
        path:'/home/a',
        component:A
    },{
        path:'/home/b',
        component:B  
    }]
}]

export default list