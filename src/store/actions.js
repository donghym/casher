const actions = {
	changeGoodsNum:(context,payload)=>{
		context.commit('computeSinglePrice',payload)
	}
}

export default actions

