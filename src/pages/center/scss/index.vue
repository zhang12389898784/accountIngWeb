<template>
    <div class="container">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="layer4"></div>
    </div>
</template>
<script lang="ts" setup>
class myPromise {
    result: any
    state = 'pending'
    onfulFilled: Array<any> = []
    onrejected: Array<any> = []
    constructor(executor: any) {
        console.log('myPromise')
        this.state = 'pending'
        const resolve = (result:any) => {
            setTimeout(() => {
                this.result = result
                this.state = 'fulfilled'
                this.run()
            })
        }
        const reject = (error:any) => {
            setTimeout(() => {
                this.result = error
                this.state = 'rejected'
                this.run()
            })
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled:(result:any)=>any, onRejected:(result:any)=>any) {
        return new myPromise((resolve:(result:any)=>any, reject:(result:any)=>any) => {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { }
            onRejected = typeof onRejected === 'function' ? onRejected : () => { }
            this.onfulFilled.push(()=>{
                let x=onFulfilled(this.result)
                resolve(x)
            })
            this.onrejected.push(()=>{
                let x=onRejected(this.result)
                reject(x)
            })
            this.run()
        })
    }
    lll(){}
    run() {
        if (this.state === 'pending') {
            return
        } else if (this.state === 'fulfilled') {
            this.onfulFilled.forEach(fn => {
                fn(this.result)
            })
        } else if (this.state === 'rejected') {
            this.onrejected.forEach(fn => {
                fn(this.result)
            })
        }
    }
}
new myPromise((resolve:(result:any)=>any, reject:(result:any)=>any) => {
    setTimeout(() => {
        console.log('开始')
        resolve('一')
    }, 1000);
}).then((result) => {
    console.log(result)
    return 5454
}, (result) => {
    console.log(result)
}).then((result) => {
    console.log(result)
},(result) => {
    console.log(result)
})
console.log(111)
</script>
<style lang="scss" scoped>
$size: 5px;
$count: 500;
$duration: 15s;

@function createShadow($n) {
    $shadow: '#{random(2000)}px #{random(2000)}px rgba(255, 255, 255)';

    @for $i from 2 through $n {
        $shadow: '#{$shadow}, #{random(2000)}px #{random(2000)}px rgba(255, 255, 255)';
    }

    @debug $shadow;
    @return unquote($shadow);
}

@for $i from 1 through 5 {
    $size: $size - 1px;
    $count: floor(calc($count*1.5));
    $duration: $duration + 1s;

    .layer#{$i} {
        width: $size;
        height: $size;
        position: relative;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: createShadow(500);
        animation: move $duration linear infinite;
        top: 0;
        left: 0;

        &::before {
            content: '';
            top: 100vh;
            left: 0;
            width: $size;
            height: $size;
            position: relative;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: createShadow(500);
            animation: move $duration linear infinite;
        }
    }
}


.container {
    width: 100%;
    height: 100%;
    background: #000000;
    box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.2);
}

@keyframes move {
    0% {
        transform: translateY(0px);
    }

    100% {
        transform: translateY(-1000px);
    }
}
</style>