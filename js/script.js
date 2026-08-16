/**
 * Premium JavaScript Architecture
 * All Star Carpet and Cleaning Services Timaru
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const bars = menuToggle.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // --- 3. Intersection Observer (Scroll Animations) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 4. Before/After Slider ---
    const slider = document.querySelector('.ba-slider');
    if (slider) {
        const afterImg = slider.querySelector('.after-img');
        const handle = slider.querySelector('.slider-handle');
        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let xPos = clientX - rect.left;
            
            // Constrain bounds
            if (xPos < 0) xPos = 0;
            if (xPos > rect.width) xPos = rect.width;
            
            const percentage = (xPos / rect.width) * 100;
            afterImg.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        handle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        });

        // Touch support
        handle.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].clientX);
        });
    }

    // --- 5. Masonry Gallery Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- 6. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.icon').textContent = '+';
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.icon').textContent = '−';
            }
        });
    });

    // --- 7. Editable Stat Sync (Optional for demo) ---
    // This allows the client to test editing the 10+ experience number
    const editableStats = document.querySelectorAll('.editable');
    editableStats.forEach(stat => {
        stat.addEventListener('input', (e) => {
            const newValue = e.target.textContent;
            // Sync across all identical elements if needed (e.g. updating one 10+ updates them all)
            editableStats.forEach(otherStat => {
                if (otherStat !== stat) {
                    otherStat.textContent = newValue;
                }
            });
        });
    });

});
