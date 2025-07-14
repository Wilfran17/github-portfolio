const audioElement = document.querySelector("audio");

const playButton = document.querySelector("#player-play-btn");
const playIcon = document.querySelector("#player-icon-play");
const pauseIcon = document.querySelector("#player-icon-pause");
const progress = document.querySelector("#player-progress");
const progressFilled = document.querySelector("#player-progress-filled");
const playerCurrentTime = document.querySelector("#player-time-current");
const playerDuration = document.querySelector("#player-time-duration");
const searchInput = document.querySelector("#search-input");

const nowPlayingTitle = document.querySelector("#now-playing-title");
const nowPlayingArtist = document.querySelector("#now-playing-artist");

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");
const repeatBtn = document.querySelector("#repeat-btn");
const volumeSlider = document.querySelector("#volume-slider");

const songOne = document.querySelector(".song-1");
const songTwo = document.querySelector(".song-2");
const songThree = document.querySelector(".song-3");
const songFour = document.querySelector(".song-4");
const songFive = document.querySelector(".song-5");
const songSix = document.querySelector(".song-6");

let mousedown = false;
let isShuffle = false;
let isRepeat = false;
let currentIndex = 0;

const appSongs = [
    { title: "Love Through Her", artist: "The Weeknd", file: "appSongs/Love Through Her  The Weeknd.mp3" },
    { title: "Im Good", artist: "The Weeknd", file: "appSongs/Im Good- The Weeknd.mp3" },
    { title: "I Wanna Feel You", artist: "The Weeknd", file: "appSongs/The Weeknd - I Wanna Feel You (Unreleased).mp3" },
    { title: "Trust Issues", artist: "The Weeknd", file: "appSongs/The Weeknd - Trust Issues (Remix).mp3" },
    { title: "Twenty Eight", artist: "The Weeknd", file: "appSongs/The Weeknd - Twenty Eight.mp3" },
    { title: "Wish You Well", artist: "Brent Faiyaz", file: "appSongs/Wish You Well - Brent Faiyaz.mp3" }
];

audioElement.src = appSongs[currentIndex].file;

window.addEventListener("load", () => {
    updateNowPlaying();

    audioElement.addEventListener("loadedmetadata", setTimes);
    audioElement.addEventListener("timeupdate", () => {
        setTimes();
        updateProgress();
    });

    audioElement.addEventListener("ended", () => {
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        progressFilled.style.flexBasis = "0%";
        audioElement.currentTime = 0;

        if (isRepeat) {
            playSong(audioElement);
        } else {
            playNext();
        }
    });

    playButton.addEventListener("click", () => {
        if (playButton.dataset.playing === "false") {
            playSong(audioElement);
        } else {
            pauseSong(audioElement);
        }
    });

    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => mousedown = true);
    progress.addEventListener("mouseup", () => mousedown = false);

    volumeSlider.addEventListener("input", (e) => {
        audioElement.volume = e.target.value;
    });

    prevBtn.addEventListener("click", playPrevious);
    nextBtn.addEventListener("click", playNext);

    shuffleBtn.addEventListener("click", () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle("text-blue-700", isShuffle);
    });

    repeatBtn.addEventListener("click", () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle("text-blue-700", isRepeat);
    });

    // Playlist song clicks
    songOne.addEventListener("click", () => playFromPlaylist(0));
    songTwo.addEventListener("click", () => playFromPlaylist(1));
    songThree.addEventListener("click", () => playFromPlaylist(2));
    songFour.addEventListener("click", () => playFromPlaylist(3));
    songFive.addEventListener("click", () => playFromPlaylist(4));
    songSix.addEventListener("click", () => playFromPlaylist(5));
});

function playFromPlaylist(index) {
    currentIndex = index;
    audioElement.src = appSongs[currentIndex].file;
    updateNowPlaying();
    playSong(audioElement);
}

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

function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setTimes() {
    playerCurrentTime.textContent = formatTime(audioElement.currentTime);
    playerDuration.textContent = formatTime(audioElement.duration);
}

function updateProgress() {
    const percent = (audioElement.currentTime / audioElement.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audioElement.duration;
    audioElement.currentTime = scrubTime;
}

function updateNowPlaying() {
    nowPlayingTitle.textContent = appSongs[currentIndex].title;
    nowPlayingArtist.textContent = appSongs[currentIndex].artist;
    highlightCurrentSong();
}

// Highlight currently playing song
function highlightCurrentSong() {
    const allSongs = document.querySelectorAll("#playlist > div");
    allSongs.forEach((el, idx) => {
        if (idx === currentIndex) {
            el.classList.add("bg-blue-700", "shadow-md", );
        } else {
            el.classList.remove("bg-blue-700", "shadow-md", );
        }
    });
}

function playNext() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * appSongs.length);
    } else {
        currentIndex = (currentIndex + 1) % appSongs.length;
    }
    audioElement.src = appSongs[currentIndex].file;
    updateNowPlaying();
    playSong(audioElement);
}

function playPrevious() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * appSongs.length);
    } else {
        currentIndex = (currentIndex - 1 + appSongs.length) % appSongs.length;
    }
    audioElement.src = appSongs[currentIndex].file;
    updateNowPlaying();
    playSong(audioElement);
}

// Funksjon for å filtrere og oppdatere spillelisten
searchInput.addEventListener("input", filterPlaylist);

function filterPlaylist() {
    const query = searchInput.value.toLowerCase(); // Hent brukerens søkestreng og gjør den liten
    const allSongs = document.querySelectorAll("#playlist > div"); // Få tak i alle sanger i spillelisten

    allSongs.forEach((songDiv, index) => {
        const songTitle = appSongs[index].title.toLowerCase(); // Sangen sin tittel i liten bokstav
        const songArtist = appSongs[index].artist.toLowerCase(); // Artistens navn i liten bokstav
        
        // Sjekk om tittelen eller artisten inneholder søkestrengen
        if (songTitle.includes(query) || songArtist.includes(query)) {
            songDiv.classList.remove("hidden"); // Vis sangen
        } else {
            songDiv.classList.add("hidden"); // Skjul sangen hvis den ikke matcher
        }
    });
}