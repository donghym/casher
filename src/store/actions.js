const actions = {
	changeGoodsNum:(context,payload)=>{
		context.commit('COMPUTESINGLEPRICE',payload)
	}
}
export default actions

