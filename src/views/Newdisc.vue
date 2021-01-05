<template>
  <div class="newdisc">
    <!-- 返回 -->
    <!-- 导航 -->
    <div class="nav">
      <van-nav-bar @click-left="onClickLeft">
        <template #left>
          <div class="left">
            <img src="../assets/img/fh.png" alt="" class="auto-img" />
          </div>
        </template>
        <template #title>
          <h3 class="title">新碟上架</h3>
        </template>
      </van-nav-bar>
    </div>
    <!-- 上 -->
    <div class="list">
      <van-grid :border="false" :column-num="4">
        <van-grid-item
          v-for="(item, index) in discdataTop"
          :key="index"
          @click="qh(index, item.id)"
        >
          <van-image :src="item.picUrl" />
          <p class="disctitle">
            {{ item.name }}
          </p>
        </van-grid-item>
      </van-grid>
      <van-grid :border="false" :column-num="4" v-show="showFlag">
        <van-grid-item
          v-for="(item, index) in discdataBottom"
          :key="index"
          @click="qh(index, item.id)"
        >
          <van-image :src="item.picUrl" />
          <p class="disctitle">{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
      <div class="btn" @click="btn">
        <img :src="[showFlag ? hideImg : showImg]" alt="" class="auto-img" />
      </div>
    </div>
    <!-- 下 -->
    <div class="top">
      <div class="top-img">
        <img :src="informationTop.picUrl" alt="" class="auto-img" />
      </div>
      <div class="top-title">
        <p class="p">
          <span class="top-zj">专辑</span>{{ informationTop.name }}
        </p>
        <div class="top-name">
          歌手：<span style="color: blue">{{ songername }}</span>
        </div>
        <div class="top-time">发行时间：2020-11-20</div>
        <div class="top-gs">发行公司：{{ informationTop.company }}</div>
        <div class="btn">
          <button>
            <p class="img">
              <img src="../assets/img/scang.png" class="auto-img" alt="" />
            </p>
            <p class="txt">收藏</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/zf.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ informationBtn.shareCount }}</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/xzai.png" class="auto-img" alt="" />
            </p>
            <p class="txt">下载</p>
          </button>
          <button>
            <p class="img">
              <img src="../assets/img/plun.png" class="auto-img" alt="" />
            </p>
            <p class="txt">{{ informationBtn.commentCount }}</p>
          </button>
        </div>
      </div>
    </div>
    <!-- 简介 -->
    <div class="jianjie">
      <h3>专辑介绍：</h3>
      <p>{{ informationTop.description }}</p>
    </div>
    <!-- 中 -->
    <div class="center">
      <div class="left">
        <span>包含的歌曲列表:</span>
        <span style="color: red">{{ informationTop.size }}首</span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songer-list">
      <ul class="list-ul">
        <li class="item" v-for="(item, index) in songerList" :key="index">
          <p class="item-num">{{ index + 1 }}.</p>
          <div class="item-signame">{{ item.name }}</div>
          <div class="item-time" @click="btnshow(index)">
            {{ songertime[index] }}

            <div class="time-btn" :class="[nums == index ? 'activeTime' : '']">
              <button @click="Collection(index)">
                <img src="../assets/img/scang.png" alt="" class="auto-img" />
              </button>
              <button>
                <img src="../assets/img/xzai.png" alt="" class="auto-img" />
              </button>
              <button>
                <img src="../assets/img/zf.png" alt="" class="auto-img" />
              </button>
            </div>
          </div>
          <h3 class="item-name">{{ item.ar[0].name }}</h3>
          <div
            class="item-btn"
            @click="playMusic(item.id, item.name, item.al.picUrl)"
          >
            <img src="../assets/img/play.png" alt="" class="auto-img" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../assets/less/newdisc.less'
export default {
  name: "Newdisc",
  //数据
  data() {
    return {
      //路由url
      url: "",
      // 专辑列表数据
      discdataTop: [],
      discdataBottom: [],
      //信息
      informationTop: [],
      informationBtn: [],
      //歌手名
      songername: "",
      //歌曲列表
      songerList: [],
      //歌曲时间
      songertime: [],
      //下标
      num: 0,
      nums: 0,
      //显示的布尔值
      showFlag: false,
      //音乐路径
      musicUrl: "",
      //显示隐藏图片
      showImg: require("../assets/img/bon.png"),
      hideImg: require("../assets/img/top.png"),
    };
  },
  //初始化
  created() {
    this.url = this.$route.params.url;
    
    //新碟数据
    this.getdiscdata();
  },
  //方法
  methods: {
    //获取新碟
    getdiscdata(url) {
      //启动加载提示
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
        url: "http://localhost:3000/top/album",
        params: {
          area: this.url,
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$toast.clear();
          for (let i = 0; i < res.data.monthData.length; i++) {
            if (i < 4) {
              this.discdataTop.push(res.data.monthData[i]);
            } else if (i < 8) {
              this.discdataBottom.push(res.data.monthData[i]);
            }
          }
        }
        let id = res.data.monthData[0].id;
        //新碟信息
        this.getinformation(id);
        
      });
    },
    //切换列表数据
    qh(index, id) {
      if (this.num == index) {
        
        return;
      }
      this.num = index;
      this.getinformation(id);
    },
    //获取信息
    getinformation(id) {
      if (id == 98517711) {
        id = 98517711;
      } else {
        id = id;
      }
      this.axios({
        method: "GET",
        url: "http://localhost:3000/album",
        params: {
          id: id,
        },
      }).then((res) => {
        for (let i = 0; i < res.data.songs.length; i++) {
          //歌曲时间
          this.songertime.push(this.time(res.data.songs[i].dt));
        }
        this.songerList = res.data.songs;
        this.informationTop = res.data.album;
        this.informationBtn = res.data.album.info;
        this.songername = res.data.album.artists[0].name;
      });
    },
    //格式化时间
    time(seconds) {
      let h, m, s;
      //计算小时 分钟 秒钟
      m = Math.floor(seconds / 1000 / 60);
      s = Math.floor((seconds / 1000) % 60);

      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      return m + ":" + s;
    },
    //获取音乐路径
    playMusic(id, name, url) {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/song/url",
        params: {
          id: id,
        },
      }).then((res) => {
        this.musicUrl = res.data.data[0].url;
        //修改音乐路径
        this.changeAudioSrc(this.musicUrl);
        //修改歌曲名字
        this.changeSongName(name);
        // 修改歌曲图片
        this.changeSongUrl(url);
        //修改初始时间
        this.changeCurrentTime(0);
        //修改播放状态
        this.changPlay(true);
      });
    },
    //修改音乐路径
    changeAudioSrc(audioSrc) {
      this.$store.commit("changeAudioSrc", audioSrc);
    },
    //修改歌曲名字
    changeSongName(songName) {
      this.$store.commit("changeSongName", songName);
    },
    //修改歌曲图片
    changeSongUrl(songUrl) {
      this.$store.commit("changeSongUrl", songUrl);
    },
    //修改时间
    changeCurrentTime(currentTime) {
      this.$store.commit("changeCurrentTime", currentTime);
    },
      //修改播放状态
    changPlay(flag) {
      this.$store.commit("changPlay", flag);
    },
    //显示隐藏
    btn() {
      this.showFlag = !this.showFlag;
    },
    //显示收藏
    btnshow(index) {
      if (this.nums == index) {
        
        return;
      }
      this.nums = index;
    },
    //返回上一级路由
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
