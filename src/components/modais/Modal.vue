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
          Compartilhar Quadro
        </v-card-title>
       
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
  name: 'Modal-Compartilhamento',
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
   