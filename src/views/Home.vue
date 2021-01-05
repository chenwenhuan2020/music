<template>
  <div class="home">
    <!-- 搜索 -->
    <div class="search">
      <van-search
        shape="round"
        placeholder="请输入搜索关键词"
        @click="search"
      />
    </div>
    <!-- 轮播层 -->
    <div class="banner">
      <!-- 轮播 -->
      <van-swipe class="van-swipe" :autoplay="1000" indicator-color="red">
        <van-swipe-item
          class="item"
          v-for="(item, index) in lunboData"
          :key="index"
        >
          <img class="auto-img" :src="item.imageUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
      <!-- 登录 -->
      <div class="login">
        <div>
          <img class="auto-img" src="../assets/img/login.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 图片 -->
    <div class="ban1">
      <div class="ban1-img">
        <img class="auto-img" src="../assets/img/ban1.png" alt="" />
      </div>
    </div>
    <!-- 推荐标题 -->
    <div class="recommend">
      <div class="recommend-title">
        <p class="recommend-p">推荐歌单</p>
        <p class="recommend-img">
          <img src="../assets/img/mony.png" alt="" />
        </p>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="music">
      <div class="musicList">
        <ul class="music-ul">
          <li
            class="music-li"
            v-for="(item, index) in recommenddata"
            :key="index"
            @click="goRemlist(item.id)"
          >
            <div class="music-img">
              <div class="img">
                <img :src="item.picUrl" alt="" class="auto-img" />
              </div>
              <div class="music-img-p">
                <p>{{ item.playCount | mun }}万</p>
              </div>
              <div class="music-btn">
                <img src="../assets/img/play.png" alt="" class="auto-img" />
              </div>
            </div>
            <div class="music-text">
              <p>{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新碟标题 -->
    <div class="recommend">
      <div class="recommend-title">
        <p class="recommend-p">新碟上架</p>
        <p class="recommend-img">
          <img src="../assets/img/mony.png" alt="" />
        </p>
      </div>
    </div>
    <!-- 新碟列表 -->
    <div class="official">
      <van-grid :border="false" :column-num="4">
        <van-grid-item
          v-for="(item, index) in newdisc"
          :key="index"
          @click="goNewdisc(item.url)"
        >
          <van-image :src="item.src" />
          <p class="official-p">{{ item.title }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 电台标题-->
    <div class="recommend">
      <div class="recommend-title">
        <p class="recommend-p">推荐电台</p>
        <p class="recommend-img">
          <img src="../assets/img/mony.png" alt="" />
        </p>
      </div>
    </div>
    <!-- 电台列表 -->
    <van-tabs class="specialarea">
      <van-tab
        v-for="(item, index) in specialareaData"
        :key="index"
        @click="goRadiolist(item.id)"
      >
        <template #title class="bb">
          <van-icon class="icon">
            <img :src="item.picUrl" alt="" />
            <p>{{ item.name }}</p>
          </van-icon>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 会员标题 -->
    <div class="recommend">
      <div class="recommend-title">
        <p class="recommend-p">会员专区</p>
        <p class="recommend-img">
          <img src="../assets/img/mony.png" alt="" />
        </p>
      </div>
    </div>
    <!-- 会员列表 -->
    <van-tabs class="member">
      <van-tab v-for="(item, index) in member" :key="index">
        <template #title>
          <van-icon class="mem-icon">
            <img :src="item.url" class="auto-img" alt="" />
          </van-icon>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 底部 -->
    <div class="home-bottom">
      <img class="auto-img" src="../assets/img/bottom.jpg" alt="" />
    </div>
    <!-- logo -->
    <div class="home-logo">
      <div class="logo-img">
        <img src="../assets/img/logo.png" class="auto-img" alt="" />
      </div>
      <p class="logo-title">
        Copyright © 1999 - <span style="color: red">2020</span> Tencent. All
        Rights Reserved.
      </p>
      <p class="logo-qq">
        电话：<span style="color: red">183-197-66596</span
        ><span style="margin: 0 5px"></span> QQ：<span style="color: red"
          >1507305976</span
        >
      </p>
    </div>
  </div>
</template>

<script>
// 样式
import "../assets/less/home.less";
export default {
  name: "Home",
  //数据
  data() {
    return {
      //轮播下标
      current: 0,
      //推荐数据
      recommenddata: [],
      //轮播数据
      lunboData: [],
      //官方歌单
      Officialsong: [],
      //电台数据
      specialareaData: [],
      //新碟图片
      newdisc: [
        {
          src:
            "https://p1.music.126.net/efVqdNtGKB-tGZfzRONDtw==/109951165465802635.jpg?param=130y130",
          title: "华语",
          url: "ZH",
        },
        {
          src:
            "https://p1.music.126.net/IBXT8WEoRttQw1wrvSuxQg==/109951165395036830.jpg?param=130y130",
          title: "欧美",
          url: "EA",
        },
        {
          src:
            "https://p2.music.126.net/y_MqVlgjdXqxuVhHlUpyuQ==/109951165462834360.jpg?param=130y130",
          title: "韩国",
          url: "KR",
        },
        {
          src:
            "https://p1.music.126.net/A0RfzkVKdtDj3eIEcr0FdA==/109951165393370690.jpg?param=130y130",
          title: "日本",
          url: "JP",
        },
      ],
      //会员图片
      member: [
        { url: require("../assets/img/h1.jpg") },
        { url: require("../assets/img/h2.jpg") },
        { url: require("../assets/img/h1.jpg") },
        { url: require("../assets/img/h2.jpg") },
        { url: require("../assets/img/h1.jpg") },
        { url: require("../assets/img/h2.jpg") },
      ],
    };
  },
  //初始化
  created() {
    //推荐歌单
    this.getRecommenddata();
    //轮播数据
    this.getLunbodata();
    //官方数据
    this.getOfficalsong();
    //专区数据
    this.getSpecialareaData();
  },
  //方法
  methods: {
    //导航id
    onChange(index) {
      this.current = index;
    },
    //推荐歌单数据
    getRecommenddata() {
      //启动加载提示
      this.$toast.loading({
        //文本提示
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        //提示时间, 0: 没有时间限制
        duration: 0,
      });
      //推荐歌单数据
      this.axios({
        method: "GET",
        url: "http://localhost:3000/personalized?limit=6",
      })
        .then((res) => {
          // 请求成功
          this.$toast.clear();
          // 
          this.recommenddata = res.data.result;
          // 
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    //轮播
    getLunbodata() {
      //轮播图
      this.axios({
        method: "GET",
        url: "http://localhost:3000/banner/",
      }).then((res) => {
        this.lunboData = res.data.banners;
        // 
      });
    },
    //官方数据
    getOfficalsong() {
      //加载提示
      this.$toast.loading({
        //文本提示
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        //提示时间, 0: 没有时间限制
        duration: 0,
      });
    },
    //专区数据
    getSpecialareaData() {
      //加载
      this.$toast.loading({
        //文本提示
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        //提示时间, 0: 没有时间限制
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "http://localhost:3000/personalized/djprogram",
      }).then((res) => {
        if (res.status == 200) {
          
          this.$toast.clear();
          this.specialareaData = res.data.result;
        }
      });
    },
    // 跳转到推荐列表
    goRemlist(id) {
      this.changLy(false)
      this.$router.push({ name: "Remlist", params: { id } });
    },
    // 跳转到搜索
    search() {
      this.changLy(false);
      this.$router.push({ name: "Search" });
    },
    //跳转到新碟列表
    goNewdisc(url) {
      this.$router.push({ name: "Newdisc", params: { url } });
    },
    //跳转电台
    goRadiolist(id) {
      this.$router.push({ name: "Radiolist", params: { id } });
    },
    //修改底部路由布尔值
    changLy(flag) {
      this.$store.commit("changLy", flag);
    },
  },
};
</script>
