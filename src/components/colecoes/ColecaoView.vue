<template lang="html">
    <div v-show="this.$root.credentials" class="mt-8">
      <v-container>
        <v-row>
          <v-col cols="9">
            <h2>{{ item.titulo }}</h2>
          </v-col>
        </v-row>
      </v-container>
  
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center" dense v-for="(quadro, index) in item.quadros" :key="index">
              <v-col v-if="quadro" cols="12" lg="6" md="6">
                <v-card elevation="2" height="150" width="350" class="my-4" :color="quadro.corFundo">
                  <v-card-title>
                    <span :style="{ color: quadro.corTexto }">
                      {{ quadro.titulo }}
                    </span>
                    <v-layout v-if="quadro.favorito" justify-end>
                      <v-icon color="yellow">mdi-star</v-icon>
                    </v-layout>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="accent" @click="editarQuadro(quadro)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn color="info" @click="visualizarQuadro(quadro)"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn color="error" class="mt-1 mb-2 mr-2" @click="removerQuadro(quadro.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
  import axios from 'axios';
  
  export default {
    props: ['controlador'],
  
    data() {
      return {
        headers: [
          { text: 'ID', align: 'start', sortable: true, value: 'id' },
          { text: 'Nome', align: 'start', sortable: true, value: 'nome' },
          { text: '', value: 'actions', sortable: false },
        ],
        item: null,
        grupo:'',
        favoritados: [],
        totalItems: 0,
        loading: false,
        options: { itemsPerPage: 10 },
        filtroNome: '',
        httpOptions: {
          headers: {
            'Authorization': 'Bearer ' + this.$root.credentials.token
          }
        },
      }
    },
  
    methods: {
      atualizaLista: function () {
        this.item = this.controlador.itemSelecionado;
      },
    
      editarQuadro: function (item) {
        this.controlador.setItemSelecionado(item);
        this.$router.replace('/quadros/edit');
      },
  
      removerQuadro: function (id) {
        axios.delete(`http://localhost:8081/api/v1/quadro/delete/${id}`, this.httpOptions)
          .then(() => {
            this.atualizaLista()
          })
  
      },
      verificarFavoritados() {
        for (let i = 0; i < this.items.length; i++) {
          for (let j = 0; j < this.favoritados.length; j++) {
            if (this.items[i].id === this.favoritados[j].id) {
              this.items[i].favorito = true
            }
          }
        }
      },
  
      visualizarQuadro: function (item) {
        this.controlador.setItemSelecionado(item);
        this.$router.replace('/quadros/view');
      },
    },
    mounted() {
      console.log("mounted")
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