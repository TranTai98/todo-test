<template>
  <v-app>
    <v-main>
      <BackgroundList/>
      <v-row cols="12" id="menu" >
      <v-col cols="4" >
      <router-link to="/" class="menu_list_mini">
      <p>Vue Mini Project</p></router-link>
      </v-col>
      <v-col cols="4" style="display:flex">
      <router-link to="/user_manager" class="menu_list_user" style="padding-left:10%">
      <p>User manager</p></router-link>
      </v-col>
      <v-col cols="4" style="display:flex" >
      <router-link to="/adminstrator_manager" class="menu_list_adminstrator">
      <p>Adminstrator manager</p></router-link>
      </v-col>
      <router-view/>
      </v-row>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#menu
{
  font-size: 15px;
  font-family:'Times New Roman', Times, serif;
  background-color: #fff;
  padding-left: 3%;
  .menu_list
  {
    &_mini
    {
    text-decoration: none;
    }
    &_product
    {
      text-decoration: none;
    }
    &_user
    {
      padding-left: 2%;
      text-decoration: none;
    }
    &_adminstrator
    {
      padding-left: 2%;
      text-decoration: none;
    }
  }
}
</style>
<script>
import BackgroundList from './components/BackgroundList.vue';
export default {
    components: { BackgroundList }
}
</script>
