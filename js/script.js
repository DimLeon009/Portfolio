const portfolioLinks = {
    github: "https://github.com/DimLeon009/",
    linkedin: "https://linkedin.com/in/dimitry-leonco",
    instagram: "",
    vigilantGuardian: "https://github.com/JasonVachier/vigilant-guardian",
    hermess: "",
    ldapManager: "",
    passwordManager: "",
    portScanner: "",
    steganography: ""
};

const projectData = {
    vigilant: {
        title: "Vigilant Guardian",
        category: "Cybersécurité · Développement Web",
        description: "Application Web de veille défensive centralisant les vulnérabilités du NIST NVD et du catalogue CISA KEV. Elle permet de rechercher et prioriser les CVE, puis de générer des résumés, analyses d'impact et recommandations de remédiation en français avec Google Gemini.",
        technologies: "Python 3.12, Flask, SQLite, Jinja2, Bootstrap, Gemini API, NVD API, CISA KEV",
        role: "Projet collaboratif académique",
        highlights: "Collecte automatisée, filtres CVSS/KEV, recherche, fiches détaillées et analyse IA",
        image: "assets/projects/vigilant-dashboard-source.webp",
        gallery: [
            "assets/projects/vigilant-dashboard-source.webp",
            "assets/projects/vigilant-detail-apple-source.webp",
            "assets/projects/vigilant-detail-n8n-source.webp"
        ],
        link: portfolioLinks.vigilantGuardian
    },
    infrastructure: {
        title: "Infrastructure multi-sites sécurisée",
        category: "Infrastructure · Cybersécurité",
        description: "Conception d'une infrastructure reliant un site industriel et un siège social par un tunnel VPN IPsec. L'architecture intègre des pare-feu Stormshield, une segmentation VLAN, une DMZ, un environnement virtualisé sous Proxmox et plusieurs services réseau sécurisés.",
        technologies: "Stormshield, IPsec, Proxmox, VLAN, DHCP, DNS, RADIUS/LDAP, Syslog",
        role: "Projet académique — Architecture réseau",
        highlights: "Deux sites, DMZ, Wi-Fi privé/public, services virtualisés et administration segmentée",
        image: "assets/projects/infrastructure-source.webp",
        gallery: [],
        link: ""
    },
    hermess: {
        title: "HERMESS",
        category: "Développement Web · Cybersécurité",
        description: "Système de messagerie Web hautement sécurisé conçu pour protéger la confidentialité des échanges grâce à un chiffrement de bout en bout.",
        technologies: "HTML, CSS, JavaScript, bibliothèques JavaScript de cryptographie, PHP, SQL",
        role: "Projet académique",
        highlights: "Échanges privés, interface de conversation et protection des messages de bout en bout",
        image: "assets/projects/hermess-source.webp",
        gallery: [],
        link: portfolioLinks.hermess
    },
    ldap: {
        title: "LDAP Manager",
        category: "Développement Web · Administration système",
        description: "Interface Web intuitive permettant d'administrer un annuaire LDAP et de simplifier la gestion quotidienne de ses utilisateurs et de ses groupes.",
        technologies: "HTML, CSS, JavaScript, PHP, SQL, LDAP-PHP",
        role: "Projet académique",
        highlights: "Recherche, ajout, modification et suppression d'utilisateurs et de groupes LDAP",
        image: "assets/projects/ldap-manager-source.webp",
        gallery: [],
        link: portfolioLinks.ldapManager
    },
    password: {
        title: "Gestionnaire de mots de passe sécurisé",
        category: "Développement · Cryptographie",
        description: "Application en ligne de commande permettant de gérer des identifiants dans une base SQLite entièrement chiffrée. Les mots de passe sont protégés par AES-256-GCM et les clés sont dérivées avec PBKDF2.",
        technologies: "Python, SQLite, AES-256-GCM, PBKDF2, SHA-256",
        role: "Projet académique individuel",
        highlights: "Compte maître, verrouillage après échecs, import/export chiffré et gestion complète des entrées",
        graphic: "graphic-password",
        icon: "uil-key-skeleton-alt",
        label: "••••••••••",
        gallery: [],
        link: portfolioLinks.passwordManager
    },
    scanner: {
        title: "Scanner de ports TCP",
        category: "Développement · Réseau",
        description: "Outil Python en ligne de commande capable d'analyser les ports TCP d'une adresse IP ou d'un nom d'hôte. Le projet propose une version séquentielle et une version multithread plus rapide.",
        technologies: "Python, Socket, ThreadPoolExecutor, TCP/IP",
        role: "Projet académique individuel",
        highlights: "Résolution d'hôtes, détection des ports ouverts, gestion des erreurs et exécution multithread",
        graphic: "graphic-scanner",
        icon: "uil-crosshairs",
        label: "22 · 80 · 443",
        gallery: [],
        link: portfolioLinks.portScanner
    },
    stegano: {
        title: "Stéganographie LSB avec chiffrement",
        category: "Développement · Cybersécurité",
        description: "Application CLI permettant de cacher et révéler des messages dans des images PNG en modifiant les bits de poids faible des pixels. Un chiffrement optionnel protège le message avant son insertion.",
        technologies: "Python, Pillow, LSB, AES-GCM, PBKDF2",
        role: "Projet académique individuel",
        highlights: "Dissimulation et extraction, calcul de capacité, conversion PNG et protection par mot de passe",
        graphic: "graphic-stegano",
        icon: "uil-image-lock",
        label: "LSB + AES",
        gallery: [],
        link: portfolioLinks.steganography
    }
};

