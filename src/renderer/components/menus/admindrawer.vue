<template>
  <v-navigation-drawer
            width="60"
            
            fixed
            dark
            permanent
            style="background:#172a3a;z-index:100 !important;"
            app
    >
        <v-toolbar flat style="background:#172a3a" dense>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-3">
          
          <v-tooltip fixed right v-for="(feat,i) of features" :key="i" style="max-width:60px;min-width:60px !important" width="60">
            <v-btn slot="activator" flat class="transparent mx-0 px-0 my-0" large @click.native="loadView(feat['view'])" style="max-width:60pxmin-width:60px !important;margin-left:-15px !important">
              <v-icon large style="opacity:0.7;max-width:60pxmin-width:60px !important" :class="`my-3 ${ $CurrentUser.activeView === feat.view ? 'deep-orange blue-grey--text text--darken-4' : 'blue--text text--lighten-4' }`" >{{features[i].icon}}</v-icon>
            </v-btn>
            <span>{{feat.name}}</span>
          </v-tooltip>
          
        </div>
        <v-footer color="blue-grey darken-3" dark class="white--text" style="z-index:100;bottom:0px" app>        
            <v-spacer></v-spacer>
              <v-icon>mdi-settings</v-icon>
            <v-spacer></v-spacer>
        </v-footer>
    </v-navigation-drawer>
  </template>
  <script>
export default {
  name: 'admindrawer',
  components: {
    pn: require('@/components/custom/pn').default
  },
  props: [
    'activeView'
  ],
  data () {
    return {
      features: [
        { icon: 'mdi-view-dashboard', name: 'dashboard', view: 'dashboard' },
        { icon: 'mdi-database-search', name: 'Remote Database', view: 'remotedatabase' },
        { icon: 'mdi-database-plus', name: 'Import Data', view: 'importdata' },
        { icon: 'mdi-table-search', name: 'Query Vault', view: 'queries' },
        { icon: 'mdi-chart-pie', name: 'Data Analytics', view: 'dataanalisis' },
        { icon: 'mdi-monitor', name: 'Remote Screen', view: 'remotescreen' },
        { icon: 'mdi-file-tree', name: 'Local File System', view: 'localfiles' },
        { icon: 'mdi-folder-network', name: 'Remote File System', view: 'remotefiles' },
        { icon: 'mdi-vector-polyline', name: 'Node Flows', view: 'nodeflows' },
        { icon: 'mdi-code-braces', name: 'Code Vault', view: 'scripts' },
        { icon: 'mdi-console-network', name: 'Remote Shell', view: 'remoteshell' },
        { icon: 'mdi-account-search', name: 'Expedient', view: 'Expedient' }
      ],
      drawer: true,
      fixed: true,
      miniVariant: false,
      userData: {}
    }
  },
  methods: {
    loadView (view) {
      this.$Bus.$emit('LOADVIEW', view)
    }
  }
}
</script>
<style lang="scss" scoped>
.oscuro {
  background: #19212b !important;
}
</style>
