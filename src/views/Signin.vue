<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Iniciar Sesión</h4>
                  <p class="mb-0">Ingresa con las credenciales del sistema académico OCDA</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="login($event.target)">
                    <div class="mb-3">
                      <argon-input type="text" placeholder="Codigo" id="code" name="code" size="lg" />
                    </div>
                    <div class="mb-3">
                      <argon-input type="password" placeholder="Contraseña" id="password" name="password" size="lg" />
                    </div>
                    <div class="mb-3" style="border: none !important;">
                      <div class="form-control text-center" style="height:50px; width: 100%; padding: 0;">
                        <img id="capcode" :src=newCaptcha alt="Codigo de Verificacion" title="Codigo de Verificacion" />
                      </div>
                    </div>
                    <div class="mb-3">
                      <argon-input type="text" placeholder="Cod. Verificacion" id="captcha" name="captcha" size="lg" />
                    </div>
                    <div v-show= "preloader" class="mb-3 text-center">
                      <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    <argon-switch id="rememberMe">Recordar</argon-switch>

                    <div class="text-center">
                      <argon-button class="mt-4" variant="gradient" color="success" fullWidth
                        size="lg">Ingresar</argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                            background-size: cover;">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">"Diseñado para mejorar la experiencia."
                </h4>
                <p class="text-white position-relative"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import sha256 from 'crypto-js/sha256';
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  data() {
    return {
      preloader:false,
      code: '',
      password: '',
      captcha: '',
      newCaptcha: ''
    }
  },
  provide() {
    return {
      user: this.code,
    };
  },
  methods: {
    async login(event) {
      this.preloader = true;
      this.code = event.code.value;
      this.password = sha256(event.password.value).toString();
      this.captcha = event.captcha.value;
      let credentials = {
        username: this.code,
        password: this.password,
        captcha: this.captcha
      }
      try {
        const response = await axios.post('https://pdfapi-a7a4.onrender.com/auth', credentials, { 'Content-Type': 'application/json' });
        console.log(response.data);
        this.saveSession(response.data.Code)
        this.$router.push('/dashboard-default');
      } catch (error) {
        this.getCaptcha();
      }
      this.preloader = false;
    },
    saveSession(code) {
      const obj = { id: 1, code: code };
      const objStr = JSON.stringify(obj);
      localStorage.setItem("user", objStr);
    },
    async getCaptcha() {
      const response = await axios.get('https://pdfapi-a7a4.onrender.com/captcha');
      this.newCaptcha = response.data;
    }
  },
  async created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
    await this.getCaptcha();
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  async mounted() {
    //this.banners = this.isMobile() ? 1 : 3;
  },
};
</script>
