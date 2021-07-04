<template>
  <div>
    <div>个人中心</div>
      <div>当前用户:{{$store.state.user.name}}</div><a href="javascript:;" @click="handleToLogout">退出</a>
      <div v-if="$store.state.user.isAdmin">用户身份：管理员<a href="/admin" target="_blank">进入管理后台</a></div>
      <div v-else>用户身份：普通会员</div>
      <div>
        <input type="file" name="file" value="上传头像" @change="handleToUpload">
        <img class="userHead" :src="$store.state.user.userHead">
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {messageBox} from '@/components/JS'
export default {
    name: 'center',
    methods:{
      handleToLogout(){
        this.axios.get('/api2/users/logout').then((res)=>{
          // console.log(res)
          var status = res.data.status;
          if(status === 0){
            localStorage.removeItem('name');
            localStorage.removeItem('isAdmin');
            this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''}) //退出时数据回到默认值
            this.$router.push('/mine/login');
          }
        })
      },
      handleToUpload(ev){
        var file = ev.target.files[0];
        var param = new FormData();
        param.append('file',file,file.name);//在param里添加file
        var config = {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
        this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
          var status = res.data.status;
          if(status===0){
            messageBox({
              title:'信息',
              content:'头像上传成功',
              ok:'确定',
              handleOk(){
                this.$store.commit('user/USER_NAME',{
                  userHead : res.data.data.userHead,
              });
              }
            })
          }else{
            messageBox({
              title:'信息',
              content:'头像上传失败',
              ok:'确定'
          })
          }
      })}
    },
    beforeRouteEnter ( to, from, next){
      axios.get('/api2/users/getUser').then((res)=>{
        console.log(res)
        var status = res.data.status;
        if(status === 0 ){
          next(vm=>{
            localStorage.setItem('name',res.data.data.username);
            localStorage.setItem('isAdmin',res.data.data.isAdmin);
            vm.$store.commit('user/USER_NAME',{
              name:res.data.data.username,
              isAdmin : res.data.data.isAdmin,
              userHead : res.data.data.userHead,
              });
          });
        }else{
          next('/mine/login');
        }
      })
    }
}
</script>

<style scoped>
    .userHead{width: 50px;height: 50px;border-radius: 50px;overflow: hidden;}
</style>