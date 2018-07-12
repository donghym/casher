import {COMPUTESINGLEPRICE} from './mutation-types'

export default {
	 [COMPUTESINGLEPRICE](state,{value,index} ){
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
	}
}
