// Timeline data - You can modify this with your own information

// Skills data for the typing animation
const skills = [
    'Data Analysis',
    'Machine Learning',
    'Data Visualization',
    'Python',
    'SQL',
    'Tableau',
    'Power BI',
    'Statistical Modeling'
];

// Enhanced smooth scrolling function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Get the target position
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        // Custom easing function for smoother acceleration/deceleration
        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        // Animation duration based on distance (slower for longer distances)
        const duration = 1200 + Math.min(Math.abs(distance) * 0.5, 800);
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Apply easing to the progress
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * easedProgress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Ensure we land exactly on the target
                window.scrollTo(0, targetPosition);
            }
        }
        
        // Start the animation
        requestAnimationFrame(animation);
    });
});

// Optional: Add a subtle bounce effect when reaching the target
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function() {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.classList.add('highlight-section');
                setTimeout(() => {
                    targetElement.classList.remove('highlight-section');
                }, 1000);
            }
        }, 1300); // Delay slightly longer than the scroll duration
    });
});



// Function to create typing animation
function createTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentSkill = skills[skillIndex];
        
        if (isDeleting) {
            typingText.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentSkill.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Function to create timeline items with interactive features
function createTimeline() {
    const timeline = document.querySelector('.timeline');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3><i class="${item.icon}"></i> ${item.title}</h3>
                <div class="date">${item.date}</div>
                <p>${item.description}</p>
                <div class="skills-list">
                    ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);

        // Add click event to show more details
        const content = timelineItem.querySelector('.timeline-content');
        content.addEventListener('click', () => {
            content.classList.toggle('expanded');
        });
    });
}

// Function to handle scroll animation with Intersection Observer
function setupScrollAnimation() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
}

