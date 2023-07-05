<template lang="html">
    <div v-show="this.$root.credentials" class="mt-8">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h2>{{ titulo }}</h2>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn color="primary" class="mb-2 mr-2" @click="salvaQuadro">
                        Salva
                    </v-btn>
                    <v-btn color="outlined" class="mb-2" @click="retornaLista">
                        Lista
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <div class="text-center">
                <v-row>
                    <v-col md="10">
                        <v-text-field v-model="item.titulo" class="ml-4"
                            label="Escreva o título do quadro aqui"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-card-text>Escolha a cor do Quadro</v-card-text>
                    <v-col>
                        <v-color-picker v-model="item.corFundo" hide-inputs show-swatches class="ml-4"></v-color-picker>
                    </v-col>
                </v-row>

                <v-row>
                    <v-card-text>Escolha a cor do texto</v-card-text>
                    <v-col>
                        <v-color-picker v-model="item.corTexto" hide-inputs show-swatches class="ml-4"></v-color-picker>
                    </v-col>
                </v-row>
            </div>
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
            errorMessage: '',

            httpOptions: {
                headers: {
                    'Authorization': 'Bearer ' + this.$root.credentials.token
                }
            },
        }
    },
    methods: {
        prepara: function () {
            this.errorMessage = "";
            this.item = this.controlador.itemSelecionado;
            this.titulo = (this.item._id === "") ? "Criar Quadro" : "Editar Quadro";
        },
        verificarId(armazenamento) {
            let ultimoId = armazenamento && armazenamento.length > 0 ? +armazenamento[armazenamento.length - 1]._id : 0
            return isNaN(ultimoId) ? 0 : ultimoId
        },
        salvaQuadro: function () {

            if (this.item.id === "") {
                axios.post("http://localhost:8081/api/v1/quadro/create", this.item, this.httpOptions)
                    .then(() => {
                        this.errorMessage = "";
                        this.$router.replace('/quadros');
                    }).catch(error => {
                        this.errorMessage = error.response.data.message;
                    });
            } else {
                axios.put(`http://localhost:8081/api/v1/quadro/update/${this.item.id}`, this.item, this.httpOptions)
                    .then(() => {
                        this.errorMessage = "";
                        this.$router.replace('/quadros');
                    }).catch(error => {
                        this.errorMessage = error.response.data.message;
                    });
            }


            this.$router.replace('/quadros');
        },

        retornaLista: function () {
            this.$router.replace('/quadros');
        },
    },

    mounted() {
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