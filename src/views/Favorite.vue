<template>
  <div v-for="(item, index) in list" :key="index" class="order-item-box">
    <van-card
          v-for="one in item.data.cafeList"
          :key="one.userid"
          :num="one.restid"
          :desc="one.addr1"
          :title="one.restnm"
          thumb="https://m.nongmin.com/upload/news/202012/20201217112208817/20201217112208817.jpg">
      <template #tags>
        <van-tag plain type="danger">특식</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="goTo(one.restid)">식단보기</van-button>
      </template>
    </van-card>
  </div>
  <nav-bar></nav-bar>
</template>

<script>
  import { reactive, toRefs, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {getFavoriteList} from '../api/cafeteria'
  import navBar from '@/components/NavBar'
  import kakaoMap from '@/components/KakaoMap'
  export default {
    name: 'FavoriteCafe.vue',
    components: {
      navBar
    },
    /* 공부합시다 vue3
    * Composition API 와 setup 함수의 등장
    Vue 3에서는 컴포넌트 객체에 setup 함수를 사용할 수 있다.
    * ref 를 사용해서 반응형 변수로 data를, 보통의 자바스크립트 함수로 methods를 대체한다.
    * 라이프사이클 메소드는 onMounted, onUpdated 같은 라이프사이클 훅 함수가 대신한다.
    * 반응형 변수의 변경 탐지 역시 watch 함수로 구현 가능하며 계산된 값을 위한 computed 함수도 제공된다.
    * 컴포넌트 객체애서 속성으로 분리되었던 기능 대부분이 setup 함수 안에서 사용 가능하다.
    * setup을 사용하는 컴포넌트는 아래와 같은 방식으로 작성한다.
    *
    * ********************* 중요 ****************
    * 중요한 차이점은 setup 함수는 컴포넌트 인스턴스가 생성되기 전에 실행된다는 점이다.
    * 즉 컴포넌트 인스턴스에 접근이 필요한 기능은 사용할 수 없다.
    * 즉 setup 안에서 this를 통해 컴포넌트 객체의 data, computed, methods 에서 선언한 것들에는 접근이 불가능하다.
    * 그리고 인스턴스가 생성된 직후에 호출되는 created 메소드에 매칭되는 라이프 사이클 훅도 존재하지 않는다.
    * ********************* 중요 ***************
    * 참조사이트 : https://blog.rhostem.com/posts/2021-09-17-vue-3-script-setup
    * */
    setup() {
      const router = useRouter()
      const state = reactive({
        status: '',
        loading: false,
        finished: false,
        refreshing: false,
        list: [],
        page: 1,
        totalPage: 0
      })

      // 1. mount가 START
      onMounted(() => {
        onLoad()
      })

      /* aync는 function 앞에 붙는 비동기 ajax 라고 보면 이해하기 쉽고
      await는 callback 함수를 구현하지 않고 async가 끝날때까지 기다렸다가 다음 처리 로직을 진행하겠다는 것음. */
      const loadData = async () => {
        const data = await getFavoriteList({ pageNumber: state.page, status: state.status })
        state.list = state.list.concat(data)
        state.totalPage = data.totalPage
        // state.Loading 뭔가 설정이 덜된듯함
        state.loading = false;
        if (state.page >= data.totalPage) state.finished = true
      }


      const goTo = (id) => {
        console.log('id : ',id);
        router.push({ path: '/home', query: { id } })
      }

      const goBack = () => {
        router.go(-1)
      }

      const onLoad = () => {
        console.log('111111');
        if (!state.refreshing && state.page < state.totalPage) {
          state.page = state.page + 1
        }
        console.log('22222');
        if (state.refreshing) {
          state.list = [];
          state.refreshing = false;
        }
        console.log('33333');
        loadData()
      }

      const onRefresh = () => {
        state.refreshing = true
        state.finished = false
        state.loading = true
        state.page = 1
        onLoad()
      }

      return {
        ...toRefs(state),
        goTo,
        goBack,
        onLoad,
        onRefresh
      }
    },
  };
</script>

<style scoped></style>
