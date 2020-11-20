<template>
<div>
<h1>搜索</h1>
  <form>
          <div class="input-box">
            <label for="city">地区</label>
            <input type="text" class="input" id="city" name="city" v-model="city">
          </div>
          <div class="input-box">
            <label for="position">职位</label>
            <input type="text" class="input" id="position" name="position" v-model="position">
          </div>
          <input type="submit"class="btn" @click="submit"/>
      </form>
</div>
</template>
<script>
  import left from '../components/left.vue'
  export default{
  data () {
      return {
        city: '',
        position: ''
      }
    },
    components: {
      left
    },
    methods: {
      submit: function () {
        console.log(this.city)
        console.log(this.position)
        this.$http.post('/api/search', {city: this.city, position: this.position}, res => {
          console.log('success')
        })
      }
    }
   
  }
</script>
<style>
  .right-part{
    margin:0px;
    padding:0px;
    margin-left:300px;
    text-align: center;
  }
  .right{
    padding-top:100px;
  }
  .right h1{

    color: #222A35;
  }

  form{
    margin-top:60px;
  }
  .input-box {
    width: 550px;
    margin: 100px auto;
    text-align: left;
  }
  .input-box label{
    display: inline-block;
    font-size:24px;

  }

  .input{
    margin-left:50px;
    transition: all 2s;
    width:250px;
    height:40px;
    border-radius: 20px;
    border:4px solid #222A35;
    outline: none;
    padding-left:20px;
    font-size:28px;
  }
  .input:focus{
    width:400px;
  }
  .btn{
    width:200px;
    height:40px;
    background:#00B38A;
    font-size:18px;
    color:white;
    border:none;
    border-radius:20px;
  }
</style>
