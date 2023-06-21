<template>
  <div class="text-center">
    <v-dialog v-model="visible" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          {{ titulo }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ titulo }}
        </v-card-title>
        <div class="text-center">
          <v-row>
            <v-col md="10">
              <v-text-field class="ml-4" label="Escreva o título do quadro aqui"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-card-text>Escolha a cor do Quadro</v-card-text>
            <v-col>
              <v-color-picker v-model="corQuadroAtual" hide-inputs show-swatches class="ml-4"></v-color-picker>
            </v-col>
          </v-row>

          <v-row>
            <v-card-text>Escolha a cor do texto</v-card-text>
            <v-col>
              <v-color-picker v-model="corTituloAtual" hide-inputs show-swatches class="ml-4"></v-color-picker>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey-lighten-4" @click="setVisible">
            Fechar
          </v-btn>
          <v-btn color="success" @click="setVisible">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
   
<script>
export default {
  name: 'Modal-CRUD',
  props: ['titulo', 'dadosQuadro'],
  data: () => ({
    visible: false,
    corTituloAtual:"",
    corQuadroAtual:""
  }),
  methods: {
    setVisible() {
      this.visible = !this.visible
    }
  }
}
</script>
   