// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
if (!navbar) {
    console.error('Navbar element not found. Ensure the element has class="navbar" in your HTML.');
} else {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        console.log('Scroll position:', currentScrollY); // Debug log
        if (currentScrollY > 20 && currentScrollY >= lastScrollY) {
            navbar.classList.add('hidden');
            console.log('Navbar hidden'); // Debug log
        } else {
            navbar.classList.remove('hidden');
            console.log('Navbar shown'); // Debug log
        }
        lastScrollY = currentScrollY;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = searchResults.querySelector('.search-results-list');
    const searchLoading = searchResults.querySelector('.search-loading');
    const searchNoResults = searchResults.querySelector('.search-no-results');
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, a');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        searchLoading.classList.add('show');
        searchNoResults.classList.remove('show');
        searchResultsList.innerHTML = '';
        const results = [];
        searchableElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(searchTerm)) {
                const result = {
                    element: element,
                    text: element.textContent,
                    href: element.tagName === 'A' ? element.href : window.location.href,
                    section: null
                };
                let currentElement = element;
                while (currentElement && currentElement.tagName !== 'SECTION') {
                    currentElement = currentElement.parentElement;
                }
                if (currentElement && currentElement.id) {
                    result.section = currentElement.id;
                }

                results.push(result);
            }
        });

        searchLoading.classList.remove('show');
        if (results.length === 0) {
            searchNoResults.classList.add('show');
        } else {
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'search-results-item';
                item.innerHTML = `
                    <span>${result.text}</span>
                `;
                item.addEventListener('click', () => {
                    if (result.section) {
                        const section = document.getElementById(result.section);
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        if (result.href !== window.location.href) {
                            window.location.href = result.href;
                        }
                    }
                });
                searchResultsList.appendChild(item);
            });
        }

        searchResults.classList.add('show');
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('show');
            searchInput.value = '';
        }
    });

    // Staff loading functionality
    async function loadStaff() {
        try {
            const res = await fetch('http://localhost:3001/api/staff');
            const staff = await res.json();
            const container = document.getElementById('staffContainer');
            container.innerHTML = '';

            staff.forEach(member => {
                const card = document.createElement('div');
                card.className = 'box';
                card.innerHTML = `
                    <img src="${member.avatar}" alt="${member.username}" />
                    <h3 style="font-size: 1rem; font-weight: bold;">${member.displayname || member.username}</h3>
                    <p style="color: #666;">${member.username}</p>
                    <p class="description">${member.description || ''}</p>
                    <p style="font-size: 0.75rem; color: #aaa;">${member.role || ''}</p>
                `;
                container.appendChild(card);
            });
        } catch (err) {
            console.error('Failed to load staff:', err);
            document.getElementById('staffContainer').innerHTML =
                '<p style="color:red;">Unable to load staff data. Please check API.</p>';
        }
    }

    loadStaff();
});