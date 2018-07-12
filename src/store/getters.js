const getters = {
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
				goodsPrice= Number(v.SingleTotalPrice)+goodsPrice
			})
			return {
				goodsNum:goodsNum,
				goodsPrice:goodsPrice.toFixed(2),
			}
		}
	}
}

export default getters