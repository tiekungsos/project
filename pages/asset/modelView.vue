<template>

   <b-modal size="lg" ref="myModalRef" title="View Asset" hide-footer>
      <b-container fluid class="bv-example-row">
        <b-row>
            <b-col>
            <h2>Asset Number #{{asset_list.asset_no}}</h2>
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
                              <p><strong> Asset No.:</strong> {{ asset_list.asset_no }}  </p> 
                              <p><strong> Asset Year:</strong> {{ asset_list.asset_year }}  </p> 
                              <p><strong> Asset Categorie :</strong> {{ categorie.text }} </p> 
                              <p><strong> Asset Name:</strong>  {{ asset_list.asset_name }} </p>                                              
                          </b-col>
                          <b-col>
                     
                            <p><strong> Serial No. :</strong>  {{ asset_list.serial_no }} </p>
                            <p><strong> Part No. :</strong> {{ asset_list.part_no }} </p>  
                            <div v-if="asset_list.asset_status == true ">
                                <p><strong> Status :</strong> Usage</p> 
                                <P><strong>User : </strong>{{ user.firstname }} {{ user.lastname }}</P>
                                <P><strong>Email : </strong>{{ user.email }}</P>
                            </div>
                            <div v-else>
                                <p><strong> Status :</strong> Available</p> 
                            </div>
                            <p><strong>Department :</strong>{{ department.text }} </p>   
                          </b-col>
                      </b-row>
                       <b-row >
                          <b-col>
                              <p> <strong>Description</strong></p> 
                              <p>  {{ asset_list.desc }} </p>                                               
                          </b-col>
                      </b-row>
                         <b-row >
                          <b-col>
                              <p> <strong>Comment</strong></p> 
                              <p>  {{ asset_list.comment }} </p>                                               
                          </b-col>
                      </b-row>
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
// import { Callout } from '~/components/'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
   props: ['config'],
  name: 'View',
   data () {
    return {
       asset_list:[],
       department:[],
       categorie:[],
       user:[]
    }
  },

  computed: {
    hasMyObject: function() {
        return Object.keys(this.asset_list).length;
    }
    },
  methods: {
    async ModalView (id) {
        const AssetData = await this.$axios.$get('/asset/'+ id + this.$store.state.auth)
        .catch(error => { console.log(error.response)});
        this.asset_list = AssetData[0]
        this.department = AssetData[0].department
        this.categorie = AssetData[0].asset_categorie
        this.user = AssetData[0].users_condition[0]
      this.$refs.myModalRef.show()      
      },

      hideModal () {
      this.$refs.myModalRef.hide()
      }
  }

}
</script>