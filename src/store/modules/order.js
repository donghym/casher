import {CHANGEORDERNUMBER,ADDGOODSTOORDER} from '../mutation-types'
export default {
	state:{
		orderList: [], //订单列表
		goodsCategory: [], //订单商品列表里的种类
		index: 0 //订单列表选中行
	},
    mutations:{
    	[ADDGOODSTOORDER](state,{orderList}){
    		state.orderList = state.orderList.concat(orderList)
    		state.index = state.orderList.length
    	},
        [CHANGEORDERNUMBER](state,{value,index}){
            let {orderList} = state;
            if(!value){
                orderList = orderList.splice(index,1)
                return false
            }
            let currentOrder = orderList[index]
            currentOrder.orderNum = value
            if(value>=currentOrder.groupNum){
                currentOrder.SingleTotalPrice = (currentOrder.groupPrice/currentOrder.groupNum)*value.toFixed(2)
            }else{
                currentOrder.SingleTotalPrice = (currentOrder.price*value).toFixed(2)
            }
            currentOrder.discounted = (currentOrder.price*value-currentOrder.SingleTotalPrice).toFixed(2)
            state.orderList[index] = currentOrder
            // state.orderList[index].name='454'+value
        }

    },
    actions:{
    }
}
