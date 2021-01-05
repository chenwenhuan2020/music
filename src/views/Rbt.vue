<template>
  <div class="rbt">
    <!-- 头部 -->
    <div class="rbt-header">
      <h3 class="title">歌手论坛</h3>
      <!-- 上 -->
      <div class="rbt-top">
        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="(item, index) in songUrl" :key="index">
            <van-image :src="item.src" @click="btn(item, index)"></van-image>
            <p :class="[num == index ? 'active' : '']" class="top-title">
              {{ item.title }}
            </p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 渲染列表 -->
    <div class="list">
      <van-grid :border="false" :column-num="4">
        <van-grid-item
          v-for="(item, index) in listData"
          :key="index"
          @click="goSingeralbum(item.id, item.name, item.picUrl)"
        >
          <van-image :src="item.picUrl" />
          <p class="songername">{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import "../assets/less/rbt.less";
export default {
  name: "Rbt",
  //数据
  data() {
    return {
      //歌手图片
      songUrl: [
        {
          src:
            "https://p1.music.126.net/1tSJODTpcbZvNTCdsn4RYA==/109951165034950656.jpg?param=130y130",
          title: "华语论坛",
        },
        {
          src:
            "http://p1.music.126.net/u46mY5SpaLqxZhA6LV-foQ==/109951165424795726.jpg?param=130y130",
          title: "欧美论坛",
        },
        {
          src:
            "http://p2.music.126.net/0PC5DDQsBfWjOPVHJ_Ibqg==/109951165073763463.jpg?param=130y130",
          title: "韩国论坛",
        },
        {
          src:
            "http://p2.music.126.net/HcBf-8SoeYkGqmwOldEdMA==/109951163286969103.jpg?param=130y130",
          title: "日本论坛",
        },
      ],
      //列表数据
      listData: [],
      //下标
      num: 0,
    };
  },
  //初始化
  created() {
    //歌手数据
    this.getSongerdata();
  },
  //方法
  methods: {
    //切换数据
    btn(item, index) {
      if (this.num == index) {
        
        return;
      }
      this.num = index;
      let b = index + 1;
      this.listData = [];
      this.axios({
        method: "GET",
        url: "http://localhost:3000/toplist/artist",
        params: {
          type: b,
        },
      }).then((res) => {
        
        for (let i = 0; i < res.data.list.artists.length; i++) {
          if (i < 20) {
            this.listData.push(res.data.list.artists[i]);
          }
        }
        
      });
    },
    //歌手数据
    getSongerdata() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/toplist/artist",
        params: {
          type: 1,
        },
      }).then((res) => {
        
        for (let i = 0; i < res.data.list.artists.length; i++) {
          if (i < 20) {
            this.listData.push(res.data.list.artists[i]);
          }
        }
      });
    },
    //跳转歌手专辑
    goSingeralbum(id, name, picUrl) {
      this.changLy(false)
      this.$router.push({ name: "Singeralbum" });
      
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("picUrl", picUrl);
    },
    //修改路由状态
    changLy(show){
     this.$store.commit("changLy", show);
    },
  },
};
</script>

<style lang="less" scoped>
.rbt {
  margin-bottom: 60px;
  .auto-img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .title {
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    color: #FF80B0;
  }
  .list {
    margin-top: 40px;
    .songername {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 10px;
      margin-top: 5px;
    }
    /deep/ .van-grid-item__content {
      padding-bottom: 10px;
    }
  }

  .top-title {
    color: #656566;
    font-size: 12px;
    font-weight: bold;
    margin-top: 5px;

    &.active {
      color: #FF80B0;
    }
  }
}
</style>