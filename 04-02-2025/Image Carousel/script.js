const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4'
];

let currentIndex = 0;
const carouselImages = document.querySelector('.carousel-images');

function updateImage() {
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function prevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateImage();
}

function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateImage();
}

carouselImages.innerHTML = images.map(image => `<img class="carousel-img" src="${image}" alt="Carousel Image">`).join('');
updateImage();
