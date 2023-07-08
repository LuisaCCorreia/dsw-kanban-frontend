<template>
    <div class="text-center">
        <v-dialog v-model="visible" width="800">
            <template v-slot:activator="{ on, attrs }">
                <v-btn :disabled="permissaoEdicao !== undefined && permissaoEdicao === false" outlined color="primary" v-bind="attrs" v-on="on">Adicionar Tarefa</v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Adicionar Tarefa
                </v-card-title>

                <v-text-field v-model="tarefa" class="ml-4" label="Escreva o título da lista aqui"></v-text-field>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-4" @click="setVisible">
                        Fechar
                    </v-btn>
                    <v-btn color="success" @click="adicionarTarefa">
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
    name: 'Modal-Tarefa',
    data: () => ({
        visible: false,
        tarefa:''
    }),
    props: {
        salvar:{type: Function},
        index: {type: Number},
        permissaoEdicao:{type: Boolean}
    },
    methods: {
        setVisible() {
            this.visible = !this.visible
        },
        adicionarTarefa(){
            this.salvar(this.index, this.tarefa)
            this.setVisible()
        }
    },
}
</script>
     