<template>
  <b-container fluid class="bv-example-row">
    <b-row>
        <b-col>
          <b-button variant="primary" :pressed.sync="show" >Add Asset</b-button> 
          <br><br>
        </b-col>  
    </b-row>
    <b-row>
      <b-col>
<form  class="form-group" @submit.prevent="addComment">
    <b-card title="Form Input " v-if="show">
        <b-container class="bv-example-row">
             <b-row>       
                <b-col> 
                     <b-form-group id="1"
                                label="Asset No:"
                                label-for="Asset No"
                                description="Please enter Asset No.">
                        <b-form-input id="1"
                                    type="text"
                                    v-model="asset_list.asset_no"
                                    required
                                    placeholder="Enter Asset No."
                                    name="Asset No."
                                    >                            
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="2"
                                label="Asset Year:"
                                label-for="Asset Year"
                                description="Please enter Asset Year.">
                    <b-form-input id="2"
                                    type="number"
                                    v-model="asset_list.asset_year"
                                    required
                                    placeholder="Enter Asset Year."
                                    aria-describedby="inputLiveFeedback"
                                    >
                    </b-form-input>
                     <b-form-invalid-feedback  id="inputLiveFeedback">
                        Please enter year between 2000 and Now  
                     </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="3"
                                label="Asset Categorie:"
                                label-for="Asset Categorie"
                                description="Please enter Asset Categorie.">
                    <b-form-select  v-model="asset_list.categorie_id">
                      <option :value="null">Please select an option</option>
                      <option :value="categorie.id" v-for="categorie in categorie" :key="categorie.id">
                        {{ categorie.text }}
                      </option>
                    </b-form-select>

                    </b-form-group>
                    <b-form-group id="4"
                                label="Asset Name:"
                                label-for="Asset Name"
                                description="Please enter Asset Name.">
                    <b-form-input id="4"
                                    type="text"
                                    v-model="asset_list.asset_name"
                                    required
                                    placeholder="Enter Asset Name.">
                    </b-form-input>
                    </b-form-group>

                    <b-form-group id="5"
                                label="Description:"
                                label-for="Description"
                                description="Please enter Description">
                     <b-form-radio-group  v-model="computerInfo" id="radios3" name="status">
                                 <b-form-radio :value="true">Computer</b-form-radio> 
                                 <b-form-radio :value="false">Other</b-form-radio>                                                       
                    </b-form-radio-group> 
                    <br>
                    <div v-if="computerInfo == true">              
                          <b-form-input  id="5"
                                        type="text"
                                        v-model="asset_list.desc"
                                        required
                                        disabled
                                        placeholder="Enter Description">
                          </b-form-input>
                        <b-button  variant="primary" @click="showModalDesc()">Add computer</b-button>
                    </div>

                    <div v-else>
                         <b-form-input  id="5"
                                        type="text"
                                        v-model="asset_list.desc"
                                        required                                   
                                        placeholder="Enter Description">
                          </b-form-input>
                    </div>   

                    </b-form-group>
                </b-col>
                <b-col>
                        <b-form-group id="6"
                                    label="Serial No:"
                                    label-for="Serial No"
                                    description="Please enter Serial No.">
                        <b-form-input id="6"
                                        type="text"
                                        v-model="asset_list.serial_no"
                                        required
                                        placeholder="Enter Serial No.">
                        </b-form-input>
                        </b-form-group>

                        <b-form-group id="7"
                                    label="Part No:"
                                    label-for="Part No"
                                    description="Please enter Part No.">
                        <b-form-input id="7"
                                        type="text"
                                        v-model="asset_list.part_no"
                                        required
                                        placeholder="Enter Part No.">
                        </b-form-input>
                        </b-form-group>

                        <b-form-group id="8"
                                    label="Status:"
                                    label-for="Status"
                                    description="Please enter Status.">
                           <b-form-radio-group  v-model="asset_list.asset_status" id="radios3" name="status">
                                 <b-form-radio :value="0">Available</b-form-radio>
                                <b-form-radio :value="1">Used</b-form-radio>                              
                          </b-form-radio-group> 
                          {{asset_list.users_id}}
                        </b-form-group>

                       <b-form-group id="9"
                                    label="User:"
                                    label-for="User"
                                    description="Please enter Name User."  v-if="asset_list.asset_status == true">
                         <b-form-select  v-model="asset_list.users_id" required>
                            <option :value="null">Please select an option</option>
                            <option :value="users.id" v-for="users in users" :key="users.id">
                              {{ users.firstname }} {{ users.lastname }}
                            </option>
                        </b-form-select>
                        </b-form-group>

                        <b-form-group id="10"
                                    label="Department:"
                                    label-for="Department"
                                    description="Please enter Department.">
                        <b-form-select  v-model="asset_list.department_id" required>
                            <option :value="null">Please select an option</option>
                            <option :value="department.id" v-for="department in department" :key="department.id">
                              {{ department.text }}
                            </option>
                        </b-form-select>
                        
                        </b-form-group>
                        <b-form-group id="11"
                                    label="Comment:"
                                    label-for="Comment"
                                    description="Please enter Comment.">
                        <b-form-textarea id="11"
                                        type="text"
                                        v-model="asset_list.comment"
                                        required
                                        placeholder="Enter Comment."
                                        :rows="3"
                                        :max-rows="6"
                                        >
                        </b-form-textarea>
                        </b-form-group>
                  </b-col>      
                     </b-row>
                 </b-container> 
                    <b-button type="submit" variant="primary" >SAVE</b-button>
                    <b-button v-on:click="clearData" variant="danger" >Reset</b-button>

            </b-card>  
            </form> 
      </b-col>  
    </b-row>



  <!-- Show modal -->
    <b-modal ref="myModalRef" title="Description" @ok="handleOk()"  @hidden="computer">
      <b-container fluid class="bv-example-row">
        <b-row>
          <b-col>
            <b-container class="bv-example-row">
             <b-row>       
                <b-col>           
                     <b-form-group id="1"
                                label="CPU Name"
                                label-for="CPU Name"
                                description="Please enter CPU Name.">
                        <b-form-select id="1"
                                    type="text"
                                    v-model="computer.CPU"
                                    required
                                    placeholder="Enter CPU Name."
                                    >      
                        <template slot="first">
                             <option :value="null" disabled>-- Please select an option --</option>
                             <option :value="'Intel Core i3'" >Intel Core i3</option>
                             <option :value="'Intel Core i5'" >Intel Core i5</option>
                             <option :value="'Intel Core i7'" >Intel Core i7</option>
                        </template>                                
                        </b-form-select>
                    </b-form-group>

                    <b-form-group id="2"
                                label="Harddisk Type"
                                label-for="Harddisk Type">
                         <b-form-radio-group  v-model="computer.HDD" id="radios2" name="radioSubComponent">
                                <b-form-radio value="HDD">Sata Harddisk(HDD)</b-form-radio>
                                <b-form-radio value="SSD">Solid state drive(SSD)</b-form-radio>
                          </b-form-radio-group>   

                    </b-form-group>

                    <b-form-group id="3"
                                label="Harddisk Qty"
                                label-for="Harddisk Qty"
                                description="Please enter Harddisk Qty  ">
                    <b-form-input
                                    v-model="computer.HDDQTY"
                                    required
                                    type="number"
                                    placeholder="Enter Harddisk Qty Ex.512 GB ">                         
                    </b-form-input>
                    </b-form-group>
                    <b-form-group id="4"
                                label="Number Of RAM"
                                label-for="Number Of RAM"
                                description="Please enter Number Of RAM">
                    <b-form-input id="4"
                                    type="number"
                                    v-model="computer.RAM"
                                    required
                                    placeholder="Enter Number Of RAM">
                    </b-form-input>
                    </b-form-group>

                    <b-form-group id="5"
                                label="Display Size"
                                label-for="Display Size"
                                description="Please enter Display Size">
                    <b-form-radio-group  v-model="computer.DISPLAY" id="radios3" name="radioSub">
                                <b-form-radio value="13">13 inch</b-form-radio>
                                <b-form-radio value="14">14 inch</b-form-radio>
                                <b-form-radio value="15">15 inch</b-form-radio>
                                <b-form-radio value="17">17 inch</b-form-radio>
                          </b-form-radio-group>   
                    </b-form-group>
                  </b-col>      
                     </b-row>
                 </b-container> 
          </b-col> 
        </b-row>
    </b-container>
  </b-modal>

  </b-container>

