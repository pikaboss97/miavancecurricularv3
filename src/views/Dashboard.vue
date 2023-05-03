<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.money.title" :value="stats.money.value" :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground" :detail="stats.money.detail"
              directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.users.title" :value="stats.users.value" :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground" :detail="stats.users.detail"
              directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.clients.title" :value="stats.clients.value" :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.sales.title" :value="stats.sales.value" :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass" :iconBackground="stats.sales.iconBackground" :detail="stats.sales.detail"
              directionReverse></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
             <!--  <gradient-line-chart /> -->
             <consumption-room-chart />
            </div>
          </div>
          <div class="col-lg-8">
            <carousel />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Sales by Country</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Country:</p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Card from "@/examples/Cards/Card.vue";
//import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import ConsumptionRoomChart from '../examples/Charts/ConsumptionRoomChart.vue';
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-default",
  data() {
    return {
      user:{},
      stats: {
        money: {
          title: "Creditos aprobados",
          value: '',
          percentage: "+55%",
          iconClass: "ni ni-money-coins",
          detail: " del total de creditos",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Creditos Matriculados",
          value: "3",
          percentage: "",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: " del total de creditos",
        },
        clients: {
          title: "Electivos cursados",
          value: "",
          percentage: "20%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-success",
          iconBackground: "bg-gradient-success",
          detail: "",
        },
        sales: {
          title: "Creditos pendientes",
          value: "",
          percentage: "",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: " del total",
        },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  methods: {
    async getUserData() {
      const response = await axios.get('https://pdfapi-a7a4.onrender.com/getUser?code='+JSON.parse(localStorage.getItem('user')).code);
      this.user = response.data;
      this.stats.money.value=this.user.ca;
      this.stats.money.percentage = ((this.user.ca / this.user.tc) * 100).toFixed(2)+"% cursado";
      this.stats.users.value = this.user.cm;
      this.stats.users.percentage =" Cursando el " + (((this.user.cm + this.user.ca ) / this.user.tc) * 100).toFixed(2)+"% ";
      this.stats.clients.value = this.user.ea;
      this.stats.clients.percentage = ((this.user.ea / 4)*100).toFixed(2)+'% cursados';
      this.stats.sales.value = (this.user.tc - (this.user.cm+this.user.ca));
      this.stats.sales.percentage = (((this.user.tc - (this.user.ca+this.user.cm))/this.user.tc)*100).toFixed(2)+"%";

    }
  },
  components: {
    Card,
    ConsumptionRoomChart,
    //GradientLineChart,
    Carousel,
    CategoriesCard,
  },
  async mounted() {
    await this.getUserData();
  }
};
</script>
