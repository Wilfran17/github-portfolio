const audioElement = document.querySelector("audio");

const playButton = document.querySelector("#player-play-btn");
const playIcon = document.querySelector("#player-icon-play");
const pauseIcon = document.querySelector("#player-icon-pause");
const progress = document.querySelector("#player-progress");
const progressFilled = document.querySelector("#player-progress-filled");
const playerCurrentTime = document.querySelector("#player-time-current");
const playerDuration = document.querySelector("#player-time-duration");
const playlist = document.querySelector("#playlist");

const songOne = document.querySelector(".song-1");
const songTwo = document.querySelector(".song-2");
const songThree = document.querySelector(".song-3");
const songFour = document.querySelector(".song-4");
const songFive = document.querySelector(".song-5");
const songSix = document.querySelector(".song-6");

const appSongs = [
"appSongs/Love Through Her  The Weeknd.mp3",
"appSongs/Im Good- The Weeknd.mp3",
"appSongs/The Weeknd - I Wanna Feel You (Unreleased).mp3",
"appSongs/The Weeknd - Trust Issues (Remix).mp3",
"appSongs/The Weeknd - Twenty Eight.mp3",
"appSongs/Wish You Well - Brent Faiyaz.mp3",
]

audioElement.src = appSongs[0];

window.addEventListener("load", () => {

//player control
    setTimes();

    audioElement.addEventListener("timeupdate", () => { // dette vil sjekke om det er oppdatering i adio hver gang det er endring
        setTimes();
        progressUpdate();
    });

    audioElement.addEventListener("ended", () => {
        playButton.dataset.playing = "false"; // dette er en string
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        progressFilled.style.flexBasis = "0%";
        audioElement.currentTime = 0;
        audioElement.duration = audioElement.duration;

        for (const song of appSongs) {
            if (audioElement.getAttribute("src") === song) {
                const currentSong = appSongs.indexOf(song);
                audioElement.src = appSongs[currentSong + 1];
                playSong(audioElement);
                break;
            }
        }
    });

    playButton.addEventListener("click", () => {

        if (playButton.dataset.playing === "false") {
            
            playSong(audioElement);
           
        } else if (playButton.dataset.playing === "true") {
            
            pauseSong(audioElement);

        }

    });

    function playSong(audio) {
        audio.play();

        playButton.dataset.playing = "true";
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    }

    function pauseSong(audio) {
        audio.pause();

        playButton.dataset.playing = "false";
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }

    

    function setTimes() { // dette er funksjon som viser tiden 
        const newCurrentTime = new Date(audioElement.currentTime * 1000);
        const newDuration = new Date(audioElement.duration * 1000);

        playerCurrentTime.textContent = newCurrentTime.getMinutes() + ':' + newCurrentTime.getSeconds();
        playerDuration.textContent = newDuration.getMinutes() + ':' + newDuration.getSeconds();

    }

    function progressUpdate() { // dette viser hvilke prosent sangen er på. dette vil vise hver gang sangen oppdaterer seg. dette gjør spnn at tidslinja funker
        const percent = (audioElement.currentTime / audioElement.duration) * 100; // vanlig prosent reging 
        progressFilled.style.flexBasis = `${percent}%`;
    }

    function scrub (event) { // denne funksjonen gjør at vis jeg trykker et sted på musikktidlinja så vil sangem hoppe til det tidspunktet
        const scrubTime = (event.offsetX / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
    }

    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mouseup", () => (mousedown = false));

    //playerlist

    songOne.addEventListener("dblclick", () => {
        audioElement.src = appSongs[0];
        playSong(audioElement);
    });

    songTwo.addEventListener("dblclick", () => {
        audioElement.src = appSongs[1];
        playSong(audioElement);
    });

    songThree.addEventListener("dblclick", () => {
        audioElement.src = appSongs[2];
        playSong(audioElement);
    });

    songFour.addEventListener("dblclick", () => {
        audioElement.src = appSongs[3];
        playSong(audioElement);
    });

    songFive.addEventListener("dblclick", () => {
        audioElement.src = appSongs[4];
        playSong(audioElement);
    });

    songSix.addEventListener("dblclick", () => {
        audioElement.src = appSongs[5];
        playSong(audioElement);
    });

    console.log(songOne)
})


