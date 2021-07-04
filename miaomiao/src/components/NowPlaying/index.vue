<template>
 	<div  class="movie_body" ref="movie_body">
		 <Loading v-if="isLoading"/>
			<ul v-else>
				<li id="d" calss="pulldown">{{pullDownMsg}}</li>
				<li v-for="data in filmlist" :key="data.filmId">
					<div class="pic_show" @touchstart="handleToDetail(data.filmId)"><img :src="data.poster"></div>
					<div class="info_list">
						<h2 @touchstart="handleToDetail(data.filmId)">{{data.name}}<img src="@/assets/maxs.png" v-if="data.filmType.value===2"></h2>
						<p>观众评 <span class="grade">{{data.grade}}</span></p>
						<p>主演: {{data.actors|actorfilter}}</p>
						<p>{{data.synopsis}}</p>
					</div>
					<div class="btn_mall">
						购票
					</div>
				</li>
			</ul>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import Vue from 'vue'
Vue.filter("actorfilter",function(data){
	var actorlist = data.map(item=>item.name)
	return actorlist.join(' ')
})
export default {
	name: 'nowplaying',
	data(){
		return {
			filmlist:[],
			actor: [],
			pullDownMsg:'',
			isLoading:true,
			prevCityId: -1
		}
	},
	methods : {
		handleToDetail(movieId){
			// console.log(movieId)
			this.$router.push('/movie/detail/1/'+movieId)
		}
	},
	activated(){
		// console.log(this.prevCityId)
		var cityId = this.$store.state.city.cityId;
		if(this.prevCityId === cityId){return;}
		this.isLoading=true
		console.log(this.prevCityId)
		axios({
			url:'https://m.maizuo.com/gateway?cityId='+cityId+'&pageNum=1&pageSize=10&type=1&k=4422608',
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606015092418054936723457","bc":"440100"}',
				'X-Host': 'mall.film-ticket.film.list'}
		}).then(res=>{
			var res = res.data.data
			console.log(res);
			this.filmlist = res.films
			console.log(this.filmlist)
			this.isLoading=false
			this.prevCityId=cityId
			this.$nextTick(()=>{
				var scroll = new BScroll(this.$refs.movie_body , {
					tap: true,
					probeType : 1
				}); //等数据渲染完成时再调用
				var d=document.getElementById("d")
						d.style.display="none";
				scroll.on('scroll',(pos)=>{
					// console.log("22")
					if(pos.y>30){
						this.pullDownMsg="正在更新...."
						var d=document.getElementById("d")
						d.style.display="block";
					}
				});

				scroll.on('touchEnd',(pos)=>{
					// console.log("33")
					if(pos.y>30){
						this.pullDownMsg="更新成功"
						setTimeout(()=>{
							this.pullDownMsg=""
							var d=document.getElementById("d")
							d.style.display="none";
							// document.getElementsByClassName('pulldown').style.display='none'
						},1000)
					}
				})
				
			});
		})

	},
	
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pulldown{margin: 0; padding: 0;border: none;display: none;}
</style>