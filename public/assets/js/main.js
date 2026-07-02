    // ====================================================
    // STATE
    // ====================================================
    let currentView = 'home'; // 'home' | 'work'

    const VALID_PAGES = ['work', 'about', 'nippon-india', 'gems-mantra', 'lauritz-knudsen',
        'dejoule', 'piramal-nutrition-solutions', 'aak', 'kheyti', 'nippon-aif',
        'supreme-group', 'innogent'];

    const PAGE_INFO = {
        'about':           ["About","About Vikas Jat — UI/UX Specialist with 6+ years of experience."],
        'nippon-india':    ["Nippon India","Building a compliance-integrated brand communication system for India's leading mutual fund."],
        'gems-mantra':     ["Gems Mantra","Crafting a luxury identity for rare gemstones, merging mysticism with high-end retail."],
        'lauritz-knudsen': ["Lauritz Knudsen","Elevating brand presence through cohesive digital and visual systems."],
        'dejoule':         ["DeJoule","Building a powerful brand identity and digital ecosystem for sustainable clean energy innovation."],
        'piramal-nutrition-solutions': ["Piramal Nutrition Solutions","Crafting a comprehensive brand identity and digital ecosystem for innovative nutrition and wellness solutions."],
        'aak':             ["AAK","AAK India offers plant-based oils and fats to enhance food taste, texture, and health."],
        'kheyti':          ["Kheyti","Kheyti connects consumers with local farmers to purchase fresh, organic produce."],
        'nippon-aif':      ["Nippon AIF","Nippon AIF — a financial services company focused on providing innovative investment solutions."],
        'supreme-group':   ["Supreme Group","Elevating a global nonwoven innovator with a clean, modern, world-class digital presence."],
        'innogent':        ["Innogent","A software development company working on React, Cloud, AWS, DevOps, and Big Data technologies."]
    };

    // ====================================================
    // NAVIGATION BETWEEN HOME & WORK VIEWS
    // ====================================================
    function goHome() {
        currentView = 'home';
        document.body.classList.add('home-active');
        document.body.classList.remove('work-active');
        document.getElementById('view-home').style.display = 'block';
        document.getElementById('view-work').style.display = 'none';
        document.getElementById('nav-featured').classList.add('active-link');
        document.getElementById('nav-portfolio').classList.remove('active-link');
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
        if (window.location.pathname !== '/') {
            window.history.pushState({ pageId: 'home' }, '', '/');
        }
    }

    function goWork() {
        enterWorkView();
        showPage('work', true);
    }

    function goAbout() {
        enterWorkView();
        showPage('about', true);
    }

    function enterWorkView() {
        currentView = 'work';
        document.body.classList.remove('home-active');
        document.body.classList.add('work-active');
        document.getElementById('view-home').style.display = 'none';
        document.getElementById('view-work').style.display = 'block';
        document.getElementById('nav-featured').classList.remove('active-link');
        document.getElementById('nav-portfolio').classList.add('active-link');
    }

    // ====================================================
    // WORK PAGE SWITCHING
    // ====================================================
    function showPage(pageId, push = true) {
        if (!VALID_PAGES.includes(pageId)) pageId = 'work';

        if (currentView !== 'work') enterWorkView();

        document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageId + '-page');
        if (target) target.classList.add('active');

        const isCaseStudy = (pageId !== 'work' && pageId !== 'about');
        const floatingBtn = document.getElementById('floatingAboutBtn');
        floatingBtn.style.display = isCaseStudy ? 'flex' : 'none';

        if (PAGE_INFO[pageId]) {
            document.getElementById('about-title').innerText = PAGE_INFO[pageId][0];
            document.getElementById('about-text').innerText  = PAGE_INFO[pageId][1];
        }

        if (push) {
            const newPath = pageId === 'work' ? '/' : '/' + pageId;
            if (window.location.pathname !== newPath) {
                window.history.pushState({ pageId }, '', newPath);
            }
        }
        window.scrollTo(0, 0);

        // Re-observe reveal elements on newly active page
        setTimeout(() => {
            if (target) {
                target.querySelectorAll('.reveal:not(.active)').forEach(el => revealObserver.observe(el));
            }
        }, 50);

        // About page — run premium animations
        if (pageId === 'about') {
            setTimeout(() => initAboutPage(), 80);
        }
    }

    // ====================================================
    // ABOUT PAGE — PREMIUM ANIMATIONS
    // ====================================================
    let aboutObserver = null;

    function initAboutPage() {
        // 1. Char-split reveal on name
        const nameEl = document.getElementById('ab-name-el');
        if (nameEl) {
            if (!nameEl.dataset.split) {
                nameEl.dataset.split = '1';
                nameEl.innerHTML = nameEl.textContent.split('').map((ch, i) =>
                    ch === ' '
                        ? '<span style="display:inline-block;width:0.28em"></span>'
                        : `<span class="ab-char" style="transition-delay:${(i * 0.038).toFixed(3)}s">${ch}</span>`
                ).join('');
            }
            // Reset then trigger
            nameEl.querySelectorAll('.ab-char').forEach(c => c.classList.remove('ab-visible'));
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    nameEl.querySelectorAll('.ab-char').forEach(c => c.classList.add('ab-visible'));
                });
            });
        }

        // 2. Word-mask reveal on bio paragraph
        const bioEl = document.getElementById('ab-bio-el');
        const bioPara = bioEl ? bioEl.querySelector('.ab-bio-main') : null;
        if (bioPara) {
            if (!bioPara.dataset.split) {
                bioPara.dataset.split = '1';
                bioPara.innerHTML = bioPara.textContent.trim().split(/\s+/).map((word, i) =>
                    `<span class="ab-word-wrap"><span class="ab-word-inner" style="transition-delay:${(0.12 + i * 0.032).toFixed(3)}s">${word}</span></span> `
                ).join('');
            }
            bioPara.querySelectorAll('.ab-word-inner').forEach(w => w.classList.remove('ab-visible'));
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bioPara.querySelectorAll('.ab-word-inner').forEach(w => w.classList.add('ab-visible'));
                });
            });
        }

        // 3. IntersectionObserver for [data-ab] elements (fade-up + rules)
        if (!aboutObserver) {
            aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ab-visible');
                        aboutObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
        }
        // Re-observe everything that hasn't animated yet
        document.querySelectorAll('[data-ab]').forEach(el => {
            el.classList.remove('ab-visible');
            aboutObserver.observe(el);
        });
    }

    window.addEventListener('popstate', () => {
        const slug = (window.location.pathname || '/').replace(/^\/+|\/+$/g,'');
        if (!slug || slug === '') { goHome(); }
        else { const pid = VALID_PAGES.includes(slug) ? slug : 'work'; showPage(pid, false); }
    });

    // ====================================================
    // THEME TOGGLE
    // ====================================================
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // ====================================================
    // MOBILE HAMBURGER MENU
    // ====================================================
    const hamburger     = document.getElementById('navHamburger');
    const mobileOverlay = document.getElementById('mobileNavOverlay');

    function openMobileNav() {
        hamburger.classList.add('is-open');
        mobileOverlay.classList.add('is-open');
        // Lock body scroll but allow overlay scroll
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        hamburger.classList.remove('is-open');
        mobileOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileOverlay.classList.contains('is-open') ? closeMobileNav() : openMobileNav();
    });

    // Mobile theme toggle (mirrors main toggle)
    document.getElementById('mobileThemeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Close overlay when navigating (goHome/goWork/goAbout already call closeMobileNav via onclick)
    // Also close on back/popstate
    window.addEventListener('popstate', () => { closeMobileNav(); });

    // ====================================================
    // HOME — FEATURED PROJECTS CYCLING
    // ====================================================
    const featuredProjects = [
        { title: "DEJOULE",       category: "Smart Building / EnergyTech",             video: "/assets/video/dejoule-about-us-video-clip.mp4", year: "2025", page: "dejoule" },
        { title: "SUPREME GROUP", category: "Manufacturing & Industrial Materials",      video: "/assets/video/supreme-nonwoven.mp4",            year: "2025", page: "supreme-group" },
        { title: "INNOGENT",      category: "Technology / Software Development",         video: "/assets/video/innogent-banner.mp4",             year: "2024", page: "innogent" },
        { title: "AAK",           category: "Food Manufacturing",        video: "/assets/video/aak-hero-banner.mp4", year: "2024", page: "aak" },
        { title: "NIPPON AIF",    category: "Financial Services",                        video: "/assets/video/nippon-hero-banner.mp4", year: "2024", page: "nippon-aif" }
    ];

    // ── Dynamic nav counts (update whenever you add/remove cards or featured entries)
    (function updateNavCounts() {
        const featuredCount   = featuredProjects.length;
        const portfolioCount  = document.querySelectorAll('.work-card').length;
        document.getElementById('nav-featured').textContent  = `Featured Work [${featuredCount}]`;
        document.getElementById('nav-portfolio').textContent = `Portfolio[${portfolioCount}]`;
    })();

    let featuredIndex = 0;
    let isTransitioning = false;

    function updateFeaturedProject(index) {
        isTransitioning = true;
        const heroCenter = document.getElementById('heroCenter');
        heroCenter.style.opacity = 0;
        setTimeout(() => {
            featuredIndex = index;
            const p = featuredProjects[featuredIndex];
            document.getElementById('projectTitle').textContent    = p.title;
            document.getElementById('projectCategory').textContent = p.category;
            document.getElementById('projectYear').textContent     = p.year;
            document.getElementById('heroVideo').src               = p.video;
            document.getElementById('homeProgressBar').style.width = ((featuredIndex + 1) / featuredProjects.length) * 100 + '%';
            heroCenter.style.opacity = 1;
            isTransitioning = false;
        }, 500);
    }

    function openFeaturedProject() {
        if (isTransitioning) return;
        showPage(featuredProjects[featuredIndex].page);
    }

    window.addEventListener('wheel', (e) => {
        if (currentView !== 'home' || isTransitioning) return;
        if (e.deltaY > 0) updateFeaturedProject((featuredIndex + 1) % featuredProjects.length);
        else               updateFeaturedProject((featuredIndex - 1 + featuredProjects.length) % featuredProjects.length);
    });

    // Touch swipe support on home view
    let touchStartY = 0;
    document.getElementById('view-home').addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    document.getElementById('view-home').addEventListener('touchend', e => {
        if (currentView !== 'home' || isTransitioning) return;
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 40) {
            if (diff > 0) updateFeaturedProject((featuredIndex + 1) % featuredProjects.length);
            else           updateFeaturedProject((featuredIndex - 1 + featuredProjects.length) % featuredProjects.length);
        }
    });

    // Initialise first project progress bar
    document.getElementById('homeProgressBar').style.width = (1 / featuredProjects.length) * 100 + '%';

    // ====================================================
    // PROJECT OVERVIEW PANEL
    // ====================================================
    const floatingAboutBtn = document.getElementById('floatingAboutBtn');
    const closeBtn          = document.getElementById('closeBtn');
    const aboutPanel        = document.getElementById('aboutPanel');
    const panelOverlay      = document.getElementById('panelOverlay');
    const mainContent       = document.getElementById('view-work');

    function togglePanel() {
        const isOpen = aboutPanel.classList.toggle('is-open');
        panelOverlay.classList.toggle('is-open');
        mainContent.classList.toggle('is-pushed');
        floatingAboutBtn.classList.toggle('is-pushed');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    floatingAboutBtn.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', togglePanel);
    panelOverlay.addEventListener('click', () => {
        if (aboutPanel.classList.contains('is-open')) togglePanel();
        else if (contactPanel.classList.contains('is-open')) toggleContactPanel();
    });

    // ====================================================
    // CONTACT PANEL
    // ====================================================
    const contactPanel   = document.getElementById('contactPanel');
    const contactOverlay = document.getElementById('contactOverlay');
    const closeContactBtn = document.getElementById('closeContactBtn');

    function showContact() {
        contactPanel.classList.add('is-open');
        contactOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
    function toggleContactPanel() {
        contactPanel.classList.remove('is-open');
        contactOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }
    closeContactBtn.addEventListener('click', toggleContactPanel);
    contactOverlay.addEventListener('click', toggleContactPanel);

    // ====================================================
    // REVEAL ANIMATION OBSERVER
    // ====================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ====================================================
    // VIDEO INTERSECTION OBSERVER (play/pause on scroll)
    // ====================================================
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.play().catch(() => {});
            else entry.target.pause();
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('video').forEach(v => {
        if (!v.id || v.id !== 'heroVideo') videoObserver.observe(v);
    });

    // ====================================================
    // SLIDER CONTAINERS (auto-cycling)
    // ====================================================
    const slideDuration = 5500;

    document.querySelectorAll('.slider-container').forEach(container => {
        const slides     = container.querySelectorAll('.slide');
        const progressBar = container.querySelector('.progress-bar');
        if (!slides.length || !progressBar) return;
        let idx = 0;

        function showSlide(i) {
            slides.forEach((s, si) => s.classList.toggle('active', si === i));
            progressBar.style.animation = 'none';
            progressBar.offsetHeight; // reflow
            progressBar.style.animation = `fillProgress ${slideDuration}ms linear forwards`;
        }

        showSlide(idx);
        setInterval(() => { idx = (idx + 1) % slides.length; showSlide(idx); }, slideDuration);
    });

    // ====================================================
    // LAURITZ KNUDSEN — VIDEO THUMBNAILS
    // ====================================================
    (function initLKThumbnails() {
        const lkVideos = [
            "/assets/video/lk-hindi-language-translation.mp4",
            "/assets/video/lk-malayalam-language-translation.mp4",
            "/assets/video/lk-tamil-language-translation.mp4",
            "/assets/video/lk-telugu-language-translation.mp4"
        ];
        const lkNames  = ["Hindi","Malayalam","Tamil","Telugu"];
        const mainVid  = document.getElementById('main-video');
        const thumbsCt = document.getElementById('thumbnails');
        if (!mainVid || !thumbsCt) return;

        let lkIndex = 0;
        let lkThumbs = [];

        lkVideos.forEach((src, i) => {
            const div = document.createElement('div');
            div.className = `thumb ${i === 0 ? 'active' : ''}`;
            div.dataset.index = i;

            const vid = document.createElement('video');
            vid.src = src; vid.muted = true; vid.playsInline = true;

            const label = document.createElement('div');
            label.className = 'thumb-label';
            label.innerText = lkNames[i];

            const prog = document.createElement('div');
            prog.className = 'thumb-progress';
            prog.id = `lk-prog-${i}`;

            div.appendChild(vid); div.appendChild(label); div.appendChild(prog);
            thumbsCt.appendChild(div);

            div.addEventListener('click', () => { if (lkIndex !== i) loadLKVideo(i); });
        });

        lkThumbs = thumbsCt.querySelectorAll('.thumb');

        function loadLKVideo(i) {
            lkIndex = i;
            mainVid.classList.add('fade-out');
            document.querySelectorAll('[id^="lk-prog-"]').forEach(b => b.style.width = '0%');
            setTimeout(() => {
                mainVid.src = lkVideos[lkIndex];
                mainVid.play().then(() => mainVid.classList.remove('fade-out')).catch(() => {});
                lkThumbs.forEach((t, ti) => t.classList.toggle('active', ti === lkIndex));
            }, 400);
        }

        mainVid.addEventListener('ended', () => loadLKVideo((lkIndex + 1) % lkVideos.length));
        mainVid.addEventListener('timeupdate', () => {
            if (mainVid.duration) {
                const pct = (mainVid.currentTime / mainVid.duration) * 100;
                const bar = document.getElementById(`lk-prog-${lkIndex}`);
                if (bar) bar.style.width = `${pct}%`;
            }
        });

        loadLKVideo(0);
    })();

    // ====================================================
    // INITIAL STATE — show home view
    // ====================================================
    (function init() {
        const slug = (window.location.pathname || '/').replace(/^\/+|\/+$/g,'');
        if (slug && slug !== '' && VALID_PAGES.includes(slug)) {
            enterWorkView();
            showPage(slug, false);
        } else {
            goHome();
        }
    })();
    