<template>
  <layoutapp :title="`Paciente: ${patient.profile.displayName} (${patient.personales.fechanacimiento})`" >
    <v-card flat color="transparent" slot="contenido">
      <patientavatar class="mt-4" :profile="patient.profile"/>
      <header-chart style="position:fixed;top:80px;right:0px;width:83vw" :height="255" :data="patient.profile.displayChart.data" :labels="patient.profile.displayChart.labels"/>
      <quickactions v-if="patient.profile && patient.profile.quickActions" :quickactions="patient.profile.quickActions"></quickactions>
      
      <v-card-text>
        <v-layout col wrap>
          <v-flex md2 v-for="(tag, ind) in patient.profile.displayTags" :key="ind" :class="tag.class">
            <h3 :style="tag.style">
            {{tag.value}}
            </h3>
            <Label style="opacity: 0.6">
            {{tag.title}}
            </Label>
          </v-flex>
      </v-layout>
      </v-card-text>
    </v-card>
  </layoutapp>
</template>
<script>
export default {
  methods: {
    addPatient () {
      this.$cloud.api.patients.insert(this.patient).then(id => {
        console.log(id)
        this.loadPatient(id)
      }).catch(err => {
        console.error(err)
      })
    },
    loadPatient: (pid) => {
      this.$cloud.api.patients.get(pid, d => {
        if (d.length > 0) {
          this.patient = d
        } else {
          this.patient = {}
          // TODO: hay queredirijir a error not found
        }
      })
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('Ready')
    this.$electron.ipcRenderer.on('LoadPatient', payload => {
      this.patient = payload
    })
  },
  components: {
    layoutapp: require('@/customlayouts/app.basico').default,
    patientavatar: require('@/components/patient/avatar').default,
    HeaderChart: require('@/components/ui-pro/HeaderChart/HeaderChart').default,
    quickactions: require('@/components/menus/quickactions').default,
    timeline: require('@/components/patient/timeline').default
  },
  data () {
    return {
      patient: {
        personales: {
          nombres: 'Juan',
          paterno: 'Perez',
          materno: 'Escoboza',
          fechanacimiento: '01-01-1988',
          direccion: {
            calle: 'Av de las Jacarandas',
            exterior: '333',
            interior: '212',
            colonia: 'Platino',
            codigopostal: '82192',
            ciudad: 'Conocida',
            estado: 'Inventado'
          }
        },
        familiares: {},
        contacto: {},
        laborales: {},
        clinicos: {},
        comunicaciones: {},
        profile: {
          displayPic: 'https://randomuser.me/api/portraits/men/86.jpg',
          displayName: 'Juanito Perez',
          displayTags: [
            {class: '', style: '', title: 'genero', value: 'Masculino'},
            {class: '', style: '', title: 'edad', value: '29'},
            {class: '', style: '', title: 'primer contacto', value: 'Enero 2007'},
            {class: '', style: '', title: '', value: ''}
          ],
          displayChart: {
            data: [200, 50, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
            labels: ['Peso', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
          },
          quickActions: [
            {id: 'editarperfil', icon: 'mdi-pencil', color: 'blue'},
            {
              id: 'comunicaciones',
              icon: 'mdi-phone',
              color: 'orange',
              opciones: [
                {id: 'llamar', icon: 'mdi-phone', color: 'blue'},
                {id: 'email', icon: 'mdi-gmail', color: 'blue'},
                {id: 'whatsapp', icon: 'mdi-whatsapp', color: 'blue'},
                {id: 'facebook', icon: 'mdi-facebook', color: 'blue'}]},
            {id: 'agendar', icon: 'mdi-calendar-plus', color: 'pink'}
          ]
        },
        timeline: {},
        comms: {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
#toolbar1{
    display: inline;
    color:grey;
}
#drawer1{
    display: inline;
}
#footer{
    background-color: #424242;
    background: #424242;
    text-align: center;
}
#clase{
    background-color: #424242;
    background: #424242;
}
a{

    text-decoration: none;
    font-size: 18px;
    
}

a:hover{
    text-decoration:none;
    font-size: 20px;
    color: rgb(255, 161, 55)
}
.contIMG{
    position: relative;
    display: inline-block;
    text-align: center;
}
.onIMG{
    position: absolute;
    top: 22%;
    left: 23%;
    
}
.onIMG2{
    position: absolute;
    top:42%;
    left:10%;
}
.perfil{
    color:white; 
    float:left; 
    top:-10%;
    font-size: 20px;
    padding-top:10px; 
    margin-right:20px;
}
.footer2{
 margin-top: 65%;
 color: #424242;
 margin-bottom: -25%;
 
}
.intermedio{
    height: 320px;
    width: 1600px;
    background-color: white;
    position: relative;
    display: inline-block;
    text-align: center;
}
.intermedio-2{
position: absolute;
top:40%;
left:5%;
color:rgb(189, 189, 189);
text-align:center;
}
.intermedio-3{
    position: absolute;
    top:40%;
    left:20%;
    color:rgb(189, 189, 189);
    text-align:center;
}
.intermedio-4{
    position: absolute;
    top:40%;
    left:35%;
    color:rgb(189, 189, 189);
    text-align:center;
}
.intermedio-5{
    position: absolute;
    top:40%;
    left:50%;
    color:black;
    text-align:center;
}
.greatImage{
    position:absolute;
    
    
}
.a-footer{
    font-size: 20px;
    color: grey;
}
.a-footer:hover{
color: rgb(255, 161, 55)
}
</style>
