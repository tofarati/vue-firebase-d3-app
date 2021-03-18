<template>
  <main>
    <div class="offline" v-show="offline">
    <span>You are currently offline</span>
    </div>
    <Charts patients="patients"/>
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
      collection: "frontend-vuejs-assignment-default-rtdb",
      dataPollInterval: null,
      connectedRef: null
    }
  },
  methods: {
    readPatientData() {
      let patientData = [];
      db.collection(this.collection)
        .get()
        .then((snapshot) => {
          snapshot.forEach((patient) => {
            patientData.push({
              id: patient.id,
              name: patient.name,
              age: patient.age,
              bloodgroup: patient.bloodgroup
            });
          });

          localStorage.setItem('patients', patientData);
        })
        .catch((error)=>{
          console.error("Error fetching data: ", error);
        });
      patientData = localStorage.getItem('patients');
      if(patientData) {
        this.patients = patientData;
      } 
      console.log(this.patients);
    }
  },
  mounted(){ 
    this.connectedRef = firebase.database().ref('.info/connected');
    this.connectedRef.on('value', (snap) => {
      if(snap.val() === true){
        this.offline = false;
      } else {
        this.offline = true;
      }
    }) 
    this.readPatientData();
    //  If the data was expected to update every 5 minutes:
    //  this.dataPollInterval = setInterval(() => {
    //   this.readPatientData();
    // }.bind(this), 1000*60*5);
  },
  beforeUnmount(){
    clearInterval(this.dataPollInterval);
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
