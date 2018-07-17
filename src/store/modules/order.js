import {CHANGEORDERNUMBER,ADDGOODSTOORDER,CHANGEMARGE} from '../mutation-types'
export default {
	state:{
		orderList: [], //订单列表
		goodsCategory: [], //订单商品列表里的种类
		index: 0, //订单列表选中行
        mergeOrder: false //合并条形码 相同的商品
	},
    getters:{
        computeOrder:(state)=>{
            const {orderList} = state
            if(!orderList.length){
                return {
                    goodsNum:0,
                    goodsPrice:0,
                }
            }else{
                let goodsNum=0
                let goodsPrice=0
                orderList.forEach(v=>{
                    goodsNum= v.orderNum+goodsNum
                    goodsPrice= Number(v.singletotalprice)+goodsPrice
                })
                return {
                    goodsNum:goodsNum,
                    goodsPrice:goodsPrice.toFixed(2),
                }
            }
        }
    },
    mutations:{
    	[ADDGOODSTOORDER](state,{orderList}){
    		state.orderList = state.orderList.concat(orderList)
    		state.index = state.orderList.length
    	},
        [CHANGEORDERNUMBER](state,{value,index}){
            let {orderList} =  state;
            if(!value){
                orderList = orderList.splice(index,1)
                return false
            }
            const currentOrder = orderList[index]
            currentOrder.orderNum = value
            if(value>=currentOrder.groupNum){
                currentOrder.singletotalprice = (currentOrder.groupPrice/currentOrder.groupNum)*value.toFixed(2)
            }else{
                currentOrder.singletotalprice = (currentOrder.price*value).toFixed(2)
                currentOrder.discounted = (currentOrder.price*value-Number(currentOrder.singletotalprice)).toFixed(2)
            }
            state.orderList = orderList
        },
        changemarge(state){
            if(state.mergeOrder){
                let {orderList} = state;
                orderList=orderList.map(v=>{
                    
                })
            }
        }
    },
    actions:{
    }
}
