<template>
    <el-sub-menu :title="title" v-if="length > 1">
        <template #title>
            <Icon :icon="items.meta?.Icon" v-if="items.meta?.Icon" style="margin-right: 10px;"/>
            <span class="title">{{ items.meta.title }}</span>
        </template>
        <Item v-for="
      item in items.children" :item="item">
        </Item>
    </el-sub-menu>
    <el-menu-item v-else-if="length == 1" :index="items.children[0].meta.title" @click="menuNext(items.children[0].name)">
        <Icon :icon="items.children[0].meta?.Icon" v-if="items.children[0].meta?.Icon"  style="margin-right: 10px;"/>
        <template v-if="items.children[0].meta.title" #title>
        <span class="title">{{ items.children[0].meta.title }}</span>
        </template>
    </el-menu-item>
    <el-menu-item v-else :index="title" @click="menuNext(items.name)">
        <template  #title>
        <span class="title">{{ items.meta.title }}</span>
        </template>
    </el-menu-item>
</template>
<script setup lang="ts">
import { router } from '@/router';
import { computed } from 'vue';

const props = defineProps(["itemKey", "item"])
let title = computed(() => {
    return props.item.meta?.title
})
let items = computed(() => {
    return props.item
})
let length = computed(() => {
    return props.item.children?.length ?? 0
})
const menuNext = (name:string) => {
    router.push({
        name: name
    })
}
</script>
<style lang="scss" scoped>
.title{
    font-size: 16px;
font-weight: 400;
letter-spacing: 0px;
line-height: 24px;
color: rgba(113, 128, 150, 1);
text-align: left;
vertical-align: middle;
}
</style>