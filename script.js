document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.content');
                if (content) {
                    content.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide);
    });

    // 2. Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    });

    // 3. Parallax Background Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        document.querySelectorAll('.background-image').forEach(bg => {
            // Find the parent slide's offset
            const parent = bg.parentElement;
            const parentTop = parent.offsetTop;
            const rate = (scrolled - parentTop) * 0.3;

            // Only apply if near viewport to save perf
            if (scrolled > parentTop - window.innerHeight && scrolled < parentTop + window.innerHeight) {
                bg.style.transform = `translateY(${rate}px) scale(1.1)`;
            }
        });
    });

    console.log("Antigravity System Online.");
});
