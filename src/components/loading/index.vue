<template>
<div style="width: 100%;justify-content: center;align-items: center;display: flex;">
    <div class="loading">
    <div v-for="item in 36" class="dot">
    </div>
    </div>
</div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
$ballSize: 10px;
$containerSize: 150px;
$animationDuration: 3s;
.loading {
    width: $containerSize;
    height: $containerSize;
    margin-top: 50px auto;
    position:relative;
    border-radius: 50%;
    .dot{
        position: absolute;
        left: 50%;
        top: 50%;
        width: $ballSize;
        height: $ballSize;
        margin-left: -$ballSize/2;
        margin-top: -$ballSize/2;
        perspective: 100px;
        transform-style: preserve-3d;
        &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: rgb(14, 128, 234);
            top: 100%;
            animation:moveWhite $animationDuration  infinite;
        }
        &::before{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: black;
            top: -100%;
            animation:moveBlack $animationDuration  infinite;
        }
    }
}
@for $i from 1 through 36 {
    .dot:nth-child(#{$i}){
    transform:rotate((15deg)*$i) translateY(-$containerSize/2);
    &::after,&::before{
        animation-delay:  calc(-#{$animationDuration} * #{$i} / 36*6);
    }
}
}
@keyframes moveBlack{
    0%{
        animation-timing-function: ease-in;
    }
    25%{
        transform: translate3d(0,100%, $ballSize);
        animation-timing-function: ease-out;
    }
    50%{
        transform: translate3d(0,200%, 0);
        animation-timing-function: ease-in;
    }
    75%{
        transform: translate3d(0,100%, $ballSize);
        animation-timing-function: ease-out;
    }

}
@keyframes moveWhite{
    0%{
        animation-timing-function: ease-in;
    }
    25%{
        transform: translate3d(0,-100%, $ballSize);
        animation-timing-function: ease-out;
    }
    50%{
        transform: translate3d(0,-200%, 0);
        animation-timing-function: ease-in;
    }
    75%{
        transform: translate3d(0,-100%, $ballSize);
        animation-timing-function: ease-out;
    }

}
</style>