const skillTabs = document.querySelectorAll("[data-target]");
const skillPanels = document.querySelectorAll("[data-content]");

skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        skillTabs.forEach((item) => {
            item.classList.remove("skills-active");
            item.setAttribute("aria-selected", "false");
        });
        skillPanels.forEach((panel) => {
            panel.classList.remove("skills-active");
            panel.hidden = true;
        });

        const target = document.querySelector(tab.dataset.target);
        tab.classList.add("skills-active");
        tab.setAttribute("aria-selected", "true");
        target.classList.add("skills-active");
        target.hidden = false;
    });
});

const filterButtons = document.querySelectorAll(".work-item");
const projectCards = document.querySelectorAll(".work-card");
const projectFilterSelect = document.getElementById("project-filter");
const filterTrigger = projectFilterSelect.querySelector(".filter-select-trigger");
const filterOptionsPanel = projectFilterSelect.querySelector(".filter-options");
const filterOptions = [...projectFilterSelect.querySelectorAll(".filter-option")];
const filterCurrent = projectFilterSelect.querySelector(".filter-current");

function setFilterMenu(open, focusTrigger = false) {
    projectFilterSelect.classList.toggle("open", open);
    filterTrigger.setAttribute("aria-expanded", String(open));
    filterOptionsPanel.hidden = !open;
    if (focusTrigger) filterTrigger.focus();
}

function syncProjectFilters(filter) {
    filterButtons.forEach((item) => {
        item.classList.toggle("active-work", item.dataset.filter === filter);
    });
    filterOptions.forEach((option) => {
        const selected = option.dataset.value === filter;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-selected", String(selected));
        if (selected) filterCurrent.textContent = option.textContent;
    });
}

function filterProjects(filter) {
    projectCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
    syncProjectFilters(filter);
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => filterProjects(button.dataset.filter));
});

filterTrigger.addEventListener("click", () => {
    setFilterMenu(filterOptionsPanel.hidden);
});

filterOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
        filterProjects(option.dataset.value);
        setFilterMenu(false, true);
    });
    option.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            filterOptions[(index + direction + filterOptions.length) % filterOptions.length].focus();
        }
        if (event.key === "Escape") setFilterMenu(false, true);
    });
});

filterTrigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        event.preventDefault();
        setFilterMenu(true);
        (filterOptions.find((option) => option.classList.contains("selected")) || filterOptions[0]).focus();
    }
    if (event.key === "Escape") setFilterMenu(false);
});

