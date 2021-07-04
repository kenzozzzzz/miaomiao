<template>
<div class="cinema_body">
    <Loading v-if="isLoading"/>
    <ul>
        <li v-for="data in cinemalist" :key="data.cinemaId">
            <div class="cinema_name">
                <span>{{data.name}}</span>
                <!-- <span class="q"><span class="price">22.9</span> 元起</span> -->
            </div>
            <div class="address">
                <div >{{data.address}}</div>
                <span>距离未知</span>
            </div>
            <div class="card">
                <div>小吃</div>
                <div>折扣卡</div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios'
// import BScroll from 'better-scroll'
export default {
    name : 'allcity',
    data(){
        return{
           cinemalist:[],
           isLoading:true,
           prevCityId:-1
        }
    },
    activated(){
		// console.log(this.prevCityId)
		var cityId = this.$store.state.city.cityId;
		if(this.prevCityId === cityId){return;}
		this.isLoading=true
		console.log(this.prevCityId)
        axios({
            url:'https://m.maizuo.com/gateway?cityId='+cityId+'&ticketFlag=1&k=741032',
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606015092418054936723457","bc":"440100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            console.log(res)
            var res = res.data.data.cinemas
            this.cinemalist=res
            this.isLoading=false
            this.prevCityId=cityId
            console.log(this.cinemalist)
            // var scroll = new BScroll(this.$refs.cinema_body , {
            //     movable: true,
            //     zoom: true
            // }); 
        })
    }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .cinema_name{ font-size: 20px;}
.cinema_body .address{ font-size: 13px; color:#666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.cinema_body .address div{float: left; width: 270px;height: 15px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>