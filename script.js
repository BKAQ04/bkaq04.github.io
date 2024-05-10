document.getElementById('planet-select').addEventListener('change', function() {
    displayVideo(this.value);
});

let currentVideo = null; // Keep track of the current video element

function displayVideo(planet) {
    const planetInfoDiv = document.getElementById('planet-info');
    planetInfoDiv.innerHTML = ''; // Clear the current content

    if (planet) {
        const isAlternate = document.getElementById('alternate-video').checked;
        const videoPath = isAlternate ? `AP_${planet}.mp4` : `${planet}.mp4`;

        const videoElement = document.createElement('video');
        videoElement.setAttribute('src', videoPath);
        videoElement.loop = true; // Make the video loop
        videoElement.autoplay = true; // Autoplay the video
        videoElement.muted = true; // Mute the video (necessary for autoplay to work in most browsers)
        videoElement.style.width = '50%'; // Adjust width as needed
        videoElement.controls = false; // Hide video controls

        currentVideo = videoElement; // Update the current video reference
        planetInfoDiv.appendChild(videoElement); // Append the video to the div
    }
}

// Listener for changes in the alternate video checkbox
document.getElementById('alternate-video').addEventListener('change', function() {
    if (currentVideo) { // Only update if a planet is currently selected
        displayVideo(document.getElementById('planet-select').value);
    }
});

// Listener for speed control changes
document.getElementById('speed-control').addEventListener('input', function() {
    const speed = this.value;
    if (currentVideo) {
        currentVideo.playbackRate = speed; // Adjust the playback rate
    }
    document.getElementById('speed-value').innerText = `${speed}x`;
});

document.querySelectorAll('input[name="content-type"]').forEach(input => {
    input.addEventListener('change', function() {
        updateMainContent(this.value);
    });
});

document.querySelectorAll('input[name="content-type"]').forEach(input => {
    input.addEventListener('change', function() {
        updateMainContent(this.value);
    });
});

function updateMainContent(type) {
    const mainContent = document.getElementById('main-content');
    const checkboxContainer = document.getElementById('checkbox-container');
    const alternateVideoCheckbox = document.getElementById('alternate-video'); // Get the checkbox element
    const label = mainContent.querySelector('label');
    const select = mainContent.querySelector('select');

    if (type === 'orbits') {
        label.innerHTML = 'Choose a planet:';
        select.innerHTML = `
            <option value="">--Please choose a planet--</option>
            <option value="All">All Planets</option>
            <option value="Mercury">Mercury</option>
            <option value="Venus">Venus</option>
            <option value="Earth">Earth</option>
            <option value="Mars">Mars</option>
            <option value="Jupiter">Jupiter</option>
            <option value="Saturn">Saturn</option>
            <option value="Uranus">Uranus</option>
            <option value="Neptune">Neptune</option>
        `;
        checkboxContainer.style.display = 'block';
    } else if (type === 'phenomena') {
        label.innerHTML = 'Select phenomena:';
        select.innerHTML = `
            <option value="">--Please choose a phenomena--</option>
            <option value="KL3">Kepler's Third Law</option>
            <option value="Retrograde">Retrograde</option>
        `;
        checkboxContainer.style.display = 'none';
        alternateVideoCheckbox.checked = false; // Uncheck the checkbox
    }
}

// Ensure this function is called when the document is ready to set initial content type
updateMainContent('orbits');

