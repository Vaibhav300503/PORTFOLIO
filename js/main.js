/* ====================================
   PORTFOLIO — RESUMESPHERE STYLE JS
   Globe, Sidebar, Animations, Data
   ==================================== */

document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initSidebar();
    initScrollSpy();
    initSmoothScroll();
    initScrollProgress();
    initEarthGlobe();
    renderSkills();
    renderProjects();
    renderAchievements();
    renderTryHackMePanel();
    renderCertifications();
    renderMitreGrid();
    
    // Init animations AFTER rendering dynamic elements
    initSectionAnimations();
    initAnimatedCounters();
});

/* ============ DATA ============ */
const skillGroups = [
    { title: 'SIEM & Detection', items: ['Splunk', 'Wazuh', 'ELK Stack', 'Sigma Rules', 'KQL', 'SPL'] },
    { title: 'Incident Response', items: ['Triage', 'Containment', 'Forensics', 'Threat Hunting', 'Playbooks'] },
    { title: 'Endpoint & Network', items: ['EDR', 'Sysmon', 'Wireshark', 'Zeek', 'Suricata', 'Nmap'] },
    { title: 'Frameworks', items: ['MITRE ATT&CK', 'Cyber Kill Chain', 'OWASP Top 10', 'NIST CSF'] },
    { title: 'Vulnerability Research', items: ['Burp Suite', 'OWASP ZAP', 'Nuclei', 'Metasploit', 'Bug Bounty'] },
    { title: 'Languages & Tools', items: ['Python', 'Bash', 'PowerShell', 'Docker', 'Git', 'Linux'] },
];

const projects = [
    {
        name: 'HoneyLearn',
        tagline: 'AI-Powered Honeypot Platform',
        description: 'A production-grade honeypot platform using Python (FastAPI) to detect and analyze malicious traffic in real time, with MITRE ATT&CK mapping aligned to observed attack patterns.',
        stack: ['Python', 'FastAPI', 'Docker', 'MITRE ATT&CK'],
        bullets: [
            'Implemented ML-based attack classification (TF-IDF + LinearSVC, Isolation Forest) to categorize threat types.',
            'Designed honeytokens and decoy trap pages to lure attackers and trigger high-risk alerts.',
            'Built session tracking and threat intel export in JSON/CSV/STIX formats.',
        ],
        github: 'https://github.com/Vaibhav300503/HoneyLearn',
    },
    {
        name: 'Enterprise SOC Platform',
        tagline: 'Real-time log collection & FIM platform',
        description: 'A comprehensive security monitoring solution with multi-platform log collection, File Integrity Monitoring with Canary File support, and process attribution for network connections.',
        stack: ['Python', 'FastAPI', 'Redis', 'MongoDB'],
        bullets: [
            'Real-time log collection with File Integrity Monitoring and canary-file ransomware detection.',
            'Integrated MITRE ATT&CK auto-classification with a process attribution engine.',
            'Reduced detection time from minutes to seconds.',
        ],
        github: 'https://github.com/Vaibhav300503/Agent',
    },
    {
        name: 'Multi-Threaded Network Scanner',
        tagline: 'Fast, async, banner-grabbing recon tool',
        description: 'A Python-based offensive security tool for network reconnaissance with ARP host discovery, stealth TCP SYN scanning, service identification, and OS fingerprinting.',
        stack: ['Python', 'Scapy', 'Threading', 'Socket'],
        bullets: [
            'Multi-threaded TCP SYN scanner with ARP host discovery.',
            'Banner grabbing and OS fingerprinting via TTL/TCP stack analysis.',
            'Structured output for network asset inventory.',
        ],
        github: 'https://github.com/Vaibhav300503/Custom_Network_Scanner',
    },
    {
        name: 'SOC Visualization Dashboard',
        tagline: 'Centralized SOC monitoring interface',
        description: 'A centralized interface for the SOC platform designed for real-time monitoring and analysis, providing deep visibility into log streams, alert frequencies, and endpoint health.',
        stack: ['Vue.js', 'Chart.js', 'Tailwind CSS', 'Vite'],
        bullets: [
            'Finance-grade glassmorphism UI for real-time SIEM data visualization.',
            'Deep visibility into log streams, alert frequencies, and endpoint health statuses.',
            'Interactive dashboards with drill-down alert analysis.',
        ],
        github: 'https://github.com/Vaibhav300503/SOC-DASHBOARD',
    },
    {
        name: 'Crowd Management Digital Twin',
        tagline: 'AI-powered crowd risk prediction system',
        description: 'An AI-powered system for predicting and mitigating crowd risks at mega-events using YOLO models for real-time detection and a Digital Twin engine.',
        stack: ['React', 'Node.js', 'Python YOLO', 'Socket.IO'],
        bullets: [
            'Real-time crowd detection using YOLO models for density zone mapping.',
            'Digital Twin engine to trigger proactive alerts before critical thresholds.',
            'Hackathon-winning project at SunHacks 2025.',
        ],
        github: 'https://github.com/Vaibhav300503/Crowd_Management_Digital_Twin',
    },
];

