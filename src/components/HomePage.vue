<template lang="html">
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="jumbotron text-center mt-4 mb-4">
          <h1 class="mb-4">Bem vindo ao Kanban Online</h1>
          <p class="lead">Aqui é possível criar um Kanban personalizado para organizar melhor as suas tarefas. Crie quadros, inclua listas e insira as tarefas de maneira personalizada. Aproveite o recurso de drag and drop</p>
          <p v-if="!this.$root.credentials">
            <v-btn color="primary" @click="login">Login</v-btn>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods:{
    login(){
      this.$router.replace('/login');
    }
  }
}
</script>

<style lang="css" scoped>
div.jumbotron {
  background: #eee;
  border-radius: 16px;
  padding: 4px 32px;
}
</style>