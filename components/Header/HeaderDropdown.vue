<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="~static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
        <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
  export default {
     middleware: 'authenticated',
    name: 'header-dropdown',
    data: () => {
      return { itemsCount: 42 }
    },
    methods: {
      async logout() {
       Cookie.remove('auth')
      this.$store.commit('setAuth', null) 
      location.reload()
      }
    }
  }
</script>

