document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail-card');
    const displayTarget = document.getElementById('theatre-display-target');
    const captionTarget = document.getElementById('theatre-caption-target');

    thumbnails.forEach(card => {
        card.addEventListener('click', () => {
            // Drop running layout configurations from prior selection
            thumbnails.forEach(t => t.classList.remove('active'));

            // Focus current element target 
            card.classList.add('active');

            // Collect target data properties
            const newImageSrc = card.getAttribute('data-large');
            const newCaptionText = card.getAttribute('data-caption');

            // Swap out primary view content fields
            if (newImageSrc) displayTarget.setAttribute('src', newImageSrc);
            if (newCaptionText) captionTarget.textContent = newCaptionText;
        });
    });
});