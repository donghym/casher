const mutation = {
	 computeSinglePrice:(state,payload)=>{
	 	debugger
	 	console.log(payload)
  		let {orderList} = state;
  		orderList.map(v=>{
	  		if(v.orderNum>=v.groupNum){
				return v.SingleTotalPrice = (v.groupPrice/v.groupNum)*v.orderNum.toFixed(2)
	  		}else{
	      		return v.SingleTotalPrice = (v.price*v.orderNum).toFixed(2)
	  		}
  		})
	}
}
export default mutation