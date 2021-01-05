<template>
  <div class="login">
    <!-- 背景 -->
    <div class="bg"></div>
    <div class="content">
      <!-- 导航 -->
      <van-nav-bar @click-right="goHome()">
        <template #title>
          <span id="logoName">Paris Music</span>
        </template>
        <template #right>
          <div class="nav-right">跳过登录</div>
        </template>
      </van-nav-bar>
      <!-- 欢迎 -->
      <div class="login-title">
        <h2 class="h2">欢迎回来!</h2>
        <p class="p">Welcome To Paris Music</p>
      </div>
      <!-- 登录 -->
      <div class="form">
        <van-form>
          <!-- 登录 -->
          <van-field
            name="手机号"
            label="手机号"
            placeholder="手机号"
            v-model="userInfo.phone"
            autocomplete="off"
          >
          </van-field>
          <van-field
            name="密码"
            label="密码"
            placeholder="密码"
            v-model="userInfo.password"
            style="letter-spacing: 16px"
            autocomplete="off"
            :type="flag ? 'password' : 'text'"
            :right-icon="flag ? 'closed-eye' : 'eye-o'"
            @click-right-icon="toggle"
          >
          </van-field>
          <!-- 按钮 -->
          <div class="register">
            <van-button type="primary" color="#FF80B0" round @click="login"
              >登录</van-button
            >
            <van-button
              type="primary"
              color="#787878"
              round
              @click="popup"
              style="color: white"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
      <!-- 弹窗 注册-->
      <van-popup v-model="show" position="bottom" closeable round class="popup">
        <van-form>
          <van-field
            name="手机号"
            label="手机号"
            placeholder="手机号"
            v-model="userRegisterInfo.phone"
            autocomplete="off"
            input-align="left"
          >
          </van-field>
          <van-field
            name="密码"
            label="密码"
            placeholder="密码"
            v-model="userRegisterInfo.password"
            style="letter-spacing: 16px"
            autocomplete="off"
            :type="flag ? 'password' : 'text'"
            :right-icon="flag ? 'closed-eye' : 'eye-o'"
            @click-right-icon="toggle"
            input-align="left"
          >
          </van-field>
          <van-field
            v-model="userRegisterInfo.nickName"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            style="letter-spacing: 16px"
            input-align="left"
            autocomplete="off"
          >
          </van-field>
          <!-- 按钮 -->
          <div class="register">
            <van-button
              type="info"
              color="#787878"
              round
              @click="register"
              style="color: white"
              >注册</van-button
            >
          </div>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
import '../assets/less/login.less'
// 导入表单验证模块化
import { validForm } from "../assets/js/public.js";
export default {
  name: "Login",
  //数据
  data() {
    return {
      //用户登录
      userInfo: {
        phone: "",
        password: "",
      },
      //用户注册
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: "",
      },
      //密码状态
      flag: true,
      //弹窗
      show: false,
    };
  },
  //方法
  methods: {
    //切换密码状态
    toggle() {
      this.flag = !this.flag;
    },
    //弹窗
    popup() {
      this.show = true;
    },
    //注册
    register() {
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userRegisterInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userRegisterInfo.password,
          errorMsg: "密码格式不正确",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
        nickName: {
          value: this.userRegisterInfo.nickName,
          errorMsg: "昵称格式不正确",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
        },
      };

      let isPass = validForm.valid(o);

      if (isPass) {
        //复制用户注册信息
        let userInfo = Object.assign({}, this.userRegisterInfo);
        userInfo.appkey = this.appkey;

        //启动加载提示
        this.$toast.loading({
          //文本提示
          message: "加载中...",
          //禁止穿透点击
          forbidClick: true,
          //提示时间, 0: 没有时间限制
          duration: 0,
        });

        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "/register",

          //POST请求参数, object
          data: userInfo,
        })
          .then((result) => {
            //关闭加载提示
            this.$toast.clear();

            if (result.data.code == 100) {
              this.isShow = false;
            } else {
              //如果注册失败，手机被注册了
              this.$toast(result.data.msg);
              this.userRegisterInfo.phone = "";
              this.userRegisterInfo.password = "";
              this.userRegisterInfo.nickName = "";
            }

            //
          })
          .catch((err) => {
            //关闭加载提示
            this.$toast.clear();
            this.userRegisterInfo.phone = "";
            this.userRegisterInfo.password = "";
            this.userRegisterInfo.nickName = "";
          });
      }
    },
    //登录
    login() {
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码格式不正确",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
      };

      let isPass = validForm.valid(o);

      if (isPass) {
        let userInfo = Object.assign({}, this.userInfo);
        userInfo.appkey = this.appkey;
        // 启动加载提示
        this.$toast.loading({
          // 文本提示
          message: "加载中...",
          // 禁止点击穿透
          forbidClick: true,
          // 提示时间 0 没有时间限制
          duration: 0,
          loadingType: "spinner",
        });
        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "/login",

          //POST请求参数, object
          data: userInfo,
        })
          .then((result) => {
            // 关闭提示
            this.$toast.clear();
            // 判断
            if (result.data.code == 200) {
              //  登录成功 保存token，以便后面验证
              localStorage.setItem("__tk", result.data.token);
              // 添砖到home
              this.$router.push({ name: "Home" });
            }
            // 登录失败
            else {
              this.$toast(result.data.msg);
              // 清空文本
              this.userInfo.phone = "";
              this.userInfo.password = "";
            }
          })
          .catch((err) => {
            // 关闭加载提示
            this.$toast.clear();
          });
      }
    },
    //跳过登录
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
