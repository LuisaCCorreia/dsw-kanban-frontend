<template lang="html">
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="mb-4">Bem vindo ao Kanban Online</h1>
        <p class="lead">Aqui é possível criar um Kanban personalizado para organizar melhor as suas tarefas. Crie quadros,
          inclua listas e insira as tarefas de maneira personalizada. Aproveite o recurso de drag and drop</p>
      </v-col>
    </v-row>
  
    <v-row class="mb-3">
      <v-layout class="mb-4" justify-center>
        Crie quadros escolhendo o título, cor do fundo e cor do texto
      </v-layout>
    </v-row>
    <v-row class="mb-3">
      <img width="1250" src="../assets/quadros.png">
    </v-row>
   
    <v-row class="mb-3">
      <v-layout class="mb-4" justify-center>
        Crie, edite e apague listas, adicione ou remova tarefas e utilize o recurso do drag and drop
      </v-layout>
    </v-row>
    <v-row class="mb-3">
      <img width="1250" src="../assets/listas.png">
    </v-row>
    
    <v-row class="mb-3">
      <v-layout justify-center>
        Adicione quadros aos favoritos
      </v-layout>
    </v-row>
    <v-row class="mb-3">
      <img width="1250" src="../assets/favoritos.png">
    </v-row>
  
    <v-row class="mb-3">
      <v-layout justify-center>
        Compartilhe os quadros com permissão apenas de visualização ou de edição
      </v-layout>
    </v-row>
    <v-row class="mb-3">
      <img width="1250" src="../assets/compartilhados.png">
    </v-row>
    <v-row class="mb-3">
      <v-layout justify-center>
        Compartilhe os quadros com permissão apenas de visualização ou de edição
      </v-layout>
    </v-row>
    <v-row class="mb-3">
      <img width="1250" src="../assets/colecao.png">
    </v-row>

    <v-layout v-if="!this.$root.credentials" justify-center>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  methods: {
    login() {
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