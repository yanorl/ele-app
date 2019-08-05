<template>
    <div class="rating-box">
        <div class="rating-content">
            <i v-for="(item, index) in itemClass" :key="index" class="fa" :class="item"></i>
        </div>
    </div>
</template>
<script>
const LENGTH = 5
const ON = 'fa-star'
const HALF = 'fa-star-half-empty'
const OFF = 'fa-star-o'

export default {
    name: "rating",
    props: {
    	rating: Number
    },
    computed: {
    	itemClass() {
    		let result = []
    		let score = Math.floor(this.rating * 2) /2
    		let hasDecimal = score % 1 !== 0
    		let integer = Math.floor(score)

    		for(let i = 0; i < integer; i++) {
    			result.push(ON)
    		}

    		if (hasDecimal) {
    			result.push(HALF)
    		}

    		while(result.length < LENGTH) {
    			result.push(OFF)
    		}
    		return result
    	}
    }
}
</script>
<style scoped>
.rating-content{
	margin-right: 1.066667vw;
    color: #ffbe00;
}
</style>