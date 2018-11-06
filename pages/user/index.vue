<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col md="6">
                    <formInput :department="department" />      
            </b-col>     
        </b-row>
        <b-table striped hover :items="user" :fields="head">
            <template slot="name" slot-scope="row">
                {{row.item.firstname}} {{row.item.lastname}}
            </template>
             <template slot="department" slot-scope="row">
                 {{row.item.department.text}}
            </template>
            <template slot="crud" slot-scope="row">
                <b-button variant="success"  @click="showModalView(row.item.id)">Details</b-button>
                <b-button variant="primary" @click="showModalEdit(row.item.id)">Edit</b-button> 
                <b-button @click="removeUser(row.item.id)" variant="danger" >Delete</b-button> 
            </template>

               <template slot="row-details" slot-scope="row">
            <b-card>
                <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
                <!-- <b-col>{{ row.item.age }}</b-col> -->
                </b-row>
                <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
                <!-- <b-col>{{ row.item.isActive }}</b-col> -->
                </b-row>
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
            </template>
        </b-table>

         <modelEditForm  ref="formEdit"/>
         <modelView  ref="view"/>
     </div>
</template>


<script>
import { Callout } from '~/components/'
import axios from 'axios'
import formInput from './formInput'
import modelView from './modelView'

export default {
    middleware: 'authenticated',
    data () {
        return {     
            head: {
              id : {
                label: '#',
                sortable: true
              },
              name : {
                label: 'Name',
                sortable: true
              },
              email: {
                label: 'Email',
              },
              department: {
                label: 'Department',
              },
              user_type: {
                label: 'User Type',
              },
              crud : {
                label: ' ',
              },
            },
            user:[],   
            department:[]    
        }
      },
    mounted () {
     this.loadDataUserTable()
    },

    created(){
        this.loadDataUserTable(); 
        // this.loadDataDepartment();
    }, 

    components: {
        formInput,
        modelView
    },

 
      

    computed: {
        users () {      
           return this.$store.state.list_user 
        },
      },

    watch:{ 
        users:function(){   
             this.loadDataUserTable(); 
        }
    },

    methods: {
       async loadDataUserTable () {                   
            this.user = this.$store.state.list_user
        } ,

      showModalEdit (id) {
            this.$refs.formEdit.Modal(id)
        },

      showModalView (id) {
            this.$refs.view.ModalView(id)
        },


      async removeUser (id) {
            await this.$axios.$delete('/users/' + id + this.$store.state.auth )
              .catch(error => {
                  console.log(error.response)
              });
            // this.removeComputer(id)
            this.refresh()
        },

        async refresh(){
            const list_user  = await this.$axios.$get('/users' + this.$store.state.auth)
            .catch(error => { console.log(error.response)});         
            this.$store.commit('setlistuser',list_user.user)
        }
      },

}
</script>