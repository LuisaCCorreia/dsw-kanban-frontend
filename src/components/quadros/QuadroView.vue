<template>
    <div v-show="this.$root.credentials" :style="{ backgroundColor: item.corQuadro }">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h2 :style="{ color: item.corTexto }">{{ item.titulo }}</h2>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn color="primary" class="mb-2 mr-2" @click="novaLista">
                        <v-icon>mdi-plus</v-icon> Nova Lista
                    </v-btn>
                    <v-btn color="error" class="mb-2 mr-2" @click="removerQuadro">
                        <v-icon>mdi-delete</v-icon> Apagar Quadro
                    </v-btn>
                    <v-btn color="outlined" class="mb-2" @click="retornaListaQuadros">
                        <v-icon>mdi-arrow-left</v-icon> Retornar a lista
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row>
                <v-col md="5" v-for="(lista, index) in listas" :key="index">
                    <draggable @change="onChangeItem" :list="listas" direction="horizontal" :animation="200"
                        ghost-class="ghost-card" group="listas">
                        <v-sheet shaped elevation="10" color="grey lighten-2" class="pa-3 mr-1" max-width="450">
                            <h2 class="pa-5">{{ lista.titulo }}</h2>
                            <draggable @change="onChangeItem" :list="lista.tarefas" :animation="200"
                                ghost-class="ghost-card" group="tarefas">
                                <v-card elevation="2" height="75" width="400" class="ma-4"
                                    v-for="(tarefa, index) in lista.tarefas" :key="index">
                                    <v-card-title>
                                        {{ tarefa }}
                                    </v-card-title>
                                </v-card>
                            </draggable>
                        </v-sheet>
                    </draggable>
                </v-col>
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
            teste1: ['t1', 't2'],
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
        },
        removerQuadro: function () {
            let armazenamento = JSON.parse(localStorage.getItem("quadros"));
            armazenamento = armazenamento.filter((i) => i._id !== this.item._id);
            localStorage.setItem("quadros", JSON.stringify(armazenamento));
            this.$router.replace("/quadros");
            /*  axios.delete("http://localhost:3000/receitas/" + this.item._id, this.httpOptions)
                  .then(() => {
                      this.$router.replace('/receitas');
                  });*/
        },
        novaLista() {
            this.controlador.setItemSelecionado({ quadroid: this.item._id, tituloLista: "", tarefas: [] });
            this.$router.replace("/quadros/view/novalista");
        },
        retornaListaQuadros: function () {
            this.$router.replace("/quadros");
        },
        salvarAlteracao() {
            let armazenamento = JSON.parse(localStorage.getItem("quadros"))
            console.log(armazenamento)
            let index = armazenamento.findIndex((i) => i._id === this.item._id)
            armazenamento[index].listas = this.listas
            localStorage.setItem("quadros", JSON.stringify(armazenamento))
        },
        onChangeItem() {
            this.salvarAlteracao()
        }
    },
    created() {
        this.prepara();
    },
    components: { draggable }
}
</script>