document.addEventListener("click", (event) => {
    if (!projectFilterSelect.contains(event.target)) setFilterMenu(false);
});

const popup = document.getElementById("portfolio-popup");
const popupMedia = document.getElementById("popup-media");
const popupCategory = document.getElementById("popup-category");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupDetails = document.getElementById("popup-details");
const popupGallery = document.getElementById("popup-gallery");
const popupLink = document.getElementById("popup-link");
const repoSoon = document.getElementById("repo-soon");
const popupClose = document.querySelector(".portfolio-popup-close");
let lastFocusedElement = null;

function buildProjectMedia(project) {
    popupMedia.replaceChildren();
    if (project.image) {
        const image = document.createElement("img");
        image.src = project.image;
        image.alt = `Aperçu du projet ${project.title}`;
        popupMedia.append(image);
        return image;
    }

    const graphic = document.createElement("div");
    graphic.className = `work-graphic ${project.graphic}`;
    graphic.setAttribute("role", "img");
    graphic.setAttribute("aria-label", `Illustration du projet ${project.title}`);
    graphic.innerHTML = `<i class="uil ${project.icon}" aria-hidden="true"></i><span>${project.label}</span>`;
    popupMedia.append(graphic);
    return null;
}

function openProject(projectKey, trigger) {
    const project = projectData[projectKey];
    if (!project) return;

    lastFocusedElement = trigger;
    const mainImage = buildProjectMedia(project);
    popupCategory.textContent = project.category;
    popupTitle.textContent = project.title;
    popupDescription.textContent = project.description;
    popupDetails.innerHTML = `
        <li><strong>Technologies :</strong> ${project.technologies}</li>
        <li><strong>Type :</strong> ${project.role}</li>
        <li><strong>Points clés :</strong> ${project.highlights}</li>
    `;
    popupGallery.replaceChildren();

    project.gallery.forEach((source, index) => {
        const thumb = document.createElement("img");
        thumb.src = source;
        thumb.alt = `Vue ${index + 1} du projet ${project.title}`;
        thumb.loading = "lazy";
        thumb.addEventListener("click", () => {
            if (mainImage) mainImage.src = source;
        });
        popupGallery.append(thumb);
    });

    popupGallery.hidden = project.gallery.length === 0;
    popupLink.hidden = !project.link;
    repoSoon.hidden = Boolean(project.link);
    if (project.link) popupLink.href = project.link;

    popup.hidden = false;
    document.body.classList.add("body-locked");
    popupClose.focus();
}

function closeProject() {
    popup.hidden = true;
    document.body.classList.remove("body-locked");
    if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".work-button, .work-media").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".work-card");
        openProject(card.dataset.project, button);
    });
});

popupClose.addEventListener("click", closeProject);
popup.addEventListener("click", (event) => {
    if (event.target === popup) closeProject();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popup.hidden) closeProject();
});

const inputs = document.querySelectorAll(".input");
inputs.forEach((input) => {
    const updateFocus = () => input.parentElement.classList.toggle("focus", document.activeElement === input || input.value.trim() !== "");
    input.addEventListener("focus", updateFocus);
    input.addEventListener("blur", updateFocus);
    updateFocus();
});

document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const body = `Bonjour Dimitry,\n\n${message}\n\nCordialement,\n${name}`;
    window.location.href = `mailto:dimitry.leonco@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const navMenu = document.getElementById("sidebar");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav-link");

function setMenu(open) {
    navMenu.classList.toggle("show-sidebar", open);
    navToggle.setAttribute("aria-expanded", String(open));
    if (open) navClose.focus();
}

navToggle.addEventListener("click", () => setMenu(true));
navClose.addEventListener("click", () => {
    setMenu(false);
    navToggle.focus();
});
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const observedSections = document.querySelectorAll("section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active-link", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

observedSections.forEach((section) => sectionObserver.observe(section));
document.getElementById("current-year").textContent = new Date().getFullYear();
