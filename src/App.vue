<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title @click="listaQuadros"> Meus Quadros</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="listaFavoritos">Favoritos</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="listaCompartilhados"> Compartilhados</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="listaColecoes">Coleções</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click.stop="toggleDrawer" v-if="this.$root.credentials"></v-app-bar-nav-icon>
      <v-btn text @click="homePage">
        <v-toolbar-title>Kanban</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <span v-if="this.$root.credentials">
        Olá, {{ this.$root.credentials.nome }}.
        <router-link :to="{ name: 'change-password' }" replace>
          <v-btn icon><v-icon>mdi-lock-reset</v-icon></v-btn>
        </router-link>
        <v-btn icon @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
      </span>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      @BSI UNIRIO: Desenvolvimento de Servidor Web @2023
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
  }),
  
  methods: {
    toggleDrawer: function () {
      this.drawer = !this.drawer;
    },

    homePage() {
      this.$router.replace('/');
    },

    logout: function () {
      localStorage.setItem("credentials", null)
      this.$root.credentials=null
      this.homePage()
    },

    listaReceitas: function () {
      this.$router.replace('/receitas');
    },
    listaQuadros: function () {
      this.$router.replace('/quadros');
    },
    listaFavoritos: function () {
      this.$router.replace('/quadros/favoritos');
    },
    listaCompartilhados: function () {
      this.$router.replace('/quadros/compartilhados');
    },
    listaColecoes: function () {
      this.$router.replace('/quadros/colecoes');
    },
    storage(){
      this.$root.credentials = JSON.parse(localStorage.getItem('credentials'))
    }
  },
  mounted(){
    this.storage()
  }
};
</script>

<style>
p.error {
  color: white !important;
}

.v-data-table__wrapper {
  border-top: 1px solid #ccc;
}
</style>