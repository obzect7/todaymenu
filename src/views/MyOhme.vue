<template>
    <van-form class="cell" >
        <van-cell-group :title="login.loginName">
            <van-cell title="ID" :value="user.userid"/>
            <van-cell title="NAME" :value="user.usernm"/>
        </van-cell-group>
        <van-cell-group title="Setting">
            <van-cell is-link replace :title="login.LoginYn" @click="GoLogin"/>
        </van-cell-group>
    </van-form>
    <nav-bar></nav-bar>
</template>

<script>

import navBar from '@/components/NavBar'
import storage from '@/utils/storage'

export default {
  name:'MyOhme',
  components: {
    navBar
  },
  data() {
    return {
      login: { loginName: '' , LoginYn: '' },
      user: { userid: '', usernm: '' },
    }
  },
  created() {
    if (storage.get('UserInfo')) {
      this.user = storage.get('UserInfo')
      this.login.loginName = "Log in (로그인 완료)"
      this.login.LoginYn = "로그아웃"
    }else{
       this.login.loginName = "Log out (로그인 해주세요.)"
       this.login.LoginYn = "로그인"
    }
  },
  methods: {
    GoLogin(){
      if(!storage.get('UserInfo')){
        this.$router.replace('/userLogin')
      }else{
        storage.del('UserInfo')
        this.$router.go(); // 페이지 새로고침
      }
    }
  }
}
</script>

<style>
.cell{
    text-align: left;
}
</style>
