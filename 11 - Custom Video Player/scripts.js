/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Functions to handle clicks
function togglePlay() {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
};

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleSliderUpdate(e) {
    video[this.name] = this.value;

    //Attempt at getting slider to work while dragging
    // const setting = (this.value / e.offsetX) * 100
    // console.log(setting)
    // video[this.name] = setting;
};

function handleProgess() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

//Event listeners hooked to functions
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgess);
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    if(mousedown) {
        scrub(e)
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

ranges.forEach(range => range.addEventListener('click', handleSliderUpdate));

// Attempt at getting slider to work while dragging
// let mousedownSlider = false
// ranges.forEach(rsange => range.addEventListener('mousemove', (e) => {
//     if(mousedownSlider) {
//         handleSliderUpdate(e);
//     }
// }));
// ranges.forEach(range => range.addEventListener('mousedown', () => mousedownSlider = true));
// ranges.forEach(range => range.addEventListener('mouseup', () => mousedownSlider = false));