const routes = {};

export function addRoute(path, action) {
    routes[path] = action;
}

export function navigate(path) {
    if (routes[path]) {
        routespath;
        window.history.pushState({}, path, window.location.origin + '/' + path);
    } else {
        console.error(`No route found for path: ${path}`);
    }
}

export function initRouter() {
    window.addEventListener('popstate', () => {
        const path = window.location.pathname.substring(1);
        if (routes[path]) {
            routespath;
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const path = e.target.getAttribute('href').substring(1);
            navigate(path);
        }
    });

    // Navigate to the initial path
    const initialPath = window.location.pathname.substring(1) || 'home';
    navigate(initialPath);
}