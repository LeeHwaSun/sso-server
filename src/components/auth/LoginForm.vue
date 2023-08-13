<template>
  <q-form @submit="onSubmit">
    <q-item-section class="q-gutter-y-md">
      <q-input label="아이디" v-model="form.mb_email"></q-input>
      <q-input label="비밀번호" v-model="form.mb_password" type="password"></q-input>
      <q-btn
        type="submit"
        label="로그인"
        color="primary"
        class="full-width"
      ></q-btn>
      <q-btn label="회원가입" color="secondary" class="full-width" :to="{name: 'join', query: $route.query}"></q-btn>
    </q-item-section>
  </q-form>
</template>

<script>
import { mapActions } from "pinia";
import useUser from "src/stores/useUser";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      form: { mb_email: "", mb_password: "" },
    };
  },
  computed: {
    next() {
      return this.$route.query.next || '/';
    }
  },
	methods: {
    ...mapActions(useUser, ['loginLocal']),
		async onSubmit() {
      this.$q.loading.show();
      const data = await this.loginLocal(this.form);
      this.$q.loading.hide();
      if (data) {
        this.goNext();
      }
		},
    goNext() {
      if (this.next.startsWith('http')) {
        location.href = this.next;
      } else {
        this.$router.push(this.next);
      }
    }
	}
});
</script>

<style lang='scss' scoped>
</style>
