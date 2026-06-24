// Mobile menu toggle with improved functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.contains('active');
    
    navMenu.classList.toggle('active');
    
    // Toggle hamburger to X icon
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      if (isActive) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    }
    
    // Prevent body scroll when menu is open
    if (!isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
      document.body.style.overflow = '';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
      document.body.style.overflow = '';
    }
  });

  // Handle window resize - close menu if switching to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
      document.body.style.overflow = '';
    }
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animated counters
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 20);
}

// Intersection Observer for stats
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
  observer.observe(statsSection);
}

// Parallax effect for orbs (only on non-mobile devices)
if (window.innerWidth > 768) {
  window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.5;
      orb.style.transform = `translate(${x * speed * 50}px, ${y * speed * 50}px)`;
    });
  });
}

// Glitch effect for logo
const logo = document.querySelector('.logo');
setInterval(() => {
  if (Math.random() < 0.1) {
    logo.style.textShadow = `
      ${Math.random() * 10 - 5}px 0 #ff0000,
      ${Math.random() * 10 - 5}px 0 #00ff00,
      ${Math.random() * 10 - 5}px 0 #0000ff
    `;
    setTimeout(() => {
      logo.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
    }, 100);
  }
}, 2000);

// Dynamic typing effect
const subtitle = document.querySelector('.hero-subtitle');
const originalText = '> Building tomorrow\'s software today_';
let i = 0;

function typeWriter() {
  if (i < originalText.length) {
    subtitle.textContent = originalText.substring(0, i + 1);
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect after page load
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});

// Mobile-specific improvements
function handleMobileImprovements() {
  // Prevent zoom on input focus for iOS
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.fontSize = '16px';
      });
      input.addEventListener('blur', () => {
        input.style.fontSize = '';
      });
    });
  }

  // Handle orientation changes
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  });

  // Optimize animations for mobile
  if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    const animatedElements = document.querySelectorAll('.orb, .cyber-grid');
    animatedElements.forEach(el => {
      el.style.animationDuration = '30s';
    });
  }
}

// Touch-friendly button feedback
document.querySelectorAll('.btn-cyber, .service-card, .social-link').forEach(element => {
  element.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.98)';
  });
  
  element.addEventListener('touchend', function() {
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});

// Initialize mobile improvements
handleMobileImprovements();

// Re-check on resize
window.addEventListener('resize', handleMobileImprovements);

// ============================================
// HERO PARTICLE NETWORK ANIMATION
// ============================================
class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 130 };
    this.animationId = null;
    this.isMobile = window.innerWidth <= 768;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = rect.width;
    this.height = rect.height;
  }

  createParticles() {
    this.particles = [];
    const count = this.isMobile ? 40 : 80;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    const hero = this.canvas.parentElement;
    hero.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Touch support
    hero.addEventListener('touchmove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });

    hero.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Gentle wave motion
      p.pulse += 0.008;
      p.x += p.vx + Math.sin(p.pulse) * 0.15;
      p.y += p.vy + Math.cos(p.pulse) * 0.15;

      // Wrap around edges
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      // Mouse repulsion
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius && dist > 0) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.03;
          p.vy += Math.sin(angle) * force * 0.03;
        }
      }

      // Speed dampening
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.2) {
        p.vx = (p.vx / speed) * 1.2;
        p.vy = (p.vy / speed) * 1.2;
      }

      // Draw particle with glow
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Draw connections to nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = this.isMobile ? 100 : 150;

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize particle network after DOM is ready
function initParticleNetwork() {
  new ParticleNetwork('hero-canvas');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticleNetwork);
} else {
  initParticleNetwork();
}

// GitHub API Integration for real-time data
class GitHubAPIManager {
  constructor() {
    this.username = 'arafat-web';
    this.projects = [
      { name: 'Bulk-Email-Sender', element: null },
      { name: 'Task-Manager', element: null },
      { name: 'LinaTheBot', element: null },
      { name: 'Vuecommerce', element: null },
      { name: 'blood-donation-laravel', element: null },
      { name: 'countries_states_cities', element: null }
    ];
    this.init();
  }

  async init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.fetchAndUpdateProjects());
    } else {
      this.fetchAndUpdateProjects();
    }
  }

  async fetchRepoData(repoName) {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.username}/${repoName}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn(`Failed to fetch data for ${repoName}:`, error);
      return null;
    }
  }

  async fetchAndUpdateProjects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    for (let i = 0; i < this.projects.length && i < portfolioItems.length; i++) {
      const project = this.projects[i];
      const portfolioItem = portfolioItems[i];
      
      // Add loading indicator
      const techElement = portfolioItem.querySelector('.portfolio-tech');
      if (techElement) {
        const originalText = techElement.textContent;
        techElement.innerHTML = originalText.replace(/⭐ \d+/, '⭐ <span class="loading-stars">...</span>');
      }

      // Fetch repo data
      const repoData = await this.fetchRepoData(project.name);
      
      if (repoData) {
        this.updateProjectData(portfolioItem, repoData, project.name);
      } else {
        // Remove loading indicator if failed
        if (techElement) {
          techElement.innerHTML = techElement.innerHTML.replace('<span class="loading-stars">...</span>', '?');
        }
      }
      
      // Small delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  updateProjectData(portfolioItem, repoData, projectName) {
    // Update star count
    const techElement = portfolioItem.querySelector('.portfolio-tech');
    if (techElement) {
      const currentText = techElement.textContent;
      const newText = currentText.replace(/⭐ (\d+|\?|<span.*<\/span>|\.\.\.)/g, `⭐ ${repoData.stargazers_count}`);
      techElement.textContent = newText;
    }

    // Add GitHub link to project
    this.addGitHubLink(portfolioItem, repoData.html_url, projectName);
    
    // Keep original descriptions - don't update them
    // Original descriptions are better than GitHub repo descriptions
  }

  addGitHubLink(portfolioItem, repoUrl, projectName) {
    const portfolioContent = portfolioItem.querySelector('.portfolio-content');
    if (!portfolioContent) return;

    // Check if GitHub link already exists
    if (portfolioContent.querySelector('.github-link')) return;

    // Create GitHub link element
    const githubLink = document.createElement('div');
    githubLink.className = 'github-link';
    githubLink.innerHTML = `
      <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-github">
        <i class="fab fa-github"></i>
        <span>View on GitHub</span>
      </a>
    `;

    // Insert after description
    const description = portfolioContent.querySelector('.portfolio-description');
    if (description) {
      description.parentNode.insertBefore(githubLink, description.nextSibling);
    } else {
      portfolioContent.appendChild(githubLink);
    }
  }
}

// Initialize GitHub API Manager
const githubManager = new GitHubAPIManager();
