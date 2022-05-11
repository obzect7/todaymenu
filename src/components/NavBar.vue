<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="home-o" replace to="/home" >홈</van-tabbar-item>
    <van-tabbar-item name="like" icon="like-o" replace to="/favorite" >찜한식당</van-tabbar-item>
    <van-tabbar-item name="comment" icon="comment-o" replace to="/favorite" >출입내역</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o" replace to="/userLogin" >My오메</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue';

export default {
  setup(){
    const active = ref(0);
    return { active }
  },
  methods:{

  }
}
</script>

<style scoped>
</style>
