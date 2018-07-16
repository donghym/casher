import vue from 'vue';
import vuex from 'vuex';
import state from './state.js';
import getters from './getters.js';

import mutations from './mutations';
import actions from './actions';
import refer from './modules/refer';
import order from './modules/order';
import createLogger from 'vuex/dist/logger'; // 修改日志

vue.use(vuex);
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false

export default new vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        refer,
        order
    },
    plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
});