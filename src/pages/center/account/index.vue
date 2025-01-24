<template>
    <div>
        <card class="search-wrapper">
            <el-form :model="formDataHeader" label-width="80px" style="display: flex;">
                <el-form-item label="用户名" class="search-wrapper-item">
                    <el-input placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="备注" class="search-wrapper-item">
                    <el-input placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="search-wrapper-item">
                    <el-button type="primary" size="middle" @click="handleDialog('新建', formDialogData)">
                        新建
                    </el-button>
                </el-form-item>
            </el-form>
        </card>
    </div>
    <div>
        <el-card style="opacity: 1;
    border-radius: 24px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);">
            <el-scrollbar max-height="600px" class="scrollbar-wrapper">
                <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
                    <el-table-column v-for="item in tableDataList" :prop="item.key" :label="item.name"
                        :width="item.width">
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
                            <el-button type="primary" text bg size="small" @click="handleDialog('修改', scope.row)">
                                修改
                            </el-button>
                            <el-button type="danger" text bg size="small" @click="deleteEvent(scope.row.id)">
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
    </div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
        <el-form :model="formDialogData" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="formDialogData.name" placeholder="请输入类型" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-cascader v-model="formDialogData.type" :options="options" style="width: 250px;" />
            </el-form-item>
            <el-form-item label="花费">
                <el-input v-model="formDialogData.cost" placeholder="请输入花费" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formDialogData.text" placeholder="请输入备注" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="submitEvent">确定</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog>
</template>
<script setup lang="ts">
import { getCountData } from '@/api';
import card from '@/components/card/index.vue';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { readDataIndexedDB, addDataIndexedDB, deleteDataIndexedDB, fORData, readPageIndexedDB, updateIndexedDB, deleteIndexedDB } from '@/indexDB';
import { ElMessage } from 'element-plus';
let currentPage = ref(1);
let pageSize = ref(10);
let size = ref('small');
let total = ref(0);
let dialogVisible = ref(false);
let dialogTitle = ref('')
let formDialogData = ref({
    cost: 0,
    createTime: '',
    id: 0,
    name: '',
    text: '',
    type: ''
}
)
let options = [
    {
        value: '餐饮',
        label: '餐饮'
    },
    {
        value: '交通',
        label: '交通'
    },
    {
        value: '购物',
        label: '购物'
    },
    {
        value: '其他',
        label: '其他'
    }
]
let formDialogRef = ref()
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
onMounted(async () => {
    readDataIndexedDB()
    console.log("eeee")
    readPageIndexedDB(1, 10).then((res: any) => {
        console.log(res, "res");
        tableData.value = res;
    });
    fORData().then((res: any) => {
        total.value = res;
    });
    // getCountData().then((res: any) => {
    // });
})
let handleDialog = (title: string, data: any) => {
    console.log(data, "data");
    formDialogData.value = data;
    dialogTitle.value = title;
    dialogVisible.value = true;
}
let submitEvent = () => {
    if (dialogTitle.value == '新建') {
        let data = {
            cost: formDialogData.value.cost,
            createTime: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
            name: formDialogData.value.name,
            text: formDialogData.value.text,
            type: formDialogData.value.type
        }
        addDataIndexedDB(toRaw(data)).then((res: any) => {
            console.log(res, "res");
            ElMessage.success('添加成功');
            handleSizeChange()
            dialogVisible.value = false;
        });

    } else if (dialogTitle.value == '修改') {
        updateIndexedDB(toRaw(formDialogData.value)).then((res: any) => {
            console.log(res, "res");
            ElMessage.success('修改成功');
            dialogTitle.value = '';
            dialogVisible.value = false;
            handleSizeChange()
        }).catch((err: any) => {
            ElMessage.error('修改失败');
        });
    }
}
let deleteEvent = (id: number) => {
    deleteIndexedDB(id).then((res: any) => {
        console.log(res, "res");
        ElMessage.success('删除成功');
        handleSizeChange()
    }).catch((err: any) => {
        ElMessage.error('删除失败');
    });
}
</script>
<style scoped lang="scss">
.scrollbar-wrapper {
    width: 100%;
}

.search-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px 10px;
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

.dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>