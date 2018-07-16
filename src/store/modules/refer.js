import {COMPUTESINGLEPRICE} from '../mutation-types'
export default {
	state:{
		archivesShow: false, //展示档案弹窗
		archivesList: [], //档案列表
        mergeOrder: false //合并条形码 相同的商品
	},
    mutations:{
        [COMPUTESINGLEPRICE](state){//这里的state对应着上面这个state
            state.archivesShow = state.archivesShow?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    },
    actions:{
        [COMPUTESINGLEPRICE](context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('COMPUTESINGLEPRICE');
        },
    }
}
