<template>
    <div v-show="this.$root.credentials" :style="{ backgroundColor: item.corFundo, height: '100%' }">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-row class="mt-1">
                        <v-btn icon color="secondary" class="mb-2 mr-2" @click="retornaListaQuadros">
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <h2 :style="{ color: item.corTexto }">{{ item.titulo }}</h2>
                        <v-btn icon color="yellow" class="mb-2 mr-2" @click="favoritar">
                            <v-icon>{{ iconeFavoritado }}</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col cols="3" class="text-right">
                    <v-btn color="info" :disabled="item.editavel !== undefined && item.editavel === false" class="mb-2 mr-2"
                        @click="novaLista">
                        Adicionar Lista
                    </v-btn>
                </v-col>
                <v-col cols="3" class="text-right">
                    <ModalCompartilhamento :permissaoEdicao="item.editavel" :quadroID="item.id" />
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <draggable :options="{ disabled: item.editavel !== undefined && item.editavel === false }"
                    @change="onChangeItem" :list="listas" class="row" group="listas">
                    <v-col md="4" v-for="(lista, index) in listas" :key="index">
                        <v-sheet shaped elevation="10" color="grey lighten-2" class="pa-3 mr-1" max-width="450">
                            <v-row>
                                <h2 class="pa-5">{{ lista.titulo }}</h2>
                                <v-layout class="mt-5" justify-end>
                                        <ModalLista :permissaoEdicao="item.editavel" :tituloInicial="lista.titulo"
                                            :index="index" :salvar="editarLista" />

                                        <v-btn small color="error"
                                            :disabled="item.editavel !== undefined && item.editavel === false"
                                            @click="apagarLista(index)" class="ml-1 mr-2"><v-icon>mdi-delete</v-icon></v-btn>
                                </v-layout>
                            </v-row>
                            <draggable :options="{ disabled: item.editavel !== undefined && item.editavel === false }"
                                @change="onChangeItem" :list="lista.tarefas" :animation="200" ghost-class="ghost-card"
                                group="tarefas">
                                <v-card elevation="2" height="75" width="325" class="ma-4"
                                    v-for="(tarefa, index2) in lista.tarefas" :key="index2">
                                    <v-card-title>
                                        {{ tarefa.conteudo }}
                                        <v-layout justify-end>
                                            <v-btn :disabled="item.editavel !== undefined && item.editavel === false" icon
                                                @click="apagarTarefa(index, index2)">
                                                <v-icon color="error" dark>
                                                    mdi-close
                                                </v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </v-card-title>
                                </v-card>
                            </draggable>
                            <v-layout justify-center>
                                <ModalTarefa :permissaoEdicao="item.editavel" :salvar="adicionarTarefa" :index="index" />
                            </v-layout>
                        </v-sheet>
                    </v-col>
                </draggable>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import ModalLista from '../modais/ModalLista.vue';
import ModalCompartilhamento from '../modais/ModalCompartilhamento.vue';
import ModalTarefa from '../modais/ModalTarefa.vue';

export default {
    props: ["controlador"],
    data() {
        return {
            item: null,
            iconeFavoritado: "mdi-star-outline",
            listas: [],
            contadorNovasListas: 1,
            edicaoLista: false,
            httpOptions: {
                headers: {
                    "Authorization": "Bearer " + this.$root.credentials.token
                }
            },
        };
    },
    methods: {
        prepara: function () {
            this.item = this.controlador.itemSelecionado;
            this.listas = this.item.listas ? this.item.listas : [];
            this.iconeFavoritado = this.item.favorito ? "mdi-star" : "mdi-star-outline"
        },
        novaLista() {
            this.listas.push({ titulo: `Nova Lista ${this.contadorNovasListas}`, tarefas: [] })
            this.contadorNovasListas = this.contadorNovasListas + 1
            this.controlador.setItemSelecionado(
                {
                    id: this.item.id,
                    titulo: this.item.titulo,
                    corFundo: this.item.corFundo,
                    corTexto: this.item.corTexto,
                    listas: this.listas
                }
            );
            axios.put(`http://localhost:8081/api/v1/quadro/update/${this.item.id}`, this.item, this.httpOptions)
                .then(() => {
                    this.errorMessage = "";
                }).catch(error => {
                    this.errorMessage = error.response.data.message;
                });
        },
        apagarLista(index) {
            this.listas.splice(index, 1)
            this.controlador.setItemSelecionado(
                {
                    id: this.item.id,
                    titulo: this.item.titulo,
                    corFundo: this.item.corFundo,
                    corTexto: this.item.corTexto,
                    listas: this.listas
                }
            );
            axios.put(`http://localhost:8081/api/v1/quadro/update/${this.item.id}`, this.item, this.httpOptions)
                .then(() => {
                    this.errorMessage = "";
                }).catch(error => {
                    this.errorMessage = error.response.data.message;
                });
        },
        retornaListaQuadros: function () {
            this.$router.replace("/quadros");
        },
        editarLista(index, titulo) {
            this.listas[index].titulo = titulo
            this.controlador.setItemSelecionado(
                {
                    id: this.item.id,
                    titulo: this.item.titulo,
                    corFundo: this.item.corFundo,
                    corTexto: this.item.corTexto,
                    listas: this.listas
                }
            );
            axios.put(`http://localhost:8081/api/v1/quadro/update/${this.item.id}`, this.item, this.httpOptions)
                .then((res) => {
                    console.log(res)
                    this.errorMessage = "";
                }).catch(error => {
                    this.errorMessage = error.response.data.message;
                });

        },
        adicionarTarefa(index, tarefa) {
            this.listas[index].tarefas.push({ conteudo: tarefa })
            this.controlador.setItemSelecionado(
                {
                    id: this.item.id,
                    titulo: this.item.titulo,
                    corFundo: this.item.corFundo,
                    corTexto: this.item.corTexto,
                    listas: this.listas
                }
            );
            axios.put(`http://localhost:8081/api/v1/quadro/update/${this.item.id}`, this.item, this.httpOptions)
                .then((res) => {
                    console.log(res)
                    this.errorMessage = "";
                }).catch(error => {
                    this.errorMessage = error.response.data.message;
                });

        },
        salvarAlteracao() {
            axios.put(`http://localhost:8081/api/v1/quadro/update/${this.item.id}`, this.item, this.httpOptions)
                .then((res) => {
                    console.log(res)
                    this.errorMessage = "";
                }).catch(error => {
                    this.errorMessage = error.response.data.message;
                });
        },
        onChangeItem(e) {
            console.log("On change item", e)
            this.salvarAlteracao()
        },
        apagarTarefa(index, index2) {
            this.listas[index].tarefas.splice(index2, 1)
            this.salvarAlteracao()
        },
        favoritar() {
            this.iconeFavoritado = "mdi-star"
            axios.post(`http://localhost:8081/api/v1/quadro/favorite/${this.item.id}`, {}, this.httpOptions)
                .then(() => {
                    this.errorMessage = "";
                }).catch(error => {
                    this.errorMessage = error.response.data.message;
                });
        },
        verificarFavoritado() {
            axios.get("http://localhost:8081/api/v1/usuario/get", this.httpOptions)
                .then(response => {
                    let favoritos = response.data.favoritos
                    let favoritado = favoritos.find((i) => i.id === this.item.id)
                    if (favoritado) {
                        this.iconeFavoritado = "mdi-star"
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.error = error;
                })
        },
    },
    created() {
        this.prepara();
    },
    mounted() {
        this.verificarFavoritado()
    },
    components: { draggable, ModalLista, ModalCompartilhamento, ModalTarefa }
}
</script>