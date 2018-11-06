<template>

   <b-modal size="lg" ref="myModalRef" title="View Asset" hide-footer>
      <b-container fluid class="bv-example-row">
        <b-row>
            <b-col>
            <h2>User Name #{{UserDataList.firstname}} {{UserDataList.lastname}}</h2>
            <br><br>
            </b-col>  
        </b-row>
        <b-row>
          <b-col>
            <b-container class="bv-example-row">
             <b-row>       
                <b-col cols="4"> 
                  <b-img rounded="circle" blank width="150" height="150" blank-color="#777" alt="img" class="m-1" />
                </b-col>
                <b-col> 
                     <b-row >
                          <b-col>
                              <p><strong> User No.:</strong> {{ UserDataList.id }}  </p> 
                              <p><strong> Name:</strong> {{UserDataList.firstname}} {{UserDataList.lastname}}  </p> 
                              <p><strong> Email:</strong> {{ UserDataList.email }} </p> 
                              <p><strong> Department :</strong>  {{ department.text }} </p>                                              
                          </b-col>
                      </b-row>                    
                </b-col>
            </b-row>
            <b-row >
                    <b-col class="text-center">
                                <br>
                              <h4> <strong> User device</strong> </h4>
                              <br>
                    </b-col>
            </b-row>
            <b-row>      
                <b-col> 
                        <b-table hover   :fields="field" :items="asset">
                                <template slot="asset_status" slot-scope="row">
                                    <p v-if="row.value == true">
                                    <strong>Usage</strong>
                                    </p>
                                    <p v-else> 
                                    Available
                                    </p>
                                </template>
                        </b-table>
                </b-col>
            </b-row>
                 </b-container> 
          </b-col> 
        </b-row>
    </b-container>
     <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
  </b-modal>

</template>


<script>
import axios from 'axios'

export default {
  name: 'View',
   data () {
    return {
       UserDataList:[],
       department:[],
       asset:[],
       field: {
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
            //   categorie: {
            //     label: 'Asset Categorie',
            //   },
              asset_name: {
                label: 'Asset Name',
              },
              // desc : {
              //   label: 'Description',
              // },
            //   serial_no : {
            //     label: 'Serial No.',
            //   },
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
            //   department : {
            //     label: 'Department',
            //   },
              comment : {
                label: 'Comment',
              },
              crud : {
                label: ' ',
              },
            },
    }
  },
  
  methods: {
    async ModalView (id) {
        const UserData = await this.$axios.$get('/users/'+ id + this.$store.state.auth)
        .catch(error => { console.log(error.response)});
        this.UserDataList = UserData.user[0]
        this.department = UserData.user[0].department
        this.asset = UserData.user[0].asset
        console.log(this.asset);
        
      this.$refs.myModalRef.show()      
      },

      hideModal () {
      this.$refs.myModalRef.hide()
      }
  }

}
</script>