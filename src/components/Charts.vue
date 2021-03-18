<template>
  <div class="charts">
    <div><svg id="bloodGroupChart" :width="width" :height="height"></svg></div>
    
    <div><svg id="ageRangesChart" :width="width" :height="height"></svg></div>
  </div>
</template>

<script>
import d3 from 'd3';
export default {
  name: 'Charts',
  props: {
    patients: {
      type: Array,
      validator: (patient) => patient.every(x => typeof x === 'object')
    }
  },
  data: ()=> {
    return {
      width: 750,
      height: 400,
      margin: 200,
    }
  },
  computed: {
    scaleWidth: () => this.width-this.margin,
    scaleHeight: () => this.height-this.margin,
    groupCounts: () => {
      let groupCounts = {};
      this.patients.map(patient => {
        groupCounts[patient.bloodgroup] = groupCounts[patient.bloodgroup] + 1 || 1;  
      })
      return groupCounts;
    },
    bloodGroups: () => this.groupCounts.keys(),
    ageRanges: () => {
      let ageRanges = {};
      this.patients.map(patient => {
        if(patient.age < 18){
          ageRanges['Under 18'] = ageRanges['Under 18'] + 1 || 1
        } else if(patient.age < 30){
          ageRanges['18-30yrs'] = ageRanges['18-30yrs'] + 1 || 1
        } else if(patient.age < 60){
          ageRanges['30-60yrs'] = ageRanges['30-60yrs'] + 1 || 1
        } else {
          ageRanges['Over 60'] = ageRanges['Over 60'] + 1 || 1
        }
      })
      return ageRanges;
    },
    ageGroups: () => this.ageRanges.keys()
  },
  methods: {
    initBloodGroupChart(){
      var svg = d3
      .select("#bloodGroupChart");

      svg.append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "24px")
      .text("Distribution of Blood Groups");

      var xScale = d3.scaleBand()
      .domain(this.bloodGroups)
      .range([0, this.scaleWidth])
      .padding(0.4),
      yScale = d3.scaleLinear()
      .domain([0, d3.max(this.groupCounts.values()])
      .range([this.scaleHeight, 0]);

      var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

      g.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", this.height - 250)
      .attr("x", this.width - 100)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Blood Group");

      g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(function(d){
          return d;
      })
      .ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Number of Patients"); 

      g.selectAll(".bar")
      .data(this.bloodGroups)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
      return xScale(d) })
      .attr("y", function(d) { return yScale(this.groupCounts[d]) })
      .attr("height", function(d) { return height - yScale(this.groupCounts[d]) });  
    },
    initAgeRangesChart(){
      var svg = d3
      .select("#ageRangesChart");

      svg.append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "24px")
      .text("Age Distributions");

      var xScale = d3.scaleBand()
      .domain(this.ageGroups)
      .range([0, this.scaleWidth])
      .padding(0.4),
      yScale = d3.scaleLinear()
      .domain([0, d3.max(this.ageRanges.values()])
      .range([this.scaleHeight, 0]);

      var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

      g.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", this.height - 250)
      .attr("x", this.width - 100)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Age Group");

      g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(function(d){
          return d;
      })
      .ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Number of Patients in Group"); 

      g.selectAll(".bar")
      .data(this.ageRanges)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
      return xScale(d); })
      .attr("y", function(d) { return yScale(this.groupCounts[d]); })
      .attr("height", function(d) { return height - yScale(this.groupCounts[d]); });  
    }
  },
  mounted(){
    this.initBloodGroupChart();
    this.initAgeRangesChart();
  }
}
</script>

<style scoped>

</style>
