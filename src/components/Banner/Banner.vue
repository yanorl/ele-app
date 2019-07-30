<template>
    <div class="banner-box">
        <mt-swipe :auto="4000" class="swiper">
            <mt-swipe-item v-for="(img, index) in swipeImgs" :key="index">
				<img :src="img">	
            </mt-swipe-item>
           
        </mt-swipe>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui'

export default {
    name: "banner-box",
    props: {
    	swipeImgs: Array
    }
}
</script>
<style scoped>
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}
</style>