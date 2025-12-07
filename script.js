// Victorian Theme Logic - Enhanced Readability (+2 Units)
// Handles Scroll Animations, Clean Charts, and 3D Carousel

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initScrollAnimations();
    initCharts();
    initCarousel();
});

// --- Scroll Animation Logic ---
function initScrollAnimations() {
    const observerOptions = {
        root: document.getElementById('main-scroll'),
        threshold: 0.1 // Trigger sooner (10% visible)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all reveal elements inside the section
                const reveals = entry.target.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .reveal-top');
                reveals.forEach(el => el.classList.add('animate-in'));

                // Trigger charts based on ID references
                if (entry.target.id === 'slide-5') renderIncomeChart();
                if (entry.target.id === 'slide-6') renderVolumeChart();
                if (entry.target.id === 'slide-7') renderStrategyChart();
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// --- 3D Carousel Logic ---
function initCarousel() {
    const carousel = document.getElementById('gallery-carousel');
    if (!carousel) return;

    // List of assets found in directory
    const assets = [
        '/IMG-20251204-WA0267.jpg',
        '/VID-20251204-WA0273.mp4',
        '/IMG-20251204-WA0276.jpg',
        '/IMG-20251204-WA0278.jpg',
        '/IMG-20251204-WA0282.jpg',
        '/IMG-20251204-WA0286.jpg',
        '/IMG-20251204-WA0303.jpg',
        '/IMG-20251204-WA0314.jpg',
        '/IMG-20251204-WA0318.jpg',
        '/IMG-20251204-WA0328.jpg'
    ];

    const cellCount = assets.length;
    let selectedIndex = 0;
    const theta = 360 / cellCount;
    // Calculate radius to separate cells
    // radius = (cellWidth / 2) / tan(PI / cellCount)
    // cellWidth = 400px (defined in CSS)
    const radius = Math.round((450 / 2) / Math.tan(Math.PI / cellCount)) + 50;

    // Create Cells
    assets.forEach((asset, i) => {
        const cell = document.createElement('div');
        cell.className = 'carousel-cell';

        let content;
        if (asset.endsWith('.mp4')) {
            content = document.createElement('video');
            content.src = asset;
            content.controls = true;
            content.muted = true; // Auto-play muted maybe?
        } else {
            content = document.createElement('img');
            content.src = asset;
            content.alt = 'Field Evidence ' + (i + 1);
        }

        cell.appendChild(content);

        // Position in 3D circle
        const angle = theta * i;
        cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

        carousel.appendChild(cell);
    });

    const rotateCarousel = () => {
        const angle = theta * selectedIndex * -1;
        carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;

        // Update active class for visual pop
        const cells = carousel.querySelectorAll('.carousel-cell');
        cells.forEach((cell, i) => {
            // Very basic active check logic (can be refined)
            // Normalized index
            let normIndex = selectedIndex % cellCount;
            if (normIndex < 0) normIndex += cellCount;

            if (i === normIndex) {
                cell.classList.add('active-cell');
                // Auto play video if active?
                const vid = cell.querySelector('video');
                if (vid) vid.play();
            } else {
                cell.classList.remove('active-cell');
                const vid = cell.querySelector('video');
                if (vid) vid.pause();
            }
        });
    };

    // Initial Rotation
    rotateCarousel();

    // Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.addEventListener('click', () => {
        selectedIndex--;
        rotateCarousel();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        selectedIndex++;
        rotateCarousel();
    });
}

// --- Global Chart Defaults (Enhanced Readability) ---
Chart.defaults.color = '#9ca3af'; // Gray-400
Chart.defaults.font.family = "'Playfair Display', serif";
Chart.defaults.font.size = 16; // Increased from 14
Chart.defaults.borderColor = 'rgba(212, 175, 55, 0.1)';

// --- Chart Rendering ---
let charts = {};

function initCharts() {
    // This function can be used to pre-initialize or just hold the chart logic
    // Currently, specific charts are rendered on scroll/view
}

