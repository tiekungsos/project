// import axios from 'axios'
// export const state = () => ({
//     list: []
//   })
  
//   export const mutations = {
//     setSeasons: function (state, data) {
//       state.list = data
//     }
//   }

//   const API_URLS = {
//     assets_url: 'http://localhost:8081/api/asset/',
//   }

//   export const actions = {
//     async nuxtServerInit ({commit}) {
//       console.log('[INIT]')
//       // Does not even 'commit'
//       const { data } = await axios.get(API_URLS.assets_url)
//       .catch(error => { console.log(error.response)});
//       console.log('Got a response from axios')
//       commit('setSeasons', values(data))
//     }
//   }