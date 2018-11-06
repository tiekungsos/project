<template>
 <b-container fluid class="bv-example-row">
        <b-row>
        <b-col>
          <b-button variant="primary" :pressed.sync="show" >Add User</b-button> 
          <br><br>
        </b-col>  
    </b-row>
    <b-row>
      <b-col>
    <b-card v-if="show">
        <div slot="header">
            <strong>User</strong> <small>Form</small>
        </div>
        <form  class="form-group" @submit.prevent="addUser">
            <b-row>
                <b-col sm="6">
                    <b-form-group>
                        <label for="first-name">First Name</label>
                        <b-form-input type="text" id="first-name" v-model="user.firstname" placeholder="Enter your First Name"></b-form-input>
                    </b-form-group>
                        </b-col>
                        <b-col sm="6">
                    <b-form-group>
                        <label for="last-name">Last Name</label>
                        <b-form-input type="text" id="last-name" v-model="user.lastname" placeholder="Enter your Last Name"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
                     <b-form-group>
                        <label for="vat">Username</label>
                        <b-form-input type="text" id="username" v-model="user.name" placeholder="Enter your Username"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label for="vat">Email</label>
                        <b-form-input type="email" id="email" v-model="user.email" placeholder="Enter your Email"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label for="vat">Password</label>
                        <b-form-input type="password" id="password" v-model="user.password" placeholder="Enter your Password"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label for="department">Department</label>
                       <b-form-select  v-model="user.department_id" required>
                            <option :value="null">Please select an option</option>
                            <option :value="department.id" v-for="department in department" :key="department.id">
                              {{ department.text }}
                            </option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group>
                        <label for="userType">User Type</label>
                        <b-form-select v-model="user.user_type" class="mb-3" >
                        <option :value="null" >Please select an option</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        </b-form-select>
                    </b-form-group>

                    <b-button type="submit" variant="primary" >SAVE</b-button>
                    <b-button v-on:click="clearUser" variant="danger" >Reset</b-button>
                </form> 
            </b-card>
        </b-col>
     </b-row>
    </b-container> 
</template>


<script>
// import { Callout } from '~/components/'
import axios from 'axios'
import Vue from 'vue';
import VeeValidate from 'vee-validate';
const configV = {
    errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, configV);
import qs from 'qs';
const queryString = require('query-string')


export default {
    name: 'Form-input',
    data () {
        return {     
            user:[],    
            show: false, 
            department: this.$store.state.department
        }
      },


    methods: {
        showForm () {    
        this.show = true
        // console.log(this.computerInfo)
        },

        async addUser(){   

            
            const user = queryString.stringify(this.user) 
            console.log(this.user);
            await this.$axios.$post('/users'+ this.$store.state.auth,user)
            .then(function (response) {
            console.log(response);
            if(response.email != null){
              alert(response.email[0])
            }
            else{
              alert('Success input !')              
                }
            })
            .catch(error => {
                    console.log(error);
                    alert('Authentication failed. please input again') 
                }); 
            this.clearUser()
            this.refresh();
             this.show = false
        }, 

        clearUser(){
            this.user = []
        },

        async refresh(){
        const list_user  = await this.$axios.$get('/users' + this.$store.state.auth)
        .catch(error => { console.log(error.response)});         
        this.$store.commit('setlistuser',list_user.user)
        }
    
      },
}
</script>