<template>
  <div id="main">
      <Header title="喵喵电影"/>
      <div id="content">
          <div class="movie_menu">
            <router-link tag="div" to="/movie/city" class="city_name">
              <span>{{$store.state.city.name}}</span><i class="iconfont icon-lower-triangle"></i>
            </router-link>
            <div class="hot_swtich">
              <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
              <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上演</router-link>
            </div>
            <router-link tag="div" to="/movie/search" class="search_entry">
              <i class="iconfont icon-sousuo"></i>
            </router-link>
          </div>
          <keep-alive>
            <router-view/>
          </keep-alive>
      </div>
      <Tabbar />
      <router-view name="detail" />
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';
import {messageBox} from '@/components/JS'
export default {
  name:'Movie',
  components : {
    Header,
    Tabbar
  },
  props :['movieId'],
  mounted(){
   
  //  获取定位，重新渲染页面
    this.axios.get({
            url:'https://m.maizuo.com/gateway?k=3067947',
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606015092418054936723457"}',
            'X-Host': 'mall.film-ticket.city.list'
            }
        }).then((res)=>{
        messageBox({
          title : '定位',
          content : "广州",
          cancel : '取消',
          ok : '切换定位',
          handleOk(){
            window.localStorage.setItem('nowName',store.name);
            window.localStorage.setItem('nowcityId',id);
            window.location.reload();
          }
          })
        })
        
    // if(this.nowcityId.value!==440100){
    //   nowName="广州"
      // messageBox({
      //   title : '定位',
      //   content : "广州",
      //   cancel : '取消',
      //   ok : '切换定位',
      //   handleOk(){
      //     window.localStorage.setItem('nowName',store.name);
      //     window.localStorage.setItem('nowcityId',id);
      //     window.location.reload();
      //   }})
    // }
    // setTimeout(()=>{ //获取定位，重新渲染页面
    // this.axios.get({
    //         url:'https://m.maizuo.com/gateway?k=3067947',
    //         headers:{
    //             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606015092418054936723457"}',
    //         'X-Host': 'mall.film-ticket.city.list'
    //         }
    //     }).then((res)=>{
    //   var msg = res.data.msg;
    //   if(msg==='ok'){
    //      messageBox({
    //         title : '定位',
    //         content : res.data.data.name,
    //         cancel : '取消',
    //         ok : '切换定位',
    //         handleOk(){
    //           window.localStorage.setItem('nowName',name);
    //           window.localStorage.setItem('nowcityId',id);
    //           window.location.reload();
    //           }
    //       })
    //   }
    // })
    // },3000)
  }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>