<template lang="html">
  <v-row v-show="!this.$root.credentials" class="mt-8">
    <v-col offset-md="4" md="4">
      <h2 class="form-title">Login</h2>
      <h5 class="form-subtitle mb-8">Entre com as suas credenciais para o login.</h5>

      <p class="error pa-1 mb-8" v-if="error">{{ error }}</p>

      <v-form @submit.prevent="processForm">
        <div class="form-group">
          <v-text-field v-model="form.email" label="Entre o seu e-mail"></v-text-field>
        </div>

        <div class="form-group">
          <v-text-field v-model="form.senha" type="password" label="Entre com a sua senha"></v-text-field>
        </div>

        <v-btn type="submit" class="primary">Envia</v-btn>
      </v-form>

      <div class="mt-12">
        <router-link :to="{ name: 'forgot-password' }" replace>
          Recuperar a minha senha
        </router-link>
      </div>

      <div class="mt-2">
        <router-link :to="{ name: 'create-account' }" replace>
          Criar nova conta
        </router-link>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: { email: "", senha: "" },
      error: '',
      token: '',
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:8081/api/v1/usuario/login", this.form)
        .then(response => {
          let jwt = response.headers.getAuthorization().split(" ")
          this.token = jwt[1]
          this.getDadosUsuario()
        })
        .catch(error => {
          this.error = error.response.data.message;
        })
    },
    getDadosUsuario() {
      axios.get("http://localhost:8081/api/v1/usuario/get", { headers: { 'Authorization': `Bearer ${this.token}` } })
        .then(response => {
          const credentials = { token: this.token,  nome: response.data.nome, email: response.data.email}
          this.$root.credentials = credentials
        })
        .catch(error => {
          this.error = error.response.data.message;
        })
    },
    processForm: function () {
      this.error = '';

      this.login()

      this.$router.replace('/');

    },
  }
}
</script>
