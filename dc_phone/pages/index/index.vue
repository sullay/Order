<template>
  <view class="app">
    <view class="restaurantList">
      <view v-for="(item,index) in restaurantList" :key="index" :class="index==selected?'restaurant active':'restaurant'">
        <!-- {{item}} -->
        <input type="text" :value="item" @change="edit(index,$event)" confirm-type="done" />
      </view>
      <view class="run_btn" @click="_run">
        启动
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        restaurantList: ['兰州拉面', '肯德基', '德克士', '酸菜鱼', '盖浇饭', '米线', '小炒肉', '再来一次'],
        selected: 0,
        isActive: false
      }
    },
    onShareAppMessage() {
      return {
        path: '/pages/index/index'
      }
    },
    onLoad() {
      let tempList = uni.getStorageSync('list')
      if (tempList && tempList.length > 0) {
        this.restaurantList = tempList
      }
      while (this.restaurantList.length < 8) {
        this.restaurantList.push('再来一次')
      }
      this.restaurantList.sort(this.randomsort)
    },
    methods: {
      randomsort(a, b) {
        return Math.random() > 0.5 ? -1 : 1
      },
      _run() {
        if (!this.isActive) {
          this.isActive = true
          this.run()
        }
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      },
      async run() {
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
      },
      edit(i, event) {
        this.restaurantList[i] = event.detail.value
        uni.setStorageSync('list', this.restaurantList)
      }
    },
  }
</script>

<style lang="less">
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 1000upx;

    .restaurantList {
      background: #f6f8fa;
      width: 700upx;
      height: 500upx;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas: 'r1 r2 r3'
        'r8 b r4'
        'r7 r6 r5';
      gap: 20upx;

      .restaurant {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 10upx;
        border: 3upx solid #F80;
        animation: namemf 1s linear infinite alternate;
        -webkit-animation: namemf 3s linear infinite alternate;
        background: #f2f8fe;

        input {
          text-align: center;
        }
      }

      .restaurant:nth-of-type(4) {
        grid-area: r4;
      }

      .restaurant:nth-of-type(5) {
        grid-area: r5;
      }

      .restaurant:nth-of-type(6) {
        grid-area: r6;
      }

      .restaurant:nth-of-type(7) {
        grid-area: r7;
      }

      .restaurant:nth-of-type(8) {
        grid-area: r8;
      }

      .active {
        background: linear-gradient(to top, #FEAC5E, #4BC0C8);
      }

      .run_btn {
        grid-area: b;
        width: 150upx;
        height: 150upx;
        background: linear-gradient(to top, #FEAC5E, #4BC0C8);
        justify-self: center;
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: white;
        font-size: 1rem;
      }
    }
  }

  @keyframes namemf {
    from {
      border: 3upx solid #F80;
    }

    to {
      border: 3upx solid #2ED;
    }
  }
</style>
