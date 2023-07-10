<template lang="html">
  <div v-show="this.$root.credentials" class="mt-8">
    <v-container>
      <v-row>
        <v-col cols="9">
          <h2>Coleções</h2>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn @click="novaColecao" color="primary" dark class="mb-2">
            Nova Coleção
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center" dense>
            <v-col v-for="(colecao, index) in items" :key="index" lg="3" md="3">
              <v-card v-if="colecao" elevation="2" height="150" width="225" class="my-4">
                <v-card-title>
                  {{ colecao.titulo }}
                </v-card-title>
                <v-card-actions>
                  <ModalColecao :quadrosSelecionados="colecao ? colecao.quadros : []" :salvar="editarColecao"
                    :tituloInicial="colecao ? colecao.titulo : ''" :index="index" :todosQuadros="labelsTodosQuadros" />
                  <v-btn color="info" @click="visualizarColecao(colecao)"><v-icon>mdi-eye</v-icon></v-btn>
                  <v-btn color="error" class="mt-2 mb-2 mr-2" @click="removerColecao(index)">
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
import ModalColecao from "../modais/ModalColecao.vue"

export default {
  name: "Colecoes-Lista",
  props: ["controlador"],
  data() {
    return {
      items: [],
      labelsTodosQuadros: [],
      todosQuadros: [],
      contadorNovasColecoes: 1,
      httpOptions: {
        headers: {
          "Authorization": "Bearer " + this.$root.credentials.token
        }
      },
    };
  },
  methods: {
    atualizaLista: function () {
      axios.get("http://localhost:8081/api/v1/usuario/get", this.httpOptions)
        .then(response => {
          console.log(response);
          this.items = response.data.colecoes;
          let quadros = response.data.quadros;
          let compartilhados = response.data.compartilhados;
          this.todosQuadros = [...quadros, ...compartilhados]
          if (Array.isArray(this.todosQuadros) && this.todosQuadros.length > 0) {
            for(let i = 0; i< this.todosQuadros.length; i++) {
              if(this.todosQuadros[i] !== null){
                this.labelsTodosQuadros.push(this.todosQuadros[i].titulo)
              }
            }
          }
        })
        .catch(error => {
          this.error = error.response.data.message;
        });
    },
    novaColecao() {
      this.items.push({ titulo: `Nova Coleção ${this.contadorNovasColecoes}`, quadros: [] });
      console.log(this.items);
      this.contadorNovasColecoes = this.contadorNovasColecoes + 1;
      axios.post(`http://localhost:8081/api/v1/usuario/collection`, { colecoes: this.items }, this.httpOptions)
        .then(() => {
          this.errorMessage = "";
        }).catch(error => {
          this.errorMessage = error.response.data.message;
        });
    },
    removerColecao: function (index) {
      this.items.splice(index, 1);
      axios.post(`http://localhost:8081/api/v1/usuario/collection`, { colecoes: this.items }, this.httpOptions)
        .then(() => {
          this.errorMessage = "";
          this.atualizaLista()
        }).catch(error => {
          this.errorMessage = error.response.data.message;
        });
    },
    compararQuadrosELabels(quadros) {
      let novosQuadrosSelecionados = []

      for (let i = 0; i < this.todosQuadros.length; i++) {
        for (let j = 0; j < quadros.length; j++) {
          console.log(this.todosQuadros[i])
          console.log(quadros[j])
          if (this.todosQuadros[i].titulo === quadros[j]) {
            novosQuadrosSelecionados.push(this.todosQuadros[i])
          }
        }
      }
      return novosQuadrosSelecionados
    },
    editarColecao(index, titulo, quadros) {
      this.items[index].titulo = titulo
      let quadrosAdicionados = this.compararQuadrosELabels(quadros)
      this.items[index].quadros = quadrosAdicionados
      axios.post(`http://localhost:8081/api/v1/usuario/collection`, { colecoes: this.items }, this.httpOptions)
        .then(() => {
          this.errorMessage = "";
        }).catch(error => {
          this.errorMessage = error.response.data.message;
        });

    },
    visualizarColecao: function (item) {
      this.controlador.setItemSelecionado(item);
      this.$router.replace(`/quadros/colecoes/view/${item.titulo}`);
    },
  },
  mounted() {
    console.log("mounted");
    this.atualizaLista();
  },
  components: { ModalColecao }
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