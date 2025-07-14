// Handle dropdown menu toggle
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});

// Search artist function
let accessToken = 'Ditt_Gyldige_Access_Token'; // Sett ditt accessToken her

async function searchArtist() {
  const name = document.getElementById('artistInput').value;
  if (!name) return;

  try {
    const response = await fetch(`http://localhost:3000/artist/${name}`);
    const artist = await response.json();
    
    if (artist && artist.name) {
      // Update artist info in the left section
      const imageUrl = artist.images[0]?.url || 'https://example.com/default_image.jpg'; // Use a default image if none found
      document.getElementById('artist-info').innerHTML = `
          <h3 class="text-lg arial">${artist.name}</h3>
          <img src="${imageUrl}" class="w-32 h-32 rounded shadow" alt="${artist.name}" />
          <p class="text-gray-300">Sjangere: ${artist.genres.join(', ') || 'Ingen data'}</p>
      `;
      
      // Update stats in the right section
      document.getElementById('artist-stats').innerHTML = `
          <p>Følgere: ${artist.followers.total.toLocaleString()}</p>
          <p>Popularitet: ${artist.popularity} / 100</p>
      `;

      // Fetch albums
      const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single&limit=6`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const albumsData = await albumsResponse.json();
      const albums = albumsData.items;
      const albumsContainer = document.getElementById('albums');
      albumsContainer.innerHTML = '';
      if (albums.length > 0) {
        albums.forEach(album => {
            albumsContainer.innerHTML += `
                <div class="bg-gray-800 rounded-lg p-2">
                    <img src="${album.images[0]?.url}" class="w-full h-48 object-cover rounded" alt="${album.name}" />
                    <h4 class="text-sm text-center mt-2">${album.name}</h4>
                    <p class="text-xs text-center text-gray-400">${album.release_date}</p>
                </div>
            `;
        });
      } else {
        albumsContainer.innerHTML = `<p>Ingen album funnet.</p>`;
      }

      // Fetch top tracks (songs)
      const songsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const songsData = await songsResponse.json();
      const songs = songsData.tracks;
      const songsContainer = document.getElementById('songs');
      songsContainer.innerHTML = '';
      if (songs.length > 0) {
        songs.forEach(song => {
            songsContainer.innerHTML += `
                <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                    <span class="text-sm">${song.name}</span>
                    <a href="${song.external_urls.spotify}" target="_blank" class="text-green-500 text-xs">Lyssn</a>
                </div>
            `;
        });
      } else {
        songsContainer.innerHTML = `<p>Ingen sanger funnet.</p>`;
      }

    } else {
      alert('Artist not found.');
    }
  } catch (error) {
    console.error('Error fetching artist data:', error);
    alert('Error fetching artist data. Please try again later.');
  }

  let accessToken = 'Ditt_Gyldige_Access_Token'; // Sett ditt accessToken her

// Funksjon for å hente top artister og vise dem sammen med albumene deres
async function getTopArtistsAndAlbums() {
    try {
        // Hent top artister
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=5`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        const topArtists = data.items;
        const topArtistsContainer = document.getElementById('top-artists');
        topArtistsContainer.innerHTML = '';

        // Loop gjennom artistene og hent deres album
        for (const artist of topArtists) {
            // Legg til artist info (bilde og navn)
            const artistElement = document.createElement('div');
            artistElement.classList.add('bg-gray-800', 'rounded-lg', 'p-4', 'mb-4');
            artistElement.innerHTML = `
                <div class="flex items-center">
                    <img src="${artist.images[0]?.url}" class="w-16 h-16 rounded-full mr-4" alt="${artist.name}" />
                    <div>
                        <h4 class="text-lg font-bold text-white">${artist.name}</h4>
                        <p class="text-sm text-gray-400">${artist.genres.join(', ') || 'Ingen sjangere'}</p>
                    </div>
                </div>
            `;
            topArtistsContainer.appendChild(artistElement);

            // Hent albumene til denne artisten
            const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single&limit=3`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const albumsData = await albumsResponse.json();
            const albums = albumsData.items;

            // Lag en seksjon for albumene til artisten
            const albumsContainer = document.createElement('div');
            albums.forEach(album => {
                albumsContainer.innerHTML += `
                    <div class="bg-gray-700 rounded-lg p-2 mb-2">
                        <img src="${album.images[0]?.url}" class="w-full h-48 object-cover rounded mb-2" alt="${album.name}" />
                        <h5 class="text-sm text-center text-white">${album.name}</h5>
                        <p class="text-xs text-center text-gray-400">${album.release_date}</p>
                    </div>
                `;
            });
            artistElement.appendChild(albumsContainer);
        }
    } catch (error) {
        console.error('Error fetching top artists and albums:', error);
    }
}

// Kall funksjonen når siden er lastet
document.addEventListener('DOMContentLoaded', getTopArtistsAndAlbums);

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



}

