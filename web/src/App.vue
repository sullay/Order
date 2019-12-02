<template>
  <div id="app" class="app">
    <div class="restaurantList">
      <!-- <div v-for="(item,index) in restaurantList" :key="item" :class="active(index)">{{item}}</div> -->
      <div class="top">
        <div v-for="(item,index) in topData" :key="index" :class="active('top',index)">{{item}}</div>
      </div>
      <div class="middle">
        <div v-for="(item,index) in leftData" :key="index" :class="active('left',index)">{{item}}</div>
        <div class="run_btn"><div @click="_run">启动</div></div>
        <div v-for="(item,index) in rightData" :key="index" :class="active('right',index)">{{item}}</div>
      </div>
      <div class="bottom">
        <div v-for="(item,index) in bottomData" :key="index" :class="active('bottom',index)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // restaurantList: ['腌面', '兰州', '汤饭', '华莱士(假)', '炒菜', '好奇', '楚涛', '金伟'],
      restaurantList: ['外卖', '出去吃', '外卖', '出去吃', '外卖', '出去吃', '外卖', '出去吃'],
      selected: 0,
      isActive: false
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
  created () {
    console.log(this.restaurantList)
    this.restaurantList.sort(this.randomsort)
  },
  mounted () {
  },
  methods: {
    randomsort (a, b) {
      return Math.random() > 0.5 ? -1 : 1
    },
    _run () {
      if (!this.isActive) {
        this.isActive = true
        this.run()
      }
    },
    active (position, index) {
      if (position === 'bottom') {
        index += 4
      } else if (position === 'right') {
        index += 3
      } else if (position === 'left') {
        index += 7
      }
      if (index === this.selected) {
        return 'restaurant active'
      } else {
        return 'restaurant'
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
      this.isActive = false
    }
  }
}
</script>

<style>
.app{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.restaurantList{
  background: #f6f8fa;
  width: 1038px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.restaurant{
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
  border-radius: 10px;
  border: 3px solid #F80;
  animation: namemf 1s linear infinite alternate;
  -webkit-animation:namemf 3s linear infinite alternate;
  background: #f2f8fe;
}
@keyframes namemf{
  from{
    border: 3px solid #F80;
  }
  to{
    border:3px solid #2ED;
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
  width: 306px;
  height: 206px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}
.run_btn:hover,.run_btn:focus,.run_btn:active{
  cursor: pointer;
}
.run_btn div{
  height: 180px;
  width: 180px;
  background: linear-gradient(to top, #FEAC5E, #4BC0C8);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 20px;
}
</style>
