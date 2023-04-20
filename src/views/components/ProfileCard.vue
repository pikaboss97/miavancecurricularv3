<template>
  <div class="card card-profile">
    <img src="../../assets/img/bg-profile.jpg" alt="Image placeholder" class="card-img-top" />
    <div class="row justify-content-center">
      <div class="col-4 col-lg-4 order-lg-2">
        <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
          <a href="javascript:;">
            <img
              src="https://media.licdn.com/dms/image/C4E03AQGxhrY7c7qM8A/profile-displayphoto-shrink_800_800/0/1583657197223?e=1687392000&v=beta&t=SsCa1NdEi-e_7kwmSJmKEJu_yS71zny5TyCXoPndU1E"
              class="rounded-circle img-fluid border border-2 border-white"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
      <div class="d-flex justify-content-between">
        <a href="https://www.linkedin.com/in/diego-vega-mejia/" target="_blank" class="btn btn-sm btn-info mb-0 d-none d-lg-block">Conectar</a>
        <a href="javascript:;" class="btn btn-sm btn-info mb-0 d-block d-lg-none">
          <i class="ni ni-collection"></i>
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=51990228575&text='Hola...'"
          target="_blank"
          class="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block"
        >Message</a>
        <a href="javascript:;" class="btn btn-sm btn-dark float-right mb-0 d-block d-lg-none">
          <i class="ni ni-email-83"></i>
        </a>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <div class="d-grid text-center">
              <span class="text-lg font-weight-bolder">159</span>
              <span class="text-sm opacity-8">Connections</span>
            </div>
            <div class="d-grid text-center mx-4">
              <span class="text-lg font-weight-bolder">1</span>
              <span class="text-sm opacity-8">Photos</span>
            </div>
            <div class="d-grid text-center">
              <span class="text-lg font-weight-bolder">21</span>
              <span class="text-sm opacity-8">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <h5>
          Diego Vega
          <span class="font-weight-light">, 25</span>
        </h5>
        <div class="h6 font-weight-300">
          <i class="ni location_pin mr-2"></i>Tingo Maria, Peru
        </div>
        <div class="h6 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>software engineer - Full-Stack Developer
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>Universidad Nacional Agraria de la Selva
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-card",
};
</script>