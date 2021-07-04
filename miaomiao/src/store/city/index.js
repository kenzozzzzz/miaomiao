const state = {
    name:window.localStorage.getItem('nowName')||'北京', //初始状态
    cityId :window.localStorage.getItem('nowcityId')||110100
};
const actions ={

};
const mutations = { //状态管理
    CITY_INFO(state,payload){
        state.name = payload.name;
        state.cityId = payload.cityId;
    }
};
export default {
    namespaced: true, //命名空间
    state,
    actions,
    mutations
}