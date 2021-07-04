<template>
  <div class="city_body">
      <Loading v-if="isLoading"/>
    <div class="city_list">
        <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
                <li v-for="data in hotcity" :key="data.index" @click="handleToCity(data.name,data.cityId)">{{data.name}}</li>
            </ul>
        </div>
        <div class="city_sort" ref="city_sort">
            <!-- <h2 v-for="data in datalist" :key="data.index">{{data.index}}</h2> -->
             <ul v-for="datas in datalist" :key="datas.index">
                    <li><h2 >{{datas.index}}</h2></li>
                    <li v-for="datass in datas.list" :key="datass.cityId" @click="handleToCity(datass.name,datass.cityId)">
                        {{datass.name}}
                    </li>
                </ul>
        </div>
    </div>
    <div class="city_index">
        <ul>
            <li v-for="(data,index) in datalist" :key="data.index" @touchstart="handleToIndex(index)">{{data.index}}</li>
        </ul>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
        datalist:[],
        hotcity:[{cityId: 440100, name: "广州"},
        {cityId: 110100, name: "北京"},
        {cityId: 310100, name: "上海"},
        {cityId: 440300, name: "深圳"},
        {cityId: 120100, name: "天津"},
        {cityId: 330100, name: "杭州"},
        {cityId: 320100, name: "南京"},
        {cityId: 510100, name: "成都"}],
        isLoading:true
        }
    },
    name : 'city',
    mounted (){
        var cityList = window.localStorage.getItem('cityList')
        if(cityList){
            this.datalist=JSON.parse(cityList)
            this.isLoading=false
        }
        else{
        axios({
            url:'https://m.maizuo.com/gateway?k=3067947',
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606015092418054936723457"}',
            'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res=>{
            console.log(res.data);
            var datalist=this.handleCity(res.data.data.cities)
            // this.datalist = datalist
            this.isLoading=false
            window.localStorage.setItem('cityList',JSON.stringify(this.datalist))
        })
        }
        // console.log(obj)
    },
    methods:{
        handleToIndex(index){//跳转高度
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
        },
        handleCity(datalist){
            var hotcity = []
            // console.log(datalist);
            var letterArr = []
         
            // console.log(hotcity)
            for(var i= 65;i<91;i++){
                letterArr.push(String.fromCharCode(i));
            }
            // console.log(letterArr)

            var newlist = []
            for(var j = 0; j<letterArr.length; j++){
                var arr = datalist.filter(item=>item.pinyin.substring(0,1)===letterArr[j].toLowerCase())//截取每个字符串的首字母
                // console.log(arr)
                if(arr.length>0){
                newlist.push({
                    index:letterArr[j],
                    list:arr
                })
                // return newlist
                }
            }
            // console.log(newlist)
            this.datalist=newlist
            // console.log(datalist)
             
            
        },
        handleToCity(name,cityId){
            this.$store.commit('city/CITY_INFO',{name,cityId});
            window.localStorage.setItem('nowname',name);
            window.localStorage.setItem('nowcityId',cityId);
            this.$router.push('/movie/nowplaying');

        }
    }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
/* .city_body .city_hot ul{} */
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
/* .city_body .city_sort{} */
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>