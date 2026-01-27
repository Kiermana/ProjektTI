document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // 1. TWORZENIE ELEMENTÓW (UI)
    // =================================================
    
    // A. Pasek Postępu
    if (!document.querySelector('.progress-container')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar" id="myBar"></div>';
        document.body.prepend(progressContainer);
    }

    // B. Przycisk "Do Góry"
    if (!document.getElementById('scrollTopBtn')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollTopBtn';
        scrollBtn.innerHTML = '&#8679;'; // Strzałka
        document.body.appendChild(scrollBtn);
    }

    // C. Przycisk "Tryb Nocny"
    if (!document.getElementById('darkModeToggle')) {
        const darkBtn = document.createElement('button');
        darkBtn.id = 'darkModeToggle';
        darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(darkBtn);
        
        // Logika przełączania trybu
        darkBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // D. Powiadomienia (Toast)
    if (!document.getElementById('toast')) {
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }


    // =================================================
    // 2. LOGIKA TRYBU NOCNEGO (Wczytywanie)
    // =================================================
    const darkBtn = document.getElementById('darkModeToggle');
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if(darkBtn) darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }


    // =================================================
    // 3. LOGIKA SCROLLA I PASKA
    // =================================================
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        
        const myBar = document.getElementById("myBar");
        if(myBar) myBar.style.width = scrolled + "%";

        if (winScroll > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    };

    scrollBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });


    // =================================================
    // 4. OBSŁUGA KROKÓW (CHECKMARKI + TOAST)
    // =================================================
    function showToast(message) {
        const x = document.getElementById("toast");
        x.innerText = message;
        x.className = "toast show";
        setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
    }

    document.querySelectorAll('.step-number').forEach(step => {
        step.addEventListener('click', function() {
            const isCompleted = this.classList.toggle('completed');
            if (navigator.vibrate) navigator.vibrate(50);
            showToast(isCompleted ? "✅ Krok zaliczony!" : "↩️ Cofnięto krok");
        });
    });


    // =================================================
    // 5. MENU MOBILNE
    // =================================================
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => { navMenu.classList.toggle('active'); });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => { navMenu.classList.remove('active'); });
        });
    }


    // =================================================
    // 6. LIGHTBOX (GALERIA)
    // =================================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    const images = document.querySelectorAll('.tutorial-img');

    if (modal) {
        images.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                if(captionText) captionText.innerHTML = this.alt;
            });
        });
        if(closeBtn) closeBtn.onclick = () => modal.style.display = "none";
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
        document.addEventListener('keydown', (e) => { if(e.key === "Escape") modal.style.display = "none"; });
    }


    // =================================================
    // 7. GŁADKIE KOTWICE
    // =================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
        });
    });
});