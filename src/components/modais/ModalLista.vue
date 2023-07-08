<template>
    <div class="text-center">
        <v-dialog v-model="visible" width="800">
            <template v-slot:activator="{ on, attrs }">
                <v-btn :disabled="permissaoEdicao !== undefined && permissaoEdicao === false" small color="accent" v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Editar Lista
                </v-card-title>

                <v-text-field v-model="titulo" class="ml-4" label="Escreva o título da lista aqui"></v-text-field>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-4" @click="setVisible">
                        Fechar
                    </v-btn>
                    <v-btn color="success" @click="editarLista">
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
        titulo:''
    }),
    props: {
        salvar:{type: Function},
        tituloInicial:{type:String},
        index: {type: Number},
        permissaoEdicao:{type:Boolean}
    },
    methods: {
        setVisible() {
            this.visible = !this.visible
        },
        prepara(){
            this.titulo = this.tituloInicial?this.tituloInicial:''
        },
        editarLista(){
            this.salvar(this.index, this.titulo)
            this.setVisible()
        }
    },
    mounted(){
        this.prepara()
    }
}
</script>
     