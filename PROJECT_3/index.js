// Function to generate random HEX color
const getRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * 16777215);
  return "#" + randomNumber.toString(16).padStart(6, '0');
};

// Function to create palette
const generatePalette = () => {
  const paletteContainer = document.getElementById("palette");
  paletteContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();

    // Create color card
    const colorCard = document.createElement("div");
    colorCard.classList.add("color-card");

    // Preview section
    const colorPreview = document.createElement("div");
    colorPreview.classList.add("color-preview");
    colorPreview.style.backgroundColor = color;

    // Info section
    const colorInfo = document.createElement("div");
    colorInfo.classList.add("color-info");

    const colorCode = document.createElement("span");
    colorCode.innerText = color;

    const copyBtn = document.createElement("button");
    copyBtn.classList.add("copy-btn");
    copyBtn.innerText = "📋";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(color);
      copyBtn.innerText = "✅";
      setTimeout(() => (copyBtn.innerText = "📋"), 1000);
    };

    colorInfo.appendChild(colorCode);
    colorInfo.appendChild(copyBtn);

    // Append to card
    colorCard.appendChild(colorPreview);
    colorCard.appendChild(colorInfo);

    // Append card to palette
    paletteContainer.appendChild(colorCard);
  }
};

// Event listener
document.getElementById("generate-btn").addEventListener("click", generatePalette);

// Generate initial palette
generatePalette();
