/*
    5217 - Web
    Based on 5217 by Francisco Franco
    Developed by Jackson Hayes
*/

/*
  Constants
*/

const second = 60000;
const originalTitle = document.title;

/*
  Variables
*/

var worktime = 52;
var breaktime = 17;
var placeHolderTime;
var currentCycle;
var notificationSetting;
var soundSetting;
var startTime = 0;
var currentTime = 0;
var endTime = 0;
var minutesAway = 0;

// A literal ARRAY of colors. Ha!
var workColors = ["#238aff", "#278cff", "#2c8fff", "#3091ff", "#3493ff", "#3996ff", "#3d98ff", "#419aff", "#469cff", "#4a9fff", "#4ea1ff", "#53a3ff", "#57a6ff", "#5ba8ff", "#60aaff", "#64adff", "#68afff", "#6db1ff", "#71b4ff", "#75b6ff", "#7ab8ff", "#7ebaff", "#82bdff", "#87bfff", "#8bc1ff", "#8fc4ff", "#94c6ff", "#98c8ff", "#9ccbff", "#a1cdff", "#a5cfff", "#a9d1ff", "#aed4ff", "#b2d6ff", "#b6d8ff", "#bbdbff", "#bfddff", "#c3dfff", "#c8e2ff", "#cce4ff", "#d0e6ff", "#d5e9ff", "#d9ebff", "#ddedff", "#e2efff", "#e6f2ff", "#eaf4ff", "#eff6ff", "#f3f9ff", "#f7fbff", "#fcfdff", "#ffffff"];

var breakMessages = ["have a cup of tea!", "put your feet up!", "take a deep breath!", "ponder infinity…", "enjoy the moment!", "order a pizza?", "say hi to a stranger!", "take a walk around!", "stand up and stretch!", "grab some coffee!", "strike a pose!", "catch up on reading!", "have a brainstorm!", "clean your junk drawer!", "have a daydream!", "share your progress!", "clear your mind!", "meditate!", "just relax!", "find a good playlist!", "rest your eyes!", "stretch your legs!", "think of a joke!", "make a quick call!", "read a listicle!", "have a snack!", "play a quick game!", "consider the universe!", "watch a funny video!", "treat yo self!", "… have a KitKat!", "tweet the world!", "tell someone you love 'em"];

var notificationTitle = {
  "break": "Time for a break",
  "work": "Keep working!",
};
var notificationBody = {
  "break": " minutes left - ",
  "work": " minutes left in this cycle",
}

var chosenBreakMessage;

var minutesAwayRounded = worktime;
var frontLayer = "2";
var backLayer = "1";
var timerRunning = false;

/*
  Elements
*/

var timerFab1Element = document.getElementById("timerfab1");
var resetButton1Element = document.getElementById("resetButton1");
var pulsingDot1Element = document.getElementById("pulsingDot1");
var pulsingDot1ContainerElement = document.getElementById("pulsingDotContainer");
var hero1Element = document.getElementById("heroNumber1");
var hero2Element = document.getElementById("heroNumber2");
var shareFab1Element = document.getElementById("sharefab1");
var moreButton1Element = document.getElementById("moreButton");
var layer1DivElement = document.getElementById("layer1div");
var layer2DivElement = document.getElementById("layer2div");
var notificationToggleElement = document.getElementById("notificationSwitch");
var soundToggleElement = document.getElementById("soundSwitch");
var workTimeElement = document.getElementById("work-time")
var breakTimeElement = document.getElementById("break-time")
var notification;
var sound;
setCookies();
/* var breakMessage1Element = document.getElementById("breakMessage1");
var breakMessage2Element = document.getElementById("breakMessage2"); */

/*
  Event Listeners
*/

