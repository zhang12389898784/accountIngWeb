<template>


    <div class="shell">
        <div class="background">zcxsa</div>
        <div class="img" style="background-image: url('../../../public/img.png');"></div>
        <div class="text1">
            <h1>pecializes in translation</h1>
        </div>
        <div class="text">
            <h1>from Danish into Englis</h1>
        </div>
        <div class="img" style="background-image: url('../../../public/img1.png');"></div>
        <div class="text1">
            <h1>from Danish into Englis</h1>
        </div>
        <div class="text">
            <h1> is experience, authority and presen</h1>
        </div>
        <div class="img" style="background-image: url('../../../public/img2.png');"></div>
        <div class="text1">
            <h1>ve signed Van der Sar after Schmeic</h1>
        </div>
        <div class="text">
            <h1>mperial power and heighten political</h1>
        </div>
        <div class="img" style="background-image: url('../../../public/img3.png');"></div>
        <div class="text1">
            <h1>position of literati and officialdom</h1>
        </div>
        <div class="text">
            <h1>After the Song Dynasty literati and officialdom's goi</h1>
        </div>
        <div class="img" style="background-image: url('../../../public/img4.png');"></div>
        <div class="text">
            <h1>ng into business became an eye-catching phenomenon.</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { appStore } from '@/stores/appStore';
import { onMounted } from 'vue';
const avatarEmits = () => {
    appStore().setIsCollapse()
}
onMounted(() => {
    const background:HTMLElement|undefined = document.querySelector<HTMLElement>('.background')||void 0;
    const shell:HTMLElement|undefined=document.querySelector<HTMLElement>('.shell')||void 0
    if(shell){
        shell.addEventListener('scroll', (e) => {
        const scrollY =shell.scrollTop;
        console.log(scrollY);
        if(background){
            if ((scrollY !== 0&& scrollY < 600)) {
            background.style.backgroundPosition = `calc(50% + ${scrollY/2}px) calc(50% + ${scrollY/2}px)`;
        } else {
            background.style.backgroundPosition = ``;
        }
        }
    });
    }
})
</script>
<style lang="scss" scoped>
.shell {
    height: 100vh;
    width: 70vw;
    overflow-x: hidden;
    perspective: 3px;
}

.shell div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: 30px;
    letter-spacing: 2px;
}

.img {
    transform: rotateZ(-1px) scale(1);
    background-size: cover;
    height: 100vh;
    z-index: -1;
}

.text {
    height: 50vh;
    color: #fff;
}

.text h1 {
    color: #000;
}

.text1 {
    z-index: -1;
    transform: translateY(-30vh) translateZ(1px);
    color: #fff;
    font-size: 30px;
}

.background {
    background-image: url("../../../public/img5.jpg");
    background-size: cover;
    height: 100vh;
    font-size: 39rem;
    background-position: 50% 50%;
    position: relative;
    text-align: center;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.background::before {
    content: '';
    background-size: cover;
    background-image: inherit;
    position: absolute;
    background-position: 50% 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}
</style>