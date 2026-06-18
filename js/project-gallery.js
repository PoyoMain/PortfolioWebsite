document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail-card');
    const mainViewer = document.getElementById('gallery-main-viewer');
    const captionTarget = document.getElementById('theatre-caption-target');

    thumbnails.forEach(card => {
        card.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            card.classList.add('active');

            const internalMedia = card.querySelector('img, video');
            const captionText = card.getAttribute('data-caption');

            if (internalMedia) {
                const oldMedia = document.getElementById('theatre-active-media');
                if (oldMedia) oldMedia.remove();

                const clonedMedia = internalMedia.cloneNode(true);
                
                clonedMedia.id = 'theatre-active-media';
                clonedMedia.removeAttribute('hidden');
                
                if (clonedMedia.tagName.toLowerCase() === 'video') {
                    clonedMedia.muted = true;
                    clonedMedia.autoplay = true;
                    clonedMedia.loop = true;
                    clonedMedia.removeAttribute('pointer-events');
                }

                mainViewer.insertBefore(clonedMedia, captionTarget);
                
                if (clonedMedia.tagName.toLowerCase() === 'video') {
                    clonedMedia.play().catch(e => console.log("Handled browser video gate:", e));
                }
            }

            if (captionText) captionTarget.textContent = captionText;
        });
    });
});
