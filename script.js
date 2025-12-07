let currentSlideIndex = 1;
const totalSlides = 10;

function changeSlide(direction) {
    // Calculate new index
    let newIndex = currentSlideIndex + direction;

    // Bounds check
    if (newIndex < 1) newIndex = 1;
    if (newIndex > totalSlides) newIndex = totalSlides;

    // Update state
    if (newIndex !== currentSlideIndex) {
        // Remove active class from current
        document.getElementById(`slide-${currentSlideIndex}`).classList.remove('active');

        // Add active class to new
        document.getElementById(`slide-${newIndex}`).classList.add('active');

        // Update counters
        currentSlideIndex = newIndex;
        updateControls();
    }
}

function updateControls() {
    // Update text counter
    document.getElementById('currentSlide').innerText = currentSlideIndex;

    // Update Progress Bar
    const progress = (currentSlideIndex / totalSlides) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;

    // Button states (optional visual cues)
    document.querySelector('.nav-btn.prev').style.opacity = currentSlideIndex === 1 ? '0.3' : '1';
    document.querySelector('.nav-btn.next').style.opacity = currentSlideIndex === totalSlides ? '0.3' : '1';
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateControls();
    console.log("Deck System Online. Antigravity Protocol Active.");
});
