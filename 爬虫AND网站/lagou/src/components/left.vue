<template>
 <div class="left-part">
   <img src="../static/img/logo.png" class="logo"/>
   <ul class="first-ul">
     <li>总括</li>
     <li >地区</li>
     <ul class="second-ul">
       <li><router-link to="/beijing">北京</router-link></li>
       <li><router-link to="/shanghai">上海</router-link></li>
       <li><router-link to="/guangzhou">广州</router-link></li>
       <li><router-link to="/shenzhen">深圳</router-link></li>
     </ul>
     <li>职位</li>
     <ul class="second-ul">
       <li><router-link to="/front">前端工程师</router-link></li>
       <li><router-link to="/java">java工程师</router-link></li>
       <li><router-link to="/php">php工程师</router-link></li>
       <li><router-link to="/design">设计</router-link></li>
       <li><router-link to="/product">产品</router-link></li>
       <li><router-link to="/data">数据工程师</router-link></li>
     </ul>
   </ul>
 </div>
</template>
<script>
  export default{

  }
</script>
<style>
  .left-part{
    position:fixed;
    width:300px;
    height:100%;
    background:#222A35;
    color: #ffffff;
    float:left;
  }
  .logo{
    margin-top:30px;
    margin-left:30px;
    margin-bottom: 30px;

  }
  .first-ul >li{
    height: 30px;
    line-height: 30px;
    padding-left:30px;
    font-size:20px;
    margin-top:20px;
  }
  .second-ul>li{
    height: 30px;
    line-height: 30px;
    padding-left:50px;
    font-size:16px;
  }
  .first-ul li{
    transition: all 1s linear;
  }
  .first-ul li:hover{
    background: #1898B5;
  }
  a{
    display:block;
    height: 30px;
    line-height: 30px;
    font-size:16px;
    margin-top:20px;
    color:white;
    text-decoration:none
  }

</style>
