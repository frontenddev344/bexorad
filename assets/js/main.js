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

// Form Validations Start
function initBexoradContactForm() {

    const form = document.querySelector("#bexoradContactForm");

    if (!form) return;

    const successBox = form.querySelector(".form-success");

    const requiredFields = form.querySelectorAll("[required]");

    function clearErrors() {

        form.querySelectorAll(".field-error").forEach(error => {
            error.textContent = "";
        });

        requiredFields.forEach(field => {
            field.setCustomValidity("");
        });

    }

    function showError(field, message) {

        const error = field.parentElement.querySelector(".field-error");

        if (error) {
            error.textContent = message;
        }

        field.setCustomValidity(message);

    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        let valid = true;

        // Full Name
        const fullName = form.querySelector("#contactFullName");

        if (!fullName.value.trim()) {

            showError(fullName, "Please enter your full name.");

            valid = false;

        }

        // Email
        const email = form.querySelector("#contactEmail");

        if (!email.value.trim()) {

            showError(email, "Please enter your email address.");

            valid = false;

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {

            showError(email, "Please enter a valid email address.");

            valid = false;

        }

        // Subject
        const subject = form.querySelector("#contactSubject");

        if (!subject.value.trim()) {

            showError(subject, "Please select a subject.");

            valid = false;

        }

        // Message
        const message = form.querySelector("#contactMessage");

        if (!message.value.trim()) {

            showError(message, "Please enter your message.");

            valid = false;

        }

        if (!valid) {

            form.reportValidity();

            return;

        }

        // ===== SUCCESS =====

        successBox.style.display = "block";

        form.reset();

        setTimeout(() => {

            successBox.style.display = "none";

        }, 3000);

    });

}

document.addEventListener("DOMContentLoaded", initBexoradContactForm);

// Form Validations End
