import React, { Component } from 'react'
import BScroll from 'better-scroll'
import data from "../data/order"
import { connect } from "react-redux"
import Bottoms from "./bottom"
var rightscroll = null
let scroll = null
var arr = []
var Sum = 0
class home extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            flag: null,

        }
    }
    componentDidMount() {
        this.refs.mark.style.display = "none"
        this.props.dispatch({ type: 'Newlist', payload: data.data })
        let wrapper = document.querySelector('.Leftlist')
        let seting_box = document.querySelector('.seting_box')
        scroll = new BScroll(wrapper, {
            click: true
        })
        rightscroll = new BScroll(seting_box, {
            click: true
        })
    }
    colse() {
        this.refs.mark.style.display = "none"
        this.refs.ipt.style.bottom = "-200" + "px"

    }
    tabclick(e) {
        var ind = e.target.getAttribute("data-ind")
        this.setState({
            index: ind
        }, () => {
            rightscroll.refresh()
            rightscroll.scrollToElement('.box' + this.state.index, 300)
        })
    }
    jian(item, ind, index) {
        var Productlist = this.props.state.list
        if (arr.indexOf(item) != -1) {
            Productlist.categoryList[index].spuList[ind].ind = ind
            Productlist.categoryList[index].spuList[ind].index = index
            Productlist.categoryList[index].spuList[ind].saleVolume -= 1
            Productlist.categoryList[index].spuList[ind].sum = Productlist.categoryList[index].spuList[ind].saleVolume * Productlist.categoryList[index].spuList[ind].currentPrice
            if (Productlist.categoryList[index].spuList[ind].saleVolume == 0) {
                var xiabiao = arr.indexOf(Productlist.categoryList[index].spuList[ind])
                arr.splice(xiabiao, 1)
            }
            this.props.dispatch({ type: 'jiannumber', payload: Productlist })
        } else {
            arr.push(Productlist.categoryList[index].spuList[ind])
            Productlist.categoryList[index].spuList[ind].ind = ind
            Productlist.categoryList[index].spuList[ind].index = index
            Productlist.categoryList[index].spuList[ind].saleVolume -= 1
            Productlist.categoryList[index].spuList[ind].sum = Productlist.categoryList[index].spuList[ind].saleVolume * Productlist.categoryList[index].spuList[ind].currentPrice
            if (Productlist.categoryList[index].spuList[ind].saleVolume == 0) {
                var xiabiao = arr.indexOf(Productlist.categoryList[index].spuList[ind])
                arr.splice(xiabiao, 1)
            }
            this.props.dispatch({ type: 'jiannumber', payload: Productlist })
        }
    }
    add(item, ind, index) {
        var Productlist = this.props.state.list
        if (arr.length <= 0) {
            Productlist.categoryList[index].spuList[ind].ind = ind
            Productlist.categoryList[index].spuList[ind].index = index
            arr.push(Productlist.categoryList[index].spuList[ind])
            Productlist.categoryList[index].spuList[ind].saleVolume += 1
            Productlist.categoryList[index].spuList[ind].sum = Productlist.categoryList[index].spuList[ind].saleVolume * Productlist.categoryList[index].spuList[ind].currentPrice
            this.props.dispatch({ type: 'addnumber', payload: Productlist })
        } else {
            if (arr.indexOf(item) != -1) {
                Productlist.categoryList[index].spuList[ind].ind = ind
                Productlist.categoryList[index].spuList[ind].index = index
                Productlist.categoryList[index].spuList[ind].saleVolume += 1
                Productlist.categoryList[index].spuList[ind].sum = Productlist.categoryList[index].spuList[ind].saleVolume * Productlist.categoryList[index].spuList[ind].currentPrice
                this.props.dispatch({ type: 'addnumber', payload: Productlist })
            } else {
                Productlist.categoryList[index].spuList[ind].ind = ind
                Productlist.categoryList[index].spuList[ind].index = index
                arr.push(Productlist.categoryList[index].spuList[ind])
                Productlist.categoryList[index].spuList[ind].saleVolume += 1
                Productlist.categoryList[index].spuList[ind].sum = Productlist.categoryList[index].spuList[ind].saleVolume * Productlist.categoryList[index].spuList[ind].currentPrice
                this.props.dispatch({ type: 'addnumber', payload: Productlist })
            }

        }
    }
    handle(data) {
        this.setState({
            flag: data
        }, () => {
            if (this.state.flag) {
                this.refs.mark.style.display = "block"
                this.refs.ipt.style.bottom = "45" + "px"
            } else {
                this.refs.mark.style.display = "none"
                this.refs.ipt.style.bottom = "-200" + "px"
            }
        })
    }
    smalladd(item) {
        var Productlist = this.props.state.list
        Productlist.categoryList[item.index].spuList[item.ind].saleVolume += 1
        Productlist.categoryList[item.index].spuList[item.ind].sum = Productlist.categoryList[item.index].spuList[item.ind].saleVolume * Productlist.categoryList[item.index].spuList[item.ind].currentPrice
        this.props.dispatch({ type: 'NUMBERADD', payload: Productlist })
    }
    jianadd(item, index) {
        var Productlist = this.props.state.list
        if (Productlist.categoryList[item.index].spuList[item.ind].saleVolume > 0) {
            Productlist.categoryList[item.index].spuList[item.ind].saleVolume -= 1
            Productlist.categoryList[item.index].spuList[item.ind].sum = Productlist.categoryList[item.index].spuList[item.ind].saleVolume * Productlist.categoryList[item.index].spuList[item.ind].currentPrice
        }
        if (Productlist.categoryList[item.index].spuList[item.ind].saleVolume <= 0) {
            arr.splice(index, 1)
        }
        this.props.dispatch({ type: 'NUMBERADD', payload: Productlist })
    }
    render() {
        return (
            <div className="info">
                <div className='Leftlist'>
                    <ul className="uls">
                        {
                            this.props.state.list.categoryList ? this.props.state.list.categoryList.map((item, index) => {
                                return <li onClick={this.tabclick.bind(this)} key={index} data-ind={index} className={index * 1 === this.state.index * 1 ? 'ls active box' + this.state.index : 'ls'}>{item.categoryName}</li>
                            }) : ''
                        }
                    </ul>
                </div>
                <div className='rightbox'>
                    <div className="seting_box">
                        <div className="small_box">
                            {
                                this.props.state.list.categoryList ? this.props.state.list.categoryList.map((item, index) => {
                                    return item.spuList.map((val, ind) => {
                                        return <ul key={ind} data-indexs={ind}>
                                            <h6 className={ind === 0 ? "show box" + index : 'hide'}>{item.categoryName}</h6>
                                            <li className="seting_lis">
                                                <dl className="dl">
                                                    <dt><img className="imgs" src={val.bigImageUrl} alt="" /></dt>
                                                    <dd className="dd">
                                                        <p className="title">{val.spuName}</p>
                                                        <p className="titles">{val.spuDesc}</p>
                                                        <div className="buttons">
                                                            <p className="price">{val.currentPrice + '元'}</p>
                                                            <div className="boxse">
                                                                <p className={val.saleVolume <= 0 ? 'jian hides' : 'shows jian'} onClick={this.jian.bind(this, val, ind, index)}>-</p>
                                                                <p className={val.saleVolume <= 0 ? 'number hides' : 'shows number'}>{val.saleVolume}</p>
                                                                <p className="jia" onClick={this.add.bind(this, val, ind, index)}>+</p></div>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    })
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
                <Bottoms handle={this.handle.bind(this)} array={arr} />
                <div className="mark" onClick={this.colse.bind(this)} ref="mark">

                </div>
                <div className="fixed" ref="ipt">
                    <ul className={arr.length > 0 ? 'ulssx' : 'center'}>
                        {
                            arr.length > 0 ? arr.map((item, index) => {
                                return <li key={index} className="lisex">
                                    <div className="carlists">
                                        <p>{item.spuName}</p>
                                    </div>
                                    <div className="rightcarliser">
                                        <p className="Prices">{"￥" + item.currentPrice * item.saleVolume}</p>
                                        <p className='jian a' onClick={this.jianadd.bind(this, item, index)}>-</p>
                                        <p className='number a'>{item.saleVolume}</p>
                                        <p className="jia a" onClick={this.smalladd.bind(this, item)}>+</p>
                                    </div>
                                </li>
                            }) : <div className="nulls">
                                    <img className="icon" src={require('../data/meiyoudingdan-01.png')} alt="" />
                                    <p className="kong">暂无物品</p>
                                </div>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ((state) => {
    return {
        state
    }
})
export default connect(mapStateToProps)(home)
