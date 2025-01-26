<template>
    <div class="loginMain">
        <div class="login-card">
            <div class="left">
                <div class="text">Hi!&nbsp;你好!
                    <br />欢迎进入数据管理平台
                </div>
                <img class="img" src="../../../public/login.png" alt="">
            </div>
            <div class="right">
                <div class="header">
                    欢迎回来
                </div>
                <div class="content">
                    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="demo-ruleForm"
                        status-icon>
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" class="input"><template #prefix>
                                    <el-icon>
                                        <User />
                                    </el-icon>
                                </template></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="loginForm.password" class="input"><template #prefix>
                                    <el-icon>
                                        <Lock />
                                    </el-icon>
                                </template></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="bottom">
                                <el-checkbox  label="记住密码" size="large" />
                                <div>忘记密码？</div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(loginFormRef)">
                                Submit
                            </el-button>
                            <el-button>Reset</el-button>
                        </el-form-item>
                    </el-form>
                </div>
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
            sessionStorage.setItem('token', loginForm.value.username)
            sessionStorage.setItem('username', loginForm.value.username)
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
    background-color: #F4F9FD;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.login-card {
    width: 90%;
    height: 90%;
    display: flex;
    background-color: white;
    border-radius: 24px;
    box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);

    .left {
        flex: 1;
        background-color: #3F8CFF;
        border-radius: 24px;
        box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);

        .text {
            position: relative;
            left: 119px;
            top: 154px;
            width: 400px;
            height: 56px;
            opacity: 1;
            /** 文本1 */
            font-size: 40px;
            font-weight: 700;
            letter-spacing: 0px;
            line-height: 56px;
            color: rgba(255, 255, 255, 1);
            text-align: left;
            vertical-align: middle;
        }

        .img {
            position: relative;
            left: 94px;
            top: 250px;
            width: 500px;
            height: 373px;
            opacity: 1;
        }
    }

    .right {
        flex: 1;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 24px;
        box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);

        .header {
            left: 1017px;
            top: 222px;
            width: 88px;
            height: 26px;
            opacity: 1;
            /** 文本1 */
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0px;
            line-height: 25.78px;
            color: rgba(10, 22, 41, 1);
            text-align: center;
            vertical-align: top;
        }

        .content {

            padding: 50px 50px 50px 50px;

            .input {
                width: 403px;
                height: 50px;
                opacity: 1;
                border-radius: 14px;
                font-size: 18px;
                background: rgba(255, 255, 255, 1);

                border: 1px solid rgba(216, 224, 240, 1);

                box-shadow: 0px 1px 2px rgba(184, 200, 224, 0.22);
            }
            .bottom {
                display: flex;justify-content: space-between;width: 100%;
                font-size: 14px;
font-weight: 400;
letter-spacing: 0px;
color: rgba(125, 133, 146, 1);
text-align: left;
vertical-align: top;
            }
        }
    }
}
</style>