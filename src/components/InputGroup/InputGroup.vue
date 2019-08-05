<template>
  <div class="input-box">
  	<div class="input-group" :class="{'is-invalid': error}">
  		<input :type="type" :value="value" :placeholder="placeholder" :name="name" @input="$emit('input', $event.target.value)">
  		<button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
  	</div>
    <div class="invalid-feedback" v-if="error">{{error}}</div>
  </div>
</template>

<script>
  export default{
    name: "inputGroup",
    props: {
    	type: {
    		type: String,
    		default: "text"
    	},
    	value: String,
    	placeholder: String,
    	name: String,
    	btnTitle: String,
    	disabled: Boolean,
    	error: String
    }
  }
</script>
<style scoped>
.input-group {
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-group input {
      outline: none;
    padding: 10px;
    flex: 1;
        border: none;
}
.input-group button {
  border: none;
  outline: none;
  background: #fff;
}
.input-group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>
