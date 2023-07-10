import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Router from 'vue-router'
import ControladorCRUD from './assets/controlador-crud.js'

/* Login e homepage */
import HomePage from './components/HomePage.vue'
import FormLogin from './components/login/login/FormLogin.vue'

/* Criacao de conta */
import CriacaoConta from './components/login/criacao-conta/CriacaoConta.vue'
import CriacaoContaSucesso from './components/login/criacao-conta/CriacaoContaSucesso.vue'

/* Esquecimento de senha */
import EsquecimentoSenha from './components/login/esquecimento-senha/EsquecimentoSenha.vue'
import EsquecimentoSenhaSucesso from './components/login/esquecimento-senha/EsquecimentoSenhaSucesso.vue'
import RecuperacaoSenha from './components/login/esquecimento-senha/RecuperacaoSenha.vue'
import RecuperacaoSenhaSucesso from './components/login/esquecimento-senha/RecuperacaoSenhaSucesso.vue'

/* Troca de senha */
import TrocaSenha from './components/login/troca-senha/TrocaSenha.vue'
import TrocaSenhaSucesso from './components/login/troca-senha/TrocaSenhaSucesso.vue'

/* Quadros */
import QuadrosLista from "./components/quadros/QuadrosLista.vue"
import QuadroFormulario from "./components/quadros/QuadroFormulario.vue"
import QuadroView from "./components/quadros/QuadroView.vue"
import FavoritosLista from "./components/quadros/FavoritosLista.vue"
import CompartilhadosLista from "./components/quadros/CompartilhadosLista.vue"
import ColecoesLista from "./components/colecoes/ColecoesLista.vue"
import ColecaoView from "./components/colecoes/ColecaoView.vue"


/* Controlador do cadastro de quadros */
var controladorCadastro = ControladorCRUD.criaControladorCRUD();

/* Configuracao do router */
Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
   {
     path: '/',
     name: 'home',
     component: HomePage
   },
   {
     path: '/login',
     name: 'login',
     component: FormLogin,
   },
   {
    path: '/login/new',
    name: 'create-account',
    component: CriacaoConta,
  },
  {
   path: '/login/account-created',
   name: 'account-created',
   component: CriacaoContaSucesso,
  },
  {
    path: '/login/forgot',
    name: 'forgot-password',
    component: EsquecimentoSenha,
  },
  {
    path: '/login/token-sent',
    name: 'token-sent',
    component: EsquecimentoSenhaSucesso,
  },  
  {
    path: '/login/reset',
    name: 'reset-password',
    component: RecuperacaoSenha,
  },
  {
    path: '/login/reseted',
    name: 'password-reseted',
    component: RecuperacaoSenhaSucesso,
  },  
  {
    path: '/login/change',
    name: 'change-password',
    component: TrocaSenha,
  },
  {
    path: '/login/changed',
    name: 'password-changed',
    component: TrocaSenhaSucesso,
  },
  {
    path: '/quadros',
    name: 'quadros-lista',
    component: QuadrosLista, 
    props: { 'controlador': controladorCadastro },
  },
  {
    path: '/quadros/edit',
    name: 'quadros-form',
    component: QuadroFormulario, 
    props: { 'controlador': controladorCadastro },
  },
  {
    path: '/quadros/view/:id',
    name: 'quadros-remove',
    component: QuadroView, 
    props: { 'controlador': controladorCadastro },
  },
  {
    path: '/quadros/favoritos/',
    name: 'quadros-favoritos',
    component: FavoritosLista, 
    props: { 'controlador': controladorCadastro },
  },
  {
    path: '/quadros/compartilhados/',
    name: 'quadros-compartilhados',
    component: CompartilhadosLista, 
    props: { 'controlador': controladorCadastro },
  },
  {
    path: '/quadros/colecoes/',
    name: 'Colecoes-Lista',
    component: ColecoesLista, 
    props: { 'controlador': controladorCadastro },
  },
  {
    path: '/quadros/colecoes/view/:colecao',
    name: 'colecao-view',
    component: ColecaoView, 
    props: { 'controlador': controladorCadastro },
  },
]})

/* Configuracao do Vue JS */
new Vue({
  data: {
    credentials: null,
    config: {
      url: "http://localhost:3000"
    }
  },

  el: '#app',
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