// Function to create particle background
function createParticleBackground() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-background');
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// --- 3D Rotating Skills Sphere: Black & White, Large, Slow ---
document.addEventListener('DOMContentLoaded', function () {
    // Skill data
    const skills = [
        // Data Analysis
        { name: 'Python', percent: 90, category: 'data-analysis' },
        { name: 'Pandas', percent: 85, category: 'data-analysis' },
        { name: 'Numpy', percent: 80, category: 'data-analysis' },
        { name: 'Excel', percent: 80, category: 'data-analysis' },
        { name: 'Matplotlib', percent: 80, category: 'data-analysis' },
        { name: 'Seaborn', percent: 75, category: 'data-analysis' },
        { name: 'PowerBI', percent: 70, category: 'data-analysis' },
        { name: 'SQL', percent: 80, category: 'data-analysis' },
        { name: 'R', percent: 30, category: 'data-analysis' },
        // AI and Automation
        { name: 'BeautifulSoup', percent: 80, category: 'ai-automation' },
        { name: 'Selenium', percent: 50, category: 'ai-automation' },
        { name: 'Classification', percent: 85, category: 'ai-automation' },
        { name: 'Regression', percent: 90, category: 'ai-automation' },
        { name: 'XGBoost', percent: 50, category: 'ai-automation' },
        { name: 'Random Forest', percent: 40, category: 'ai-automation' },
        { name: 'SVM', percent: 45, category: 'ai-automation' },
        { name: 'HuggingFace Integration', percent: 60, category: 'ai-automation' },
        { name: 'PDF Parser', percent: 70, category: 'ai-automation' },
        // Web Development
        { name: 'HTML5', percent: 85, category: 'web-development' },
        { name: 'CSS3', percent: 80, category: 'web-development' },
        { name: 'JavaScript', percent: 70, category: 'web-development' },
        { name: 'React.js', percent: 60, category: 'web-development' },
        { name: 'Tailwind CSS', percent: 70, category: 'web-development' },
        { name: 'Bootstrap', percent: 55, category: 'web-development' },
        { name: 'Node.js', percent: 60, category: 'web-development' },
        { name: 'Java', percent: 90, category: 'web-development' },
        { name: 'C++', percent: 70, category: 'web-development' },
        { name: 'MySQL', percent: 80, category: 'web-development' },
        { name: 'Git', percent: 80, category: 'web-development' },
        // Soft Skills
        { name: 'Communication', percent: 75, category: 'soft-skills' },
        { name: 'Leadership', percent: 90, category: 'soft-skills' },
        { name: 'Teamwork', percent: 100, category: 'soft-skills' },
        { name: 'Problem Solving', percent: 95, category: 'soft-skills' },
        { name: 'Public Speaking', percent: 100, category: 'soft-skills' },
        { name: 'Presentations', percent: 100, category: 'soft-skills' },
        { name: 'Management', percent: 80, category: 'soft-skills' },
    ];

    const sphereContainer = document.getElementById('skillsSphere');
    const filterBtns = document.querySelectorAll('.skills-filter-btn');

    function getFontWeight(percent) {
        if (percent >= 85) return 850;
        if (percent >= 70) return 750;
        if (percent >= 50) return 650;
        if (percent >= 30) return 600;
        return 500;
    }
    function getOpacity(percent) {
        return Math.max(0.15, percent / 100);
    }
    function getSphereCoords(count, i, radius, phiOffset = 0, thetaOffset = 0) {
        const phi = Math.acos(-1 + (2 * i + 1) / count) + phiOffset;
        const theta = Math.sqrt(count * Math.PI) * phi + thetaOffset;
        return {
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi)
        };
    }
    function renderSphere(filter = 'all') {
        sphereContainer.innerHTML = '';
        const filteredSkills = filter === 'all' ? skills : skills.filter(s => s.category === filter);
        const total = filteredSkills.length;
        const radius = sphereContainer.offsetWidth / 2.2;
        filteredSkills.forEach((skill, i) => {
            const span = document.createElement('span');
            span.className = 'sphere-skill-item';
            span.setAttribute('data-category', skill.category);
            span.setAttribute('data-name', skill.name);
            span.setAttribute('data-percent', skill.percent);
            span.style.opacity = getOpacity(skill.percent);
            span.style.fontWeight = getFontWeight(skill.percent);
            span.textContent = skill.name;
            sphereContainer.appendChild(span);
        });
    }
    renderSphere();
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderSphere(filter);
        });
    });
    let angleX = 0.00007; // very slow
    let angleY = 0.00007; // very slow
    let rotationX = 0;
    let rotationY = 0;
    let dragging = false;
    let lastX, lastY;
    function animateSphere() {
        if (!dragging) {
            rotationX += angleX;
            rotationY += angleY;
        }
        const skillSpans = sphereContainer.querySelectorAll('.sphere-skill-item');
        const total = skillSpans.length;
        const radius = sphereContainer.offsetWidth / 2.2;
        skillSpans.forEach((span, i) => {
            const coords = getSphereCoords(total, i, radius, rotationX, rotationY);
            const perspective = 1200;
            const scale = perspective / (perspective - coords.z);
            const x = coords.x * scale;
            const y = coords.y * scale;
            span.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            span.style.zIndex = Math.floor(1000 + coords.z);
            span.style.opacity = getOpacity(parseInt(span.getAttribute('data-percent'))) * scale;
        });
        requestAnimationFrame(animateSphere);
    }
    animateSphere();
    // Collapsible filter bar logic
    const filterToggle = document.getElementById('skillsFilterToggle');
    const filterBar = document.getElementById('skillsFilters');
    if (filterToggle && filterBar) {
        filterToggle.addEventListener('click', function() {
            const expanded = filterToggle.getAttribute('aria-expanded') === 'true';
            filterBar.style.display = expanded ? 'none' : 'flex';
            filterToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            filterToggle.innerHTML = expanded ? 'Filter Skills &#9662;' : 'Filter Skills &#9652;';
        });
        document.addEventListener('mousedown', function(e) {
            if (!filterBar.contains(e.target) && !filterToggle.contains(e.target)) {
                filterBar.style.display = 'none';
                filterToggle.setAttribute('aria-expanded', 'false');
                filterToggle.innerHTML = 'Filter Skills &#9662;';
            }
        });
    }
    // Make manual rotation very slow and smooth
    const DRAG_SENSITIVITY = 0.0007; // Lower = slower
    if (sphereContainer) {
        sphereContainer.addEventListener('mousedown', function(e) {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            document.body.style.cursor = 'grabbing';
        });
        window.addEventListener('mousemove', function(e) {
            if (dragging) {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                rotationY -= dx * DRAG_SENSITIVITY; // Reverse direction
                rotationX -= dy * DRAG_SENSITIVITY; // Reverse direction
                lastX = e.clientX;
                lastY = e.clientY;
            }
        });
        window.addEventListener('mouseup', function() {
            dragging = false;
            document.body.style.cursor = '';
        });
        sphereContainer.addEventListener('touchstart', function(e) {
            dragging = true;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
        });
        window.addEventListener('touchmove', function(e) {
            if (dragging && e.touches.length === 1) {
                const dx = e.touches[0].clientX - lastX;
                const dy = e.touches[0].clientY - lastY;
                rotationY -= dx * DRAG_SENSITIVITY; // Reverse direction
                rotationX -= dy * DRAG_SENSITIVITY; // Reverse direction
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
            }
        });
        window.addEventListener('touchend', function() {
            dragging = false;
        });
    }
    window.addEventListener('resize', () => {
        const activeBtn = document.querySelector('.skills-filter-btn.active');
        const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        renderSphere(filter);
    });
});

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createTimeline();
    setupScrollAnimation();
    createTypingAnimation();
    createParticleBackground();
}); 

// Typing animation
const typingText = document.querySelector('.typing-text');
const words = ['Data Analysis', 'Machine Learning', 'Data Visualization', 'Python', 'Power BI', 'Problem Solving'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Smooth percentage counter animation
const percentageText = document.querySelector('.chart-text');
const circle = document.querySelector('.chart-circle');
const circumference = 251.2; // 2 * π * 40 (radius)

let currentPercentage = 0;
let targetPercentage = 100;
let startTime = null;
let animationDuration = 3000; // 3 seconds for one complete cycle

// Easing function for smooth animation
function easeInOutCubic(t) {
    return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function updatePercentage(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / animationDuration, 1);
    
    // Apply easing function
    const easedPercentage = easeInOutCubic(percentage);
    
    // Calculate current percentage
    currentPercentage = Math.floor(easedPercentage * 100);
    
    // Update text and circle
    percentageText.textContent = `${currentPercentage}%`;
    const offset = circumference - (easedPercentage * circumference);
    circle.style.strokeDashoffset = offset;
    
    if (progress < animationDuration) {
        requestAnimationFrame(updatePercentage);
    } else {
        // Reset and start over
        startTime = null;
        setTimeout(() => {
            requestAnimationFrame(updatePercentage);
        }, 500); // Short pause before restarting
    }
}

// Start both animations when the page loads
window.onload = function() {
    type();
    requestAnimationFrame(updatePercentage);
};

// Function to handle header visibility
function handleHeaderVisibility() {
    const header = document.querySelector('.sticky-header');
    const hero = document.querySelector('.hero');
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    if (window.scrollY > heroBottom - 100) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleHeaderVisibility);
// Initial check
handleHeaderVisibility();
