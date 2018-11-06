<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <span>{{ errors.first('name') }}</span>
              <b-input-group class="mb-3">                
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                </b-input-group-prepend>
                 <input type="text" class="form-control" name="name"  v-validate="'required'" placeholder="Username" v-model="user.name">            
              </b-input-group>

               <span>{{ errors.first('email') }}</span>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" name="email"  v-validate="'required|email'"  placeholder="Email" v-model="user.email">
              </b-input-group>

               <span>{{ errors.first('password') }}</span>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" class="form-control" name="password"  v-validate="'required|confirmed:pw_confirm'"  placeholder="Password" v-model="user.password">
              </b-input-group>

               <span>{{ errors.first('repassword') }}</span>
              <b-input-group class="mb-4">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" class="form-control" name="repassword"  ref="pw_confirm" v-validate="'required'"  placeholder="Repeat password" v-model="user.repassword">
              </b-input-group>

              <b-button variant="success" block  @click="SubmitRegister">Create Account</b-button>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook"><span>facebook</span></b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button"><span>twitter</span></b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import qs from 'qs';
import VeeValidate from 'vee-validate';
const configV = {
    errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, configV);

const API_URLS = {
  Register_url: 'http://localhost:8081/api/user/register',
}
const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
}

export default {
  name: 'Register',
  layout: 'clean',
   data () {
    return {
      user:[]
    }
  },

  methods: {
     async SubmitRegister(){
      const queryString = require('query-string')
      const userQS = queryString.stringify(this.user)

        // console.log(this.user);
        if(this.user.password != this.user.repassword){
          alert('password not match')
        }
        else{                   
          await axios.post(API_URLS.Register_url,userQS,config) 
          .then(function (response) {
            // console.log(response.data);
            if(response.data.email != null){
              alert(response.data.email[0])
            }
            else{
               alert('Register Success')               
            }
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message) 
          }) 
          
          this.user = []  
        }
      }
  }

}
</script>
