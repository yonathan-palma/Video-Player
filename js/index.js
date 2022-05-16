"use strict";

const url = 'http://www.jplayer.org/video/webm/Incredibles_Teaser.webm';
const video = document.getElementById("video");
async function sincrona(url, video) {
    let response = await fetch(url);
    let data = await response;

    // .then((response) => response.json())
        // video.src = data.url;
        // debugger;
        setTimeout(durationVideo,1000); 
        console.log(data);
}

    

const video_container = document.getElementById("video_container");
const btnPlay = document.getElementById("play");
const btnVolume = document.getElementById("icon_volume");
const volume = document.querySelector(".bi-volume-up");
const mute = document.querySelector(".bi-volume-mute");
const volumeRange = document.getElementById("volumeRange");
const fullScreen = document.getElementById("fullScreen");
const progressBar = document.getElementById("progress_bar_video");
const progress_video = document.querySelector(".progress_video");
const speedSelect = document.getElementById("speedVideo");
let videoBarProgress;
let videoTimeBar;

video.addEventListener("click", playPause);
btnPlay.addEventListener("click", playPause);
btnVolume.addEventListener("click", volumeMute);
volumeRange.addEventListener("change", setVolume);
fullScreen.addEventListener("click", screenFull);
progress_video.addEventListener("click", serchCurrentTime);
window.addEventListener("keydown", keyEvent);

const videoProgress = ()=>{
    // progressBar.style.width = `${Math.floor((video.currentTime / video.duration) * 100)}%`;
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    if (video.ended) {
        let play = document.querySelector(".bi-play");
        let pause = document.querySelector(".bi-pause-fill");
        pause.classList.add("d-none");
        play.classList.remove("d-none"); 
        setTimeout(stopVideo, 500);
        
    }
}

const startVideo = ()=>{
    videoBarProgress = setInterval(videoProgress, 1000);
    videoTimeBar = setInterval(setTimeVideo, 1000);
}
const stopVideo = ()=>{
    clearInterval(videoBarProgress);
    clearInterval(videoTimeBar);
}
const durationVideo = ()=>{
    let duracion = video.duration
    let sec = Math.floor(video.duration % 60);
    let min = Math.floor(video.duration / 60);
    let hours = min / 60;
    // debugger;
    let duration_min = document.getElementById("duration_min");
    let duration_sec = document.getElementById("duration_sec");
    duration_min.textContent = min + ':';
    duration_sec.textContent = sec;
}
const setTimeVideo = ()=>{
    let setTime = video.currentTime
    let min = Math.floor(video.currentTime / 60);
    let sec = Math.floor(video.currentTime % 60);
    let hours = min / 60;
    let duration_min = document.getElementById("setTime_min");
    let duration_sec = document.getElementById("setTime_sec");
    duration_min.textContent = min + ':';
    duration_sec.textContent = sec;
}

const entryFullscreen = ()=>{
    if(video_container.requestFullscreen) {
        video_container.requestFullscreen();
    }else if(video_container.webkitRequestFullscreen) { /* Safari */
        video_container.webkitRequestFullscreen();
    }else if(video_container.msRequestFullscreen) { /* IE11 */
        video_container.msRequestFullscreen();
    }
}

const removeFullscreen = ()=>{
    if(document.exitFullscreen) {
        document.exitFullscreen();
    }else if(document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    }else if(document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function playPause(){
    let play = document.querySelector(".bi-play-fill");
    let pause = document.querySelector(".bi-pause-fill");
    if (video.paused) {
        video.play();
        startVideo();
        pause.classList.remove("d-none");
        play.classList.add("d-none");      
    }else{
        video.pause();
        stopVideo();
        pause.classList.add("d-none");
        play.classList.remove("d-none");
    }
}

function volumeMute(){
    if (!video.muted) {
        video.muted = true
        volume.classList.add("d-none");
        mute.classList.remove("d-none");
    }else{
        video.muted = false;
        volume.classList.remove("d-none");
        mute.classList.add("d-none");
    }

}  

function setVolume(){
    let vol = volumeRange.value / 100;
    video.volume = vol;
    if (video.volume == 0) {
        volume.classList.add("d-none");
        mute.classList.remove("d-none");
    }else{
        video.muted = false;
        volume.classList.remove("d-none");
        mute.classList.add("d-none");
    }
}

function screenFull(){
    let fullscreen = document.querySelector(".bi-fullscreen");
    let fullscreenExit = document.querySelector(".bi-fullscreen-exit");
    let media = document.getElementById("media_container");
    let controls = document.querySelector(".controls");
    if (fullscreenExit.classList.contains("d-none")) {
        fullscreen.classList.add("d-none");
        fullscreenExit.classList.remove("d-none");
        video.classList.add("video__fullscreen");
        controls.classList.add("control__fullscreen");
        media.classList.remove("col-lg-8");
        media.classList.add("col-lg-12");
        entryFullscreen();
        video.addEventListener("mousemove", ControlsHover);
    }else{
        fullscreen.classList.remove("d-none");
        fullscreenExit.classList.add("d-none");
        video.classList.remove("video__fullscreen");
        controls.classList.remove("control__fullscreen");
        media.classList.remove("col-lg-12");
        media.classList.add("col-lg-8");
        controls.style = 'visibility:visible';
        removeFullscreen();
    } 
}

function keyEvent(e){
    // console.log(e.target);
    // console.log(e);
    // console.log(e.keyCode);
    if (e.keyCode == 32) {
        e.preventDefault();
        playPause();
    }
    if (e.keyCode == 37) {
        video.currentTime = (video.currentTime - 5);
    }
    if (e.keyCode == 39) {
        video.currentTime = (video.currentTime + 5);
    }
    // else if(e.keyCode == 27){}  
}

video_container.addEventListener("fullscreenchange", ()=>{
    let fullscreen = document.querySelector(".bi-fullscreen");
    let fullscreenExit = document.querySelector(".bi-fullscreen-exit");
    let media = document.getElementById("media_container");
    let controls = document.querySelector(".controls");

    if (!document.fullscreenElement) { 
        fullscreen.classList.remove("d-none");
        fullscreenExit.classList.add("d-none");
        video.classList.remove("video__fullscreen");
        controls.classList.remove("control__fullscreen");
        media.classList.remove("col-lg-12");
        media.classList.add("col-lg-8");
        video.removeEventListener("mousemove", ControlsHover);
        // clearTimeout(controlsTime);
    }
    
})
speedSelect.addEventListener("change", ()=>{
    video.playbackRate = speedSelect.value;
})

function serchCurrentTime(e){
    
    let getCurrentTime = e.offsetX ;
    let porcentaje = Math.floor((getCurrentTime / progress_video.offsetWidth) * 100);
    video.currentTime = Math.floor((video.duration * porcentaje) / 100);
    setTimeVideo();
    videoProgress();
}

function ControlsHover (){
    let controlFullscreen = document.querySelector(".control__fullscreen");
    controlFullscreen.classList.add("animate");
    // document.querySelector(".animate").style = 'animation: barra 3s forwards';

    setTimeout(()=>{
        // controlFullscreen.style = 'animation-name: auto;';
        controlFullscreen.classList.remove("animate");
    },3000);
}

// setTimeout(durationVideo,1000);
sincrona(url, video);

// durationVideo();