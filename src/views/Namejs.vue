<template>
  <div class="namejs">
      <h5 class="js-title">简介</h5>
      <p class="js-text">{{jsData}}</p>
      <!-- <h5 class="rh-title">{{rhData.ti}}</h5>
      <p class="rh-text">{{rhData.txt}}</p>
      <h5 class="ry-tilte">{{ryDatatitle}}</h5>
      <p class="ry-text" v-for="(item,index) in ryData" :key="index">.{{item}}</p>
   <h5 class="yy-title">{{yanyData.ti}}</h5>
      <p class="yy-text">{{yanyData.txt}}</p> -->
  </div>
</template>

<script>
import '../assets/less/namejs.less'
export default {
  name: "Namejs",
  //数据
  data() {
    return {
      //id
      id: "",
      //介绍
      jsData: '',
      //入行经历
      rhData:[],
      //荣耀
      ryDatatitle:"",
      ryData:[],
      //演艺经历
      yanyData:[],
    };
  },
  //初始化
  created() {
    this.id = sessionStorage.getItem("id");
    
    this.getmvData();
  },
  //方法
  methods: {
    getmvData() {
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
        url: "http://localhost:3000/artist/desc",
        params: {
          id: this.id,
        },
      }).then((res) => {
        if (res.status == 200) {
          // 请求成功
          this.$toast.clear();
          
          //介绍
          this.jsData = res.data.briefDesc;
        //   //入行
        //   this.rhData = res.data.introduction[0];
        //   //荣耀
        //   this.ryDatatitle = res.data.introduction[1].ti;
        //  this.ryData = res.data.introduction[1].txt.split('▪');
        //  //演绎
        //  this.yanyData = res.data.introduction[2];
        }
      });
    },
  },
};
</script>
