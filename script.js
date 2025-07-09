document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.navbar').offsetHeight - 1),
                    behavior: 'smooth'
                });

                // Close navbar on mobile after click
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler && navbarToggler.classList.contains('collapsed')) {
                    // Do nothing if already collapsed
                } else if (navbarToggler) {
                    navbarToggler.click(); // Simulate click to close
                }
            }
        });
    });

    // Add 'active' class to navbar link on scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Adjust for middle of the viewport
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Special handling for the very top of the page (hero section)
    // This ensures 'Home' is active when at the top
    window.addEventListener('scroll', () => {
        const heroSection = document.getElementById('home');
        if (window.scrollY < heroSection.offsetHeight / 2) { // If scroll position is within top half of hero
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('a[href="#home"]').classList.add('active');
        }
    });

});