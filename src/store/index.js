import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        title:'',
        isLeft: true,
        isRight: false,
        rightIcon: '',
        rightClick: false
    },
    getters: {

    },
    mutations: {
        setTitle(state,val){
            state.title = val
        },
        setIsLeft(state,val){
            state.isLeft = val
        },
        setIsRight(state,val){
            state.isRight = val
        },
        setRightIcon(state,val){
            state.rightIcon = val
        },
        setRightClick(state,val){
            state.rightClick = val
        }
    },
    actions: {

    }
})
