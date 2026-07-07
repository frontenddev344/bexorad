//Header//
        const toggle = document.querySelector(".mobile-toggle");
        const menu = document.querySelector(".nav-links");
        const icon = toggle.querySelector("i");

        toggle.addEventListener("click", () => {

            menu.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            if (menu.classList.contains("active")) {
                icon.classList.replace("fa-bars", "fa-xmark");
            } else {
                icon.classList.replace("fa-xmark", "fa-bars");
            }

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");
                document.body.classList.remove("menu-open");
                icon.classList.replace("fa-xmark", "fa-bars");

            });

        });

//Header//


//Faq//
        const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.querySelector(".faq-question").addEventListener("click", () => {

        faqItems.forEach(faq => {
            if(faq !== item){
                faq.classList.remove("active");
            }
        });

        item.classList.toggle("active");

    });

});

//Faq//


//Tabs//
document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".tab-btn");
    const cards = document.querySelectorAll(".arrival-card");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            tabs.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filter = this.dataset.filter;

            cards.forEach(card => {

                if (filter === "all" || card.dataset.category === filter) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

});
//Tabs//