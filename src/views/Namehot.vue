<template>
  <div class="namehot">
    <h3 class="hot">热门歌曲：{{ songerlength }}</h3>
    <!-- 歌曲列表 -->
    <div class="list">
      <ul class="list-ul">
        <li class="item" v-for="(item, index) in listData" :key="index">
          <p class="item-num">{{ index + 1 }}</p>
          <div class="item-signame">{{ item.name }}</div>
          <div class="item-time" @click="btnshow(index)">
            {{ songertime[index] }}
            <div class="time-btn" :class="[num == index ? 'activeTime' : '']">
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
          <div class="item-zj">{{ item.al.name }}</div>
          <div
            class="item-btn"
            @click="playmusic(item.id, item.name, item.al.picUrl)"
          >
            <img src="../assets/img/play.png" alt="" class="auto-img" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../assets/less/namehot.less'
export default {
  name: "Namehot",
  //数据
  data() {
    return {
      //id
      id: "",
      //列表数据
      listData: "",
      //歌曲时间
      songertime: [],
      //歌曲长度
      songerlength: "",
      //time-btn布尔值
      timeFlag: true,
      //时间的下标
      num: 0,
    };
  },
  //初始化
  created() {
    this.id = sessionStorage.getItem("id");
    
    //列表数据
    this.getlistData();
  },
  //方法
  methods: {
    //获取列表数据
    getlistData() {
      this.axios({
        method: "GET",
        url: "http://localhost:3000/artist/top/song",
        params: {
          id: this.id,
        },
      }).then((res) => {
        for (let i = 0; i < res.data.songs.length; i++) {
          this.songertime.push(this.time(res.data.songs[i].dt));
          this.songerlength = res.data.songs.length;
        }
        this.listData = res.data.songs;
      });
    },
    //获取音乐路径
    playmusic(id, name, url) {
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
          //修改歌手图片
          this.changeSongUrl(url);
          // 修改初始时间
          this.changeCurrentTime(0);
          //修改播放状态
          this.changPlay(false);
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
    //显示收藏
    btnshow(index) {
      if (this.num == index) {
        
        return;
      }
      this.num = index;
    },
  },
};
</script>
