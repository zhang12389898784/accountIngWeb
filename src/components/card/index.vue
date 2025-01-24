<template>
    <div class="card">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.card {
    width: 100%;
    height: 100%;
    opacity: 1;
    border-radius: 24px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);
}
</style>