// An event listener must be added for both copies of the elements, as there are two.
timerFab1Element.addEventListener("click", startTimer);
resetButton1Element.addEventListener("click", reset);
/*
  Functions
*/
function setCookies() {
    if(typeof(Storage) !== "undefined") {
        if (typeof(localStorage.worktime) === "undefined") {
            localStorage.worktime = 52;
        }
        if (typeof(localStorage.breaktime) === "undefined") {
            localStorage.breaktime = 17;
        }
        if (typeof(localStorage.notifpref) === "undefined") {
            localStorage.notifpref = true;
        }
        if (typeof(localStorage.soundpref) === "undefined") {
            localStorage.soundpref = false;
        }
        worktime = parseInt(localStorage.worktime, 10);
        breaktime = parseInt(localStorage.breaktime, 10);
        notification = localStorage.notifpref;
        sound = localStorage.soundpref;

        hero1Element.innerHTML = worktime;
        hero2Element.innerHTML = worktime;

        if (notification === "true") {
          let checked = document.createAttribute("checked");
          notificationToggleElement.attributes.setNamedItem(checked);
        }
        if (sound === "true") {
          let checked = document.createAttribute("checked");
          soundToggleElement.attributes.setNamedItem(checked);
        }
        if (notification === "false") {
            soundToggleElement.setAttribute("disabled","");
            soundToggleElement.removeAttribute("checked");
        }
        console.log("Notification Preferences is set to " + localStorage.notifpref + ".");
        console.log("Sound Preferences is set to " + localStorage.soundpref + ".");
    }
}

function saveSettings() {
  if (!timerRunning) {
    notificationSetting = notificationToggleElement.checked;
    soundSetting = soundToggleElement.checked;
    localStorage.notifpref = notificationSetting;
    localStorage.soundpref = soundSetting;
    notification = localStorage.notifpref;
    sound = localStorage.soundpref;
    worktime = parseInt(workTimeElement.value, 10);
    breaktime = parseInt(breakTimeElement.value, 10);
    localStorage.worktime = worktime;
    localStorage.breaktime = breaktime;
    hero1Element.innerHTML = worktime;
    hero2Element.innerHTML = worktime;
  }
}

function showSettings() {
    if (typeof(localStorage.worktime) === "undefined") {
        workTimeElement.value = 52;
    } else {
        workTimeElement.value = parseInt(localStorage.worktime, 10);
    }
    if (typeof(localStorage.breaktime) === "undefined") {
        breakTimeElement.value = 17;
    } else {
        breakTimeElement.value = parseInt(localStorage.breaktime, 10);
    }
}

function dependentUI() {
  notificationSetting = notificationToggleElement.checked;
  if (!notificationSetting) {
    soundToggleElement.setAttribute("disabled","");
    soundToggleElement.checked = false;
    soundToggleElement.setAttribute("checked", "false");
  } else {
    soundToggleElement.removeAttribute("disabled");
  }
}

function startTimer() {
  currentCycle = "work";
  timerRunning = true;

  startNewType();

  setTimeout(function() {
    /* Animate FAB out */
    timerFab1Element.classList.add("hide");
  }, 200);

  resetButton1Element.classList.remove("inactive-element");

  resetButton1Element.classList.add("active-element");

  timerFab1Element.classList.add("hide-fab");
  timerFab1Element.classList.remove("show-fab");

  /* Animate Pulsing Dot in */
  pulsingDot1Element.classList.remove("hide");
  pulsingDot1Element.classList.add("show-dot");
  pulsingDot1ContainerElement.classList.add("pulseStart");

  var x = setInterval(function() {
    if (!timerRunning) {
      // TODO: Try to animate this down the road
      hero1Element.innerHTML = worktime;
      hero2Element.innerHTML = worktime;

      clearInterval(x);
      return;
    }

    getCurrentTime();
    getMinutesAway();
    updateTimer(currentCycle);

    if (timerRunning && (minutesAwayRounded === 0)) {
      switchCycles();
      startNewType();
    }
  }, 1000);

}

function switchCycles() {
  currentCycle = currentCycle === "work" ? "break" : "work";
}

