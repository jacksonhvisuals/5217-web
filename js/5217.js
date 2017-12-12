/*
    5217 - Web
    Based on 5217 by Francisco Franco
    Developed by Jackson Hayes
*/
/*
  Variables
*/

var startTimeStamp;
var endTimeStamp;
var minutesAwayStamp;
var currentTimeStamp;
var placeHolderTime;
var currentCycle;

// A literal ARRAY of colors. Ha!
var workColors = ["#238aff", "#278cff", "#2c8fff", "#3091ff", "#3493ff", "#3996ff", "#3d98ff", "#419aff", "#469cff", "#4a9fff", "#4ea1ff", "#53a3ff", "#57a6ff", "#5ba8ff", "#60aaff", "#64adff", "#68afff", "#6db1ff", "#71b4ff", "#75b6ff", "#7ab8ff", "#7ebaff", "#82bdff", "#87bfff", "#8bc1ff", "#8fc4ff", "#94c6ff", "#98c8ff", "#9ccbff", "#a1cdff", "#a5cfff", "#a9d1ff", "#aed4ff", "#b2d6ff", "#b6d8ff", "#bbdbff", "#bfddff", "#c3dfff", "#c8e2ff", "#cce4ff", "#d0e6ff", "#d5e9ff", "#d9ebff", "#ddedff", "#e2efff", "#e6f2ff", "#eaf4ff", "#eff6ff", "#f3f9ff", "#f7fbff", "#fcfdff", "#ffffff"];

var breakMessages = ["have a cup of tea!", "put your feet up!", "take a deep breath!", "ponder infinity…", "enjoy the moment!", "order a pizza?", "say hi to a stranger!", "take a walk around!", "stand up and stretch!", "grab some coffee!", "strike a pose!", "catch up on reading!", "have a brainstorm!", "clean your junk drawer!", "have a daydream!", "share your progress!", "clear your mind!", "meditate!", "just relax!", "find a good playlist!", "rest your eyes!", "stretch your legs!", "think of a joke!", "make a quick call!", "read a listicle!", "have a snack!", "play a quick game!", "consider the universe!", "watch a funny video!", "treat yo self!", "… have a KitKat!", "tweet the world!", "tell someone you love 'em"];

var chosenBreakMessage;

var minutesAwayRounded = 52;
var frontLayer = "2";
var backLayer = "1";
var timerRunning = false;

const worktime = 52;
const breaktime = 17;

/*
  Elements
*/

var timerFab1Element = document.getElementById("timerfab1");
var resetButton1Element = document.getElementById("resetButton1");
var timerFab2Element = document.getElementById("timerfab2");
var resetButton2Element = document.getElementById("resetButton2");
var pulsingDot1Element = document.getElementById("pulsingDot1");
var pulsingDot1ContainerElement = document.getElementById("pulsingDotContainer1");
var pulsingDot2Element = document.getElementById("pulsingDot2");
var pulsingDot2ContainerElement = document.getElementById("pulsingDotContainer2");
var hero1Element = document.getElementById("heroNumber1");
var hero2Element = document.getElementById("heroNumber2");
var shareFab1Element = document.getElementById("sharefab1");
var shareFab2Element = document.getElementById("sharefab2");
var moreButton1Element = document.getElementById("moreButton1");
var moreButton2Element = document.getElementById("moreButton2");
var layer1DivElement = document.getElementById("layer1div");
var layer2DivElement = document.getElementById("layer2div");
var breakMessage1Element = document.getElementById("breakMessage1");
var breakMessage2Element = document.getElementById("breakMessage2");


/*
  Event Listeners
*/

