<template>
<b-container fluid class="bv-example-row">
        
   <b-modal size="lg" ref="myModalRef" title="Edit Asset"  @hidden="clearData" >
    
      <b-container fluid class="bv-example-row">
        <b-row>
            <b-col>
            <h2>Asset Number #{{asset_list.asset_no}}</h2>
            <br>
            </b-col>  
        </b-row>
        <b-row v-if="showAddComputer==true">
          <b-col>
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
                                    >
                    </b-form-input>
                    </b-form-group>

                    <b-form-group id="3"
                                label="Asset Categorie:"
                                label-for="Asset Categorie"
                                description="Please enter Asset Categorie.">

                    <b-form-select type="text" v-model="asset_list.categorie_id" required>
                      <option :value="categorie.id" disabled>{{asset_list.categorie}}</option>
                      <option :value="categorie.id" v-for="categorie in categorie" :key="categorie.id" >
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
                            
                <div v-if="asset_list.categorie_com == 1 || asset_list.categorie_id == 1"   >  
                    <b-form-input id="5"
                                    type="text"
                                    v-model="asset_list.desc"
                                    required
                                    disabled
                                    placeholder="Enter Description">
                    </b-form-input>
                    <b-button  variant="primary" @click="computerGetData(id_number)">Add computer</b-button>
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
                        <b-form-select id="8"                                      
                                        v-model="asset_list.asset_status"
                                        required
                                        placeholder="Enter Status.">

                                  <option :value="0">Available</option>
                                  <option :value="1">Used</option>

                        </b-form-select>
                        </b-form-group>

                         <b-form-group id="9"
                                    label="User:"
                                    label-for="User"
                                    description="Please enter Name User."  v-if="asset_list.asset_status == true">
                        <b-form-input id="9"
                                        type="text"
                                        v-model="asset_list.user"
                                        required
                                        placeholder="Enter User">
                        </b-form-input>
                        </b-form-group>

                        <b-form-group id="10"
                                    label="Department:"
                                    label-for="Department"
                                    description="Please enter Department.">
                     <b-form-select type="text" v-model="asset_list.department_id" required>
                            <option :value="department.id" disabled>{{asset_list.department}}</option>
                            <option :value="department.id" v-for="department in department" :key="department.id">
                              {{ department.text }}
                            </option>
                      </b-form-select>
                        </b-form-group>
                        <b-form-group id="11"
                                    label="Comment:"
                                    label-for="Comment"
                                    description="Please enter Comment.">
                        <b-form-input id="11"
                                        type="text"
                                        v-model="asset_list.comment"
                                        required
                                        placeholder="Enter Comment.">
                        </b-form-input>
                        </b-form-group>
                  </b-col>      
                     </b-row>
                 </b-container> 
          </b-col> 
        </b-row>



        <b-row v-if="showAddComputer==false">
         
                  <b-container class="bv-example-row">
                  <b-row>       
                      <b-col>  
                         <b-button  variant="primary" @click="showAddComputer=true"> Back</b-button>         
                          <b-form-group id="1"
                                      label="CPU Name"
                                      label-for="CPU Name"
                                      description="Please enter CPU Name.">
                                <b-form-select id="1"
                                    type="text"
                                    v-model="computer.cpu_name"
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
                              <b-form-radio-group  v-model="computer.harddisk_type" id="radios2" name="radioSubComponent">
                                      <b-form-radio value="HDD">Sata Harddisk(HDD)</b-form-radio>
                                      <b-form-radio value="SSD">Solid state drive(SSD)</b-form-radio>
                                </b-form-radio-group>   

                          </b-form-group>

                          <b-form-group id="3"
                                      label="Harddisk Qty"
                                      label-for="Harddisk Qty"
                                      description="Please enter Harddisk Qty  ">
                          <b-form-input
                                          v-model="computer.harddisk_qty"
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
                                          v-model="computer.ram"
                                          required
                                          placeholder="Enter Number Of RAM">
                          </b-form-input>
                          </b-form-group>

                          <b-form-group id="5"
                                      label="Display Size"
                                      label-for="Display Size"
                                      description="Please enter Display Size">
                          <b-form-radio-group  v-model="computer.display" id="radios3" name="radioSub">
                                      <b-form-radio value="13">13 inch</b-form-radio>
                                      <b-form-radio value="14">14 inch</b-form-radio>
                                      <b-form-radio value="15">15 inch</b-form-radio>
                                      <b-form-radio value="17">17 inch</b-form-radio>
                                </b-form-radio-group>   
                          </b-form-group>

                           <b-button  variant="primary" @click="computerSubmitData(computer.id)"> Submit Computer</b-button>
                        </b-col>      
                     </b-row>
                   </b-container> 
        </b-row>
    </b-container>

     <div slot="modal-footer" class="w-100">
         <b-btn  size="lg" class="float-right" variant="success"  block @click="handleOk(asset_list.id)" v-if="showAddComputer==true">
           OK
         </b-btn>
         <b-btn  size="lg" class="float-right" variant="danger" block @click="hideModal">
           Close
         </b-btn>    
       </div>

  </b-modal>


  <b-modal ref="myModalRef2" hide-footer title="Warnning" :header-bg-variant="headerBgVariant" >
     <div class="d-block text-center">
        <h3>กรอกข้อมูลไม่ครบ</h3>
      </div>
       <b-btn class="mt-3" variant="outline-danger"  block @click="hideModal">Close Me</b-btn>
    </b-modal>

    </b-container>
