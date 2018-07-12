import vue from 'vue';
import vuex from 'vuex';
import state from './state.js';
import getters from './getters.js';

import mutation from './mutation';
import actions from './actions.js';
import cart from './modules/cart.js';
import products from './modules/products.js';
import createLogger from 'vuex/dist/logger'; // 修改日志

vue.use(vuex);
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false

export default new vuex.Store({
    state,
    getters,
    actions,
    mutation,
    modules: {
        cart,
        products
    },
    plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
});