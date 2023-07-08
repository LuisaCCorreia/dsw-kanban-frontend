<template lang="html">
    <div v-show="this.$root.credentials" class="mt-8">
        <v-container>
            <v-row>
                <v-col cols="9">
                    <h2>Compartilhados</h2>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center" dense v-for="(item, index) in items" :key="index">
                        <v-col cols="12" lg="6" md="6">
                            <v-card elevation="2" height="150" width="350" class="my-4" :color="item.quadro.corFundo">
                                <v-card-title>
                                    <span :style="{ color: item.quadro.corTexto }">
                                        {{ item.quadro.titulo }}
                                    </span>
                                    <v-layout v-if="item.quadro.favorito" justify-end>
                                        <v-icon color="yellow">mdi-star</v-icon>
                                    </v-layout>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn :disabled="item.editavel !== undefined && item.editavel === false" color="accent"
                                        @click="editarQuadro(item.quadro)"><v-icon>mdi-pencil</v-icon></v-btn>
                                    <v-btn color="info" @click="visualizarQuadro(item)"><v-icon>mdi-eye</v-icon></v-btn>
                                    <v-btn :disabled="item.editavel !== undefined && item.editavel === false" color="error"
                                        class="mt-1 mb-2 mr-2" @click="removerQuadro(item.quadro.id)">
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
            items: [],
            favoritados: [],
            httpOptions: {
                headers: {
                    'Authorization': 'Bearer ' + this.$root.credentials.token
                }
            },
        }
    },

    methods: {
        atualizaLista: function () {
            axios.get("http://localhost:8081/api/v1/usuario/get", this.httpOptions)
                .then(response => {
                    this.items = response.data.compartilhados;
                    this.favoritados = response.data.favoritos
                    this.verificarFavoritados()
                })
                .catch(error => {
                    this.error = error.response.data.message;
                })

        },

        novoQuadro: function () {
            this.controlador.setItemSelecionado({ id: "", titulo: '', corTexto: '', corFundo: '' });
            this.$router.replace('/quadros/edit');
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
                    if (this.items[i].quadro.id === this.favoritados[j].id) {
                        this.items[i].quadro.favorito = true
                    }
                }
            }
            
        },
        visualizarQuadro: function (item) {
            this.controlador.setItemSelecionado({ ...item.quadro, editavel: item.editavel });
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