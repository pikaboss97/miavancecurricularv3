<template>
    <div class="row d-flex justify-content-center">
        <div v-if="assignaments.length > 0" class="card col-sm-8 text-center">
            <div class="card-body">
                <h5 class="card-title">Escuela Profesional: {{ studentData.EscuelaProfesional }}</h5>
                <h4 class="card-title">Alumno: {{ studentData.Alumno }}</h4>
                <div class="pgbar">
                    <ProgressBar :bgcolor="'#6a1b9a'" :completed=enrolledCredits></ProgressBar>
                    <font-awesome-icon  icon="fa-solid fa-graduation-cap" size="2xl" />
                </div>
                <div>
                    <section :id="'sec_' + semester.codigo" v-for="semester in SEMESTERS_SECTIONS" :key="semester.codigo">
                        <div class="row no-gutters">
                            <div class="col-12">
                                <p class="title-casino" :class="'Ftitle' + semester.codigo">
                                    {{ semester.name }}
                                </p>
                            </div>
                            <div class="circle-container">
                                <div v-for="(item, index) in semester.cursos" :key="index">
                                    <div v-if="item.matriculado" :id="item.codigo" class="enrolled_curse"
                                        @mouseover="showPrerequisites(item.req)" @mouseleave="hiddenPrerequisites(item.req)" @touchstart="showPrerequisites(item.req)" @touchend="showPrerequisites(item.req)">
                                        <span class="circle-text">{{ item.nombre }}<br>{{ item.codigo }}<br>{{ item.creditos }}C</span>
                                    </div>
                                    <div v-if="!item.aprobado && item.nota && !item.matriculado" :id="item.codigo"
                                        class="failed_curse" @mouseover="showPrerequisites(item.req)" @mouseleave="hiddenPrerequisites(item.req)"
                                        @touchstart="showPrerequisites(item.req)" @touchend="showPrerequisites(item.req)">
                                        <span class="circle-text">{{ item.nombre }}<br>{{ item.codigo }}<br>{{ item.creditos }}C</span>
                                    </div>
                                    <div v-if="item.aprobado" :id="item.codigo" class="aproved_curse"
                                        @mouseover="showPrerequisites(item.req)" @mouseleave="hiddenPrerequisites(item.req)" @touchstart="showPrerequisites(item.req)" @touchend="showPrerequisites(item.req)">
                                        <span class="circle-text">{{ item.nombre }}<br>{{ item.codigo }}<br>{{ item.creditos }}C</span>
                                    </div>
                                    <div v-if="item && !item.matriculado && !item.aprobado && !item.nota" :id="item.codigo"
                                        class="circle" @mouseover="showPrerequisites(item.req)" @mouseleave="hiddenPrerequisites(item.req)"
                                        @touchstart="showPrerequisites(item.req)" @touchend="showPrerequisites(item.req)">
                                        <span class="circle-text">{{ item.nombre }}<br>{{ item.codigo }}<br>{{ item.creditos }}C</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="card-footer text-muted">Ponderado: </div>
        </div>
        <div v-if="assignaments.length == 0" class="card col-sm-7 text-center">
            <div class="card-body">
                <div class="mb-3 text-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">Ponderado: </div>
        </div>
    </div>
</template>
  
<script>
//import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
//import 'vue3-carousel/dist/carousel.css'

import axios from 'axios';
import ProgressBar from './ProgressBar.vue';
//import ProgressBar from './utils/ProgressBar.vue';
//import Header from './utils/Header.vue'
//import Footer from './utils/Footer.vue'


const SEMESTERS_SECTIONS = [
    { code: 'I', name: "PRIMER SEMESTRE", cursos: [], semester: 1 },
    { code: 'II', name: "SEGUNDO SEMESTRE", cursos: [], semester: 2 },
    { code: 'III', name: "TERCER SEMESTRE", cursos: [], semester: 3 },
    { code: 'IV', name: "CUARTO SEMESTRE", cursos: [], semester: 4 },
    { code: 'V', name: "QUINTO SEMESTRE", cursos: [], semester: 5 },
    { code: 'VI', name: "SEXTO SEMESTRE", cursos: [], semester: 6 },
    { code: 'VII', name: "SEPTIMO SEMESTRE", cursos: [], semester: 7 },
    { code: 'VIII', name: "OCTAVO SEMESTRE", cursos: [], semester: 8 },
    { code: 'IX', name: "NOVENO SEMESTRE", cursos: [], semester: 9 },
    { code: 'X', name: "DECIMO SEMESTRE", cursos: [], semester: 10 },
];

