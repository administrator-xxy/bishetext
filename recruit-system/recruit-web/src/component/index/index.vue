<!-- 大部分页面的头部模块 -->
<!-- 内容主要包括登录和以及登录后需显示的信息，以及网站的几个大选项（如首页、公司等） -->
<template>
<div>
  <!-- 注册框 -->
  <div>
    <el-drawer title="企业员工招聘系统" :visible.sync="showregister" :direction="direction" :before-close="handleClose1">
      <el-card class="box-card" style="margin-top: 10%;">
        <div slot="header" style="margin-top: 5%;">
          <H1 style="margin-bottom: 5%;">注册账号</H1>
          <el-form ref="form" :model="registerform" :rules="registerRules">
            <el-form-item label="账号" prop="username" label-width="25%">
              <el-input type="text" placeholder="请输入账号" v-model="registerform.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="nickname" label-width="25%">
              <el-input type="text" placeholder="请输入姓名" v-model="registerform.nickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel" label-width="25%">
              <el-input type="text" placeholder="请输入手机号" v-model="registerform.tel">
                <template slot="append">
                  <el-button>发送验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" label-width="25%">
              <el-input placeholder="请输入验证码" v-model="code"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="25%">
              <el-input type="password" placeholder="请输入密码" v-model="registerform.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_password" label-width="25%">
              <el-input type="password" placeholder="请输入密码" v-model="registerform.confirm_password"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="roletype" label-width="25%">
              <div>
                <el-radio v-model="registerform.roletype" label="2">求职者</el-radio>
                <el-radio v-model="registerform.roletype" label="3">招聘者</el-radio>
              </div>
            </el-form-item>
            <el-form-item inline-message>
              <el-button type="primary" @click="userRegister()" style="width: 100%;">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </div>

  <!-- 登录框 -->
  <div>
    <el-drawer title="企业员工招聘系统" :visible.sync="showlogin" :direction="direction" :before-close="handleClose">
      <el-card class="box-card" style="margin-top: 20%;">
        <div slot="header" style="margin-top: 20%;">
          <H1 style="margin-bottom: 5%;">欢迎登录</H1>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="账号" prop="username" label-width="15%">
              <el-input type="text" placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="15%">
              <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item inline-message>
              <el-row>
                <el-col>
                  <el-button type="primary" @click.native.prevent="throttleLogin" style="width: 100%;">登录
                  </el-button>
                </el-col>
                <el-col>
                  <p @click="showlogin = false; showfind = true" style="cursor:pointer;text-decoration:underline">忘记密码
                  </p>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </div>

  <!-- 忘记密码 -->
  <div>
    <el-drawer title="企业员工招聘系统" :visible.sync="showfind" :direction="direction" :before-close="handleClose2">
      <el-card class="box-card" style="margin-top: 20%;">
        <div slot="header" style="margin-top: 8%;">
          <H1 style="margin-bottom: 5%;">找回密码</H1>
          <el-form ref="form" @submit.prevent="throttleLogin()" :model="form" :rules="rules">
            <el-form-item label="账号" prop="username" label-width="25%">
              <el-input type="text" placeholder="请输入账号" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="username" label-width="25%">
              <el-input type="text" placeholder="请输入手机号" v-model="form.username">
                <template slot="append">
                  <el-button>发送验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="username" label-width="25%">
              <el-input type="text" placeholder="请输入验证码" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="25%">
              <el-input type="password" placeholder="请输入新密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password" label-width="25%">
              <el-input type="password" placeholder="请确认新密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item inline-message>
              <el-row>
                <el-col>
                  <el-button type="primary" @click="throttleLogin()" @keyup.enter="throttleLogin()" style="width: 100%;">提交</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </div>

  <!-- 头部 -->
  <div id="headTop">
    <div class="contains">
      <ul class="left">
        <!-- <i class="iconfont icon-mobilephone_fill"></i> -->
        <li>
          <span class="lgstyle">企业员工招聘系统</span>&nbsp;&nbsp;
        </li>
      </ul>
      <ul class="right2">
        <li v-if="this.userstate">
          <span>
            <el-button type="primary" round @click="tobacked">进入后台</el-button>&nbsp;
            <el-button type="danger" round @click="outLogin">注销</el-button>&nbsp;&nbsp;&nbsp;
          </span>
          <span style="font-size:22x;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ nickname }}，欢迎使用系统</span>
        </li>
      </ul>
      <ul class="right" v-if="this.userstate && isemplyee">
        <li style="font-size:18px;">
          <router-link to="/resume-create">我的简历&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
        <li style="font-size:18px;">
          <router-link to="/box/wait">投递箱&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
        <li style="font-size:18px;">
          <router-link to="/collection">收藏夹&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
      </ul>
      <ul class="right" v-if="this.userstate && ishr">
        <li style="font-size:18px;">
          <router-link to="/company/modify">我的企业&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
        <li style="font-size:18px;">
          <router-link to="/application/wait">查看职位申请&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
        <li style="font-size:18px;">
          <router-link to="/interview/manage">面试管理&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
      </ul>
      <ul class="right" v-if="this.userstate && isadmin">
        <li style="font-size:18px;">
          <router-link to="/company/examine/wait">企业认证管理&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
        <li style="font-size:18px;">
          <router-link to="/position/examine/wait">职位审核&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </li>
      </ul>
      <ul class="right1">
        <li style="font-size:18px;">
          <span v-if="!this.userstate">
            <el-button @click="showlogin = true" type="primary" round>登录</el-button>&nbsp;&nbsp;
            <el-button @click="showregister = true" round>注册</el-button>
          </span>
        </li>
      </ul>
    </div>
  </div>

  <div id="headnav">
    <div class="contains">
      <div class="logo left">
        <img class="logoimg" img src="../../assets/image/logo.png" />
        <span class="ads">全国站</span>
      </div>
      <ul class="navlist" id="navNum">
        <li :class="{ now: isone }">
          <router-link to="/index">首页</router-link>
        </li>
        <li :class="{ now: istwo }">
          <router-link to="/index">咨询</router-link>
        </li>
        <li>
          <router-link to="/index">校园</router-link>
        </li>
        <li>
          <router-link to="/index">言职</router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import store from '@/store';
