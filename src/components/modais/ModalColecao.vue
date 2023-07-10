<template>
    <div class="text-center">
        <v-dialog v-model="visible" width="800">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-2" color="accent" v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Editar Coleção
                </v-card-title>

                <v-text-field v-model="titulo" class="ml-4" label="Escreva o título da coleção aqui"></v-text-field>

                <v-select class="ml-5 mr-5" v-model="value" :items="items" label="Selecionar quadros" multiple chips
                    persistent-hint></v-select>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-4" @click="setVisible">
                        Fechar
                    </v-btn>
                    <v-btn color="success" @click="editarColecao">
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
     
<script>
//import axios from 'axios';
export default {
    name: 'Modal-Lista',
    data: () => ({
        visible: false,
        items: [],
        value: [],
        titulo: ''
    }),
    props: {
        salvar: { type: Function },
        tituloInicial: { type: String },
        todosQuadros: { type: Array },
        quadrosSelecionados: { type: Array },
        index: { type: Number },
    },
    methods: {
        setVisible() {
            this.visible = !this.visible
        },
        prepara() {
            this.titulo = this.tituloInicial ? this.tituloInicial : ''
            this.items = this.todosQuadros,
                this.value = this.quadrosSelecionados.length > 0 ? this.quadrosSelecionados.map((i) => i.titulo) : []
        },
        editarColecao() {
            this.salvar(this.index, this.titulo, this.value)
            this.setVisible()
        }
    },
    mounted() {
        this.prepara()
    }
}
</script>
     