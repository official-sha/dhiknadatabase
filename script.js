/* ============================================
   DHIKNA DATABASE - JAVASCRIPT
   Interactive Features & Animations
   ============================================ */

// ============================================
// PAGE LOAD & INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page load
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
    
    // Initialize all features
    initFloatingLeaves();
    initScrollAnimations();
    initNavbarScroll();
    initCounterAnimation();
    initCountdownTimer();
    initMultiFloatButton();
    initFloatingComment();
    initSmoothScroll();
    initVideoPlayers();
    
    console.log('Dhikna Database - Website Loaded Successfully! 🌱');
});

// ============================================
// FLOATING LEAVES ANIMATION
// ============================================
function initFloatingLeaves() {
    const leavesContainer = document.getElementById('floatingLeaves');
    const leafCount = 15;
    
    for (let i = 0; i < leafCount; i++) {
        createLeaf(leavesContainer);
    }
}

function createLeaf(container) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Random properties
    const left = Math.random() * 100;
    const animationDuration = 10 + Math.random() * 20;
    const size = 15 + Math.random() * 15;
    const delay = Math.random() * 10;
    const opacity = 0.2 + Math.random() * 0.3;
    
    leaf.style.left = `${left}%`;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.animationDuration = `${animationDuration}s`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.opacity = opacity;
    
    container.appendChild(leaf);
    
    // Recreate leaf after animation ends
    setTimeout(() => {
        leaf.remove();
        createLeaf(container);
    }, (animationDuration + delay) * 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// COUNTER ANIMATION (Trust Section)
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.trust-number');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounters() {
    const counters = document.querySelectorAll('.trust-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        if (!target) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('id-ID');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('id-ID');
            }
        };
        
        updateCounter();
    });
}

// ============================================
// COUNTDOWN TIMER (Promo Section)
// ============================================
function initCountdownTimer() {
    // Set countdown to 6 hours from now
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 6);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            // Reset timer to 6 hours if expired
            countdownDate.setHours(countdownDate.getHours() + 6);
            return;
        }
        
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update timer display
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // Update countdown text
        const countdownText = document.getElementById('countdown-text');
        if (countdownText) {
            countdownText.textContent = `${hours} jam ${minutes} menit ${seconds} detik`;
        }
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// MULTI FLOATING CHAT BUTTON
// ============================================
function initMultiFloatButton() {
    const floatBtn = document.getElementById('multiFloatBtn');
    const chatButtons = document.getElementById('floatingChatButtons');
    
    if (!floatBtn || !chatButtons) return;
    
    let isOpen = false;
    
    floatBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            chatButtons.classList.add('active');
            floatBtn.style.transform = 'rotate(45deg)';
        } else {
            chatButtons.classList.remove('active');
            floatBtn.style.transform = 'rotate(0deg)';
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatBtn.contains(e.target) && !chatButtons.contains(e.target)) {
            chatButtons.classList.remove('active');
            floatBtn.style.transform = 'rotate(0deg)';
            isOpen = false;
        }
    });
}

// ============================================
// FLOATING COMMENT ANIMATION
// ============================================
function initFloatingComment() {
    const comments = [
        {
            name: 'Rani - Member Aktif',
            text: '"3 bulan udah balik modal & profit 4 juta/bulan! 🔥"',
            avatar: 'RA',
            color: 'linear-gradient(135deg, #f59e0b, #d97706)'
        },
        {
            name: 'Dina - Sukses Bisnis',
            text: '"Dari nol sekarang bisa 2-3jt/bulan! 💰"',
            avatar: 'DN',
            color: 'linear-gradient(135deg, #10b981, #059669)'
        },
        {
            name: 'Adit - Member Baru',
            text: '"Baru 1 bulan udah dapet order pertama! 🎉"',
            avatar: 'AD',
            color: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        },
        {
            name: 'Intan - 4 Bulan Member',
            text: '"Modal kecil, hasil luar biasa! Recommended! ✨"',
            avatar: 'IN',
            color: 'linear-gradient(135deg, #ec4899, #db2777)'
        },
        {
            name: 'Surya - Reseller Aktif',
            text: '"Dibimbing sampai benar-benar paham! 👍"',
            avatar: 'SR',
            color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        }
    ];
    
    let currentIndex = 0;
    
    function showNextComment() {
        const commentEl = document.getElementById('floatingComment');
        if (!commentEl) return;
        
        const comment = comments[currentIndex];
        
        // Fade out
        commentEl.style.opacity = '0';
        commentEl.style.transform = 'translateX(400px)';
        
        setTimeout(() => {
            // Update content
            const avatarEl = commentEl.querySelector('.comment-avatar');
            const nameEl = commentEl.querySelector('.comment-name');
            const textEl = commentEl.querySelector('.comment-text');
            
            if (avatarEl) {
                avatarEl.textContent = comment.avatar;
                avatarEl.style.background = comment.color;
            }
            if (nameEl) nameEl.textContent = comment.name;
            if (textEl) textEl.textContent = comment.text;
            
            // Fade in
            commentEl.style.opacity = '1';
            commentEl.style.transform = 'translateX(0)';
            
            currentIndex = (currentIndex + 1) % comments.length;
        }, 500);
    }
    
    // Change comment every 5 seconds
    setInterval(showNextComment, 5000);
}

