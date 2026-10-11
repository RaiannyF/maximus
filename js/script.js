document.addEventListener("DOMContentLoaded", init);

async function init() {
    await loadComponents();
    setupActiveState();
    setupSidebarToggle();
}

async function loadComponents() {
    const elements = document.querySelectorAll("[data-include]");

    await Promise.all([...elements].map(async element => {
        const file = element.dataset.include;

        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            element.outerHTML = await response.text();
        } catch (error) {
            console.error(`Erro ao carregar ${file}:`, error);
        }
    }));

    configurarNavegacao();
}

document.addEventListener("DOMContentLoaded", loadComponents);

function setupActiveState() {
    const currentPage = document.body.dataset.page;

    document.querySelectorAll(".nav-link[data-target]").forEach(link => {
        const isActive = link.dataset.target === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    const titles = {
        horario: "Horário de aulas",
        disciplinas: "Disciplinas",
        professores: "Professores",
        matricula: "Acerto de matrícula",
        historico: "Histórico acadêmico",
        calendario: "Calendário"
    };

    const pageTitle = document.getElementById("page-title");

    if (pageTitle) {
        pageTitle.textContent = titles[currentPage] || "MAXIMUS UFV";
    }
}

function setupSidebarToggle() {
    const toggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");

    if (!toggle || !sidebar) return;

    toggle.addEventListener("click", event => {
        event.preventDefault();
        sidebar.classList.toggle("open");
    });
}

function configurarNavegacao() {
    const paginas = {
        "horario": "Horário de aulas",
        "disciplinas": "Disciplinas",
        "professores": "Professores",
        "acerto-matricula": "Acerto de matrícula",
        "historico-academico": "Histórico acadêmico",
        "calendario": "Calendário"
    };

    const arquivo = window.location.pathname.split("/").pop().toLowerCase();

    const paginaAtual = {
        "schedule.html": "horario",
        "courses.html": "disciplinas",
        "professors.html": "professores",
        "course-registration.html": "acerto-matricula",
        "academic-record.html": "historico-academico",
        "calendar.html": "calendario"
    }[arquivo];

    if (!paginaAtual) return;

    document.querySelectorAll(".sidebar .nav-link[data-page]").forEach(link => {
        const ativa = link.dataset.page === paginaAtual;

        link.classList.toggle("active", ativa);

        if (ativa) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    const titulo = document.getElementById("pageTitle");

    if (titulo) {
        titulo.textContent = paginas[paginaAtual];
    }
}