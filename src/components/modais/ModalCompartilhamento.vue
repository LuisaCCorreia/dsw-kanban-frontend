<template>
  <div class="text-center">
    <v-dialog v-model="visible" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info" :disabled="permissaoEdicao !== undefined && permissaoEdicao === false" class="mb-2 mr-2" v-bind="attrs" v-on="on">
          <v-icon>mdi-share-variant</v-icon> Compartilhar Quadro
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Compartilhar Quadro
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="email" class="ml-4"
            label="Escreva o e-mail para a pessoa com a qual deseja compartilhar esse quadro"></v-text-field>
          <v-switch label="Permissão de edição" v-model="editavel"></v-switch>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey-lighten-4" @click="setVisible">
            Fechar
          </v-btn>
          <v-btn color="success" @click="compartilhar">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
   
<script>
import axios from 'axios';
export default {
  name: 'Modal-Compartilhamento',
  props: {
    quadroID: { type: String },
    permissaoEdicao: { type: Boolean }
  },
  data() {
    return {
      visible: false,
      email: '',
      editavel: false,
      errorMessage: '',
      httpOptions: {
        headers: {
          "Authorization": "Bearer " + this.$root.credentials.token
        }
      },
    }
  },
  methods: {
    setVisible() {
      this.visible = !this.visible
    },
    compartilhar() {
      axios.post("http://localhost:8081/api/v1/quadro/share", { quadroID: this.quadroID, editavel: this.editavel, email: this.email }, this.httpOptions)
        .then(() => {
          this.errorMessage = "";
          this.setVisible()
        }).catch(error => {
          this.errorMessage = error.response.data.message;
        });
    }
  }
}
</script>
   