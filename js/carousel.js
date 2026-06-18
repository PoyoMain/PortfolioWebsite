document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('lighting-carousel');
    const slides = document.querySelectorAll('.carousel-slide-link');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 4000; // Auto-slide delay (4 seconds)

    function updateCarousel(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        updateCarousel(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
    }

    function startTimer() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopTimer() {
        clearInterval(slideInterval);
    }

    // Intercept clicks on structural layout boundaries
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            updateCarousel(index);
        });
    });

    // Pause functionality on interaction focus
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);
    
    startTimer();
});