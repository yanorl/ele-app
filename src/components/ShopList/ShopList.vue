<template>
  <div class="shop-list-box">
  	<ul>
  		<li class="shop-item" v-for="(item, index) in datas" :key="index">
  			<div class="shop-info">
  				<div class="img-box">
  					<img :src="item.restaurant.image_path" alt="">
  				</div>
  				<div class="shop-content">
  					<div class="shop-name">
  						<i v-if="item.restaurant.is_premium">品牌</i>
  						<span>{{item.restaurant.name}}</span>	
  					</div>
  					<div class="rate-box">
  						<div class="rating-content">
  							<i class="fa fa-star"></i>
  							<i class="fa fa-star"></i>
  							<i class="fa fa-star"></i>
  							<i class="fa fa-star"></i>
  							<i class="fa fa-star"></i>
  						</div>
  						<span class="rate-text">{{item.restaurant.rating}}</span>
  						<span>月售{{item.restaurant.recent_order_num}}单</span>
  					</div>
  					<div class="limit-box">
  						<div class="limit-left">
  							<span>¥{{item.restaurant.float_minimum_order_amount}}起送</span> |
  							<span>配送费¥{{item.restaurant.float_delivery_fee}}</span>
  						</div>
  						<div class="limit-right">
  							<span>1km</span> |
  							<span>{{item.restaurant.order_lead_time}}</span>
  						</div>
  					</div>
  				</div>
  			</div>
  		</li>
  	</ul>
  </div>
</template>

<script>
  export default{
    name: "shop-list",
    props: {
    	datas: Array
    }
  }
</script>
<style scoped>
.shop-item {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
}
.shop-info {
  display: flex;
  justify-content: flex-start;
  padding: 0 2.666667vw;
  align-items: stretch;
}
.img-box {
  width: 17.333333vw;
  height: 17.333333vw;
}
.img-box img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  border-radius: 0.533333vw;
}
.shop-content {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 2.666667vw;
  font-size: 0.2rem;
  flex-grow: 1;
}
.shop-name {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 0.9rem;
}
.shop-name i {
  background: #ffe800;
  margin-right: 1.333333vw;
  padding: 0.266667vw 0.666667vw;
  text-align: center;
  white-space: nowrap;
  font-size: 0.6rem;
}
.shop-name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rate-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.rate-box .rate-text {
  margin-right: 1.066667vw;
}
.limit-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.limit-right{
  color: #999;
}
/*.delivery {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  margin-left: 1.066667vw;
}
.delivery .icon-hollow {
  color: #fff;
  background-color: #2395ff;
  padding: 2px;
  box-sizing: border-box;
}*/
</style>
