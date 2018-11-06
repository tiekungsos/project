<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                 <span>{{ errors.first('email') }}</span>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input type="text" v-model="userLogin.email" name="email"  v-validate="'required|email'" class="form-control" placeholder="Email">
                </b-input-group>
                 <span>{{ errors.first('password') }}</span>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input type="password" v-model="userLogin.password" name="password"  v-validate="'required'" class="form-control" placeholder="Password">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" @click="login()">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import VeeValidate from 'vee-validate';
const config = {
    errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, config);

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'Login',
  layout: 'clean',
  data () {
    return{
      userLogin:[],
       token:''
    }
  },
  created() {
    this.loaddata();
  },
  
  methods: {

   async loaddata(){
      const parsed = Cookie.get('auth')
      // console.log(parsed);
      if(parsed){
        Cookie.remove('auth');
      }     
    },

    async login() {
        const queryString = require('query-string')
        const userQS = queryString.stringify(this.userLogin)

        // console.log(this.userLogin);
         const data = await this.$axios.$post('/user/login',userQS)
        .then(function (response){
          // console.log(response.data);
           console.log(response);
           alert('login Success')
          var token = response.token;    
          return token;             
        })
        .catch(error => {
            console.log(error);
            alert('Email or Password is invalid.') 
          });         
          console.log(data);

        if(data != null){
          this.tokenStore(data)
        }
        
    },

  tokenStore(token){

      const auth = {
          accessToken: token
        }
        this.$store.commit('setAuth', auth)
         console.log(this.$store.state.auth);
        Cookie.set('auth', auth)      
        location.reload()
    }

  }
}
</script>
