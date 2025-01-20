<template>
    <div class="body">
        <div class="audio">
        <audio  id="player-container" controls :src="music"></audio>
    </div>
    <div class="container">
        <ul class="lrc-list">
            
        </ul>
    </div>
    </div>
    <!-- 引入JavaScript文件 -->
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';
import music from '../assets/music.ogg'
import { nextTick } from 'vue';
import { data1 } from '../js/data.js'
localStorage.setItem('music', music)
let channel=new BroadcastChannel('music')
channel.onmessage = (e) => {
    console.log(e.data)
    if (e.data === 'close') {
        window.close()
    }else{
        document.getElementById('player-container').play()
    }
}
onUnmounted(()=>{
   localStorage.removeItem('music')
})
onMounted(() => {
    
    let doms = {
        aodio: document.querySelector('audio'),
        ul: document.querySelector('.container ul'),
        container: document.querySelector('.audio')
    }
    let dataArr = []
    let handleData = () => {
        let data2 = data1.split('\n')
        data2.forEach(item => {
            let parts = item.split(']')
            parts[0] = (Number(parts[0].slice(1, 3) * 60) + Number(parts[0].slice(4)))
            dataArr.push({
                time: parts[0],
                content: parts[1]
            })
        })
    }
    handleData()
    let fundIndex = () => {
        let currentTime = doms.aodio.currentTime
        for (let i = 0; i < dataArr.length; i++) {
            let item = dataArr[i]
            if (currentTime < item.time) {
                return i - 1
            }
        }
        return dataArr.length - 1
    }
    //创建li元素
    let createLi = () => {
        let frag = document.createDocumentFragment()
        for (let i = 0; i < dataArr.length; i++) {
            let li = document.createElement('li')
            li.textContent = dataArr[i].content
            frag.appendChild(li)
        }
        doms.ul.appendChild(frag)
        console.log(doms.ul)
    }
    createLi()
    //设置偏移量
    let containerHeight = doms.container.clientHeight
    let liHeight = doms.ul.children[0].clientHeight
    let maxOffset = doms.ul.clientHeight - containerHeight
    let currIndex = -1
    let setOffset = async () => {
        let index = fundIndex()

        if (currIndex === index) return
        currIndex = index
        let h1 = index * liHeight + liHeight / 2
        let offset = h1 - containerHeight / 2
        if (offset < 0) offset = 0
        if (offset > maxOffset) offset = maxOffset
        console.log(offset, maxOffset, containerHeight, doms.ul.clientHeight)
        doms.ul.style.transform = `translateY(-${offset}px)`
        let li = doms.ul.children[index]
        if (li) {
            console.log(li)
            let liActive = doms.ul.querySelector('.active')
            if (liActive) liActive.classList.remove('active')
            li.classList.add('active')
        }

    }
    setOffset()
    doms.aodio.addEventListener('timeupdate', () => {
        setOffset()
    })
})
</script>
<style lang="scss">

.body{
    background-color: #000;
    color:#666;
    text-align: center;
    height: 100%;
}
audio{
    width: 450px;
    margin: 30px auto;
}
.container{
    height: 420px;
    overflow: hidden;
}
.container ul{
    height: auto;
    transition: 0.5s;
}
.container li{
    line-height: 30px;
    transition: 0.5s;
}
.container li.active{
    color: #fff !important;
    transform: scale(1.2)!important;
}
</style>