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
                <v-col cols="6" class="text-right">
                    <v-btn color="primary" class="mb-2 mr-2" @click="novaLista">
                        <v-icon>mdi-plus</v-icon> Nova Lista
                    </v-btn>

                    <v-btn color="info" class="mb-2 mr-2" @click="novaLista">
                        <v-icon>mdi-share-variant</v-icon> Compartilhar Quadro
                    </v-btn>

                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <draggable @change="onChangeItem" :list="listas" class="row" group="listas">
                    <v-col md="4" v-for="(lista, index) in listas" :key="index">
                        <v-sheet shaped elevation="10" color="grey lighten-2" class="pa-3 mr-1" max-width="450">
                            <v-row>
                                <h2 class="pa-5">{{ lista.titulo }}</h2>
                                <v-col class="mt-4 text-right">
                                    <v-btn small color="error" class="mr-2"><v-icon>mdi-delete</v-icon></v-btn>
                                    <v-btn small color="accent"
                                        @click="editarLista(lista)"><v-icon>mdi-pencil</v-icon></v-btn>
                                </v-col>

                            </v-row>

                            <draggable @change="onChangeItem" :list="lista.tarefas" :animation="200"
                                ghost-class="ghost-card" group="tarefas">
                                <v-card elevation="2" height="75" width="325" class="ma-4"
                                    v-for="(tarefa, index) in lista.tarefas" :key="index">
                                    <v-card-title>
                                        {{ tarefa }}
                                    </v-card-title>
                                </v-card>
                            </draggable>
                        </v-sheet>
                    </v-col>
                </draggable>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// import axios from 'axios';
import draggable from 'vuedraggable';

export default {
    props: ["controlador"],
    data() {
        return {
            headers: [
                { text: "Ingrediente", align: "start", sortable: true, value: "item" },
                { text: "Quantidade", align: "start", sortable: true, value: "qtde" },
            ],
            item: null,
            iconeFavoritado: "mdi-star-outline",
            listas: [],
            httpOptions: {
                baseURL: this.$root.config.url,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.$root.credentials.token
                }
            },
        };
    },
    methods: {
        prepara: function () {
            this.item = this.controlador.itemSelecionado;
            this.listas = this.item.listas ? this.item.listas : [];
            this.iconeFavoritado = this.item.favorito?"mdi-star":"mdi-star-outline"
        },
        novaLista() {
            this.controlador.setItemSelecionado({ quadroid: this.item._id, tituloLista: "", tarefas: [] });
            this.$router.replace("/quadros/view/novalista");
        },
        retornaListaQuadros: function () {
            this.$router.replace("/quadros");
        },
        editarLista() {

        },
        salvarAlteracao() {
            let armazenamento = JSON.parse(localStorage.getItem("quadros"))
            let index = armazenamento.findIndex((i) => i._id === this.item._id)
            armazenamento[index].listas = this.listas
            localStorage.setItem("quadros", JSON.stringify(armazenamento))
        },
        onChangeItem() {
            this.salvarAlteracao()
        },
        favoritar(){
            this.item.favorito = this.item.favorito?false:true
            let armazenamento = JSON.parse(localStorage.getItem("quadros"))
            let index = armazenamento.findIndex((i) => i._id === this.item._id)
            armazenamento[index].favorito = this.item.favorito
            localStorage.setItem("quadros", JSON.stringify(armazenamento))
        }
    },
    created() {
        this.prepara();
    },
    components: { draggable }
}
</script>