// An event listener must be added for both copies of the elements, as there are two.
timerFab1Element.addEventListener("click", startWork);
resetButton1Element.addEventListener("click", reset);
timerFab2Element.addEventListener("click", startWork);
resetButton2Element.addEventListener("click", reset);
/*
  Functions
*/
function startWork() {
  currentCycle = "work";
  timerRunning = true;

  resetButton1Element.classList.remove("inactive-element");
  resetButton2Element.classList.remove("inactive-element");

  resetButton1Element.classList.add("active-element");
  resetButton2Element.classList.add("active-element");

  setTheme(currentCycle);

  getStartTime();
  getEndTime(currentCycle);
  getCurrentTime();
  getMinutesAway(currentTime, endTime);

  notify(currentCycle, minutesAwayRounded);

  /* Animate FAB out */
  timerFab1Element.classList.add("hide-fab");
  timerFab1Element.classList.remove("show-fab");
  setTimeout(function() {
    timerFab1Element.classList.add("hide");
  }, 200);

  /* Animate FAB out */
  timerFab2Element.classList.add("hide-fab");
  timerFab2Element.classList.remove("show-fab");
  setTimeout(function() {
    timerFab2Element.classList.add("hide");
  }, 200);

  /* Animate Pulsing Dot in */
  pulsingDot1Element.classList.remove("hide");
  pulsingDot1Element.classList.add("show-dot");
  pulsingDot1ContainerElement.classList.add("pulseStart");

  pulsingDot2Element.classList.remove("hide");
  pulsingDot2Element.classList.add("show-dot");
  pulsingDot2ContainerElement.classList.add("pulseStart");

  var x = setInterval(function() {
    getCurrentTime();
    getMinutesAway(currentTime, endTime);
    updateTimer(currentCycle);
    if (!timerRunning) {
      // TODO: Try to animate this down the road
      hero1Element.innerHTML = 52;
      hero2Element.innerHTML = 52;


      clearInterval(x);
      return;
    }
    if (timerRunning && (minutesAwayRounded === 0)) {
      startBreak();
      clearInterval(x);
      return;
    }
  }, 10);

}

function startBreak() {
  currentCycle = "break";
  timerRunning = true;
  resetButton1Element.classList.add("activeElement");
  resetButton2Element.classList.add("activeElement");


  setTheme(currentCycle);

  getStartTime();
  getEndTime(currentCycle);
  getCurrentTime();
  getMinutesAway(currentTime, endTime);

  notify(currentCycle, minutesAwayRounded);

  // No longer needed? updateTimer(currentCycle);

  var y = setInterval(function() {
    getCurrentTime();
    getMinutesAway(currentTime, endTime);
    updateTimer(currentCycle);
    if (!timerRunning) {
      // TODO: Try to animate this down the road
      hero1Element.innerHTML = 52;
      hero2Element.innerHTML = 52;

      clearInterval(y);
      return;
    }
    if (timerRunning && (minutesAwayRounded === 0)) {
      startWork();
      clearInterval(y);
      return;
    }
  }, 10);

}

function reset() {

  if (timerRunning === true) {
    resetButton1Element.classList.remove("active-element");
    resetButton2Element.classList.remove("active-element");
    resetButton1Element.classList.add("spinit");
    resetButton2Element.classList.add("spinit");


    setTimeout(function() {
      resetButton1Element.classList.remove("spinit");
      resetButton2Element.classList.remove("spinit");
      resetButton1Element.classList.add("inactive-element");
      resetButton2Element.classList.add("inactive-element");
    }, 610);

    timerRunning = false;
    minutesAwayRounded = 52;

    shareFab1Element.classList.add("hide-fab");
    shareFab2Element.classList.add("hide-fab");

    timerFab1Element.classList.remove("hide-fab");
    timerFab2Element.classList.remove("hide-fab");

    if (!timerFab1Element.classList.contains("show-fab") || !timerFab2Element.classList.contains("show-fab")) {
      timerFab1Element.classList.add("show-fab");
      timerFab2Element.classList.add("show-fab");
    }
    if (!pulsingDot1Element.classList.contains("hide") || !pulsingDot2Element.classList.contains("hide")) {
      pulsingDot1Element.classList.add("hide");
      pulsingDot2Element.classList.add("hide");
    }

    setTheme("work");
  }
  currentCycle = null;
}