</template>
   
<script>
// import { Callout } from '~/components/'
import axios from 'axios'
import Vue from 'vue';

import qs from 'qs';
const queryString = require('query-string')
export default {
  name: 'Form-input',
  props: ['categorie','department','users'],
   data () {
    return {
       asset_list:[],
        show: false,
        text:null,
         types: [
        'text', 'password', 'email', 'number', 'url',
        'tel', 'date', `time`, 'range', 'color'
        ],
        computer:[],
        computerDesc:null,
        computerInfo: true
    }
  },


 methods: {

    async addComment () {
      this.pushDataComputer();
      const asset = queryString.stringify(this.asset_list) 
      const assetInput = await this.$axios.$post('/asset' + this.$store.state.auth,asset )
        .then(function (response){    
            return response;   
        })
        .catch(error => {
            console.log(error);
        }); 
        if(assetInput){
            this.$toast.success('Successfully Add Asset')
            this.show = false;
            this.refresh();
            this.clearData();
        }else{
          this.$toast.error('Authentication failed. please input again')
        }   
    },

    pushDataComputer(){
      this.asset_list.cpu_name      = this.computer.CPU
      this.asset_list.harddisk_type = this.computer.HDD 
      this.asset_list.harddisk_qty  = this.computer.HDDQTY
      this.asset_list.ram           = this.computer.RAM
      this.asset_list.display       = this.computer.DISPLAY
    },
    showForm () {    
      this.show = true
      // console.log(this.computerInfo)
    },

    showModalDesc () {
      this.$refs.myModalRef.show() 
        },

    clearData () {
        this.asset_list = [];
        this.computerDesc = null;
        this.computer = [];
    },
    
    handleOk () {
      // Prevent modal from closing
      if (!this.computer.CPU || !this.computer.HDD || !this.computer.HDDQTY || !this.computer.RAM || !this.computer.DISPLAY) {
        this.$toast.error('Some row is not defild please enter Computer')
      } else {
        this.$toast.success('Add Computer')
        this.handleSubmit()
      }
        
    },

    handleSubmit () {
       this.asset_list.desc ='CPU ' + this.computer.CPU + ', ' +
                          'Harddisk ' + this.computer.HDD + ' ' + this.computer.HDDQTY + 'GB ,' +                        
                          'RAM ' + this.computer.RAM + 'GB ,' +
                          'Display ' + this.computer.DISPLAY + ' inch';
      //  this.clearComputer()
       this.$refs.myModalRef.hide()  
    },

    async refresh(){
        const data  = await this.$axios.$get('/asset' + this.$store.state.auth )
        .catch(error => { console.log(error.response)});
        this.$store.commit('setSeasons', data)
    }
 }
}
</script>
