import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
  state:{   //类似组件中data
    userDetail:{},
  },
  getters:{
    // getUserName:function(state){
    //   return state.userDetail.fore.name;
    // }
  },
  //操作state 通过mutations的方法操作
  mutations:{
    setUserDetail(state,userDetail){
      state.userDetail=userDetail;
    },
  },
})

export default store
