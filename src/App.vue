<template>
  <main>
    <div class="offline" v-if="offline">
    <span>You are currently offline</span>
    </div>
    <Charts v-if="patients.length" :patients="patients"/>
  </main>
</template>

<script>
import firebase from "./firebaseConfig";
import Charts from './components/Charts.vue';

const db = firebase.database();

export default {
  name: 'App',
  components: {
    Charts
  },
  data: () => {
    return {
      patients: [],
      offline: false,
      pollInterval: null,
      patientsRef: db.ref('/'), 
      connectedRef: firebase.database().ref('.info/connected')      
    }
  },
  methods: {
    readPatientData(data) {
      let patientData = [];
      data.forEach((patient) => {
        patientData.push({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          bloodgroup: patient.bloodgroup
        });
      });

      if( localStorage.setItem('patients', JSON.stringify(patientData)) ) {
        this.patients = patientData;
      }
    }
  },
  mounted(){
    try{
      this.patients = JSON.parse(localStorage.getItem('patients')) || []; 
    }catch(e) {console.log(e)}
    
    this.connectedRef.on('value', (snap) => {
      if(!snap.val()){
        this.offline = true;
      } else {
        this.offline = false;
      }
    }).bind(this); 
    this.patientsRef.on('value', (snapshot) => {
      this.offline = false; 
      const data = snapshot.val();
      this.readPatientData(data);
    }).bind(this);
  },
  beforeUnmount(){
    clearInterval(this.pollInterval)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.offline {
  background-color: #222222;
  color: white;
}
</style>
