<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <!--
      <img
        class="login-poster"
        src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
      >
      -->
      <van-cell-group class="login-info">
        <van-field
          v-model.trim="user.userid"
          required
          clearable
          label="사용자IDD"
          placeholder="사용자ID를 입력하십시오"
        />

        <van-field
          v-model.trim="user.password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력 해주세요"
          right-icon="question-o"
          required
          clearable
          autocomplete
          @click-right-icon="$toast('비밀번호를 잊으셨나요?')"
        />
      </van-cell-group>
      <van-button
        type="primary"
        size="large"
        @click="handleLogin"
      >
        로그인
      </van-button>
    </form>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  setup(){

  },
  mounted () {
    this.$store.dispatch('LogOut', this.user).then(() => {
      console.log('로그아웃 진행')
    }).catch((error) => {
      // 오류 메시지, 구성 요소 프롬프트
      console.log('err ===',error);
      this.$toast({ message: error, duration: 1000 })
    })
  },
  data() {
    return {
      user: { userid: '', password: '' }
    }
  },
  created() {
    if (storage.get('UserInfo')) {
      this.user = storage.get('UserInfo')
    }
  },
  methods: {
    // 로그인 기능
    handleLogin() {
      console.log('@@@@@@@@@@@@@@@@')
      if (this.user.userid === '') {
        this.$toast({ message: '사용자ID를 입력하세요.', duration: 1000 })
        return false
      }
      if (this.user.password === '') {
        this.$toast({ message: '비밀번호를 입력하세요', duration: 1000 })
        return false
      }
      this.$store.dispatch('Login', this.user).then(() => {
        console.log('22222222222@@@@@@@@')
        // 경로가 식사 대용품인지 확인하려면 매개변수가 있는 리디렉션 매개변수 주소로 이동하고, 그렇지 않으면 홈 페이지로 이동합니다.
        // if (this.$router.query.redirect) {
          console.log('$$$$$$$$$$$$$$$$$')
          // this.$router.replace({ path: this.$router.query.redirect }) // 이전 페이지로 돌아가지 않고 바로 홈페이지로 이동
          // this.$router.replace({ path: '/favorite' })
          this.$router.replace('/favorite')
        // } else {
        //   console.log('##########')
        //   this.$router.replace('/favorite')
        //   // this.$router.replace({ path: '/favorite' })
        // }
      }).catch((error) => {
        // 오류 메시지, 구성 요소 프롬프트
        console.log('err ===',error);
        this.$toast({ message: error, duration: 1000 })
      })
    }
  }
}
</script>

<style  scoped>
.login {
  background-color: #fff;
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-info {
    margin-top: 15vw;
  }
  &-btn {
    margin-top: 10vw;
    width: 90%;
    margin-left: 5%;
  }
  .van-button--primary {
    color: #fff;
    background-color: #FF595F;
    border-color: #FF595F;
  }
  .van-button--large {
    width: 90%;
    margin-top: 10vw;
    margin-left: 5%;
    height: 5%;
    line-height: 245%;
  }
}

</style>