// ============================================
// VIDEO PLAYER FUNCTIONALITY
// ============================================
function initVideoPlayers() {
    const videos = document.querySelectorAll('.facility-video-portrait, .facility-video');
    
    videos.forEach(video => {
        const wrapper = video.closest('.video-portrait-container') || video.closest('.video-wrapper');
        const overlay = wrapper ? wrapper.querySelector('.video-portrait-overlay, .video-overlay') : null;
        
        // Hide overlay when video starts playing
        video.addEventListener('play', () => {
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            }
        });
        
        // Show overlay when video is paused or ends
        video.addEventListener('pause', () => {
            if (overlay && video.currentTime === 0) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'none';
            }
        });
        
        video.addEventListener('ended', () => {
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'none';
            }
        });
        
        // Track video engagement
        video.addEventListener('play', () => {
            console.log('📹 Fasilitas video played');
        });
        
        // Track video completion
        video.addEventListener('ended', () => {
            console.log('✅ Video watched completely');
        });
        
        // Lazy load videos when they come into view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoElement = entry.target;
                    if (videoElement.dataset.src) {
                        videoElement.src = videoElement.dataset.src;
                        videoElement.load();
                        delete videoElement.dataset.src;
                    }
                    videoObserver.unobserve(videoElement);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        videoObserver.observe(video);
    });
}

// ============================================
// SLIDER FUNCTIONALITY
// ============================================
function scrollSlider(sliderId, amount) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    slider.scrollBy({
        left: amount,
        behavior: 'smooth'
    });
}

// Auto-scroll sliders
function initAutoSliders() {
    const sliders = document.querySelectorAll('.slider-wrapper');
    
    sliders.forEach(slider => {
        let scrollAmount = 0;
        const scrollSpeed = 1;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        setInterval(() => {
            if (scrollAmount >= maxScroll) {
                scrollAmount = 0;
            } else {
                scrollAmount += scrollSpeed;
            }
            
            slider.scrollLeft = scrollAmount;
        }, 50);
    });
}

// Make scrollSlider available globally
window.scrollSlider = scrollSlider;

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax
initParallax();

// ============================================
// IMAGE LAZY LOADING
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

initLazyLoading();

// ============================================
// FORM VALIDATION (if forms are added)
// ============================================
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Submit form
            form.submit();
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi!');
        }
    });
}

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Make showToast available globally
window.showToast = showToast;

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Berhasil disalin! 📋', 'success');
        }).catch(() => {
            showToast('Gagal menyalin', 'error');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Berhasil disalin! 📋', 'success');
    }
}

window.copyToClipboard = copyToClipboard;

// ============================================
// PERFORMANCE MONITORING
// ============================================
function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
            }, 0);
        });
    }
}

logPerformance();

// ============================================
// DETECT MOBILE DEVICE
// ============================================
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('mobile-device');
    console.log('📱 Mobile device detected');
}

// ============================================
// EASTER EGG (Fun feature)
// ============================================
let clickCount = 0;
const logo = document.querySelector('.logo-nav');

if (logo) {
    logo.addEventListener('click', (e) => {
        clickCount++;
        
        if (clickCount === 5) {
            showToast('🌱 Semangat berbisnis! Kamu pasti bisa! 💪', 'success');
            clickCount = 0;
            
            // Add confetti effect (simple version)
            for (let i = 0; i < 30; i++) {
                createConfetti();
            }
        }
    });
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#10b981', '#fbbf24', '#3b82f6', '#ec4899'][Math.floor(Math.random() * 4)]};
        top: 0;
        left: ${Math.random() * 100}vw;
        animation: confettiFall ${2 + Math.random() * 3}s linear;
        z-index: 10000;
        pointer-events: none;
        border-radius: 50%;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// TRACK USER ENGAGEMENT (Optional Analytics)
// ============================================
function trackEngagement() {
    let scrollDepth = 0;
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        scrollDepth = (scrollTop + windowHeight) / documentHeight * 100;
        maxScroll = Math.max(maxScroll, scrollDepth);
        
        // Log milestones
        if (maxScroll >= 25 && !window.milestone25) {
            console.log('📊 User scrolled 25%');
            window.milestone25 = true;
        }
        if (maxScroll >= 50 && !window.milestone50) {
            console.log('📊 User scrolled 50%');
            window.milestone50 = true;
        }
        if (maxScroll >= 75 && !window.milestone75) {
            console.log('📊 User scrolled 75%');
            window.milestone75 = true;
        }
        if (maxScroll >= 90 && !window.milestone90) {
            console.log('📊 User scrolled 90% - Highly engaged!');
            window.milestone90 = true;
        }
    });
}

trackEngagement();

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'P' to go to promo section
    if (e.key === 'p' || e.key === 'P') {
        const promoSection = document.getElementById('promo');
        if (promoSection) {
            promoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

console.log('💡 Tip: Press "T" untuk ke atas, "P" untuk ke promo!');

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🌱 Dhikna Database - Website Loaded! ', 'background: #10b981; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%cSemua fitur interaktif aktif! ✅', 'color: #10b981; font-size: 14px;');
console.log('%cDibuat dengan ❤️ untuk kesuksesanmu!', 'color: #fbbf24; font-size: 12px;');