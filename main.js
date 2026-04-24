document.addEventListener('DOMContentLoaded', () => {

  // preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('hidden'), 2200);
  });
  setTimeout(() => preloader?.classList.add('hidden'), 4000);

  // custom cursor
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      cursor.style.left = cursorX - 4 + 'px';
      cursor.style.top = cursorY - 4 + 'px';

      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = followerX - 18 + 'px';
      follower.style.top = followerY - 18 + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .btn, .service-card, .feature-card, .portfolio-card, .blog-card, .testimonial-card, input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hover'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
  }

  // header scroll + scroll to top
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      if (y > 50) { header.classList.add('scrolled'); }
      else { header.classList.remove('scrolled'); }
    }
    if (scrollTopBtn) {
      if (y > 400) { scrollTopBtn.classList.add('visible'); }
      else { scrollTopBtn.classList.remove('visible'); }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  mobileBtn?.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    mobileNav?.classList.toggle('open');
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileBtn?.classList.remove('active');
    });
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // counter animation
  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObs.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // hero particles
  function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute;
        width:${Math.random() * 3 + 1}px;
        height:${Math.random() * 3 + 1}px;
        background:rgba(234,163,39,${Math.random() * 0.3 + 0.1});
        border-radius:50%;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        animation:particleFloat ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 3}s infinite;
        pointer-events:none;
      `;
      container.appendChild(p);
    }
  }
  createParticles();

  // hero slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const progressFill = document.querySelector('.slide-progress-fill');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  let slideTimer = null;
  const slideDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-duration')) || 5000;

  function goToSlide(index) {
    heroSlides.forEach(s => { s.classList.remove('active', 'leaving'); });
    sliderDots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
    if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.add('active');

    if (progressFill) {
      progressFill.classList.remove('animating');
      void progressFill.offsetWidth;
      progressFill.classList.add('animating');
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlideF() {
    goToSlide(currentSlide - 1);
  }

  function startSlider() {
    if (heroSlides.length < 2) return;
    stopSlider();
    slideTimer = setInterval(nextSlide, slideDuration);
    if (progressFill) {
      progressFill.classList.remove('animating');
      void progressFill.offsetWidth;
      progressFill.classList.add('animating');
    }
  }

  function stopSlider() {
    clearInterval(slideTimer);
    if (progressFill) progressFill.classList.remove('animating');
  }

  sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      startSlider();
    });
  });

  prevBtn?.addEventListener('click', () => { prevSlideF(); startSlider(); });
  nextBtn?.addEventListener('click', () => { nextSlide(); startSlider(); });

  const heroSection = document.getElementById('hero');
  heroSection?.addEventListener('mouseenter', stopSlider);
  heroSection?.addEventListener('mouseleave', startSlider);

  let touchStartX = 0;
  heroSection?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSection?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide(); else prevSlideF();
      startSlider();
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); startSlider(); }
    if (e.key === 'ArrowLeft') { prevSlideF(); startSlider(); }
  });

  if (heroSlides.length > 0) {
    goToSlide(0);
    startSlider();
  }

  // tilt effect
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = (y - rect.height / 2) / 15;
      const ry = (rect.width / 2 - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // magnetic buttons
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // parallax
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.hero-orb').forEach((orb, i) => {
      orb.style.transform = `translateY(${scrolled * (0.03 + i * 0.02)}px)`;
    });
  }, { passive: true });

  // contact form
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('#name');
    const email = this.querySelector('#email');
    const message = this.querySelector('#message');

    if (!name.value.trim()) { shakeEl(name); return; }
    if (!email.value.trim() || !email.value.includes('@')) { shakeEl(email); return; }
    if (!message.value.trim()) { shakeEl(message); return; }

    const btn = this.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = orig;
      form.reset();
      showToast('✓ Message sent successfully!');
      confetti();
    }, 2000);
  });

  function shakeEl(el) {
    el.style.animation = 'shake 0.5s ease';
    el.style.borderColor = '#ef4444';
    setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 1000);
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  function confetti() {
    const colors = ['#eaa327', '#f5c45e', '#ffffff', '#c8861a'];
    for (let i = 0; i < 40; i++) {
      const c = document.createElement('div');
      c.style.cssText = `
        position:fixed;
        width:${Math.random() * 8 + 4}px;
        height:${Math.random() * 8 + 4}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        top:50%;left:50%;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        z-index:99999;pointer-events:none;
        animation:confettiPop ${Math.random() + 1}s ease-out forwards;
        --tx:${(Math.random() - 0.5) * 600}px;
        --ty:${(Math.random() - 0.5) * 600}px;
        --r:${Math.random() * 720}deg;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2000);
    }
  }

  // active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObs.observe(s));

  // parallax about image
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax-img').forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.05;
        const inner = img.querySelector('img');
        if (inner) inner.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    });
  }, { passive: true });

  // ai chatbot
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const chatClose = document.getElementById('chatbot-close');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const quickReplies = document.querySelectorAll('.quick-reply-btn');

  chatToggle?.addEventListener('click', () => {
    chatWindow?.classList.toggle('open');
    if (chatWindow?.classList.contains('open')) chatInput?.focus();
  });

  chatClose?.addEventListener('click', () => chatWindow?.classList.remove('open'));

  function sendMsg(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    if (chatInput) chatInput.value = '';
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg(getBotReply(text), 'bot');
    }, 1200 + Math.random() * 800);
  }

  function addMsg(text, type) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + type;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    msg.innerHTML = text + '<span class="chat-msg-time">' + time + '</span>';
    chatMessages?.appendChild(msg);
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'typing-indicator';
    t.id = 'typing-indicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    chatMessages?.appendChild(t);
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    document.getElementById('typing-indicator')?.remove();
  }

  function getBotReply(msg) {
    const m = msg.toLowerCase();
    if (m.includes('service') || m.includes('offer'))
      return '🚀 We offer:<br>• Digital Strategy & Consulting<br>• Social Media Marketing<br>• SEO & SEM<br>• Performance Marketing<br>• Brand Identity<br>• Web Design & Development<br><br>Want details on any service?';
    if (m.includes('price') || m.includes('cost') || m.includes('pricing') || m.includes('budget'))
      return '💰 Pricing depends on project scope. We offer flexible packages.<br><br>📞 <a href="#contact" style="color:var(--gold);font-weight:600;">Contact us</a> or WhatsApp for a custom quote!';
    if (m.includes('consultation') || m.includes('free'))
      return '🎯 We offer a <strong>FREE consultation</strong>!<br><br>📩 <a href="#contact" style="color:var(--gold);font-weight:600;">Fill contact form</a> or <a href="https://wa.me/923447694472" target="_blank" style="color:#25d366;font-weight:600;">WhatsApp us</a>!';
    if (m.includes('website') || m.includes('web design') || m.includes('web dev'))
      return '💻 We build stunning websites!<br>• Custom UI/UX<br>• Responsive Development<br>• E-commerce<br>• Landing Pages<br><br>Ready to start?';
    if (m.includes('contact') || m.includes('reach') || m.includes('email') || m.includes('phone'))
      return '📧 digihorizone@gmail.com<br>📱 <a href="https://wa.me/923447694472" target="_blank" style="color:#25d366;font-weight:600;">+92 344 7694472</a><br>🌐 Global Remote Team<br><br>We respond within 24 hours!';
    if (m.includes('seo') || m.includes('search'))
      return '🔍 SEO services:<br>• On-Page & Off-Page SEO<br>• Technical Audits<br>• Google Ads<br>• Local SEO<br>• Link Building';
    if (m.includes('social media') || m.includes('instagram') || m.includes('facebook') || m.includes('tiktok'))
      return '📱 Social media services:<br>• Content Strategy<br>• Community Management<br>• Influencer Marketing<br>• Paid Ads<br>• Analytics';
    if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('assalam'))
      return '👋 Hello! Welcome to Digi Horizone! How can I help you today?';
    if (m.includes('thank') || m.includes('thanks') || m.includes('shukriya'))
      return '😊 You\'re welcome! Feel free to ask anything else! ✨';
    return '🤔 Great question!<br><br>📞 <a href="https://wa.me/923447694472" target="_blank" style="color:#25d366;font-weight:600;">WhatsApp us</a><br>📩 <a href="#contact" style="color:var(--gold);font-weight:600;">Contact form</a><br><br>We\'ll respond within 24 hours!';
  }

  chatSend?.addEventListener('click', () => sendMsg(chatInput?.value || ''));

  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMsg(chatInput?.value || '');
  });

  quickReplies.forEach(btn => {
    btn.addEventListener('click', () => sendMsg(btn.getAttribute('data-msg')));
  });

  document.addEventListener('click', (e) => {
    if (chatWindow?.classList.contains('open') && !chatWindow.contains(e.target) && !chatToggle.contains(e.target)) {
      chatWindow.classList.remove('open');
    }
  });

});

// global styles
const ds = document.createElement('style');
ds.textContent = `
  .spin{animation:spin .7s linear infinite;display:inline-block}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
  @keyframes particleFloat{0%,100%{transform:translate(0,0) scale(1);opacity:.3}25%{transform:translate(20px,-30px) scale(1.2);opacity:.6}50%{transform:translate(-10px,-60px) scale(.8);opacity:.4}75%{transform:translate(15px,-30px) scale(1.1);opacity:.5}}
  @keyframes confettiPop{0%{transform:translate(0,0) rotate(0) scale(1);opacity:1}100%{transform:translate(var(--tx),var(--ty)) rotate(var(--r)) scale(0);opacity:0}}
`;
document.head.appendChild(ds);