/* WCAG Badge Scroll Behavior */
(function() {
    const wcagBadge = document.querySelector('.wcag-badge');
    if (!wcagBadge) return;

    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300 && scrollTop > lastScrollTop) {
            wcagBadge.classList.add('hidden');
        } else if (scrollTop < lastScrollTop) {
            wcagBadge.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Mobile tooltip toggle on click
    if (window.innerWidth <= 768) {
        wcagBadge.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Close tooltip when clicking outside
        document.addEventListener('click', function(e) {
            if (!wcagBadge.contains(e.target)) {
                wcagBadge.classList.remove('active');
            }
        });
    }
})();