export default {
    name: 'record-card',
    components: {
        ProgressBar,
        //Header,
        //Footer,
        //Carousel,
        //Slide,
        //Navigation,
        //Pagination
    },
    data() {
        return {
            SEMESTERS_SECTIONS,
            studentData: {},
            assignaments: [],
            electives: [],
            totalCredits: 215,
            approvedCredits: 0,
            enrolledCredits: 0,
            banners: 0
        }
    },
    methods: {
        async fetchData() {
            const remoteApiUrl = 'https://pdfapi-a7a4.onrender.com';
            //const localApiUrl = 'http://192.168.1.51:3000'
            const user = JSON.parse(localStorage.getItem('user'));
            const credentials = {
                username: user.code,
            };
            try {
                this.cleanConstSections();
                const record = await axios.get(remoteApiUrl + '/curricula?ep=FIIS&v=' + user.year);
                this.setRecordToList(record.data)

                const response = await axios.post(remoteApiUrl + '/notas', credentials, { 'Content-Type': 'application/json' });
                this.totalCredits = response.data.TC;
                this.studentData = response.data
                this.assignaments = response.data.Asignaturas;
                this.progressValues(response.data.CA, response.data.CM);
                this.setSubjectsStudied();
                this.setElectivesStudied();
            } catch (error) {
                console.log(error);
            }
        },
        progressValues(ca, cm) {
            this.approvedCredits = ((ca / this.totalCredits) * 100).toFixed(2);
            this.enrolledCredits = (((ca + cm) / this.totalCredits) * 100).toFixed(2);
        },
        setRecordToList(record) {
            const values = Object.values(record.data);
            this.SEMESTERS_SECTIONS.map(e => {
                values.forEach(value => {
                    if (e.semester == value.semestre) {
                        e.cursos.push(value)
                    }
                });
            })
        },
        setSubjectsStudied() {
            this.SEMESTERS_SECTIONS.map(e => {
                e.cursos.map(f => {
                    this.assignaments.forEach(value => {
                        if (f.codigo == value.codigo) {
                            f.matriculado = value.matriculado;
                            f.aprobado = value.aprobado;
                            f.nota = value.nota;
                        }
                    });
                })

            })
        },
        showPrerequisites(courses) {
            console.log(courses);
            if (courses && courses.length > 0) {
                courses.forEach((course) => {
                    let item = document.getElementById(course)
                    if(!course.includes("creditos")){
                        item.classList.add("pre-req");
                    }
                })
            }
        },
        hiddenPrerequisites(courses) {
            if (courses && courses.length > 0) {
                courses.forEach((course) => {
                    if(!course.includes("creditos")){
                        document.getElementById(course).classList.remove("pre-req");
                    }
                })
            }
        },
        setElectivesStudied() {
            this.electives = this.assignaments.filter(curso => { return curso.electivo && curso.aprobado});
            //console.log(this.electives);
            this.SEMESTERS_SECTIONS.map(e => {
                e.cursos.map(f => {
                    this.electives.forEach((value, index) => {
                        if (f.class == 'E' + (index + 1) && value.aprobado) {
                            f.aprobado = true;
                        }
                    });
                })

            })
        },
        cleanConstSections() {
            this.SEMESTERS_SECTIONS.map(e => {
                e.cursos = [];
            })
        },
        isMobile() {
            let mobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                );
            console.log(mobile);
            return mobile;
        },
        showAlert(msg) {
            this.$swal.fire({
                title: 'Importante...',
                icon: 'info',
                text: msg,
                footer: '<a href="">Estamos trabajando para ofrecerte nuevas funcionalidades</a>'
            })
        }

    },
    async mounted() {
        this.banners = this.isMobile() ? 1 : 3;
        await this.fetchData();
        this.showAlert("¡Hola! Esta es la primera versión de nuestra plataforma de gestión curricular. Por favor, ten en cuenta que podrían surgir errores inesperados como fallas en las convalidaciones de los cursos o errores con los codigos de los mismos. Tu feedback es valioso para nosotros, así que si encuentras alguna anomalía, no dudes en informarnos. ¡Gracias por tu comprensión y colaboración!")
    },
}
</script>

<style scoped>
.asg-body {
    margin: 2rem;
}

.circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ffffff;
    color: rgb(7, 7, 7);
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid;
}

.aproved_curse {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #57bc66;
    color: rgb(7, 7, 7);
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
}

.failed_curse {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #de7b7b;
    color: rgb(7, 7, 7);
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
}

.enrolled_curse {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #2196F3;
    color: rgb(7, 7, 7);
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
}

.circle:hover,
.failed_curse:hover,
.enrolled_curse:hover,
.aproved_curse:hover {
    background-color: #de7a17;
}
.pre-req {
    background-color: #682786 !important;
    color: white;
}

.circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin: 5px;

}

.pgbar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}


.carousel_container {
    margin-left: 2px;
    margin-right: 2px;
}

.carousel__item {
    margin-right: 15px;
    margin-left: 15px;
    min-height: 50px;
    width: 100%;
}

.carousel_img {
    max-width: 100%;
    max-height: 100%;
}

.initial_card {
    height: 100px;
    border: 2px solid;
    border-color: #ffffff;
}

.js .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.inputfile-4+label figure {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #d3394c;
    display: block;
    padding: 20px;
    margin: 0 auto 10px;
}
.circle-text {
    margin:10px;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {

    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #ffffff;
        color: rgb(7, 7, 7);
        font-weight: bold;
        font-size: 7px;
        cursor: pointer;
        border: 1px solid;
        border-color: rgba(41, 40, 40, 0.675);
    }
    .circle-text {
        margin:10px;
    }
    .aproved_curse {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #57bc66;
        color: rgb(7, 7, 7);
        font-weight: bold;
        font-size: 7px;
        cursor: pointer;
    }

    .failed_curse {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #de7b7b;
        color: rgb(7, 7, 7);
        font-weight: bold;
        font-size: 7px;
        cursor: pointer;
    }

    .enrolled_curse {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #2196F3;
        color: rgb(7, 7, 7);
        font-weight: bold;
        font-size: 7px;
        cursor: pointer;
    }

    .carousel_container {
        margin-top: 0px;
        margin-left: 0px;
        margin-right: 0px;
    }

    .carousel__item {
        margin: 0px;
        min-height: 100px;
        min-width: 100px;
        border-radius: 8px;

    }

    .carousel_img {
        max-width: 100%;
        max-height: 100%;
    }
}</style>
  