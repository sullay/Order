<template>
  <view class="app">
    <view class="restaurantList">
      <view class="top">
        <view v-for="(item,index) in topData" :key="index" :class="index==selected?'restaurant active':'restaurant'">{{item}}</view>
      </view>
      <view class="middle">
        <view v-for="(item,index) in leftData" :key="index" :class="(index+7)==selected?'restaurant active':'restaurant'">{{item}}</view>
        <view class="run_btn"><view @click="_run">启动</view></view>
        <view v-for="(item,index) in rightData" :key="index" :class="(index+3)==selected?'restaurant active':'restaurant'">{{item}}</view>
      </view>
      <view class="bottom">
        <view v-for="(item,index) in bottomData" :key="index" :class="(index+4)==selected?'restaurant active':'restaurant'">{{item}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        restaurantList: ['腌面', '兰州', '汤饭', '华莱士(假)', '炒菜', '好奇', '楚涛', '金伟'],
        selected: 0,
        isActive:false
      }
    },
    computed: {
      topData () {
        return this.restaurantList.slice(0, 3)
      },
      rightData () {
        return this.restaurantList.slice(3, 4)
      },
      bottomData () {
        return this.restaurantList.slice(4, 7)
      },
      leftData () {
        return this.restaurantList.slice(7, 8)
      }
    },
    onLoad() {
      this.restaurantList.sort(this.randomsort)
    },
    onReady() {
      // this.run()
    },
    methods: {
      randomsort (a, b) {
        return Math.random() > 0.5 ? -1 : 1
      },
      _run(){
        if(!this.isActive){
          this.isActive=true
          this.run()
        }
      },
      sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      },
      async run () {
        let x = Math.floor(Math.random() * this.restaurantList.length)
        let i = 0
        while (!(i > this.restaurantList.length * 5 && i % this.restaurantList.length === x)) {
          this.selected = i % this.restaurantList.length
          i++
          if (i > this.restaurantList.length * 5) {
            await this.sleep(300)
          } else if (i > this.restaurantList.length * 4) {
            await this.sleep(200)
          } else if (i > this.restaurantList.length * 1) {
            await this.sleep(100)
          } else {
            await this.sleep(200)
          }
        }
        this.selected = i % this.restaurantList.length
        this.isActive=false
      }
    }
  }
</script>

<style>
  
.app{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1000upx;
}
.restaurantList{
  background: #f6f8fa;
  width: 700upx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.restaurant{
  width: 204upx;
  height: 136upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20upx;
  border-radius: 10upx;
  border: 3upx solid #F80;
  animation: namemf 1s linear infinite alternate;
  -webkit-animation:namemf 3s linear infinite alternate;
  background: #f2f8fe;
}
@keyframes namemf{
  from{
    border: 3upx solid #F80;
  }
  to{
    border:3upx solid #2ED;
  }
}
.active{
  background: linear-gradient(to top, #FEAC5E, #4BC0C8);
}
.top{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.bottom{
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}
.middle{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.run_btn{
  width: 210upx;
  height: 142upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20upx;
}
.run_btn:hover,.run_btn:focus,.run_btn:active{
  cursor: pointer;
}
.run_btn view{
  height: 150upx;
  width: 150upx;
  background: linear-gradient(to top, #FEAC5E, #4BC0C8);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 1rem;
}
</style>
