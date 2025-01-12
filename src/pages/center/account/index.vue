<template>
    <el-card class="search-wrapper">
        <el-form :model="formDataHeader" label-width="80px" style="display: flex;">
            <el-form-item label="用户名" class="search-wrapper-item">
                <el-input v-model="formDataHeader" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="备注" class="search-wrapper-item">
                <el-input v-model="formDataHeader" placeholder="请输入密码"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-scrollbar max-height="800px">
            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
                <el-table-column v-for="item in tableDataList" :prop="item.key" :label="item.name" :width="item.width">
                    <template #default="scope">
                        <el-tooltip v-if="item.key == 'text'" class="box-item" effect="dark" placement="bottom">
                            <template #content>
                                <div style="width: 250px;">{{ scope.row[item.key] }}</div>
                            </template>
                            <div class="table-item">{{ scope.row[item.key] }}</div>
                        </el-tooltip>
                        <div class="table-item" v-else>{{ scope.row[item.key] }}</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template #default="scope">
                        <el-button type="primary" text bg size="small">
                            修改
                        </el-button>
                        <el-button type="danger" text bg size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 15, 30, 40]" :size="size" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleSizeChange" />
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { getCountData } from '@/api';
import { onMounted, reactive, ref } from 'vue';
import { readDataIndexedDB, addDataIndexedDB, deleteDataIndexedDB, fORData, readPageIndexedDB } from '@/indexDB';
let currentPage = ref(1);
let pageSize = ref(10);
let size = ref('small');
let total = ref(0);
let handleSizeChange = () => {
    readPageIndexedDB(currentPage.value, pageSize.value).then((res: any) => {
        console.log(res, "res");
        tableData.value = res;
    });
};
let formDataHeader = reactive({
    name: '',
    text: '',
});
let tableDataList = [
    {
        name: "花费",
        key: "cost",

    },
    {
        name: "记录时间",
        key: "createTime",
        width: "400px"
    },
    {
        name: "用户名",
        key: "name",

    },
    {
        name: "备注",
        key: "text",
        width: "500px"
    },
    {
        name: "类型",
        key: "type",
        width: "100px"
    }
]
let tableData = ref([])
onMounted(() => {
    readPageIndexedDB(1, 10).then((res: any) => {
        console.log(res, "res");
        tableData.value = res;
    });
    fORData().then((res: any) => {
        total.value = res;
    });
    // getCountData().then((res: any) => {
    //     let resArr = res.data.data;
    //     resArr.forEach((item: any) => {
    //         addDataIndexedDB(item);
    //     });
    // });
})

</script>
<style scoped lang="scss">
.search-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &-item {
        display: flex;
        align-items: center;
        margin: 0;
    }
}

.demo-pagination-block {
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.table-item {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 控制显示的行数*/
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>