function renderIncomeChart() {
    const cvs = document.getElementById('incomeChart');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (charts.income) return;

    // Create Gradients
    const gradientGold = ctx.createLinearGradient(0, 0, 0, 400);
    gradientGold.addColorStop(0, '#E6C87C'); // Light Gold
    gradientGold.addColorStop(1, '#8B7038'); // Dark Gold

    const gradientCrimson = ctx.createLinearGradient(0, 0, 0, 400);
    gradientCrimson.addColorStop(0, '#A32E42'); // Bright Crimson
    gradientCrimson.addColorStop(1, '#420D15'); // Deep Crimson

    charts.income = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['< ₹10k', '₹10k - ₹15k', '₹15k - ₹20k', '> ₹20k'],
            datasets: [
                {
                    label: 'Pre-Aggregator (2014)',
                    data: [10, 25, 40, 25],
                    backgroundColor: gradientGold,
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8,
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowBlur: 10
                },
                {
                    label: 'Current (2025)',
                    data: [45, 35, 15, 5],
                    backgroundColor: gradientCrimson,
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { font: { size: 14, family: 'Lato' }, padding: 20 },
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Income Shift: The Collapse of Stability',
                    color: '#E5E5D8',
                    font: { size: 22, family: 'Cinzel', weight: 'bold' },
                    padding: { bottom: 30 }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { family: 'Cinzel', size: 16 },
                    bodyFont: { family: 'Lato', size: 14 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)', borderDash: [5, 5] },
                    ticks: { color: '#9ca3af', font: { family: 'Lato' } },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#C5A059', font: { family: 'Cinzel', size: 13 } },
                    border: { display: false }
                }
            },
            animation: { duration: 2000, easing: 'easeOutExpo' }
        }
    });
}

function renderVolumeChart() {
    const cvs = document.getElementById('volumeChart');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (charts.volume) return;

    // Gradients for segments
    const gCrimson = ctx.createLinearGradient(0, 0, 300, 300);
    gCrimson.addColorStop(0, '#A32E42');
    gCrimson.addColorStop(1, '#4A121D');

    const gGold = ctx.createLinearGradient(0, 0, 300, 300);
    gGold.addColorStop(0, '#E6C87C');
    gGold.addColorStop(1, '#8B7038');

    const gCharcoal = ctx.createLinearGradient(0, 0, 300, 300);
    gCharcoal.addColorStop(0, '#4B5563');
    gCharcoal.addColorStop(1, '#1F2937');

    charts.volume = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Decreased Significantly', 'Slight Decrease', 'No Change'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: [gCrimson, gGold, gCharcoal],
                borderColor: '#020617',
                borderWidth: 4,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: { font: { size: 16, family: 'Lato' }, boxWidth: 20, padding: 20 }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    bodyFont: { size: 16, family: 'Lato' },
                    padding: 15,
                    cornerRadius: 10
                }
            },
            layout: { padding: 20 },
            animation: { animateScale: true, animateRotate: true, duration: 2000, easing: 'easeOutCirc' }
        }
    });
}

function renderStrategyChart() {
    const cvs = document.getElementById('strategyChart');
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (charts.strategy) return;

    const g1 = ctx.createRadialGradient(250, 250, 0, 250, 250, 250);
    g1.addColorStop(0, 'rgba(197, 160, 89, 0.5)');
    g1.addColorStop(1, 'rgba(197, 160, 89, 0.9)');

    const g2 = ctx.createRadialGradient(250, 250, 0, 250, 250, 250);
    g2.addColorStop(0, 'rgba(112, 28, 42, 0.5)');
    g2.addColorStop(1, 'rgba(112, 28, 42, 0.9)');

    charts.strategy = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Price Wars', 'Zone Shifting', 'Helplessness'],
            datasets: [{
                data: [35, 25, 25],
                backgroundColor: [
                    'rgba(197, 160, 89, 0.7)',
                    'rgba(50, 60, 70, 0.7)',
                    'rgba(163, 46, 66, 0.7)'
                ],
                borderWidth: 3,
                borderColor: '#020617',
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    grid: { color: 'rgba(255,255,255,0.05)', lineWidth: 1 },
                    ticks: { display: false },
                    pointLabels: { display: true, font: { size: 16, family: 'Cinzel' }, color: '#E5E5D8' }
                }
            },
            plugins: {
                legend: { position: 'bottom', labels: { color: '#9ca3af', padding: 20, font: { family: 'Lato' } } }
            },
            animation: { duration: 2000, easing: 'easeOutBack' }
        }
    });
}
