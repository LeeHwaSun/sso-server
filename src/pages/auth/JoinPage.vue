<template>
  <q-page padding>
    <div class="text-h5">회원가입</div>
    <q-form @submit="save" class="q-gutter-y-md">
      <q-input
        type="email"
        label="이메일"
        v-model="form.mb_email"
        :rules="rules.email()"
      ></q-input>
      <InputPassword
        label="비밀번호"
        v-model="form.mb_password"
        :rules="rules.password()"
        show-info
      ></InputPassword>
      <InputPassword
        label="비밀번호 확인"
        v-model="checkPw"
        :rules="[rules.matchValue(form.mb_password)]"
      ></InputPassword>
      <q-input
        label="이름"
        v-model="form.mb_name"
        :rules="rules.name()"
      ></q-input>
      <InputPhone
        label="전화번호"
        v-model="form.mb_hp"
        :rules="rules.phone()"
      ></InputPhone>
      <q-btn
        type="submit"
        label="회원가입"
        class="full-width"
        color="primary"
      ></q-btn>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import validateRules from 'src/util/validateRules'
import InputPassword from 'src/components/inputs/InputPassword.vue'
import InputPhone from 'src/components/inputs/InputPhone.vue'
import authApi from 'src/apis/authApi';

export default defineComponent({
  components: { InputPassword, InputPhone },
  name: 'JoinPage',
  data() {
    return {
      form: {
        mb_email: "",
        mb_password: "",
        mb_name: "",
        mb_hp: "",
      },
      checkPw: ""
    }
  },
  computed: {
    rules: () => validateRules,
  },
  methods: {
    async save() {
      //console.log(this.form);
      this.$q.loading.show();
      const data = authApi.join(this.form);
      if (data) {
        this.$q.notify( { type: 'info', message: `${this.form.mb_name}님 회원 가입 하셨습니다.`} );
        this.$router.push( { name: 'login', query: this.$route.query } );
      }
      this.$q.loading.hide();
    }
  }
});
</script>

<style lang='scss' scoped>
</style>
