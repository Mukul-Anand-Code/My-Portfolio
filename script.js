
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_KEY

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


(function () {
    emailjs.init({
        publicKey: "6VoZ7hR2UjS0rEe-1",
    });
})();

// template_uenc792
// service_375nyfe

const contactForm = document.querySelector("#contact-form");



contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm(
        "service_375nyfe",
        "template_uenc792",
        contactForm
    )
        .then(function () {
            const formMessage = document.querySelector("#form-message");

            formMessage.textContent = "Message sent successfully! 🎉";
            formMessage.className = "form-message success";
            contactForm.reset();
            setTimeout(function () {
                formMessage.className = "form-message";
                formMessage.textContent = "";
            }, 5000);
        })
        .catch(function (error) {
            console.log("Email error:", error);
            const formMessage = document.querySelector("#form-message");

            formMessage.textContent = "Message could not be sent. Please try again.";
            formMessage.className = "form-message error";
            setTimeout(function () {
                formMessage.className = "form-message";
                formMessage.textContent = "";
            }, 5000);
        });
});



const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});



const themeBtn = document.querySelector("#theme-btn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("night-mode");

    if (document.body.classList.contains("night-mode")) {
        themeBtn.textContent = "☀️";
        themeBtn.setAttribute("aria-label", "Switch to day mode");
    } else {
        themeBtn.textContent = "🌙";
        themeBtn.setAttribute("aria-label", "Switch to night mode");
    }
});


async function loadProjects() {
    const projectsGrid = document.getElementById("dynamicProjects");

    const { data, error } = await supabaseClient
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Projects load error:", error);
        return;
    }

    projectsGrid.innerHTML = "";

    data.forEach(function (project) {
        const card = document.createElement("article");
        card.className = "project-card";

        const image = document.createElement("img");
        image.src = project.image_url || "";
        image.alt = project.title;
        image.className = "project-image";

        const info = document.createElement("div");
        info.className = "project-info";

        const type = document.createElement("span");
        type.className = "project-type";
        type.textContent = project.type || "";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description || "";

        const tech = document.createElement("div");
        tech.className = "project-tech";

        (project.technologies || []).forEach(function (item) {
            const span = document.createElement("span");
            span.textContent = item;
            tech.appendChild(span);
        });

        info.append(type, title, description, tech);

        if (project.live_url) {
            const link = document.createElement("a");
            link.href = project.live_url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "project-link";
            link.textContent = "View Project ↗";
            info.appendChild(link);
        }

        if (project.github_url) {
            const githubLink = document.createElement("a");

            githubLink.href = project.github_url;
            githubLink.target = "_blank";
            githubLink.rel = "noopener noreferrer";
            githubLink.className = "project-link";
            githubLink.textContent = "GitHub ↗";

            info.appendChild(githubLink);
        }

        card.append(image, info);
        projectsGrid.appendChild(card);
    });
}

loadProjects();

async function loadSkills() {
    const skillsGrid = document.getElementById("dynamicSkills");

    const { data, error } = await supabaseClient
        .from("skills")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Skills load error:", error);
        return;
    }

    skillsGrid.innerHTML = "";

    data.forEach(function (skill) {
        const card = document.createElement("div");
        card.className = "skill-card";

        const icon = document.createElement("div");
        icon.className = "skill-icon";

        if (skill.icon_url) {
            const img = document.createElement("img");
            img.src = skill.icon_url;
            img.alt = skill.name;
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.objectFit = "contain";
            icon.appendChild(img);
        }

        const name = document.createElement("h3");
        name.textContent = skill.name;

        const description = document.createElement("p");
        description.textContent = skill.description || "";

        if (skill.day_color) {
            card.style.setProperty("--skill-day-color", skill.day_color);
        }

        card.append(icon, name, description);
        skillsGrid.appendChild(card);
    });
}

loadSkills();