const achievements = [
    { title: 'SunHacks 2025 — Award Recipient', description: 'Recognized for building an AI-powered Crowd Management Digital Twin at the international-level SunHacks hackathon, Sandip University, Nashik.', certLink: 'https://drive.google.com/file/d/1qZLbmIr-TRpgHJzB4McWaH_9CXR-mc2q/view?usp=sharing' },
    { title: 'Spardha 25 by VAMNICOM, Pune — Winner', description: 'Award winner at Spardha 25, organized by Vaikunth Mehta National Institute of Cooperative Management (VAMNICOM), Pune.', certLink: 'https://drive.google.com/file/d/1umstccYdPQ7kPsj1UsFsg9xM_2-X3fXs/view?usp=sharing' },
    { title: '50+ Bug Bounty Findings', description: 'Validated vulnerabilities responsibly disclosed across the industry — including XSS, SSRF, IDOR, and broken access control.' },
    { title: 'TryHackMe — Top 7%', description: 'Level 8 [HACKER] · 56 rooms completed · 12 badges · 7,266+ points. Top 7% globally.' },
    { title: 'HackChrono 2025 — Selected', description: 'Selected competitor at Chandigarh University hackathon.', certLink: 'https://drive.google.com/file/d/17VlmtSl2n_yh7OzjUfNFaQxVsF7oRGFC/view?usp=sharing' },
    { title: 'Hackatron 2025 — Selected', description: 'Selected at ABV-IIITM, Gwalior national-level hackathon.', certLink: 'https://drive.google.com/file/d/12xJnm8LiRf4AGonemKOxoQeiydpC2Aro/view?usp=sharing' },
    { title: 'Xcelerate 3.0 — Selected', description: 'Selected at Shiv Nadar University, Greater Noida hackathon.', certLink: 'https://drive.google.com/file/d/1QzXDi81EtvuWzvvvxznuD9-0ZhPF0UYL/view?usp=sharing' },
];

