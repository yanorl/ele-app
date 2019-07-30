<template>
    <div class="entries-box">
        <mt-swipe :auto="0" class="entries">
            <mt-swipe-item v-for="(entry, index) in entries" :key="index" class="entry_wrap">
                <div class="foodentry" v-for="(list, i) in entry" :key="i">
                    <div class="img_wrap">
                        <img :src="list.image" alt="">
                    </div>
                    <span>{{list.name}}</span>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui'

export default {
    name: "banner-box",
    props: {
        entries: Array
    }
}
</script>
<style scoped>
.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
</style>