function startNewType() {
  setTheme(currentCycle);

  getStartTime();
  getEndTime(currentCycle);
  getCurrentTime();
  getMinutesAway();

  updateTitle(currentCycle);
  notify(currentCycle, minutesAwayRounded);
}

function reset() {

  if (timerRunning !== true) return;

  resetButton1Element.classList.remove("active-element");
  resetButton1Element.classList.add("spinit");


  setTimeout(function() {
    resetButton1Element.classList.remove("spinit");
    resetButton1Element.classList.add("inactive-element");
  }, 610);

  timerRunning = false;
  updateTitle(null);

  shareFab1Element.classList.add("hide-fab");

  timerFab1Element.classList.remove("hide-fab", "hide");

  if (!timerFab1Element.classList.contains("show-fab")) {
    timerFab1Element.classList.add("show-fab");
  }
  if (!pulsingDot1Element.classList.contains("hide")) {
    pulsingDot1Element.classList.add("hide");
  }
  setTheme("work");

  currentCycle = null;
}

function setTheme(cycleType) {
  if (cycleType === "work") {
    increaseAnimation(worktime);
    // breakMessage1Element.style.visibility = "hidden";
    // breakMessage2Element.style.visibility = "hidden";
    hero1Element.style.color = "#ffffff";
    resetButton1Element.style.color = "#ffffff";
    moreButton1Element.style.color = "#ffffff";
    hero2Element.style.color = "#ffffff";
    layer2DivElement.style.backgroundColor = "#237aff";
    layer1DivElement.style.backgroundColor = "#237aff";
    if (shareFab1Element.classList.contains("show-fab")) {
      shareFab1Element.classList.add("hide-fab");
      shareFab1Element.classList.add("hide");
      shareFab1Element.classList.remove("show-fab");
    }
  }
  if (cycleType === "break") {
    increaseAnimation(breaktime);
    // chosenBreakMessage = "Time for a break!" + "<br>" + capitalizeFirstLetter(chooseBreakMessage());
    // breakMessage1Element.innerHTML = chosenBreakMessage;
    // breakMessage2Element.innerHTML = chosenBreakMessage;
    // breakMessage1Element.style.visibility = "visible";
    // breakMessage2Element.style.visibility = "visible";
    hero1Element.style.color = "#237aff";
    resetButton1Element.style.color = "#237aff";
    moreButton1Element.style.color = "#237aff";
    hero2Element.style.color = "#237aff";
    layer2DivElement.style.backgroundColor = "#ffffff";
    layer1DivElement.style.backgroundColor = "#ffffff";
    if (!shareFab1Element.classList.contains("show-fab")) {
      shareFab1Element.classList.add("show-fab");
      shareFab1Element.classList.remove("hide-fab");
      shareFab1Element.classList.remove("hide");
    }
    swipeLayer();
  }
}