</template>


<script>
// import { Callout } from '~/components/'
import axios from 'axios'
import { mapState } from 'vuex'
import qs from 'qs';
const queryString = require('query-string')

export default {
  name: 'Form-model',
   props: ['categorie','department'],
   data () {
    return {
      asset_list:[],
      id_number:'',
      headerBgVariant: 'danger',
      computer:[],
      showAddComputer:true,
      computerInfo: true
    }
  },

  methods: {
    async Modal (id) {
      const AssetData = await this.$axios.$get('/asset/'+ id + this.$store.state.auth )
      this.asset_list = AssetData[0] 
      this.id_number = id      
      console.log(this.id_number);
      this.$refs.myModalRef.show()      
    },

    async computerGetData(id){
      const computer = await this.$axios.$get('/computer/'+ id + this.$store.state.auth )
       console.log(computer);
      this.computer = computer[0]
      this.showAddComputer = false
    },

    async computerSubmitData(id){
       this.asset_list.desc = 'CPU ' + this.computer.cpu_name + ', ' +
                              'Harddisk ' + this.computer.harddisk_type + ' ' + this.computer.harddisk_qty + 'GB ,' +                        
                              'RAM ' + this.computer.ram + 'GB ,' +
                               'Display ' + this.computer.display + ' inch';                
       this.showAddComputer = true
    },

  
    async handleSubmit (id) {

      
      this.pushDataComputer();
      const asset = queryString.stringify(this.asset_list)
  
      if(this.asset_list.asset_status == false) {
        this.asset_list.user = null
      }

      await this.$axios.$put('/asset/'+ id + this.$store.state.auth  ,asset)
        .catch(error => {
            console.log(error.message);
          }) 

        this.refresh()
        this.clearData()
        this.$refs.myModalRef.hide() 
    },

    pushDataComputer(){
      this.asset_list.cpu_name      = this.computer.cpu_name
      this.asset_list.harddisk_type = this.computer.harddisk_type
      this.asset_list.harddisk_qty  = this.computer.harddisk_qty
      this.asset_list.ram           = this.computer.ram
      this.asset_list.display       = this.computer.display
    },

    handleOk (id) {
      // Prevent modal from closing
      if (!this.asset_list.asset_no ||
          !this.asset_list.asset_year ||
          !this.asset_list.categorie ||
          !this.asset_list.asset_name ||
          !this.asset_list.desc ||
          !this.asset_list.serial_no ||
          !this.asset_list.part_no ||
          !this.asset_list.department
          ) {
        this.$refs.myModalRef2.show() 
      } 
      // else if(this.asset_list.asset_status == true && !this.asset_list.user )  {
      //       this.$refs.myModalRef2.show() 
      // }
      else {
        this.handleSubmit(id)
      }
      },
    hideModal() {
        this.$refs.myModalRef.hide() 
        this.$refs.myModalRef2.hide() 
    },
    
    clearData () {
        this.showAddComputer = true
        this.asset_list = []
        this.computer = []
    },

   async refresh(){
        const data  = await this.$axios.$get('/asset' + this.$store.state.auth )
        .catch(error => { console.log(error.response)});
        this.$store.commit('setSeasons', data)
    }

  }
}
</script>