import {CHANGEARCHIVESINFO} from '../mutation-types'
import Vue from 'vue'
export default {
	state:{
		archivesShow: false, //展示档案弹窗
		archivesList: [] //档案列表
	},
    mutations:{
    	[CHANGEARCHIVESINFO](state,{value,index}){
    		state.archivesList.splice(index,1,value)
    	}
    },
    actions:{
    	[CHANGEARCHIVESINFO]({commit},payload){
    		// let data = await getdata()
    		// 提交更新的数据
    		commit('CHANGEARCHIVESINFO',payload)
    	}
    }
}
