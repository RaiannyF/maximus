document.addEventListener("DOMContentLoaded", () => {
    const loadComponents = async () => {
        const elements = document.querySelectorAll('[data-include]');
        
        for (let el of elements) {
            const file = el.getAttribute('data-include');
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    el.insertAdjacentHTML('beforebegin', html);
                    el.remove();
                } else {
                    console.error('Componente não encontrado:', file);
                }
            } catch (error) {
                console.error('Erro ao carregar componente:', error);
            }
        }
        setupActiveState();
    };

    const setupActiveState = () => {
        const currentPage = document.body.getAttribute('data-page');
        
        // Aplica a classe "active" gerida no style.css
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Configurar Título do Cabeçalho
        const pageTitleElement = document.getElementById('page-title');
        if (pageTitleElement) {
            pageTitleElement.textContent = currentPage === 'horario' ? 'Horário de aulas' : 'Disciplinas';
        }
    };

    loadComponents();
});