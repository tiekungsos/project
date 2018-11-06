import Vuex from 'vuex'
// import Cookies from 'js-cookie'

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.server ? require('js-cookie') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      list: [],
      categorie:[],
      department:[],
      list_user:[],
    },
    mutations: {
      setAuth(state, auth) {
        state.auth = '?token=' + auth
      },
      setSeasons: function (state, data) {
        state.list = data
      },
      setCategorie: function (state, categorie) {
        state.categorie = categorie
      },
      setdepartment: function(state,department){
        state.department = department
      },
      setlistuser: function (state,list_user) {
        state.list_user = list_user
      }
    },
    actions: {
      async nuxtServerInit({ commit}, { req }) {
        let auth = null
        let cookie = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          cookie = JSON.parse(parsed.auth) 
          //Check error form server side
          const error  = await this.$axios.$get('/token'+'?token='+ cookie.accessToken)
          .catch(error => {     
            return error.response.data.error             
          });

          if(error == "token_invalid" || error == "token_expired"){           
              Cookie.remove('auth')
          }
          else{
              auth = JSON.parse(parsed.auth)
              const config = {
                headers: {
                  'Authorization': 'Bearer ' + auth.accessToken
                }
              }      
              const data  = await this.$axios.$get('/asset',config)
              .catch(error => { console.log(error.response)});
    
              const categorie  = await this.$axios.$get('/categorie',config)
              .catch(error => { console.log(error.response)});
    
              const department  = await this.$axios.$get('/department',config)
              .catch(error => { console.log(error.response)}); 
    
              const list_user  = await this.$axios.$get('/users' ,config)
              .catch(error => { 
                console.log(error.response)});  
    
              commit('setlistuser',list_user.user)             
              commit('setdepartment' , department)
              commit('setCategorie' , categorie)
              commit('setSeasons', data)
              commit('setAuth', auth.accessToken)           
          }

       
          
        }
      },
    //   async authenticate({ commit },config) {
    //     const list_user  = await this.$axios.$get('/users' + config)
    //     .catch(error => { console.log(error.response)});         
    //     commit('setlistuser',list_user.user)
    // },

      // getAssetData({ commit },Asset){
      //   const AssetData = await this.$axios.$get(`${'/asset/'}${Asset}`,state.auth)
      //   commit('getAssetData', AssetData)
      // },
    }
  })
}


export default createStore
