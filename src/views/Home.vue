<template>
    <kakao-map></kakao-map>
    <nav-bar></nav-bar>
</template>

<script>

import navBar from '@/components/NavBar'
import kakaoMap from '@/components/KakaoMap'
export default {
  name: 'Home',
  components: {
    navBar,
    kakaoMap
  },
  methods:{
    test01(){
      console.log('테스트중입니다.')
    }
  }
}
</script>
