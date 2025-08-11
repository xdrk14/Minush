// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("scroll", () => {
        const progressBar = document.getElementById("scroll-progress");
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
      
        progressBar.style.width = `${scrollPercent}%`;
      });
       
      
    console.log("DOM fully loaded and parsed");

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        console.log("Mobile menu elements found");
        mobileMenuButton.addEventListener('click', () => {
            console.log("Mobile menu button clicked");
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden'); // Toggle visibility
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded); // Update ARIA state
            mobileMenu.setAttribute('aria-hidden', isExpanded); // Update ARIA state
        });
    } else {
        console.warn("Mobile menu button or menu element not found.");
    }

    // --- Active Navigation Link Highlighting ---
    try {
        const navLinks = document.querySelectorAll('header .nav-link'); // Target links in header
        let currentPath = window.location.pathname.split('/').pop(); // Get filename (e.g., "about.html")

        // Handle root path case (e.g., "mysite.com/") -> "index.html"
        if (currentPath === "" && (window.location.pathname === "/" || window.location.pathname.endsWith("/index.html"))) {
             currentPath = "index.html";
        } else if (currentPath === "") {
             // Fallback if path is just a directory name, assume index.html
             currentPath = "index.html";
        }

        console.log(`Current page file: ${currentPath}`);

        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (!linkHref) return; // Skip links without href

                const linkPath = linkHref.split('/').pop(); // Get filename from link
                const linkIsToIndex = linkPath === "" || linkPath === "index.html";

                // Remove active class first
                link.classList.remove('nav-link-active');

                // Add active class if link path matches current path OR if both point to index
                if (currentPath === linkPath || (currentPath === "index.html" && linkIsToIndex)) {
                    console.log(`Activating link: ${linkHref}`);
                    link.classList.add('nav-link-active');
                }
            });
        } else {
            console.warn("Navigation links not found in the header.");
        }
    } catch (error) {
        console.error("Error during navigation link highlighting:", error);
    }


    // --- Contact Form Handling (Simulation with Message Box) ---
 
    const contactForm = document.querySelector('#contact-content form'); // Target form specifically
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        console.log("Contact form found");
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default page reload

            formStatus.textContent = 'Sending message...';
            formStatus.className = 'mt-4 text-center text-base h-6 font-semibold sending'; // Add 'sending' class

            console.log("Simulating form submission...");
            setTimeout(() => {
               
                // Display the thank-you message as requested, using the message box
                formStatus.textContent = 'Thank you for your message!';
                formStatus.className = 'mt-4 text-center text-base h-6 font-semibold success'; // Add 'success' class
                contactForm.reset(); // Clear the form fields

                 // Clear the status message after a few seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'mt-4 text-center text-base h-6 font-semibold'; // Reset class
                }, 5000); // Clear after 5 seconds

            }, 1500); 
        });
    } else {
        if (window.location.pathname.includes('contact.html')) {
             console.warn("Contact form or form status element not found on contact page.");
        }
    }

    // --- Footer Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded