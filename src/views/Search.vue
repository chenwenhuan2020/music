<template>
  <div class="search">
    <!-- 导航 -->
    <div class="nav">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #left>
          <div class="left">
            <img src="../assets/img/fh.png" class="auto-img" alt="" />
          </div>
        </template>
        <template #title>
          <div class="title">
            <h3>搜索</h3>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 搜索 -->
    <div class="search-top">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="search"
      />
    </div>
    <!-- 历史记录 -->
    <div class="history">
      <div class="h-top">
        <span class="title">历史记录</span>
        <button class="btn" @click="delHistory()">
          <img src="../assets/img/del.png" alt="" class="auto-img" />
        </button>
      </div>
      <ul>
        <li
          v-for="(item, index) in getHistory"
          :key="index"
          @click="gethistory(item, index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 搜索列表 -->
    <div class="search-list">
      <ul class="search-ul">
        <li
          class="search-item"
          v-for="(item, index) in searchData"
          :key="index"
          @click.stop="autoplay(item.id, item.name, item.al.picUrl)"
        >
          <!-- 上 -->
          <div class="item-top">
            <p class="item-img" @click.stop="collection(item)">
              <img src="../assets/img/scang.png" class="auto-img" alt="" />
            </p>
            <p class="item-title">{{ item.name }}</p>
            <p class="item-sq">
              <button>SQ</button>
            </p>
            <p class="item-mv">
              <button>mv</button>
            </p>
          </div>
          <!-- 下 -->
          <div class="item-name">{{ singername }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 样式
import "../assets/less/search.less";
import { Test } from "../components/libs/mv";
export default {
  name: "Search",
  //数据
  data() {
    return {
      //搜索值
      value: "",
      //数组
      arr: [],
      historyArr: [],
      //歌手名字
      singername: "",
      //歌名
      musicname: "点首歌压压惊",
      //歌曲图片
      songUrl: require("../assets/img/timg.jpg"),
      // 搜索数据
      searchData: [],
      //音乐路径
      musicUrl: "",
      //播放状态
      playFlag: "",
      //音量值
      values: 10,
      //音乐id
      musicId: "",
    };
  },
  //初始化
  created() {},
  //计算
  computed: {
    //获取历史记录
    getHistory() {
      return this.$store.state.history;
    },
    //  获取播放状态
    isFlag() {
      this.playFlag = this.$store.state.playFlag;
      return this.$store.state.playFlag;
    },
    // 获取audio元素
    audioElemet() {
      return this.$store.state.audioElement;
    },
  },
  //方法
  methods: {
    //搜索列表
    search() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/cloudsearch",
        params: {
          keywords: this.value,
          limit: 100,
        },
      }).then((res) => {
        //列表数据
        this.searchData = Test(res.data.result.songs);

        // 
        //历史记录
        this.getHistory.push(this.value);
        // 修改历史记录
        this.changHistory(this.getHistory);
        //清空文本
        this.value = "";
      });
    },
    //获取音乐播放路径
    autoplay(id, name, url) {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/song/url",
        params: {
          id: id,
        },
      }).then((res) => {
        console.log(res.data.data[0])
        //歌曲路径
        this.musicUrl = res.data.data[0].url;
        //歌曲id
        this.musicId = res.data.data[0].id;
        // 歌曲名
        this.musicname = name;
        //歌曲图片
        this.songUrl = url;
        //修改音乐路径
        this.changeAudioSrc(this.musicUrl);
        //修改歌曲名字
        this.changeSongName(this.musicname);
        //修改歌手图片
        this.changeSongUrl(this.songUrl);
        //修改当前时间
        this.changeCurrentTime(0);
        //修改播放状态条
        this.changPlay(true);
        //修改歌曲id
        this.changId(this.musicId);
        //自动播放
        this.audioElemet.autoplay = true;
      });
    },
    //历史记录
    gethistory(item, index) {
      this.value = item;
      this.search();
    },
    //修改音乐路径
    changeAudioSrc(audioSrc) {
      this.$store.commit("changeAudioSrc", audioSrc);
    },
    //修改歌曲名字
    changeSongName(songName) {
      this.$store.commit("changeSongName", songName);
    },
    //修改歌手图片
    changeSongUrl(songUrl) {
      this.$store.commit("changeSongUrl", songUrl);
    },
    //修改初始化时间
    changeCurrentTime(currentTime) {
      this.$store.commit("changeCurrentTime", currentTime);
    },
    //修改播放状态
    changPlay(flag) {
      this.$store.commit("changPlay", flag);
    },
    //修改历史记录
    changHistory(history) {
      this.$store.commit("changHistory", history);
    },
    //删除历史记录
    delHistory() {
      this.changHistory([]);
    },
    //修改歌曲id
    changId(musicId) {
      this.$store.commit("changId", musicId);
    },
    //返回上一级路由
    onClickLeft() {
      this.changLy(true);
      // sessionStorage.setItem("show",true)
      this.$router.go(-1);
    },
    //修改底部路由
    changLy(flag) {
      this.$store.commit("changLy", flag);
    },
    // 缓存数据
    collection(item) {
      
      item.isCollection = !item.isCollection;
      if (item.isCollection) {
        
        let singerStr = "";
        for (let i = 0; i < item.ar.length; i++) {
          singerStr = item.ar[0].name + "/";
        }
        singerStr = singerStr.substring(0, singerStr.length - 1);
        // 
        let obj = {
          songId: item.id,
          songName: item.name,
          singer: singerStr,
          songImg: item.al.picUrl,
          audioSrc:
            "https://music.163.com/song/media/outer/url?id='+item.id+'.mp3",
          duration: item.dt,
        };
        
        //修改缓存
        this.$store.commit("addSong", obj);
        //设置缓存
        setTimeout(() => {
          this.$store.commit("songCache");
        }, 0);
      } else {
        // 删除缓存
        
      }
    },
  },
  watch: {
    //监听播放的状态
    isFlag: function () {
      this.playFlag = this.isFlag;
      
    },
  },
};
</script>
