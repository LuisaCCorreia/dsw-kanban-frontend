<template lang="html">
    <div v-show="this.$root.credentials" class="mt-8">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h2>{{ titulo }}</h2>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn color="primary" class="mb-2 mr-2" @click="salvaLista">
                        Salvar Lista
                    </v-btn>
                    <v-btn color="outlined" class="mb-2" @click="retornaQuadroView">
                        Quadro
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <div>
                <v-row>
                    <v-col md="10">
                        <v-text-field v-model="item.tituloLista" class="ml-4"
                            label="Escreva o título da lista aqui"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col md="10">
                        <v-text-field v-model="tarefa" class="ml-4"
                            label="Escreva uma tarefa para a lista aqui"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn color="outlined" class="mb-2" @click="adicionarTarefa">
                            <v-icon color="success" dark>
                                mdi-plus
                            </v-icon>Adicionar
                        </v-btn>
                    </v-col>
                </v-row>
                <v-list three-line>
                    <template v-for="(item, index) in tarefas">
                        <v-list-item :key="item">
                            <v-list-item-avatar>
                                <v-icon color="info" dark>
                                    mdi-clipboard-text
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content class="mb-4">
                                <v-list-item-title v-html="item"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon @click="apagarTarefa(index)">
                                    <v-icon color="error" dark>
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider v-if="index < tarefas.length - 1" :key="index"></v-divider>
                    </template>
                </v-list>
            </div>
        </v-container>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    props: ['controlador'],

    data() {
        return {
            headers: [
                { text: 'Ingrediente', align: 'start', sortable: true, value: 'item' },
                { text: 'Quantidade', align: 'start', sortable: true, value: 'qtde' },
                { text: '', value: 'actions', sortable: false },
            ],

            item: null,

            novoIngrediente: {
                item: '',
                qtde: ''
            },

            titulo: '',
            tarefa: '',
            tarefas: [],
            errorMessage: '',

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
        prepara: function () {
            this.errorMessage = "";
            this.item = this.controlador.itemSelecionado;
            this.titulo = (this.item.tituloLista === "") ? "Nova Lista" : this.item.tituloLista;
        },

        adicionarTarefa() {
            this.tarefas.push(this.tarefa)
            this.tarefa = ''
        },
        apagarTarefa(index) {
            this.tarefas.splice(index, 1)
        },
        salvaLista: function () {
            let armazenamento = JSON.parse(localStorage.getItem("quadros"))
            let index = armazenamento.findIndex((i) => i._id === this.item.quadroid)
            let novaLista = {titulo: this.item.tituloLista, tarefas:this.tarefas}

            if(armazenamento[index].listas) {
                armazenamento[index].listas.push(novaLista)
            } else {
                armazenamento[index].listas = [novaLista]
            }

            /*  axios.post(this.$root.config.url + "/receitas/", this.item, this.httpOptions)
                  .then(() => {
                      this.errorMessage = "";
                      this.$router.replace('/quadros');
                  }).catch(error => {
                      this.errorMessage = error.response.data.message;
                  });*/
              localStorage.setItem("quadros", JSON.stringify(armazenamento))
              this.controlador.setItemSelecionado(armazenamento[index])
              this.$router.replace('/quadros/view');
        },

        retornaQuadroView: function () {
            this.$router.replace('/quadros/view');
        },
    },

    created() {
        this.prepara();
    }
}
</script>

<style scope>
div.detail-form {
    background: #eee;
    padding: 32px;
}
</style>