import {CHANGEARCHIVESINFO} from '../mutation-types'
export default {
	state:{
		archivesShow: false, //展示档案弹窗
		archivesList: [] //档案列表
	},
    mutations:{
    	[CHANGEARCHIVESINFO](state,{value,index}){
    		state.archivesList[index]=value
    	}
    },
    actions:{
    	async [CHANGEARCHIVESINFO]({commit},payload){
    		// let data = await getdata()
    		// 提交更新的数据
    		commit('CHANGEARCHIVESINFO',payload)
    	}
    }
}
