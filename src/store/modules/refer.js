import {CHANGEARCHIVESINFO,GETARCHIVESINFO} from '../mutation-types'
import Vue from 'vue'
import Immutable  from 'immutable';
import { getarchives } from '../../service/getdata.js'
export default {
	state:{
        archivesShow: false, //展示档案弹窗
        archivesList: [] //档案列表
    },
    mutations:{
    	[CHANGEARCHIVESINFO](state,{value,index}){
    		state.archivesList.splice(index,1,value)
    	},
        [GETARCHIVESINFO](state,{data}){
            state.archivesList = data
        }
    },
    actions:{
    	[CHANGEARCHIVESINFO]({commit},payload){
    		// let data = await getdata()
    		// 提交更新的数据
    		commit('CHANGEARCHIVESINFO',payload)
    	},
        async [GETARCHIVESINFO]({commit},payload){ // 获取档案信息
            let data = await getarchives()
            commit('GETARCHIVESINFO',{data:data})
        }
    }
}