function setTheme(cycleType) {
  if (cycleType === "work") {
    breakMessage1Element.style.visibility = "hidden";
    breakMessage2Element.style.visibility = "hidden";
    hero1Element.style.color = "#ffffff";
    resetButton1Element.style.color = "#ffffff";
    moreButton1Element.style.color = "#ffffff";
    hero2Element.style.color = "#ffffff";
    resetButton2Element.style.color = "#ffffff";
    moreButton2Element.style.color = "#ffffff";
    layer2DivElement.style.backgroundColor = "#237aff";
    layer1DivElement.style.backgroundColor = "#237aff";
    if (shareFab1Element.classList.contains("show-fab") || shareFab2Element.classList.contains("show-fab")) {
      shareFab1Element.classList.add("hide-fab");
      shareFab1Element.classList.add("hide");
      shareFab2Element.classList.add("hide-fab");
      shareFab2Element.classList.add("hide");
      shareFab1Element.classList.remove("show-fab");
      shareFab2Element.classList.remove("show-fab");
    }
    if (timerFab1Element.classList.contains("hide") || timerFab2Element.classList.contains("hide")) {
      timerFab1Element.classList.remove("hide");
      timerFab2Element.classList.remove("hide");
      timerFab1Element.classList.remove("hide-fab");
      timerFab2Element.classList.remove("hide-fab");
      timerFab1Element.classList.add("show-fab");
      timerFab2Element.classList.add("show-fab");
    }
    if (!pulsingDot1Element.classList.contains("hide") || !pulsingDot2Element.classList.contains("hide")) {
      pulsingDot1Element.classList.add("hide");
      pulsingDot1Element.classList.remove("show-dot");
      pulsingDot1ContainerElement.classList.remove("pulseStart");
      pulsingDot2Element.classList.add("hide");
      pulsingDot2Element.classList.remove("show-dot");
      pulsingDot2ContainerElement.classList.remove("pulseStart");
    }
  }
  if (cycleType === "break") {
    chosenBreakMessage = "Time for a break!" + "<br>" + capitalizeFirstLetter(chooseBreakMessage());
    breakMessage1Element.innerHTML = chosenBreakMessage;
    breakMessage2Element.innerHTML = chosenBreakMessage;
    breakMessage1Element.style.visibility = "visible";
    breakMessage2Element.style.visibility = "visible";
    hero1Element.style.color = "#237aff";
    resetButton1Element.style.color = "#237aff";
    moreButton1Element.style.color = "#237aff";
    hero2Element.style.color = "#237aff";
    resetButton2Element.style.color = "#237aff";
    moreButton2Element.style.color = "#237aff";
    layer2DivElement.style.backgroundColor = "#ffffff";
    layer1DivElement.style.backgroundColor = "#ffffff";
    if (!shareFab1Element.classList.contains("show-fab") || !shareFab2Element.classList.contains("show-fab")) {
      shareFab1Element.classList.add("show-fab");
      shareFab2Element.classList.add("show-fab");
      shareFab1Element.classList.remove("hide-fab");
      shareFab2Element.classList.remove("hide-fab");
      shareFab1Element.classList.remove("hide");
      shareFab2Element.classList.remove("hide");
    }
    if (!timerFab1Element.classList.contains("hide") || !timerFab2Element.classList.contains("hide")) {
      timerFab1Element.classList.add("hide");
      timerFab2Element.classList.add("hide");
      timerFab1Element.classList.add("hide-fab");
      timerFab2Element.classList.add("hide-fab");
      timerFab1Element.classList.remove("show-fab");
      timerFab2Element.classList.remove("show-fab");
    }
    if (!pulsingDot1Element.classList.contains("hide") || !pulsingDot2Element.classList.contains("hide")) {
      pulsingDot1Element.classList.add("hide");
      pulsingDot2Element.classList.add("hide");
      pulsingDot1Element.classList.remove("show-dot");
      pulsingDot2Element.classList.remove("show-dot");
      pulsingDot1ContainerElement.classList.remove("pulseStart");
      pulsingDot2ContainerElement.classList.remove("pulseStart");
    }
    swipeLayer();
  }
}

function updateTimer(cycleType) {
  hero1Element.innerHTML = minutesAwayRounded;
  hero2Element.innerHTML = minutesAwayRounded;
  // Run notification at 51 mins
  if ((placeHolderTime != minutesAwayRounded) && minutesAwayRounded === 35) {
    notify(cycleType, minutesAwayRounded);
  }

  if ((placeHolderTime != minutesAwayRounded) && minutesAwayRounded === 14) {
    notify(cycleType, minutesAwayRounded);
  }

  if ((placeHolderTime != minutesAwayRounded) && minutesAwayRounded === 5) {
    notify(cycleType, minutesAwayRounded);
  }

  if (placeHolderTime != minutesAwayRounded) {
    placeHolderTime = minutesAwayRounded;
    if (cycleType === "work") {
      setMinuteColors(currentCycle);
    }
    if (minutesAwayRounded != 52 && cycleType === "work") {
      swipeLayer();
    }
  }
}

