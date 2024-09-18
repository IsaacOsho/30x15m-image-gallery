document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.gallery img');
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeBtn = document.querySelector('.close-btn');

    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            overlay.style.display = 'flex';
            overlayImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
        overlayImg.src = '';
    });

    // Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    overlay.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    overlay.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - swipeThreshold) {
            navigateImages('next');
        } else if (touchEndX > touchStartX + swipeThreshold) {
            navigateImages('prev');
        }
    }

    function navigateImages(direction) {
        const currentIndex = Array.from(galleryImages).findIndex(img => img.src === overlayImg.src);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % galleryImages.length;
        } else {
            newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        }

        overlayImg.src = galleryImages[newIndex].src;
    }
});
