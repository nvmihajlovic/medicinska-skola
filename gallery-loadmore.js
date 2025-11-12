// gallery-loadmore.js - Load More funkcionalnost za galeriju

// Tracking visible images per category
let visibleCount = {};
const IMAGES_PER_LOAD = 6;

// Initialize visible count for all categories
function initializeVisibleCount(filter = 'all') {
    if (filter === 'all') {
        const categories = ['objekti', 'praktikum', 'aktivnosti', 'sport', 'dogadjaji', 'manifestacije', 'humanitarne'];
        categories.forEach(cat => {
            visibleCount[cat] = IMAGES_PER_LOAD;
        });
    } else {
        visibleCount = { [filter]: IMAGES_PER_LOAD };
    }
}

// Modified renderGallery function with Load More
function renderGalleryWithLoadMore(filter = 'all') {
    const grid = document.getElementById('galleryGrid');
    const loading = document.getElementById('galleryLoading');
    
    // Show loading
    loading.classList.add('active');
    grid.style.opacity = '0';
    
    setTimeout(() => {
        grid.innerHTML = '';
        initializeVisibleCount(filter);
        
        if (filter === 'all') {
            // Render all categories with their intros
            const categories = ['objekti', 'praktikum', 'aktivnosti', 'sport', 'dogadjaji', 'manifestacije', 'humanitarne'];
            categories.forEach((category, catIndex) => {
                const intro = categoryIntros[category];
                const introSection = document.createElement('div');
                introSection.className = 'gallery-section-intro';
                introSection.style.animationDelay = `${catIndex * 0.2}s`;
                introSection.innerHTML = `
                    <div class="intro-icon">
                        <i class="${intro.icon}"></i>
                    </div>
                    <h2>${intro.title}</h2>
                    <p>${intro.text}</p>
                `;
                grid.appendChild(introSection);

                // Category container with grid and button
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'category-container';
                categoryContainer.dataset.category = category;
                
                const categoryGrid = document.createElement('div');
                categoryGrid.className = 'category-grid';
                
                // Add visible images
                const categoryData = galleryData.filter(item => item.category === category);
                const visibleImages = categoryData.slice(0, visibleCount[category]);
                visibleImages.forEach((item, index) => {
                    const card = createGalleryCard(item, catIndex * 6 + index);
                    categoryGrid.appendChild(card);
                });
                
                categoryContainer.appendChild(categoryGrid);
                
                // Add Load More button if there are more images
                if (categoryData.length > visibleCount[category]) {
                    const loadMoreBtn = createLoadMoreButton(category, categoryData.length, categoryContainer);
                    categoryContainer.appendChild(loadMoreBtn);
                }
                
                grid.appendChild(categoryContainer);
            });
        } else {
            // Single category
            const intro = categoryIntros[filter];
            const introSection = document.createElement('div');
            introSection.className = 'gallery-section-intro';
            introSection.innerHTML = `
                <div class="intro-icon">
                    <i class="${intro.icon}"></i>
                </div>
                <h2>${intro.title}</h2>
                <p>${intro.text}</p>
            `;
            grid.appendChild(introSection);

            const categoryContainer = document.createElement('div');
            categoryContainer.className = 'category-container';
            categoryContainer.dataset.category = filter;
            
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'category-grid';
            
            const filteredData = galleryData.filter(item => item.category === filter);
            const visibleImages = filteredData.slice(0, visibleCount[filter]);
            visibleImages.forEach((item, index) => {
                const card = createGalleryCard(item, index);
                categoryGrid.appendChild(card);
            });
            
            categoryContainer.appendChild(categoryGrid);
            
            if (filteredData.length > visibleCount[filter]) {
                const loadMoreBtn = createLoadMoreButton(filter, filteredData.length, categoryContainer);
                categoryContainer.appendChild(loadMoreBtn);
            }
            
            grid.appendChild(categoryContainer);
        }

        loading.classList.remove('active');
        grid.style.opacity = '1';
    }, 600);
}

// Create Load More button
function createLoadMoreButton(category, totalCount, container) {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'load-more-btn';
    const remainingCount = totalCount - visibleCount[category];
    loadMoreBtn.innerHTML = `
        <i class="fas fa-images"></i>
        <span>Прикажи још (${remainingCount})</span>
    `;
    loadMoreBtn.addEventListener('click', () => loadMoreImages(category, container));
    return loadMoreBtn;
}

// Load more images for a category
function loadMoreImages(category, container) {
    const categoryGrid = container.querySelector('.category-grid');
    const loadMoreBtn = container.querySelector('.load-more-btn');
    const categoryData = galleryData.filter(item => item.category === category);
    
    // Update visible count
    const currentCount = visibleCount[category];
    const newCount = Math.min(currentCount + IMAGES_PER_LOAD, categoryData.length);
    visibleCount[category] = newCount;
    
    // Add new images with animation
    const newImages = categoryData.slice(currentCount, newCount);
    newImages.forEach((item, index) => {
        const card = createGalleryCard(item, currentCount + index);
        card.style.animation = 'cardFadeIn 0.5s ease forwards';
        card.style.animationDelay = `${index * 0.08}s`;
        card.style.opacity = '0';
        categoryGrid.appendChild(card);
    });
    
    // Update or remove button
    if (newCount >= categoryData.length) {
        loadMoreBtn.remove();
    } else {
        const remainingCount = categoryData.length - newCount;
        loadMoreBtn.querySelector('span').textContent = `Прикажи још (${remainingCount})`;
    }
}

// Replace original renderGallery with our new one
window.addEventListener('DOMContentLoaded', () => {
    // Override the filter buttons to use our new function
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGalleryWithLoadMore(btn.dataset.filter);
        });
    });
    
    // Initial render with Load More
    renderGalleryWithLoadMore();
});
