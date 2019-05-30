<template>
  <div id="app">
    <div class="array">
    <h1 class="tip">Vue入门</h1>
      <transition-group name="list" tag="div">
        <div :class="itemClass(item)" v-for="(item) in array" :key="item" :style="'height:'+item*20+'px;'">
          {{item}}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      array: [9, 4, 8, 2, 5, 1, 7, 6, 3],
      sortArray: []
    }
  },
  computed: {

  },
  created () {
    this.sort()
  },
  methods: {
    itemClass (item) {
      if (this.sortArray.filter(a => {
        return a === item
      }).length > 0) {
        return 'item active'
      } else {
        return 'item'
      }
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async sort () {
      await this.sleep(1000)
      for (let i = 0; i < this.array.length - 1; i++) {
        for (let j = 0; j < this.array.length - i - 1; j++) {
          if (this.array[j] > this.array[j + 1]) {
            let swap = this.array[j]
            this.array[j] = this.array[j + 1]
            this.array[j + 1] = swap
          }
        }
        this.sortArray.push(this.array[this.array.length - 1 - i])
        await this.sleep(4000)
      }
      this.sortArray.push(this.array[0])
    }
  }
}
</script>

<style>
.array{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
}
.array div{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 300px;
  width: 500px;
  justify-content: center;
}

.array div .item{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 30px;
    margin-left: 3px;
    border-radius: 10px;
    border: 3px solid #F80;
    animation: namemf 1s linear infinite alternate;
    -webkit-animation:namemf 3s linear infinite alternate;
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
  transition: all, 2s;
  background: linear-gradient(to top, #FEAC5E, #4BC0C8);
}
.list-move {
  transition: all 4s;
}
</style>