const certifications = [
    { name: 'IBM Cybersecurity Professional Analyst', issuer: 'IBM / Coursera' },
    { name: 'Cybersecurity with AI', issuer: 'Internshala Training Program', pdf: 'certificate/Cyber Security with AI Training - Certificate of Completion.pdf', driveLink: 'https://drive.google.com/file/d/1xDHBA6OjEDv9I2cjWOOfp9BBjwHR7amP/view?usp=sharing' },
    { name: 'Certified Ethical Hacker', issuer: 'NSDC', pdf: 'certificate/ethical_hacker_NSDC.pdf', driveLink: 'https://drive.google.com/file/d/1eS8kFzD5-jCKF4Vz_HbNUMO7AmohWAZo/view?usp=sharing' },
    { name: 'Mastering Network Security: Defend Against Cyber Attacks', issuer: 'Udemy', pdf: 'certificate/udemy_mastering_network_security.pdf', driveLink: 'https://drive.google.com/file/d/1mQjF__C3nqQiozFLW5jRQPJ7xCtSxToV/view?usp=sharing' },
    { name: 'Defensive Cyber Operations: The Blue Team & Network Security', issuer: 'Udemy', pdf: 'certificate/udemy_network_blue_team_security.pdf', driveLink: 'https://drive.google.com/file/d/1JHSNEsYhk_F9mFMVOLDfT8RZgzmLGe5s/view?usp=sharing' },
    { name: 'Red Team Mastery: Advanced Offensive Security', issuer: 'Udemy', pdf: 'certificate/udemy_red_team_mastery.pdf', driveLink: 'https://drive.google.com/file/d/1l84P475gEXRWOWCB1jXW1xeW7bL5KQDu/view?usp=sharing' },
];

const mitreTechniques = [
    { id: 'T1110', name: 'Brute Force', tactic: 'Credential Access', note: 'Detected SSH/RDP password spraying via Wazuh decoders + Sigma rules.', used: true },
    { id: 'T1566', name: 'Phishing', tactic: 'Initial Access', note: 'Built email-header anomaly detections and URL-detonation playbook.', used: true },
    { id: 'T1059', name: 'Command & Scripting Interpreter', tactic: 'Execution', note: 'PowerShell + Bash abuse hunts via Sysmon Event ID 1 + EDR telemetry.', used: true },
    { id: 'T1078', name: 'Valid Accounts', tactic: 'Persistence', note: 'Impossible-travel and off-hours login detections in Splunk.', used: true },
    { id: 'T1003', name: 'OS Credential Dumping', tactic: 'Credential Access', note: 'LSASS access detections via EDR + Sigma.', used: true },
    { id: 'T1071', name: 'Application Layer Protocol', tactic: 'Command & Control', note: 'Beaconing detection via Zeek + JA3 fingerprinting.', used: true },
    { id: 'T1021', name: 'Remote Services', tactic: 'Lateral Movement', note: 'SMB/WinRM lateral-movement hunts on endpoint telemetry.', used: true },
    { id: 'T1486', name: 'Data Encrypted for Impact', tactic: 'Impact', note: 'Ransomware canary-file + entropy detections.', used: true },
    { id: 'T1041', name: 'Exfil Over C2 Channel', tactic: 'Exfiltration', note: 'Outbound volume + DNS-tunnel detections.', used: true },
    { id: 'T1190', name: 'Exploit Public App', tactic: 'Initial Access', note: '', used: false },
    { id: 'T1027', name: 'Obfuscated Files', tactic: 'Defense Evasion', note: '', used: false },
    { id: 'T1055', name: 'Process Injection', tactic: 'Defense Evasion', note: '', used: false },
    { id: 'T1083', name: 'File & Directory Discovery', tactic: 'Discovery', note: '', used: false },
    { id: 'T1018', name: 'Remote System Discovery', tactic: 'Discovery', note: '', used: false },
    { id: 'T1560', name: 'Archive Collected Data', tactic: 'Collection', note: '', used: false },
    { id: 'T1496', name: 'Resource Hijacking', tactic: 'Impact', note: '', used: false },
];

/* ============ LOADER ============ */
function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1200);
    });
}

/* ============ SIDEBAR ============ */
function initSidebar() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
    });

    overlay.addEventListener('click', () => {
        toggle.classList.remove('active');
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    // Close on nav click (mobile)
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggle.classList.remove('active');
                sidebar.classList.remove('open');
                overlay.classList.remove('visible');
            }
        });
    });
}

/* ============ SCROLL SPY ============ */
function initScrollSpy() {
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    const sectionIds = Array.from(navItems).map(n => n.getAttribute('data-section'));

    function update() {
        const scrollPos = window.scrollY + 200;
        let current = sectionIds[0];
        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollPos) current = id;
        }
        navItems.forEach(n => {
            n.classList.toggle('active', n.getAttribute('data-section') === current);
        });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
}

