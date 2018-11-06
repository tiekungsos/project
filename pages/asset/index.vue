<template>
    <div class="animated fadeIn">
    <b-row>
      <h2>Asset</h2>
    </b-row>

     <b-alert 
            :show="dismissCountDown"
             dismissible
             variant="danger"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      Dismissible Alert!
    </b-alert>

  <!-- load component form input asset  -->
    <formInput :categorie="categorie" :department="department" :users="users"/>

  <br>
  <!-- load data table -->
   <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input  v-model="filter" placeholder="Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

   
    </b-row>
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>

      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Categorie" class="mb-0">
          <b-input-group>
            <b-form-select  v-model="filter">
              <option :value="null">Select Asset Categorie</option>
              <option v-for="categorie in categorie" :key="categorie.id">
                {{ categorie.text }}
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Status" class="mb-0">
          <b-input-group>
            <b-form-select  v-model="filter">
               <option :value="null">Select Status</option>
               <option value="1">Usage</option>
               <option value="2">Available</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      
    </b-row>

      <b-table hover   
      :fields="fieldtable"
      :items="items"
      :filter="filter,status"
      @filtered="onFiltered"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc" 
      >
      <template slot="categorie" slot-scope="row">
         {{row.item.asset_categorie.text}}
        </template>
         <template slot="department" slot-scope="row">
         {{row.item.department.text}}
        </template>
        <template slot="asset_status" slot-scope="row">
          <!-- {{row.value?'Yes :)':'No :('}} -->
            <p v-if="row.value == true">
              <strong>Usage</strong>
            </p>
            <p v-else> 
              <strong> Available </strong>
            </p>
        </template>
        
         <template slot="rigister" slot-scope="row">
          <b-button-group>
              <div v-if="row.item.asset_status == true">
                <b-button variant="danger"  @click="checkoutAsset(row.item.id)" v-b-tooltip.hover  title="ยกเลิกการใช้งาน">Checkout</b-button>       
              </div>
              <div v-else> 
                <b-button variant="success" @click="showModelRegisAsset(row.item.id)" v-b-tooltip.hover title="ใช้งานอุปกรณ์นี้">Checkin </b-button>
              </div>     
          </b-button-group>
         </template>

        <template slot="crud" slot-scope="row">
          <b-button-group>             
              <b-dropdown right split text="Detail" v-b-tooltip.hover title="รายละอียดอุปกรณ์">
                <b-dropdown-item variant="success" @click="showModalView(row.item.id)">View</b-dropdown-item>
                <b-dropdown-item variant="primary" @click="showModalEdit(row.item.id)">Edit</b-dropdown-item> 
                <b-dropdown-item @click="removeComment(row.item.id)" variant="danger" >Delete</b-dropdown-item> 
              </b-dropdown>         
          </b-button-group>
         </template>
    </b-table>

        <b-row>
          <b-col md="6">
            <b-pagination align="left" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
          <b-col md="6">
             <p align="right">
                Sorting By: <b>{{ sortBy }}</b>,
                Sort Direction: <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
            </p>
          </b-col>
        </b-row>
  </b-container>

  <!-- load component show modal -->
    <modelRegisAsset :categorie="categorie" :department="department" :config="config" :users="users" ref="regisAsset"/>
    <modelEditForm :categorie="categorie" :department="department" :config="config" ref="formEdit"/>
    <modelView :categorie="categorie" :department="department" :config="config" ref="view"/>
  </div>
</template>


<script>
import Vue from 'vue';
import { Callout } from '~/components/'
import formInput from './formInput'
import modelEditForm from './modelEditForm'
import modelView from './modelView'
import modelRegisAsset from './modelRegisAsset'
import axios from 'axios'

const cookieparser = process.server ? require('cookieparser') : undefined

export default {
   middleware: 'authenticated',
    data () {
        return {
          asset_list:[],
          categorie:this.$store.state.categorie,
          department:this.$store.state.department,
          users:this.$store.state.list_user,
          cpu:[],
          fieldtable: {
              id : {
                label: '#',
                sortable: true,
              },
              asset_no: {
                label: 'Asset No.',
                sortable: true
              },
              asset_year: {
                label: 'Asset Year',
                sortable: true
              },
              categorie: {
                label: 'Asset Categorie',
              },
              asset_name: {
                label: 'Asset Name',
              },
              // desc : {
              //   label: 'Description',
              // },
              serial_no : {
                label: 'Serial No.',
              },
              // part_no : {
              //   label: 'Part No.',
              // },
              asset_status : {
                label: 'Status',
                sortable: true
              },
              // user : {
              //   label: 'User',
              // },
              department : {
                label: 'Department',
              },
              comment : {
                label: 'Comment',
              },
              rigister : {
                label: ' ',
              },
               crud : {
                label: ' ',
              },
            },
          items:[],
          sortBy: 'id',
          token:'',
          sortDesc: true,
          filter: null,
          currentPage: 1,
          perPage: 5,
          totalRows: '',
          pageOptions: [ 5, 10, 15 ],
          config:[],
          showDismissibleAlert: false,
          dismissSecs: 1,
          dismissCountDown: 0
        }
      },

    created(){
            this.configApi();
            this.loadDataAssetTable();
            // this.loadDataCpu();
        }, 
        
    components: {
        formInput,
        modelEditForm,
        modelView,
        modelRegisAsset
      },


    computed: {
        assets () {         
          return this.$store.state.list.asset         
        },
      },

    watch:{ 
        assets:function(){   
            this.loadDataAssetTable(); 
        }
    },

    methods: {
      configApi (){
        console.log(this.$store.state);
      },
      onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      },

      loadDataAssetTable() {
          this.items = this.$store.state.list.asset;  
          this.onFiltered(this.items)   
      },

      async removeComment (id) {
            
            await this.$axios.$delete('/asset/' + id + this.$store.state.auth )
              .catch(error => {
                  console.log(error.response)
              });
            this.$toast.success('Successfully Remove Asset ' + id)
            this.refresh()
        },

      async refresh(){
            const data  = await this.$axios.$get('/asset' + this.$store.state.auth )
            .catch(error => { console.log(error.response)});
            this.$store.commit('setSeasons', data)
        },

      showModalEdit (id) {
            this.$refs.formEdit.Modal(id)
        },

      showModalView (id) {
            this.$refs.view.ModalView(id)
        },
      
      showModelRegisAsset (id) {
        this.$refs.regisAsset.Modal(id)
      },

      async checkoutAsset(id){
        try {
            

            const AssetData = await this.$axios.$get('/asset/'+ id + this.$store.state.auth)
            .catch(error => { console.log(error.response)});

            const userId = AssetData[0].users_condition[0].id

            await this.$axios.$post('/asset/checkout/' + id + '/'+ userId + this.$store.state.auth )
            .catch(error => {console.log(error.response)});
            this.$toast.success('Successfully Checkout ' + id )
         }
        catch (error){
          this.$toast.danger('Error Checkout')
        }
        this.refresh()
      },

      countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
      },
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      }

      },
}
</script>