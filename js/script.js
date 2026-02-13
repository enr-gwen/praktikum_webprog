// Constellation Background
const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 80;
const maxDistance = 150;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinklePhase: Math.random() * Math.PI * 2,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        });
    }
}

function drawConstellation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update star positions
    stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
    });
    
    // Draw connecting lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.2;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Draw stars
    stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(drawConstellation);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawConstellation();

const sections = document.querySelectorAll("section");

// Parallax effect on scroll
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  
  sections.forEach((sec, index) => {
    
    const top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      sec.classList.add("show");
    }
    
    
    const parallaxBg = sec.querySelector(".parallax-bg");
    if(parallaxBg) {
      const sectionTop = sec.offsetTop;
      const distance = scrollY - sectionTop;
      
      
      parallaxBg.style.transform = `translateY(${distance * 0.5}px)`;
    }
    
    
    const parallaxElements = sec.querySelectorAll("[data-parallax]");
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const sectionTop = sec.offsetTop;
      const distance = scrollY - sectionTop;
      
      
      const yOffset = (distance * (speed - 1)) * 0.3; 
      el.style.transform = `translateY(${yOffset}px)`;
    });
  });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    alert(`Thank you ${name}! Your message has been received.\n\nWe'll get back to you at ${email} soon!`);
    
    // Reset form
    contactForm.reset();
    
    // Optional: Log to console (you can replace this with actual backend API call)
    console.log('Form submitted:', { name, email, message });
  });
}
