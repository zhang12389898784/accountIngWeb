<template>
    <div class="loginMain">
        <div class="login-card">
            <div class="header">
            </div>
            <div class="content">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="demo-ruleForm"
                    status-icon>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username"><template #prefix>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password"><template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(loginFormRef)">
                            Submit
                        </el-button>
                        <el-button >Reset</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { router } from '@/router';
let loginFormRef = ref();
let loginForm = ref({
    username: 'admin',
    password: '123456'
});
let loginFormRules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 10, message: '长度在 6 到10' }
    ]
})
const submitForm = (formEl: any) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
        if (valid) {
            router.push('/')
        } else {
            console.log('error submit!!');
            return false;
        }
    });
};
</script>
<style lang="scss" scoped>
.loginMain {
    width: 100vw;
    height: 100vh;
    background-color: #F2F3F5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: white;

    .content {
        padding: 50px 50px 50px 50px;
    }
}
</style>