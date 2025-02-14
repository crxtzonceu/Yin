// Select elements
const body = document.body;
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const heart = document.getElementById("heart");
const heartContainer = document.getElementById("heart-container");

// Create the final message inside the heart
const finalMessage = document.createElement("p");
finalMessage.id = "final-message";
finalMessage.innerHTML = "Happy Heart's Day!!<br>🐱❤️🌹💐<br> Yin✨!!";

heartContainer.appendChild(finalMessage);

// Ensure floating hearts container exists
let floatingContainer = document.getElementById("floating-container");
if (!floatingContainer) {
    floatingContainer = document.createElement("div");
    floatingContainer.id = "floating-container";
    document.body.appendChild(floatingContainer);
}

let tapCount = 0; // Initialize tap count

// Listen for taps anywhere on the page
body.addEventListener("pointerdown", () => {
    tapCount++; // Increase tap count

    if (tapCount === 1) {
        message.style.display = "none"; // hide message
        counter.style.display = "block"; // Show counter
        heartContainer.style.opacity = 1; // Make heart appear
        heart.style.transform = "scale(1)"; // Start at normal size
    }

    counter.textContent = tapCount; // Update counter

    // Limit the heart growth so it doesn't get too big
    let scaleValue = Math.min(1 + tapCount * 0.08, 1.7); // Increase size smoothly
    heart.style.transform = `scale(${scaleValue})`;

    // Gradual fill of the heart with a soft pink to reddish-pink
    let fillColor;
    if (tapCount <= 5) {
        fillColor = "rgb(255, 230, 235)"; // Soft pastel pink
    } else if (tapCount <= 10) {
        fillColor = "rgb(255, 160, 180)"; // Romantic pink
    } else {
        fillColor = "rgb(255, 100, 120)"; // Final reddish-pink
    }
    heart.style.fill = fillColor;

    // Background color transition
    let bgColor;
    if (tapCount <= 5) {
        bgColor = `rgb(255, 240, 245)`; // Soft pinkish-white
    } else if (tapCount <= 10) {
        let transitionPink = 245 - (tapCount - 5) * 30; // Gradually deepen pink
        bgColor = `rgb(255, ${transitionPink}, 200)`;
    } else {
        bgColor = "rgb(255, 80, 110)"; // Final reddish-pink
    }

    body.style.backgroundColor = bgColor;

    updateHeartStroke(); // Update heart outline color

    // Stop color change after 14 taps
    if (tapCount >= 14) {
        bgColor = "rgb(255, 80, 110)"; // Final color: soft red
        heart.style.fill = "rgb(255, 80, 110)"; // Stop changing fill
        message.style.display = "none"; // Hide message
        counter.style.display = "none"; // Hide counter
        finalMessage.style.opacity = 1; // Show final message inside heart
        createFloatingHearts(); // Add floating heart effect
    }

    body.style.backgroundColor = bgColor;
});

// Function to update heart outline color
function updateHeartStroke() {
    let strokeColor;
    if (tapCount <= 5) {
        strokeColor = "black";
    } else if (tapCount <= 10) {
        strokeColor = "pink";
    } else {
        strokeColor = "yellow";
    }
    heart.setAttribute("stroke", strokeColor); // Ensure stroke is solid
}

let hasStartedFloating = false; // Prevent multiple intervals

// Function to create floating hearts continuously after 14 taps
function createFloatingHearts() {
    if (hasStartedFloating) return; // Stop if already started
    hasStartedFloating = true; // Mark as started

    setInterval(() => {
        const floatingHeart = document.createElement("div");
        floatingHeart.classList.add("floating");

        // Randomize position
        floatingHeart.style.left = Math.random() * 100 + "vw";
        floatingHeart.style.top = "100vh"; // Start from the bottom

        // Randomize size
        let size = Math.random() * 30 + 10 + "px"; // Between 10px - 40px
        floatingHeart.style.fontSize = size;

        // Add ❤️ emoji instead of a circle
        floatingHeart.innerHTML = "❤️";

        floatingContainer.appendChild(floatingHeart);

        // Remove heart after it floats away
        setTimeout(() => {
            floatingHeart.remove();
        }, 4000);
    }, 300); // A new heart appears every 300ms
}
