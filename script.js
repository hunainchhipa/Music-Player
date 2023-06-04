// Initialize the Variables

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let masterSongName = document.querySelector("#masterSongName");
let songItems = Array.from(document.querySelectorAll(".songItem"));

let songs = [
  {
    songName: "Believer",
    filePath: "songs/1.mp3",
    coverPath: "cover/1.jpeg",
  },
  {
    songName: "Señorita",
    filePath: "songs/2.mp3",
    coverPath: "cover/2.jpeg",
  },
  {
    songName: "Smack That",
    filePath: "songs/3.mp3",
    coverPath: "cover/3.jpeg",
  },
  {
    songName: "Psycho",
    filePath: "songs/4.mp3",
    coverPath: "cover/4.jpeg",
  },
  {
    songName: "Till I Collaps",
    filePath: "songs/5.mp3",
    coverPath: "cover/5.jpeg",
  },
  {
    songName: "Dusk Till Dawn",
    filePath: "songs/6.mp3",
    coverPath: "cover/6.jpeg",
  },
  {
    songName: "Vibes",
    filePath: "songs/7.mp3",
    coverPath: "cover/7.jpeg",
  },
  {
    songName: "Stay",
    filePath: "songs/8.mp3",
    coverPath: "cover/8.jpeg",
  },
  {
    songName: "Let It Go",
    filePath: "songs/9.mp3",
    coverPath: "cover/9.jpeg",
  },
  {
    songName: "Say My Name",
    filePath: "songs/10.mp3",
    coverPath: "cover/10.jpeg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

const handlePlayPause = () => {
  let elSongItem = document.querySelector(
    `.songItem:nth-child(${songIndex + 1}) .songItemPlay`
  );

  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    elSongItem.classList.remove("fa-circle-play");
    elSongItem.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    gif.style.opacity = 0;
    elSongItem.classList.add("fa-circle-play");
    elSongItem.classList.remove("fa-circle-pause");
  }
};

// Handle play/pause clicks
masterPlay.addEventListener("click", () => {
  handlePlayPause();
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.querySelectorAll(".songItemPlay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};
Array.from(document.querySelectorAll(".songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    const isSameSong = songIndex === parseInt(e.target.id);

    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

    if (!isSameSong) {
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
    }

    handlePlayPause();
    //===
    // masterPlay.classList.remove("fa-circle-play");
    // masterPlay.classList.add("fa-circle-pause");
    // gif.style.opacity = 1;
  });
});

document.querySelector("#next").addEventListener("click", () => {
  let elSongItem = document.querySelector(
    `.songItem:nth-child(${songIndex + 1}) .songItemPlay`
  );
  elSongItem.classList.add("fa-circle-play");
  elSongItem.classList.remove("fa-circle-pause");

  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  elSongItem = document.querySelector(
    `.songItem:nth-child(${songIndex + 1}) .songItemPlay`
  );
  elSongItem.classList.remove("fa-circle-play");
  elSongItem.classList.add("fa-circle-pause");
});

document.querySelector("#previous").addEventListener("click", () => {
  let elSongItem = document.querySelector(
    `.songItem:nth-child(${songIndex + 1}) .songItemPlay`
  );
  elSongItem.classList.add("fa-circle-play");
  elSongItem.classList.remove("fa-circle-pause");

  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  elSongItem = document.querySelector(
    `.songItem:nth-child(${songIndex + 1}) .songItemPlay`
  );
  elSongItem.classList.remove("fa-circle-play");
  elSongItem.classList.add("fa-circle-pause");
});

function timeupdate() {
  let x = document.querySelectorAll(".timestamp").duration;
}

// Play Pause using Space key
document.addEventListener("keydown", function (e) {
  // console.log(e);

  if (e.code.toLowerCase() === "space") {
    handlePlayPause();
  }
});

// Stop Scrolling by Space key
window.onkeydown = function (e) {
  return !(e.keyCode == 32);
};
