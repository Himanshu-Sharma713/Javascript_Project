const span1 = document.querySelector(".typing");
const span2 = document.querySelector(".typing2");

const wordsList1 = [
  "Java Developer.",
  "React Devloper.",
  "Java Full Stack Developer.",
  "Software Engineer.",
];
const wordsList2 = ["Student.", "Engineer.", "Learner.", "Designer."];

function autoType(words, element, speed = 120, pause = 1000) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      element.textContent = currentWord.slice(0, ++charIndex);
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      element.textContent = currentWord.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? speed / 2 : speed);
  }

  type();
}

autoType(wordsList1, span1);
autoType(wordsList2, span2);
