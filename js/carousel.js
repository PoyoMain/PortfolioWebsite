document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('lighting-carousel');
    const slides = document.querySelectorAll('.carousel-slide-link');
    const dotsContainer = document.getElementById('dots-container');
    
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 4000;

    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateCarousel(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        const activeVideo = slides[currentIndex].querySelector('video');
        if (activeVideo) {
            activeVideo.currentTime = 0;
            const playPromise = activeVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Browser playback rule handled smoothly:", error);
                });
            }
        }
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

    // Explicit interaction listeners
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

    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);
    
    startTimer();
});