function updateTimer(cycleType) {
  getLayerOrder();
  if (f === 2) {
    hero1Element.innerHTML = minutesAwayRounded;
    setTimeout(function() {
      hero2Element.innerHTML = minutesAwayRounded;
    }, 520);
  } else if (f === 1) {
    hero2Element.innerHTML = minutesAwayRounded;
    setTimeout(function() {
      hero1Element.innerHTML = minutesAwayRounded;
    }, 520);
  }

  // Run notification at 51 mins
  //if (placeHolderTime === minutesAwayRounded) return;

  updateTitle(cycleType);

  switch (parseFloat((minutesAway / worktime).toFixed(2))) {
    case 0.67:
    case 0.27:
    case 0.1:
      notify(cycleType, minutesAwayRounded);
  }

  placeHolderTime = minutesAwayRounded;

  if (cycleType === "work") {
    setMinuteColors(currentCycle);

    if (minutesAwayRounded < worktime) {
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
    endTime = startTime + worktime * second;
    placeHolderTime = worktime;
  } else if (cycleType === "break") {
    endTime = startTime + breaktime * second;
    placeHolderTime = breaktime;
  }
  return endTime;
}

function getMinutesAway() {
  minutesAway = (endTime - currentTime) / second;
  minutesAwayRounded = Math.ceil(minutesAway);
  return minutesAwayRounded;
}

function getLayerOrder() {
  var aLayer = layer1DivElement;
  var aLayerProp = window.getComputedStyle(aLayer, null).getPropertyValue("z-index");
  var bLayer = layer2DivElement;
  var bLayerProp = window.getComputedStyle(bLayer, null).getPropertyValue("z-index");
  if (bLayerProp > aLayerProp) {
    // console.log("layer2div is in front, at position: " + bLayerProp);
    f = 2;
    r = 1;
  } else if (aLayerProp > bLayerProp) {
    // console.log("layer1div is in front, at position: " + aLayerProp);
    f = 1;
    r = 2;
  }
}

function setMinuteColors(cycleType) {
  getLayerOrder();
  let colorIndex = parseInt((1 - minutesAway / worktime) * 52, 10);
  let reverseColorIndex = parseInt((minutesAway / worktime) * 52, 10);
  (f === 1 ? layer1DivElement : layer2DivElement).style.backgroundColor = workColors[colorIndex];
  (r === 1 ? layer1DivElement : layer2DivElement).style.backgroundColor = workColors[colorIndex + 1];
  $(".reverseColor").css("color", workColors[reverseColorIndex]);
  if (minutesAwayRounded === 30) {
    hero1Element.style.color = "#237aff";
    hero2Element.style.color = "#237aff";
    resetButton1Element.style.color = "#237aff";
    moreButton1Element.style.color = "#237aff";

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

function updateTitle(cycleType) {
  if (cycleType == null) {
    document.title = originalTitle;
  } else {
    document.title = `${minutesAwayRounded}m ${cycleType} remaining - ${originalTitle}`;
  }
}

function increaseAnimation(animType) {
    var increase = setInterval(function() {
      hero1Element.innerHTML = minutesAwayRounded;
      hero2Element.innerHTML = minutesAwayRounded;
      console.log("Incrementing minutesAwayRounded to: " + minutesAwayRounded);

      if (minutesAwayRounded === animType) {
        clearInterval(increase);
        return;
      }
      minutesAwayRounded++;
    }, 30);
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

function checkIfMobile() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
}

function notify(type, minutes) {
  if (notification === "true"){
    showNotification(type, notificationTitle[type], getNotificationBody(type, minutes))
  }
}

function showNotification(type, title, body) {
  if (!checkIfMobile()) {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      var options = {
        icon: 'images/icon.png',
        body: body,
      };
      var notification = new Notification(title, options);
      setPlayAudio(type);
      notification.onclick = function () {
        window.focus();
        notification.close();
      }
    }
  }
}

function getNotificationBody(type, remainingMinutes) {
  if (type === "break") {
    return remainingMinutes + notificationBody[type] + chooseBreakMessage();
  } else if (type === "work") {
    return remainingMinutes + notificationBody[type];
  } else if (type === "unpaused") {
    return remainingMinutes + notificationBody[type];
  }
}

function setPlayAudio(type) {
  if (sound === "true" && (minutesAwayRounded === 52 || (minutesAwayRounded === 17 && cycleType === "break"))) {
    if (type ==="work"){
      let audio = new Audio("sound/end_break.wav");
      audio.play();
    } else if (type === "break") {
      let audio = new Audio("sound/end_work.wav");
      audio.play();
    }
  }
}

// Prompt user if they try to close the tab when timerRunning
window.onbeforeunload = function (e) {
  if (timerRunning === true) {
    e = e || window.event;
    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = '5217 is still running! Are you sure you want to quit?';
    }
    // For Safari
    return '5217 is still running! Are you sure you want to quit?';
  }
};
