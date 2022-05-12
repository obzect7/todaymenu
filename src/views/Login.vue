<template>
  <div class="content">
    <van-form class="login-form" @submit.prevent="handleLogin">
      <img src="@/assets/splashScreen.png" alt="">
      <van-cell-group inset class="login-info">
        <van-field
          v-model.trim="user.userid"
          required
          clearable
          label="사용자ID"
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
      <div style="margin: 16px;">
        <van-button round
          type="primary"
          size="large"
          @click="handleLogin"
        >
          로그인
        </van-button>
      </div>
    </van-form>
    <van-form class="syncLogin">
      <div style="margin: 16px;">
        <van-button color="#fef01b" round block type="primary" native-type="submit" @click="kakaoLogin">
          카카오톡 계정으로 로그인
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button color="#2db400" round block type="primary" native-type="submit">
          네이버 계정으로 로그인
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button color="#f3f3f3" round block type="primary" native-type="submit">
          구글 계정으로 로그인
        </van-button>
      </div>
    </van-form>
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
    },
    kakaoLogin() {
      console.log('카카오 로그인');
      Kakao.Auth.login({
        success: function (authObj) {
          Kakao.Auth.setAccessToken(authObj.access_token);
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (result) {
                alert(
                    JSON.stringify(result)
                )
                console.log(result)
            },
            fail: function (error) {
                alert(
                    'login success, but failed to request user information: ' +
                    JSON.stringify(error)
                )
            },
          })
        },
        fail: function (err) {
            alert(JSON.stringify(err))
        },  
      })
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8080/home'
      });
    }
  }
}
</script>

<style  scoped>
  .content{
    height: 100vh;
    width:100vw; 

  }
    img{ 
        width : 30%;
        height: 20%; 
        display : block;
        margin : auto;  
    }
  .login-form{
    text-align:center;
    margin: 0 auto;
  }
  .syncLogin{
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
</style>
