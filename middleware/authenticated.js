
export default function ({ store, redirect }) {
  // If the user is not authenticated

  if (!store.state.auth || !store.state.list || !store.state.list_user) {  

    return redirect('/login')
    
  }
  
}
  