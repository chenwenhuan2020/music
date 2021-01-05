<template>
  <div class="singeralbum">
    <!-- 导航返回 -->
    <div class="nav">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #left>
          <div class="left">
            <img src="../assets/img/fh.png" class="auto-img" alt="" />
          </div>
        </template>
        <template #title>
          <div class="title">
            <h3>{{ name }}</h3>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="img">
      <img :src="picUrl" alt="" class="auto-img" />
      <div class="people">
        <p class="p1">
          <img src="../assets/img/people.png" alt="" class="auto-img" />
        </p>
        <p class="p2">个人主页</p>
      </div>
      <div class="sc">
        <p class="p1">
          <img src="../assets/img/scang.png" alt="" class="auto-img" />
        </p>
        <p class="p2">收藏</p>
      </div>
    </div>
    <!-- 歌手信息列表 -->
    <div class="navTab">
      <van-tabbar
        v-model="active"
        active-color="red"
        inactive-color="blue"
        route
      >
        <van-tabbar-item
          replace
          :to="item.path"
          :name="item.name"
          v-for="(item, index) in navData"
          :key="index"
        >
          {{ item.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 二级路由 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Singeralbum",
  //数据
  data() {
    return {
      // 路由id
      id: "",
      //路由歌手名字
      name: "",
      //路由歌手图片
      picUrl: "",
      //选中的标签
      active: "singeralbum/Namehot",
      //导航数据
      navData: [
        {
          title: "热门作品",
          name: "Namehot",
          path: "/singeralbum/namehot",
        },
        {
          title: "所有专辑",
          name: "Namezj",
          path: "/singeralbum/namezj",
        },
        {
          title: "相关mv",
          name: "Namemv",
          path: "/singeralbum/namemv",
        },
        {
          title: "艺人介绍",
          name: "Namejs",
          path: "/singeralbum/namejs",
        },
      ],
    };
  },
  //初始化
  created() {
    this.id = sessionStorage.getItem("id");
    this.name = sessionStorage.getItem("name");
    this.picUrl = sessionStorage.getItem("picUrl");
    
    this.getSingeralbum();
  },
  //方法
  methods: {
    //获取歌手专辑
    getSingeralbum() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/artist/desc",
        params: {
          id: this.id,
        },
      }).then((res) => {
        
      });
    },
    //修改路由状态
    changLy(show){
     this.$store.commit("changLy", show);
    },
    //返回上一级路由
    onClickLeft() {
      this.changLy(true);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.singeralbum {
  .auto-img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .nav {
    .left {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
  h3 {
    padding: 10px 0;
    font-size: 14px;
    color: #ff808b;
  }
  .img {
    width: 100%;
    height: 200px;
    position: relative;
    .people {
      position: absolute;
      right: 80px;
      bottom: 10px;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 2px 5px;
      border-radius: 5px;
      .p1 {
        width: 12px;
        height: 12px;
      }
      .p2 {
        font-size: 12px;
        color: white;
        margin-left: 5px;
      }
    }
    .sc {
      position: absolute;
      right: 15px;
      bottom: 10px;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 2px 5px;
      border-radius: 5px;
      .p1 {
        width: 12px;
        height: 12px;
      }
      .p2 {
        font-size: 12px;
        color: white;
        margin-left: 5px;
      }
    }
  }
  .navTab {
    /deep/ .van-tabbar--fixed {
      position: relative;
    }
  }
}
</style>