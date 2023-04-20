<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-end">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div class="text-sm text-center copyright text-muted"
            :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'">
            ©
            {{ new Date().getFullYear() }}, desarrollado
            <i class="fa fa-heart"></i> por
            <a href="https://www.instagram.com/d_i_e_g_o._.v_e_g_a/" class="font-weight-bold" target="_blank">Diego
              Vega</a>
            para una mejor experiencia.
          </div>
        </div>
        <div class="col-lg-6">
          <ul class="nav nav-footer justify-content-center justify-content-lg-center">
            <li class="nav-item">
              <a href="https://www.linkedin.com/in/diego-vega-mejia/" class="nav-link text-muted"
                target="_blank">Linkedin</a>
            </li>
            <li class="nav-item">
              <a href="https://www.instagram.com/d_i_e_g_o._.v_e_g_a/" class="nav-link text-muted"
                target="_blank">Instagram</a>
            </li>
            <li class="nav-item">
              <a href="https://www.facebook.com/PIKABOSSD/" class="nav-link text-muted" target="_blank">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
