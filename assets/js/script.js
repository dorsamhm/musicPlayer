let _main = document.getElementsByTagName('main')[0]
let bus = document.getElementsByClassName('playlist')[0]
let busTop = bus.computedStyleMap().get('top').value
let busLeft = bus.computedStyleMap().get('left').value
let h = bus.clientWidth

let _input = document.querySelectorAll('input')
// console.log(_input);
let playPauseBtn = document.querySelectorAll('.pause>i')
// console.log(playPauseBtn);
let song = document.querySelectorAll('video')
// console.log(song);
let back = document.querySelectorAll('.back')
// console.log(back);
let forward = document.querySelectorAll('.forward')
// console.log(forward);
let repeat = document.querySelectorAll('.repeat>i')
// console.log(repeat);
for(let i = 0; i<repeat.length; i++){
    repeat[i].setAttribute('data-repeat', 'noRepeat')
}

repeat.forEach(function(val, i){
    val.addEventListener('click', function(){
        let repeatStatus =  val.getAttribute('data-repeat')
        for(let j = 0; j<repeat.length; j++){
            repeat[j].setAttribute('data-repeat', 'noRepeat')
        }
        if(repeatStatus == 'noRepeat'){
            song[i].setAttribute('loop', 'true')
            val.setAttribute('data-repeat', 'repeat')
            val.classList.remove('bi-repeat')
            val.classList.add('bi-repeat-1')
            val.style.color = 'white'
        }
        else{
            song[i].removeAttribute('loop')
            val.setAttribute('data-repeat', 'noRepeat')
            val.style.color = 'grey'
            val.classList.add('bi-repeat')
            val.classList.remove('bi-repeat-1')
        }
    })
})

back.forEach(function(val, i){
    val.addEventListener('click', ()=>{
        let j = 0
        for(let i =0; i<song.length; i++){
            song[i].setAttribute('data-play', 'notPlaying')
            song[i].currentTime = 0
            song[i].pause()
        }
        if(i == 0){
            j = back.length-1
        }
        else{
            j = i-1
        }
        translate(j)
        song[j].play()
        playPauseBtn[j].classList.add('bi-pause-fill')
        playPauseBtn[j].classList.remove('bi-play-fill')
        song[j].setAttribute('data-play', 'playing')
        check(song[j], j)
        playPauseBtn[j].setAttribute('data-status', 'pause')
    })
})
forward.forEach(function(val, i){
    val.addEventListener('click', ()=>{
        let j = 0
        for(let i =0; i<song.length; i++){
            song[i].setAttribute('data-play', 'notPlaying')
            song[i].currentTime = 0
            song[i].pause()
        }
        if(i == back.length-1){
            j = 0
        }
        else{
            j = i+1
        }
        translate(j)
        song[j].play()
        playPauseBtn[j].classList.add('bi-pause-fill')
        playPauseBtn[j].classList.remove('bi-play-fill')
        song[j].setAttribute('data-play', 'playing')
        check(song[j], j)
        playPauseBtn[j].setAttribute('data-status', 'pause')
    })
})

function translate(index){
    bus.style.transform= 'translateX(-'+(index*(h/4))+'px)'
}

for(let i =0; i<song.length; i++){
    song[i].setAttribute('data-play', 'notPlaying')
    song[i].pause()
}

song.forEach(function(val, index){
    val.onloadedmetadata = ()=>{
        _input[index].max = val.duration
        _input[index].value = val.currentTime
    }
})

for(let i = 0; i<playPauseBtn.length; i++){
    playPauseBtn[i].setAttribute('data-status', 'play')
}

playPauseBtn.forEach(function(val, i){
    val.addEventListener('click', function(){
        let status =  val.getAttribute('data-status')
        for(let i = 0; i<playPauseBtn.length; i++){
            playPauseBtn[i].setAttribute('data-status', 'play')
        }
        if(status == 'pause'){
            song[i].pause()
            val.classList.remove('bi-pause-fill')
            val.classList.add('bi-play-fill')
            song[i].setAttribute('data-play', 'notPlaying')
            check(song[i], i)
            val.setAttribute('data-status', 'play')
        }
        else{
            // click on play button
            for(let j =0; j<song.length; j++){
                song[j].setAttribute('data-play', 'notPlaying')
                song[j].pause()
            }
            song[i].play()
            val.classList.add('bi-pause-fill')
            val.classList.remove('bi-play-fill')
            song[i].setAttribute('data-play', 'playing')
            check(song[i], i)
            val.setAttribute('data-status', 'pause')
        }
    })
})

_input.forEach(function(val, i){
    val.addEventListener('input', ()=>{
        for(let j =0; j<song.length; j++){
            song[j].setAttribute('data-play', 'notPlaying')
            song[j].pause()
        }
        song[i].currentTime = val.value
        song[i].play()
        song[i].setAttribute('data-play', 'playing')
        check(song[i], i)
        // add pause
        playPauseBtn[i].classList.add('bi-pause-fill')
        playPauseBtn[i].classList.remove('bi-play-fill') 
        playPauseBtn[i].setAttribute('data-status', 'pause')   
    })
})

function check(val, i){
    let playStatus =  val.getAttribute('data-play')
    if(playStatus == 'playing'){
        setInterval(()=>{
            _input[i].value = val.currentTime
        }, 500)
        // console.log(_input[i].value);
    }
}