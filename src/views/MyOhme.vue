<template>
    <van-form class="cell" >
        <van-cell-group :title="loginYn">
            <van-cell title="ID" :value="user.userid"/>
            <van-cell title="NAME" :value="user.usernm"/>
        </van-cell-group>
        <van-cell-group title="setting">
            <van-cell is-link to="/userLogin" replace title="Login"/>
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
      loginYn: '',
      user: { userid: '', usernm: '' },
    }
  },
  created() {
    if (storage.get('UserInfo')) {
      this.user = storage.get('UserInfo')
      this.loginYn = "Log in (로그인 완료)"
    }else{
       this.loginYn = "Log out (로그인 해주세요.)"
    }
  },
  methods:{
    test01(){
      console.log('테스트중입니다.')
    }
  }
}
</script>

<style>
.cell{
    text-align: left;
}
</style>
