<template>
  <div class="shop">
    <!-- 背景区 -->
    <div
      class="my-bg"
      :style="{ backgroundImage: `url('${userInfo.userBg}')` }"
    >
      <van-uploader class="upload-box" :after-read="afterRead"></van-uploader>
      <!-- 标题区 -->
      <div class="title">
        <div class="left">
          <img class="img" src="../assets/img/mebj.png" alt="" />
        </div>
        <div class="right">
          <div class="rt">{{ userInfo.nickName }}</div>
          <div class="p">
            {{
              userInfo.desc == ""
                ? "这家伙很懒，什么也没有留下！"
                : userInfo.desc
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- 列表区 -->
    <div class="list">
      <van-collapse v-model="activeNames">
        <!-- 歌曲收藏 -->
        <van-collapse-item name="1">
          <template #title>
            <div><van-icon>歌曲收藏</van-icon></div>
          </template>
          <div class="content1">
            <ul class="content1-list">
              <li class="item" v-for="(item, index) in songList" :key="index">
                <div class="item-img">
                  <img class="img" :src="item.songImg" alt="" />
                </div>
                <div class="item-text">
                  <p class="item-p">歌名：{{ item.singer }}</p>
                  <p class="item-title">歌手：{{ item.songName }}</p>
                </div>
              </li>
            </ul>
          </div>
        </van-collapse-item>
        <!-- 专辑收藏 -->
        <van-collapse-item name="2">
          <template #title>
            <div><van-icon>专辑收藏</van-icon></div>
          </template>
          内容
        </van-collapse-item>
        <!-- mv收藏 -->
        <van-collapse-item name="3">
          <template #title>
            <div><van-icon>MV收藏</van-icon></div>
          </template>
          内容
        </van-collapse-item>
        <!-- 最近播放 -->
        <van-collapse-item name="4">
          <template #title>
            <div><van-icon>最近播放</van-icon></div>
          </template>
          内容
        </van-collapse-item>
        <!-- 个人中心 -->
        <van-collapse-item name="5">
          <template #title>
            <div><van-icon>个人中心</van-icon></div>
          </template>
          <div class="content">
            <poeple>
              <van-cell class="toux" title="头像" :center="true">
                <div>
                  <div class="user-img fr">
                    <img class="auto-img" :src="accountInfo.userImg" alt="" />
                    <van-uploader
                      class="upload-box"
                      :after-read="uploadUserImg"
                    />
                  </div>
                </div>
              </van-cell>
              <van-cell title="用户id" :center="true">{{
                accountInfo.userId
              }}</van-cell>
              <van-cell title="手机号" :center="true">{{
                accountInfo.phone
              }}</van-cell>
              <van-cell title="昵称" :center="true">
                <van-field
                  v-model="accountInfo.nickName"
                  class="field-box"
                  placeholder="输入昵称"
                  maxlength="12"
                  @change="updateNickName"
                />
              </van-cell>
              <div class="desc-box">
                <div class="desc-content">
                  <van-field
                    v-model="accountInfo.desc"
                    rows="2"
                    autosize
                    label="简介"
                    type="textarea"
                    maxlength="30"
                    placeholder="输入简介"
                    show-word-limit
                    input-align="right"
                    @change="updateDesc"
                  />
                </div>
              </div>
            </poeple>
          </div>
        </van-collapse-item>
        <!-- 账号管理 -->
        <van-collapse-item name="6">
          <template #title>
            <div><van-icon>账号管理</van-icon></div>
          </template>
          内容
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import "../assets/less/shop.less";
//引用组件
import Poeple from "../components/Poeple.vue";
export default {
  name: "Shop",
  // 注册组件
  components: {
    Poeple,
  },
  //数据
  data() {
    return {
      // 列表下标
      activeNames: ["1"],
      //用户信息
      userInfo: {},
      //歌曲收藏缓存
      songList: [],

      // 个人中心
      accountInfo: {
        nickName: "",
        desc: "",
        phone: "",
        userId: "",
        desc: "",
      },
    };
  },

  created() {
    //获取用户信息
    this.getUserInfo();
   
  },

  methods: {
    //获取缓存
    gethuan() {
      if (localStorage.getItem("song") == "") {
        return;
      }
      this.songList = JSON.parse(localStorage.getItem("song"));
    },
    //获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        // this.$toast("请先登录");
          return this.$router.push({ name: "Login" });
      
      }
    //获取缓存
    this.gethuan();
    //获取个人资料
    this.getAccountInfo();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });

          } else if (result.data.code == "A001") {
            this.userInfo = result.data.result[0];
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 上传背景图
    afterRead(file) {
      // 此时可以自行将文件上传至服务器

      //允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];

      //允许最大文件大小 1MB
      let size = 1;

      //判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小 B, 1024B = 1KB, 1024KB = 1MB
      let fileSize = file.file.size / 1024 / 1024;

      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      //处理base64的标记data:image/jpeg;base64,
      let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      //

      //发起请求
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "/updateUserBg",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType: fileType,
          serverBase64Img: base64,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "I001") {
            this.userInfo.userBg = result.data.userBg;
          }

          this.$toast(result.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //获取个人资料
    getAccountInfo() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "B001") {
            let data = result.data.result[0];
            if (data.desc == "") {
              data.desc = "这家伙很懒，什么都没有留下！";
            }
            this.accountInfo = data;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //上传用户头像
    uploadUserImg(file) {
      //
      //允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];

      //允许最大文件大小 1MB
      let size = 1;

      //判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小 B, 1024B = 1KB, 1024KB = 1MB
      let fileSize = file.file.size / 1024 / 1024;

      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      //处理base64的标记data:image/jpeg;base64,
      let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      //

      //发起请求
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "/updateAvatar",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType: fileType,
          serverBase64Img: base64,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "H001") {
            this.accountInfo.userImg = result.data.userImg;
          }

          this.$toast(result.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //修改昵称
    updateNickName() {
      if (!this.accountInfo.nickName) {
        this.$toast("昵称不能为空");
      }

      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "/updateNickName",
        data: {
          appkey: this.appkey,
          tokenString,
          nickName: this.accountInfo.nickName,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //修改简介
    updateDesc() {
      if (!this.accountInfo.nickName) {
        this.$toast("昵称不能为空");
      }

      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "/updateDesc",
        data: {
          appkey: this.appkey,
          tokenString,
          desc: this.accountInfo.desc,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 跳转路由
    goPage(name) {
      this.$router.push({ name });
    },
  },
};
</script>