function getStartTime() {
  startTime = new Date().getTime();
  return startTime;
}

function getCurrentTime() {
  currentTime = new Date().getTime();
  return currentTime;
}

function getEndTime(cycleType) {
  if (cycleType === "work") {
    endTime = new Date(startTime + (worktime * 60000)).getTime();
    placeHolderTime = worktime;
  } else if (cycleType === "break") {
    endTime = new Date(startTime + (breaktime * 60000)).getTime();
    placeHolderTime = breaktime;
  }
  return endTime;
}

function getMinutesAway(now, finish) {
  minutesAway = (finish - now) / 60000;
  minutesAwayRounded = Math.ceil(minutesAway);
  return minutesAwayRounded;
}

function getLayerOrder() {
  var aLayer = layer1DivElement;
  var aLayerProp = window.getComputedStyle(aLayer, null).getPropertyValue("z-index");
  var bLayer = layer2DivElement;
  var bLayerProp = window.getComputedStyle(bLayer, null).getPropertyValue("z-index");
  if (bLayerProp > aLayerProp) {
    console.log("layer2div is in front, at position: " + bLayerProp);
    f = 2;
    r = 1;
  } else if (aLayerProp > bLayerProp) {
    console.log("layer1div is in front, at position: " + aLayerProp);
    f = 1;
    r = 2;
  }
}

function setMinuteColors(cycleType) {
  getLayerOrder();
  (f === 1 ? layer1DivElement : layer2DivElement).style.backgroundColor = workColors[Math.abs(worktime - minutesAwayRounded)];
  (r === 1 ? layer1DivElement : layer2DivElement).style.backgroundColor = workColors[Math.abs(worktime - minutesAwayRounded) + 1];
  if (minutesAwayRounded === 30) {
    hero1Element.style.color = "#237aff";
    hero2Element.style.color = "#237aff";
    resetButton1Element.style.color = "#237aff";
    moreButton1Element.style.color = "#237aff";
    resetButton2Element.style.color = "#237aff";
    moreButton2Element.style.color = "#237aff";

  }
}

function swipeLayer() {
  getLayerOrder();

  if (f === 2) {
    layer2DivElement.classList.add("swipe-background");
    setTimeout(function() {
      layer2DivElement.classList.add("unswipe-background");
    }, 520);
    setTimeout(function() {
      layer2DivElement.style.zIndex = "-2";
      setTimeout(function() {
        layer1DivElement.style.zIndex = "0";
      }, 1);
      setTimeout(function() {
        layer2DivElement.style.zIndex = "-1";
      }, 2);
    }, 512);
    setTimeout(function() {
      layer2DivElement.classList.remove("unswipe-background", "swipe-background");
    }, 1000);
  } else if (f === 1) {
    layer1DivElement.classList.add("swipe-background");
    setTimeout(function() {
      layer1DivElement.classList.add("unswipe-background");
    }, 520);
    setTimeout(function() {
      layer1DivElement.style.zIndex = "-2";
      setTimeout(function() {
        layer2DivElement.style.zIndex = "0";
      }, 1);
      setTimeout(function() {
        layer1DivElement.style.zIndex = "-1";
      }, 2);
    }, 512);
    setTimeout(function() {
      layer1DivElement.classList.remove("unswipe-background", "swipe-background");
    }, 1000);
  }
}

/* Break Message Code */
function chooseBreakMessage() {
  return breakMessages[Math.floor(Math.random() * breakMessages.length)];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
  Notification code
*/

// request notification permission on page load
document.addEventListener('DOMContentLoaded', function() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

function notify(type, remainingMinutes) {
  if (type === "break") {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Time for a break', {
          icon: 'images/icon.png',
          badge: 'images/ic_notif_white.png',
          body: remainingMinutes + " minutes left - " + chooseBreakMessage(),
          tag: 'notification',
          renotify: true
        });
      });
    }
  } else if (type === "work") {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Keep working!', {
          icon: 'images/icon.png',
          badge: 'images/ic_notif_white.png',
          body: remainingMinutes + " minutes left in this cycle",
          tag: 'notification',
          renotify: true
        });
      });
    }
  }
}