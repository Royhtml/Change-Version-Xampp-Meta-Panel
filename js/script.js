        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((a) => {
                a.classList.remove("active");
                if (a.getAttribute("href") === `#${current}`) {
                    a.classList.add("active");
                }
            });
        });
        navLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault(); 
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    sections.forEach(sec => sec.classList.remove("highlight-target"));
                    setTimeout(() => {
                        targetSection.classList.add("highlight-target");
                    }, 400);
                    setTimeout(() => {
                        targetSection.classList.remove("highlight-target");
                    }, 2400);
                }
            });
        });