import {
  mapActions,
  mapMutations,
  mapGetters
} from 'vuex'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import User from '@/lin/model/user'
import Utils from '@/lin/util/util'
import _axios, {
  post,
  get,
  put
} from '@/lin/plugin/axios'
Vue.use(Croppa)
export default {
  data() {
    return {
      groupId: "",
      code: "",
      myFlag: true,
      num: 0,
      showfind: false,
      showlogin: false,
      showregister: false,
      isone: false,
      istwo: false,
      direction: "rtl",
      loading: false, // 加载动画
      wait: 2, // 2000ms之内不能重复发起请求
      throttleLogin: null, // 节流登录
      form: {
        username: '',
        password: '',
      },
      registerform: {
        roletype: "",
        nickname: '',
        username: '',
        password: '',
        confirm_password: '',
        tel: '',
        group_ids: ['', ]
      },
      registerRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        roletype: [{
          required: true,
          message: '请选择用户类型',
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }],
        confirm_password: [{
          required: true,
          message: '请确认输入密码',
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }]
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  props: ['isnow'],
  created() {

  },
  computed: {
    isemplyee: function () {
      if (store.getters.user === null) {
        return false
      }
      // 求职者groupId==2
      if (this.groupId === 2 || store.getters.groupId === 2) {
        return true
      }
      return false
    },
    ishr: function () {
      if (store.getters.user === null) {
        return false
      }
      // hr groupId==3
      if (this.groupId === 3 || store.getters.groupId === 3) {
        return true
      }
      return false
    },
    isadmin: function () {
      if (store.getters.user === null) {
        return false
      }
      // hr groupId==3
      if (this.groupId === 4 || store.getters.groupId === 4) {
        return true
      }
      return false
    },
    nickname: function () {
      if (store.getters.user === null) {
        return null
      } else {
        console.log(store.getters)
        return store.getters.user.nickname
      }
    },
    userstate: function () {
      if (store.getters.user === null) {
        return false
      }
      return true
    },
  },
  methods: {
    async userRegister() {
      try {
        this.registerform.group_ids[0] = this.registerform.roletype
        const res = await User.register(this.registerform)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`注册成功`)
          this.resetForm(formName)
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    handleClose(done) {
      this.form = {
        username: '',
        password: '',
      }
      this.showlogin = false
    },
    handleClose1(done) {
      this.form = {
        username: '',
        password: '',
      }
      this.showregister = false
    },
    handleClose2(done) {
      this.form = {
        username: '',
        password: '',
      }
      this.showfind = false
    },
    async login() {
      const {
        username,
        password
      } = this.form
      try {
        this.loading = true
        await User.getToken(username, password)
        await this.getInformation()
        this.loading = false
        // this.$router.push('/about')
        this.handleClose()
        this.$message.success('登录成功')
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async getInformation() {
      try {
        // 尝试获取当前用户信息
        const user = await User.getPermissions()
        this.setUserAndState(user)
        this.setUserPermissions(user.permissions)
        const id = store.getters.user === null ? "" : store.getters.user.id
        const res = await get('recruit/user/getGroup/' + id)
        store.getters.groupId = res
        this.groupId = res
      } catch (e) {
        console.log(e)
      }
    },
    outLogin() {
      // window.location.reload(true)
      this.loginOut()
      this.$message.success("退出登录成功")
    },
    ...mapActions(['loginOut', 'setUserAndState']),
    ...mapMutations({
      setUserPermissions: 'SET_USER_PERMISSIONS',
    }),
    async tobacked() {
      this.$router.push({
        path: '/about'
      })
    },
  },
  mounted() {
    this.num = this.isnow;
    // if(this.num!="0"){
    //     let ul=document.getElementById('navNum') ;
    //     let li=ul.children[this.num-1];
    //     li.className='now';
    // }
    if (this.num == "1") {
      this.isone = true;
    } else if (this.num == "2") {
      this.istwo = true;
    }
  },
  created() {
    // 节流登录
    this.throttleLogin = Utils.throttle(this.login, this.wait)
  },
}
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_631781_uzwcwz6vcmcxr.css");
$nx-color: #449efe;
$nx-color2: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;

.loginbox {
  width: 60%;

  height: 60%;

  min-width: 400px;

  max-width: 500px;

  padding: 20px;

  overflow: auto;

  margin: auto;

  position: absolute;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.left {
  float: left;
  padding-left: $all-padding;
}

.right2 {
  font-size: large;
  margin-top: auto;
  float: right;
  padding-left: $all-padding;
}

.right {
  margin-top: 7px;
  cursor: pointer;
  float: right;
  padding-right: $all-padding;
}

.right1 {
  cursor: pointer;
  float: right;
  padding-right: $all-padding;
}

#headTop {
  width: 100%;
  height: 2.5rem;
  background: rgb(51, 51, 51);

  // padding: $all-padding;
  div {
    width: $nx-width;
    height: 100%;
    margin: 0 auto;

    ul {
      height: 100%;

      .iconfont {
        float: left;
        line-height: 2rem;
        font-size: 1.3rem;
        color: $nx-color2;
      }

      li {
        float: left;
        height: 100%;
        font-size: 14px;
        color: #c4c3c3;
        margin-top: 0.3rem;

        a {
          color: #aaa;
        }

        .lgstyle {
          color: $nx-color2;
          font-size: 28px;
        }
      }
    }
  }
}

#headnav {
  width: 100%;
  height: 4rem;
  // padding: $all-padding;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  overflow: hidden;

  .contains {
    width: 76.25rem;
    height: 100%;
    margin: 0 auto;

    .logo {
      width: 10rem;
      height: 1.2rem;
      margin-left: 4rem;
      margin-right: 2rem;

      img {
        margin: 5px;
        height: 50px;
      }

      span {
        float: right;
        display: inline-block;
        line-height: 80px;
        margin-left: 5px;
      }
    }

    .navlist {
      height: 100%;

      li {
        float: left;
        font-size: 20px;
        margin: 20px;
        padding: 0 6px 11px;

        &.now,
        &:hover {
          border-bottom: 2px solid $nx-color2;
        }
      }
    }
  }
}
</style>
