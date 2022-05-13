<template>
    <van-nav-bar
      left-arrow
      title = "Sign Up"
      @click-left="$router.replace('/userLogin')"
    />
    <van-form @submit="onSubmit">
    <van-cell-group inset>
        <van-field
        v-model="userid"
        name="userid"
        label="ID"
        placeholder="ID"
        required
        />
        <van-field
        v-model="Password"
        type="password"
        name="Password"
        label="Password"
        placeholder="Password"
        required
        />
        <van-field
        v-model="NickName"
        name="NickName"
        label="NickName"
        placeholder="NickName"
        />
        <van-field
        v-model="Hp"
        name="Hp"
        label="Hp"
        placeholder="전화번호"
        />
        <van-field
        v-model="BirthDay"
        is-link
        readonly
        name="BirthDay"
        label="BirthDay"
        placeholder="Select date"
        @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
            Submit
            </van-button>
        </div>
    </van-form>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "SignUp",
    setup() {
        const result = ref('');
        const showCalendar = ref(false);
        const onConfirm = (date) => {
        result.value = `${date.getMonth() + 1}/${date.getDate()}`;
        showCalendar.value = false;
        };

        return {
        result,
        onConfirm,
        showCalendar,
        };
    },
}
</script>