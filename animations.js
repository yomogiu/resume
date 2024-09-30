const menuButtons = document.querySelectorAll('.rpg-menu-button');
const sections = document.querySelectorAll('section');

// RPG menu button click animation and navigation
menuButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        // Button click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Scroll to target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Falling stars animation
const fallingStarsContainer = document.querySelector('.falling-stars');
const starCount = 20;

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 500}%`;
    star.style.top = '-10px';
    star.style.animationDuration = `${Math.random() * 1 + 1}s`;
    fallingStarsContainer.appendChild(star);

    star.animate([
        { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
        { transform: 'translateY(200px) rotate(45deg)', opacity: 0 }
    ], {
        duration: parseFloat(star.style.animationDuration) * 1000,
        easing: 'linear',
        iterations: 1
    }).onfinish = () => {
        star.remove();
        createStar();
    };
}

for (let i = 0; i < starCount; i++) {
    setTimeout(createStar, Math.random() * 2000);
}