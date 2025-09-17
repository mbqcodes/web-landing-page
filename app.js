const slider = document.querySelector('.gallery-items');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

const items = document.querySelectorAll('.gallery-items .item');
const galleryText = document.querySelector('.gallery-text');


// Gallery


let scrollAmount = 0;

function getItemWidth() {
    const item = slider.querySelector('.item');
    const itemStyles = window.getComputedStyle(item);
    const itemWidth = item.offsetWidth;
    const gap = parseFloat(itemStyles.marginRight) || 0; 
    return itemWidth + gap;
}

function getVisibleWidth() {
    return slider.parentElement.clientWidth;
}

function getTotalWidth() {
    return slider.scrollWidth;
}

function getMaxScroll() {
    return getTotalWidth() - getVisibleWidth();
}

nextBtn.addEventListener('click', () => {
    const step = getItemWidth() * 4; 
    const maxScroll = getMaxScroll();
    if (scrollAmount < maxScroll) {
        scrollAmount += step;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    const step = getItemWidth() * 4;
    if (scrollAmount > 0) {
        scrollAmount -= step;
        if (scrollAmount < 0) scrollAmount = 0;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
});

const observer = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            delay += 500; 
        }
    });
}, { threshold: 0.65 });


observer.observe(galleryText);


items.forEach(item => observer.observe(item));

//Metrics