/* ============ SMOOTH SCROLL ============ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
            }
        });
    });
}

/* ============ SCROLL PROGRESS ============ */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = `${(scrollTop / scrollHeight) * 100}%`;
    }, { passive: true });
}

/* ============ SECTION ANIMATIONS ============ */
function initSectionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = (entry.target.dataset.delay || 0) * 80;
                setTimeout(() => entry.target.classList.add('visible'), delay);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // Also observe section headers
    document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
}

/* ============ ANIMATED COUNTERS ============ */
function initAnimatedCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (counter.dataset.animated) return;
                    counter.dataset.animated = 'true';
                    const target = parseInt(counter.dataset.target);
                    const suffix = counter.dataset.suffix || '';
                    const duration = 1600;
                    const start = performance.now();

                    function tick(now) {
                        const t = Math.min(1, (now - start) / duration);
                        const eased = 1 - Math.pow(1 - t, 3);
                        counter.textContent = Math.round(target * eased) + suffix;
                        if (t < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });

                // Animate stat cards
                entry.target.querySelectorAll('.stat-card').forEach((card, i) => {
                    setTimeout(() => card.classList.add('visible'), i * 80);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
}

/* ============ RENDER SKILLS ============ */
function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    skillGroups.forEach((group, i) => {
        const card = document.createElement('div');
        card.className = 'skill-card glass-panel glass-panel-hover';
        card.setAttribute('data-animate', '');
        card.dataset.delay = i;
        card.innerHTML = `
            <h3>${group.title}</h3>
            <div class="skill-tags">
                ${group.items.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ============ RENDER PROJECTS ============ */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    projects.forEach((p, i) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'project-card-wrapper';
        wrapper.setAttribute('data-animate', '');
        wrapper.dataset.delay = i;
        wrapper.innerHTML = `
            <div class="project-card glass-panel glass-panel-hover" data-tilt>
                <div class="project-card-glow"></div>
                <div class="project-card-inner">
                    <div class="project-number">Project · 0${i + 1}</div>
                    <h3>${p.name}</h3>
                    <p class="project-tagline">${p.tagline}</p>
                    <p class="project-description">${p.description}</p>
                    <div class="project-stack">
                        ${p.stack.map(s => `<span class="project-stack-tag">${s}</span>`).join('')}
                    </div>
                    <div class="project-details" id="details-${i}">
                        <ul>
                            ${p.bullets.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-actions">
                        <button class="project-toggle" onclick="toggleProjectDetails(${i})">
                            View details
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <a href="${p.github}" target="_blank" rel="noreferrer" class="project-github">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(wrapper);
    });

    // Init tilt effect on project cards
    initProjectTilt();
}

/* Toggle project details */
function toggleProjectDetails(index) {
    const details = document.getElementById(`details-${index}`);
    const btn = details.closest('.project-card-inner').querySelector('.project-toggle');
    const isOpen = details.classList.contains('open');

    details.classList.toggle('open');
    btn.classList.toggle('open');
    btn.childNodes[0].textContent = isOpen ? 'View details' : 'Hide details';
}

/* ============ PROJECT TILT ============ */
function initProjectTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1200px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
        });
    });
}

/* ============ RENDER ACHIEVEMENTS ============ */
function renderAchievements() {
    const list = document.getElementById('achievements-list');
    if (!list) return;

    achievements.forEach((a, i) => {
        const card = document.createElement('div');
        card.className = 'achievement-card glass-panel glass-panel-hover';
        card.setAttribute('data-animate', '');
        card.dataset.delay = i;

        const certBtnHtml = a.certLink
            ? `<a href="${a.certLink}" target="_blank" rel="noreferrer" class="achievement-cert-link" onclick="event.stopPropagation()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                View Certificate
              </a>`
            : '';

        card.innerHTML = `
            <div class="achievement-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
            <div>
                <h3>${a.title}</h3>
                <p>${a.description}</p>
                ${certBtnHtml}
            </div>
        `;
        list.appendChild(card);
    });
}

