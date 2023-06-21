<template lang="html">
  <div v-show="this.$root.credentials" class="mt-8">
    <v-container>
      <v-row>
        <v-col cols="9">
          <h2>Quadros</h2>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn color="primary" dark class="mb-2" @click="novoQuadro">
            Novo Quadro
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center" dense v-for="(quadro, index) in items" :key="index">
            <v-col cols="12" lg="6" md="6">
              <v-card elevation="2" height="150" width="350" class="my-4" :color="quadro.corQuadro">
                <v-card-title>
                  <span :style="{color: quadro.corTexto}">
                   {{ quadro.titulo }} 
                  </span>                  
                </v-card-title>
                <v-card-actions>
                  <v-btn color="accent" @click="editarQuadro(quadro)"><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn color="info" @click="removerQuadro(quadro)"><v-icon>mdi-eye</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
//import axios from 'axios';

export default {
  props: ['controlador'],

  data() {
    return {
      headers: [
        { text: 'ID', align: 'start', sortable: true, value: '_id' },
        { text: 'Nome', align: 'start', sortable: true, value: 'nome' },
        { text: '', value: 'actions', sortable: false },
      ],
      items: [],
      totalItems: 0,
      loading: false,
      options: { itemsPerPage: 10 },
      filtroNome: '',

      httpOptions: {
        baseURL: this.$root.config.url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$root.credentials.token
        }
      },
    }
  },

  methods: {
    atualizaLista: function () {
      this.loading = true;
      const quadros = JSON.parse(localStorage.getItem("quadros"))
      this.items = quadros
      this.totalItems = 2

      /*    var sortBy = (this.options.sortBy && this.options.sortBy.length > 0) ? this.options.sortBy[0] : "";
          var sortDesc = (this.options.sortDesc && this.options.sortDesc.length > 0) ? this.options.sortDesc[0] : "";
          var page = this.options.page;
          var itemsPerPage = this.options.itemsPerPage;
          var queryString = `sortField=${sortBy}&sortDesc=${sortDesc}&page=${page}&itemsPage=${itemsPerPage}&filter=${this.filtroNome}`;

          axios.get(this.$root.config.url + "/receitas?" + queryString, this.httpOptions)
              .then(response => {
                  this.items = response.data.items;
                  this.totalItems = response.data.totalItems;
                  this.loading = false;
              })
              .catch(error => {
                  this.error = error.response.data.message;
              })*/

    },

    novoQuadro: function () {
      this.controlador.setItemSelecionado({ _id: "", titulo: '', corTexto: '', corQuadro: '' });
      this.$router.replace('/quadros/edit');
    },

    editarQuadro: function (item) {
      this.controlador.setItemSelecionado(item);
      this.$router.replace('/quadros/edit');
    },

    removerQuadro: function (item) {
      this.controlador.setItemSelecionado(item);
      this.$router.replace('/quadros/view');
    },
  },

  created() {
    console.log(this.controlador.title);
    this.atualizaLista();
  }
}
</script>

<style scoped>
.filter-section {
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 4px 8px;
  margin-bottom: 16px;
}
</style>