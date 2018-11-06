<template>
<b-container fluid class="bv-example-row">
        
   <b-modal id="modalsm" size="md" ref="myModalRef" title="Checkin Asset"  @hidden="clearData" >
    
      <b-container fluid class="bv-example-row">
        <b-row>
            <b-col>
                <h5>Asset Number #{{asset_list.id}}</h5>
                <br>
            </b-col>  
        </b-row>
          <b-col>
            <b-container class="bv-example-row">
               <b-form-group id="9" label="User:" label-for="User" description="Please Select Name User." >
                         <b-form-select  v-model="asset_user.user" required>
                            <option :value="null" >Please select an option</option>
                            <option :value="users.id" v-for="users in users" :key="users.id">
                              {{ users.firstname }} {{ users.lastname }}
                            </option>
                        </b-form-select>

                </b-form-group>
            </b-container> 
          </b-col> 
        



      
    </b-container>

     <div slot="modal-footer" class="w-100">
         <b-btn  size="md" class="float-right" variant="success"  block @click="handleOk(asset_list.id)">
           OK
         </b-btn>
         <b-btn  size="md" class="float-right" variant="danger" block @click="hideModal">
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
   props: ['categorie','department','users'],
   data () {
    return {
      asset_list:[],
      headerBgVariant: 'danger',
      asset_user:[]
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



  
    async handleSubmit (id) {

      const asset = queryString.stringify(this.asset_user)
      await this.$axios.$post('/asset/checkin/'+ id + this.$store.state.auth,asset)
        .catch(error => {
            console.log(error.message);
          }) 
        this.$toast.success('Successfully Check In ' + id)
        this.refresh()
        this.clearData()
        this.$refs.myModalRef.hide() 
    },

    handleOk (id) {
      // Prevent modal from closing
      if (!this.asset_user) {
        this.$refs.myModalRef2.show() 
      } 
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