/* ============ RENDER CERTIFICATIONS ============ */
function renderCertifications() {
    const grid = document.getElementById('certs-grid');
    if (!grid) return;

    certifications.forEach((c, i) => {
        const card = document.createElement('div');
        card.className = 'cert-card glass-panel glass-panel-hover';
        card.setAttribute('data-animate', '');
        card.dataset.delay = i;

        const linkTarget = c.driveLink || c.pdf;
        if (linkTarget) {
            card.classList.add('cert-card-clickable');
            card.addEventListener('click', () => window.open(linkTarget, '_blank'));
            card.style.cursor = 'pointer';
        }

        card.innerHTML = `
            <div class="cert-card-glow"></div>
            <div class="cert-card-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                <div class="issuer">${c.issuer}</div>
                <h3>${c.name}</h3>
                ${linkTarget ? '<div class="cert-view-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg> View Certificate</div>' : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ============ RENDER TRYHACKME PANEL ============ */
function renderTryHackMePanel() {
    const panel = document.getElementById('thm-stats-panel');
    if (!panel) return;

    const thmData = {
        username: 'vaibhavdeepsingh',
        rank: 'HACKER',
        level: 8,
        percentile: 'Top 7%',
        points: '7,266',
        rooms: 56,
        badges: 12,
        streak: 13,
        profileUrl: 'https://tryhackme.com/p/vaibhavdeepsingh',
        badgesList: [
            'cat linux.txt', 'First Four', 'Blue', 'OhSINT',
            'Networking Nerd', 'World Wide Web', 'Webbed',
            'Pentesting Principles', 'Burped', 'Hash Cracker',
            '7 Day Streak', 'Bronze League Winner'
        ]
    };

    panel.innerHTML = `
        <div class="thm-panel-inner">
            <div class="thm-panel-heading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>TryHackMe Lab Profile Stats</span>
            </div>
            <a href="${thmData.profileUrl}" target="_blank" rel="noreferrer" class="thm-badge-link">
                <img src="tryhackme.JPG" alt="TryHackMe Badge — ${thmData.username}" class="thm-badge-img">
                <div class="thm-badge-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                    <span>View Profile</span>
                </div>
            </a>
            <div class="thm-info">
                <div class="thm-header-row">
                    <div>
                        <div class="thm-username">${thmData.username}</div>
                        <div class="thm-rank-badge">[${thmData.rank}] · Level ${thmData.level} [0x${thmData.level}]</div>
                    </div>
                    <div class="thm-percentile">${thmData.percentile}</div>
                </div>
                <div class="thm-stats-tiles">
                    <div class="thm-stat-tile">
                        <div class="thm-stat-value">${thmData.level}</div>
                        <div class="thm-stat-label">Level</div>
                    </div>
                    <div class="thm-stat-tile">
                        <div class="thm-stat-value">${thmData.rooms}</div>
                        <div class="thm-stat-label">Rooms</div>
                    </div>
                    <div class="thm-stat-tile">
                        <div class="thm-stat-value">${thmData.badges}</div>
                        <div class="thm-stat-label">Badges</div>
                    </div>
                    <div class="thm-stat-tile">
                        <div class="thm-stat-value">${thmData.streak}</div>
                        <div class="thm-stat-label">Day Streak</div>
                    </div>
                    <div class="thm-stat-tile">
                        <div class="thm-stat-value">${thmData.points}</div>
                        <div class="thm-stat-label">Points</div>
                    </div>
                </div>
                <div class="thm-badges-section">
                    <div class="thm-badges-title">Badges Earned</div>
                    <div class="thm-badges-list">
                        ${thmData.badgesList.map(b => `<span class="thm-badge-tag">${b}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* ============ RENDER MITRE GRID ============ */
function renderMitreGrid() {
    const grid = document.getElementById('mitre-grid');
    const detailPanel = document.getElementById('mitre-detail');
    if (!grid) return;

    mitreTechniques.forEach((t, i) => {
        const tile = document.createElement('button');
        tile.className = `mitre-tile ${t.used ? 'used' : ''}`;
        tile.setAttribute('data-animate', '');
        tile.dataset.delay = i;
        tile.innerHTML = `
            ${t.used ? '<span class="mitre-dot"></span>' : ''}
            <div class="mitre-tile-id">${t.id}</div>
            <div class="mitre-tile-name">${t.name}</div>
            <div class="mitre-tile-tactic">${t.tactic}</div>
        `;

        tile.addEventListener('click', () => showMitreDetail(t));
        tile.addEventListener('mouseenter', () => { if (t.used) showMitreDetail(t); });

        grid.appendChild(tile);
    });

    function showMitreDetail(t) {
        const note = t.note || 'Familiar with this technique through CTFs and threat research.';
        detailPanel.innerHTML = `
            <div class="mitre-detail-header">
                <span class="id">${t.id}</span>
                <h4>${t.name}</h4>
                <span class="tactic">· ${t.tactic}</span>
            </div>
            <p>${note}</p>
        `;
        detailPanel.classList.add('visible');
    }
}

/* ============ 3D EARTH GLOBE ============ */
function initEarthGlobe() {
    const container = document.getElementById('hero-globe');
    if (!container || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.insertBefore(renderer.domElement, container.firstChild);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const pointLight1 = new THREE.PointLight(0xa78bfa, 1, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x7c3aed, 0.6, 50);
    pointLight2.position.set(-5, -3, -5);
    scene.add(pointLight2);

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 100;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(starsGeo, starsMat));

    const radius = 2;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner translucent sphere
    const innerSphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 0.985, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x1a0f3a, transparent: true, opacity: 0.55 })
    );
    globeGroup.add(innerSphere);

    // Wireframe shell
    const wireframe = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.001, 32, 24),
        new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.12 })
    );
    globeGroup.add(wireframe);

    // Atmosphere glow
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.08, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.08, side: THREE.BackSide })
    );
    globeGroup.add(atmosphere);

    // Continent dots
    const continents = [
        { lat: 50, lng: 10, latSpan: 35, lngSpan: 60 },   // Europe
        { lat: 20, lng: 20, latSpan: 35, lngSpan: 50 },   // Africa
        { lat: 0, lng: -60, latSpan: 60, lngSpan: 35 },   // S. America
        { lat: 45, lng: -100, latSpan: 35, lngSpan: 60 },  // N. America
        { lat: 35, lng: 95, latSpan: 35, lngSpan: 70 },   // Asia
        { lat: -25, lng: 135, latSpan: 20, lngSpan: 30 },  // Australia
        { lat: 30, lng: 75, latSpan: 15, lngSpan: 20 },   // India
    ];

    const dotPositions = [];
    let added = 0, attempts = 0;
    while (added < 1800 && attempts < 54000) {
        attempts++;
        const c = continents[Math.floor(Math.random() * continents.length)];
        const lat = c.lat + (Math.random() - 0.5) * c.latSpan + (Math.random() - 0.5) * 8;
        const lng = c.lng + (Math.random() - 0.5) * c.lngSpan + (Math.random() - 0.5) * 8;
        if (Math.random() > 0.7) continue;
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        dotPositions.push(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
        added++;
    }

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(dotPositions), 3));
    const dotsMat = new THREE.PointsMaterial({
        color: 0xa78bfa, size: 0.022, sizeAttenuation: true,
        transparent: true, opacity: 0.9, depthWrite: false
    });
    globeGroup.add(new THREE.Points(dotsGeo, dotsMat));

    // Cities for network arcs
    const cities = [
        { lat: 28.6, lng: 77.2 }, { lat: 19.07, lng: 72.87 }, { lat: 40.71, lng: -74.0 },
        { lat: 37.77, lng: -122.42 }, { lat: 51.5, lng: -0.12 }, { lat: 48.85, lng: 2.35 },
        { lat: 35.68, lng: 139.69 }, { lat: 1.35, lng: 103.82 }, { lat: -33.86, lng: 151.2 },
        { lat: 55.75, lng: 37.62 }, { lat: -23.55, lng: -46.63 }, { lat: 25.2, lng: 55.27 },
        { lat: -1.29, lng: 36.82 }, { lat: 52.52, lng: 13.4 }, { lat: 22.32, lng: 114.17 },
    ];

    function latLngToVec3(lat, lng, r) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
        );
    }

    // City dots
    cities.forEach(c => {
        const pos = latLngToVec3(c.lat, c.lng, radius * 1.005);
        const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0xc4b5fd })
        );
        dot.position.copy(pos);
        globeGroup.add(dot);
    });

    // Network arcs
    const arcs = [];
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    function spawnArc() {
        let s = Math.floor(Math.random() * cities.length);
        let e = Math.floor(Math.random() * cities.length);
        while (e === s) e = Math.floor(Math.random() * cities.length);
        const start = latLngToVec3(cities[s].lat, cities[s].lng, radius * 1.005);
        const end = latLngToVec3(cities[e].lat, cities[e].lng, radius * 1.005);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dist = start.distanceTo(end);
        mid.normalize().multiplyScalar(start.length() + dist * 0.45);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(60);

        return { curve, points, progress: 0, duration: 2 + Math.random() * 2, elapsed: 0, line: null, pulse: null };
    }

    for (let i = 0; i < 8; i++) arcs.push(spawnArc());

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.7 });
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // OrbitControls
    let controls;
    if (THREE.OrbitControls) {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = false;
        controls.rotateSpeed = 0.4;
    }

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();

        // Auto-rotate globe
        globeGroup.rotation.y += delta * 0.08;

        // Update arcs
        arcs.forEach((arc, i) => {
            arc.elapsed += delta;
            arc.progress = Math.min(1, arc.elapsed / arc.duration);

            // Remove old visuals
            if (arc.line) { arcGroup.remove(arc.line); arc.line.geometry.dispose(); arc.line = null; }
            if (arc.pulse) { arcGroup.remove(arc.pulse); arc.pulse = null; }

            // Draw arc
            const len = Math.max(2, Math.floor(arc.points.length * arc.progress));
            const visPoints = arc.points.slice(0, len);
            const geo = new THREE.BufferGeometry().setFromPoints(visPoints);
            arc.line = new THREE.Line(geo, lineMaterial);
            arcGroup.add(arc.line);

            // Pulse dot
            if (arc.progress > 0 && arc.progress < 1) {
                const pulsePos = arc.curve.getPoint(arc.progress);
                const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), pulseMaterial);
                pulseMesh.position.copy(pulsePos);
                arc.pulse = pulseMesh;
                arcGroup.add(pulseMesh);
            }

            // Respawn
            if (arc.progress >= 1 && arc.elapsed > arc.duration + 0.6) {
                arcs[i] = spawnArc();
            }
        });

        if (controls) controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Pause when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clock.start();
            } else {
                clock.stop();
            }
        });
    });
    observer.observe(container);
}

/* ============ CONSOLE EASTER EGG ============ */
console.log('%c⚡ VAIBHAV DEEP SINGH', 'font-size: 24px; font-weight: bold; color: #a855f7;');
console.log('%cSOC Analyst · Detection Engineer', 'font-size: 14px; color: #c084fc;');
console.log('%c--------------------------------------------', 'color: #706a80;');
console.log('%cBuilding resilient detections, hunting threats.', 'font-size: 12px; color: #f0edf5;');
console.log('%cGitHub: github.com/Vaibhav300503', 'font-size: 11px; color: #a09ab0;');
