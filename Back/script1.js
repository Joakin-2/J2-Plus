// Define the updateDate function to update the date
function updateDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
    const year = now.getFullYear();
    document.getElementById('date').textContent = `${day}/${month}/${year}`;
}

// Define the musicaIniciada variable to track if music has been started
var musicaIniciada = false;

// Function to initialize the music
function iniciarMusica() {
    // Your code to start the music goes here
}

// The rest of your code remains the same
document.addEventListener("DOMContentLoaded", function () {
    setInterval(updateClock, 1000);  // Update the clock every second
    updateClock();  // Update the clock immediately
    // Check if the 'date' element exists before calling updateDate
    if (document.getElementById('date')) {
        updateDate();   // Update the date immediately
    }
});

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to hide the loading screen
function esconderCarregamento() {
    document.getElementById('loading-screen').style.display = 'none';

    // Start the music if it hasn't been started
    if (!musicaIniciada) {
        iniciarMusica();
        musicaIniciada = true;
    }
}

// Wait for the page to fully load
window.onload = function () {
    // Add an event listener for the Enter key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            esconderCarregamento();
        }
    });
};
