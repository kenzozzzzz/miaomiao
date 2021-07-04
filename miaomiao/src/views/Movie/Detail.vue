<template>
  <div id="detailContainer" class="slide_enter_active">
    <Header title='影片详情'>
        <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading"/>
    <div v-else id="content" class="contentDetail">
        <div class="detail_list">
            <div class="detail_list_bg" :style="{'background-image': 'url('+filmdetailList.poster+')'}"></div>
            <div class="detail_list_filter"></div>
            <div class="detail_list_content">
                <div class="detail_list_img">
                    <img :src="filmdetailList.poster" alt="">
                </div>
                <div class="detail_list_info">
                    <h2>{{filmdetailList.name}}</h2>
                    <!-- <p>{{filmdetailList.item.name}}</p> -->
                    <p>{{filmdetailList.grade}}</p>
                    <p>{{filmdetailList.category}}</p>
                    <p>{{filmdetailList.nation}} / {{filmdetailList.runtime}}分钟</p>
                    <p>2020-11-16大陆上映</p>
                </div>
            </div>
        </div>
        <div class="detail_intro">
            <p>{{filmdetailList.synopsis}}</p>
        </div>
        <div class="detail_player swiper-container" ref="detail_player">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="(data,index) in filmdetailList.actors" :key='index'>
                    <div>
                        <img :src="data.avatarAddress" alt="">
                    </div>
                    <p>{{data.name}}</p>
                    <p>{{data.role}}</p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
export default {
    name: 'detail',
    data(){
        return{
            filmdetailList:[],
            isLoading:true
        }
    },
    components:{
        Header
    },
    props :['movieId'],
    methods:{
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        // console.log(this.movieId)
        axios({
            url:'https://m.maizuo.com/gateway?filmId='+this.movieId+'&k=6853751',
            headers:{
                   'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606015092418054936723457","bc":"340800"}',
                   'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res=>{
            console.log(res)
            var msg = res.data.data.film
            this.filmdetailList=msg
            console.log(this.filmdetailList)
            this.isLoading=false
            this.$nextTick(()=>{
                new Swiper(this.$refs.detail_player,{
                    slidesPerView :'auto',
                    freeMode : true,
                    freeModeSticky:true
                })
            })
        })
    }
}
</script>

<style>
    #detailContainer{position: absolute;left:0 ;top: 0;z-index: 100;width: 100%;min-height: 100%;background: white;}
    #detailContainer.slide_enter_active{ animation: .3s slideMove;}
    @keyframes slideMove{
        0%{transform:translateX(100%);}
        100%{transform: translateX(0);}
    }
    #content.contentDetail{ display: block; margin-bottom:0;}
    #content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
    .detail_list .detail_list_bg{ width:100%; height:100%;  filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
    .detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
    .detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
    .detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
    .detail_list .detail_list_img img{ width:100%; height: 100%;}
    .detail_list .detail_list_info{ margin-top: 20px;}
    .detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
    .detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

    #content .detail_intro{ padding: 10px;}
    #content .detail_player{ margin:20px;}
    .detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
    .detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
    .detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>