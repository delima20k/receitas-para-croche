// Smooth scroll to offer (if needed, though direct links are common)
function scrollToOffer() {
    document.getElementById('offer').scrollIntoView({
        behavior: 'smooth'
    });
}

// Enhanced countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight tomorrow
    const distance = tomorrow.getTime() - now;

    // If countdown goes negative, reset to next day's midnight
    if (distance < 0) {
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const newDistance = tomorrow.getTime() - now;
        updateCountdownDisplay(newDistance);
    } else {
        updateCountdownDisplay(distance);
    }

    function updateCountdownDisplay(dist) {
        const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((dist % (1000 * 60)) / 1000);

        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

        // Add urgency effect when time is low
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) { // Check if element exists before adding class
             if (hours < 2 && minutes < 30) { // More specific urgency
                countdownElement.classList.add("animate-pulse");
            } else {
                countdownElement.classList.remove("animate-pulse");
            }
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Call once immediately to avoid flicker

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-3d, .testimonial-card, .bonus > div'); // Also observe bonus divs
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Add parallax effect to floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-card');

    parallax.forEach((element, index) => {
        const speed = 0.05 + (index * 0.02); // Reduced speed for subtlety
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Cloudflare script (keep as is for bot protection)
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'960796723647f245',t:'MTc1MjczMjc0Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();