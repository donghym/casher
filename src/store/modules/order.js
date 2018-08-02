import {CHANGEORDERNUMBER,ADDGOODSTOORDER} from '../mutation-types'
export default {
	state:{
        dialogcountorder: false, // 结算订单弹窗
		orderList: [], // 订单列表
        neworder: 1, // 计算列表
		goodsCategory: [], // 订单商品列表里的种类
		index: 0, // 订单列表选中行
        mergeOrder: false, // 合并条形码 相同的商品
        storageOrders: [], // 暂存的商品列表
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
            let orderlist = state.orderList.concat(orderList)
    		state.orderList = orderlist
    		state.index = orderlist.length-1
    	},
        [CHANGEORDERNUMBER](state,{value,index}){
            let {orderList} =  state;
            let _index = state.index
            if(!value){
                orderList.splice(index,1)
                if(_index>orderList.length-1){
                    state.index = orderList.length-1
                }
                return false
            }
            const currentOrder = orderList[index]
            currentOrder.orderNum = value
            if(value>=currentOrder.groupNum){
                currentOrder.singletotalprice = (currentOrder.groupPrice/currentOrder.groupNum)*value.toFixed(2)
                currentOrder.discounted = (currentOrder.price*value-Number(currentOrder.singletotalprice)).toFixed(2)
            }else{
                currentOrder.singletotalprice = (currentOrder.price*value).toFixed(2)
            }
        },
        addorder(state,{ordernum}){
            ordernum = ordernum.toFixed(2)
            state.orderList.push({
                "id": (1000000000+state.neworder),
                "name": "自定义商品-"+state.neworder,
                "category":['自定义商品-'+state.neworder],
                "desc": "自定义商品描述",
                "address": "自定义商家地址",
                "groupNum": 1,
                "orderNum":1,
                "singletotalprice": ordernum,
                "price": ordernum,
                "totalNum": 98,
                "groupPrice": ordernum
            })
            state.neworder++
        },
        changemarge(state){
            if(state.mergeOrder){
                let {orderList,index} = state;
                state.orderList = getNew(orderList)
                if(index>state.orderList.length-1){
                    state.index = state.orderList.length-1
                }
            }
        },
        deleteorder(state,payload){//删除当前选中商品
            state.orderList.splice(payload?payload.index:state.index,1)
            let {index,orderList} = state
            if(index>state.orderList.length-1){
                state.index= state.orderList.length-1
            }
        },
        deleteorders(state){ //清空购物车
            state.orderList=[]
        },
        changeSingleTotalPrice(state,{value,index}){
            const {orderList} =  state;
            orderList[index].singletotalprice = value
        },
        changeindex(state,{index}){
            state.index=index
        },
        stagingorders(state,{name}){ //暂存
            let {storageOrders,orderList} = state;
            if(orderList.length){
                state.storageOrders.push({name,orderList})
                state.orderList = []
            }
        },
        deletestagingorder(state,{index}){
            state.storageOrders.splice(index,1);
        },
        showstagingorder(state,{index}){
            let {storageOrders,orderList} = state;
            state.orderList = storageOrders[index].orderList
            this.commit('deletestagingorder',{index})
        },
        ordercount(state){
            this.$store.commit('deleteorders')
        },
        togglecountorder(state,{show}){
            state.dialogcountorder = show
        }

    },
    actions:{
    }
}
var isEqual = (a, b) => a.id === b.id
var getNew = old => old.reduce((acc, cur) => {
    let hasItem = acc.some(e => {
        let temp = isEqual(e, cur); 
        if (temp) e.orderNum+=cur.orderNum; 
        return temp; 
    });
    if (!hasItem) acc.push(cur)
    return acc; 
}, []);