// ! For Time ;

let timeOut = document.querySelector(".time");

setInterval(() => {
  let crntTime = new Date().toLocaleTimeString();

  timeOut.innerHTML = crntTime;
}, 1000);

// ! For Date ;

let dateOut = document.querySelector(".date");

setInterval(() => {
  let crntDate = new Date().toDateString();

  dateOut.innerHTML = crntDate;
}, 1000);

// ! Dark Mood;

let dark_icon = document.querySelector("#darkIcon");

dark_icon.addEventListener("click", () => {
  document.body.classList.toggle("darkColor");

  if (document.body.classList.contains("darkColor")) {
    dark_icon.innerHTML = `<i class="fas fa-moon"></i>`;
  } else {
    dark_icon.innerHTML = `<i class="fas fa-sun"></i>`;
  }
});

// ! Typing Speed ;

let typingText = document.querySelector(".typing_text p");

let inpField = document.querySelector(".input_field");

let timeTag = document.querySelector(".rsTime b");

let mistakeTag = document.querySelector(".mistake span");

let wpmTag = document.querySelector(".wpm span");

let cpmTag = document.querySelector(".cpm span");

let btn = document.querySelector(".button1");

let charIndex = 0;

let mistakes = 0;

let timer,
  maxTime = 60;

  // maxTime = 60 * 5;

let timeLeft = maxTime;

let isTyping = 0;

timeTag.innerText = maxTime; // ? For showing max time ;

function randomPara() {
  // ? Getting random number and it'll always less than paragraphs length ;

  // ? Math.random() always picks a number between 0 to 1 and Math.floor() makes it a full value ;

  const ranIndex = Math.floor(Math.random() * paragraphs.length);

  typingText.innerHTML = "";

  // todo: Getting random items from the paragraphs array, splitting all characters of it , adding each character inside span and then adding this span inside p tag ;

  paragraphs[ranIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`; // ? span in the up ;

    typingText.innerHTML += spanTag; // ? with out += the text will not show ;
  });

  // ? For highlght the first word ;

  typingText.querySelectorAll("span")[0].classList.add("active");

  // ? Focusing input field on keyword or click event;

  document.addEventListener("keydown", () => inpField.focus());

  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");

  let typedChar = inpField.value.split("")[charIndex];

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      // ? onece timer is start, it won't restart again on every key clicked ;

      timer = setInterval(initTimer, 1000);

      isTyping = true;
    }

    // ? If User hasn't entered any character or pressed backspace ;

    if (typedChar == null) {
      charIndex--; // ? Decrement charIndex ;

      // ? Decrement mistakes only if the charIdex span contains incorrect class ;

      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }

      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;

        characters[charIndex].classList.add("incorrect");
      }

      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));

    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );

    // ? if wpm value is 0,empty or infinity then setting it's value to 0 ;

    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerHTML = mistakes;

    wpmTag.innerHTML = wpm;

    cpmTag.innerText = charIndex - mistakes; // ? cmp will not count mistakes ;
  } else {
    inpField.value = "";

    clearInterval(timer);
  }
}

function initTimer() {
  // ? if rimeLeft is greater than 0 then decrement the timeLeft else clear the timer ;

  if (timeLeft > 0) {
    timeLeft--;

    timeTag.innerHTML = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetTest() {
  randomPara();

  timeLeft = maxTime;

  charIndex = mistakes = isTyping = 0;

  inpField.value = "";

  timeTag.innerText = timeLeft;

  wpmTag.innerText = 0;

  mistakeTag.innerText = 0;

  cpmTag.innerText = 0;

  clearInterval(timer);
}

randomPara();

inpField.addEventListener("input", initTyping);

btn.addEventListener("click", resetTest);
