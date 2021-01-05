<template>
  <div class="main">
    <!-- 二级路由 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- 播放组件 -->
    <div class="small" v-show="showM">
      <Smallplay></Smallplay>
    </div>
    <!-- 底部导航 -->
    <div class="navTab" v-show="show">
      <van-tabbar
        v-model="active"
        active-color="#FF80B0"
        inactive-color="#656666"
        route
      >
        <van-tabbar-item
          replace
          :to="item.path"
          :name="item.name"
          :icon="item.icon"
          v-for="(item, index) in navData"
          :key="index"
          style="font-weight:bold"
        >
          {{ item.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Smallplay from "../components/Smallplay.vue";
export default {
  name: "Main",
  // 注册组件
  components: {
    Smallplay,
  },
  //数据
  data() {
    return {
      //选中的标签
      active: "Home",
      //导航数据
      navData: [
        { title: "推荐", name: "Home", icon: "home-o", path: "/main/home" },
        { title: "榜单", name: "List", icon: "search", path: "/main/list" },
        { title: "论坛", name: "Rbt", icon: "friends-o", path: "/main/rbt" },
        { title: "我的", name: "Shop", icon: "setting-o", path: "/main/shop" },
      ],
      //底部路由
      show: "",
      //音乐路由
      showM:"",
    };
  },
  //初始化
  created() {
    
    //判断路由模式
    if (this.$route.name == "Home") {
      //底部路由
      this.show = true;
    }
     if (this.$route.name == "List") {
      //底部路由
      this.show = true;
    }
     if (this.$route.name == "Rbt") {
      //底部路由
      this.show = true;
    }
     if (this.$route.name == "Shop") {
      //底部路由
      this.show = true;
    }
    if(this.$route.name == "Playinterface"){
       this.showM = false;
    }
    else{
        this.showM = true;
    }
  },
  updated() {
    //底部路由布尔值
    this.show = this.$store.state.show;
    //音乐路由
    this.showM = this.$store.state.showM;
    // sessionStorage.setItem("bb", this.show);
  },
};
</script>

