<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p class="text-sm">
        <i class="fa fa-arrow-up text-success"></i>
        <span class="font-weight-bold">{{detail1}}</span>
        {{detail2}}
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "gradient-line-chart",
  props: {
    title: {
      type: String,
      default: "Sales overview",
    },
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
    range:{
      type: Array,
      default: () => (["2016","2017","2018","2019","2020"]) 
    }
  },

  mounted() {
    var ctx1 = document.getElementById("chart-line").getContext("2d");
    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);
    gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
    gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
    new Chart(ctx1, {
      type: "line",
      data: {
        labels: this.$props.range,
        datasets: [
          {
            label: "Promedio Ponderado",
            tension: 0.2,
            pointRadius: 8,
            borderColor: "#40adff ",
            backgroundColor: gradientStroke1,
            borderWidth: 3,
            fill: true,
            data: [11.56, 11.16, 10.67, 12.00, 11.82, 12.64, 11.63, 12.63, 13.55, 11.17, 11.00, 13.00, 8.67],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        interaction: {
          intersect: true,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              color: (context) => {
                if(context.tick.value == 11) return '#f54021';
              },
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#ffff",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
              max: 20,
              min: 0
            },
          },
          x: {
            grid: {
              drawBorder: true,
              display: true,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ffff",
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  },
};
</script>
