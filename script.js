let currentSlide = 1;
const totalSlides = 10;
let charts = {}; // Store chart instances

document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
    initCharts(); // Pre-init or Lazy-init
});

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

function updateSlide() {
    // 1. Remove active class from all
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));

    // 2. Add active to current
    const activeSlide = document.getElementById(`slide-${currentSlide}`);
    activeSlide.classList.add('active');

    // 3. Update Text Indicator
    document.getElementById('slide-indicator').innerText = `${currentSlide} / ${totalSlides}`;

    // 4. Trigger Animations (Chart Re-render if needed)
    // Just a safety check to ensure charts render correctly when visible
    if (currentSlide === 5) renderIncomeChart();
    if (currentSlide === 6) renderVolumeChart();
    if (currentSlide === 7) renderStrategyChart();
}

// Keyboard Nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// --- CHART LOGIC (Data from LaTeX Report) ---

function renderIncomeChart() {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    if (charts.income) return; // Prevent re-creation

    charts.income = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['< ₹10k', '₹10k - ₹15k', '₹15k - ₹20k', '> ₹20k'],
            datasets: [
                {
                    label: 'Pre-Aggregator (2014)',
                    data: [10, 25, 40, 25], // Synthetic estimations based on "Shift from high to low"
                    backgroundColor: '#e5e5ea' // Gray
                },
                {
                    label: 'Current (2025)',
                    data: [45, 35, 15, 5], // Drastic shift left
                    backgroundColor: '#007aff' // Apple Blue
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Shift in Monthly Income Brackets (%)', font: { family: 'Times New Roman', size: 16 } }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function renderVolumeChart() {
    const ctx = document.getElementById('volumeChart').getContext('2d');
    if (charts.volume) return;

    charts.volume = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Decreased Significantly', 'Slight Decrease', 'No Change/Increase'],
            datasets: [{
                data: [65, 20, 15], // Majority Negative
                backgroundColor: ['#ff3b30', '#ff9500', '#34c759'] // Red, Orange, Green
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Impact on Customer Volume', font: { family: 'Times New Roman', size: 16 } }
            },
            animation: { animateScale: true }
        }
    });
}

function renderStrategyChart() {
    const ctx = document.getElementById('strategyChart').getContext('2d');
    if (charts.strategy) return;

    charts.strategy = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Reduced Fare', 'Joined App', 'Changed Area', 'No Strategy/Helpless'],
            datasets: [{
                data: [35, 15, 25, 25],
                backgroundColor: ['#5856d6', '#007aff', '#ff2d55', '#8e8e93'] // Purple, Blue, Pink, Gray
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Adaptation Strategies', font: { family: 'Times New Roman', size: 16 } }
            },
            animation: { animateRotate: true }
        }
    });
}
