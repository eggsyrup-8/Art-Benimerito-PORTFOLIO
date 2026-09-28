(function () {
    const root = document.documentElement;
    const modeButton = document.getElementById("mode");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    function getCurrentTheme() {
        return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
    }

    function updateThemeIcon() {
        const isDark = getCurrentTheme() === "dark";
        modeButton.textContent = isDark ? "☀" : "☾";
        modeButton.setAttribute("aria-pressed", String(isDark));
    }

    // Load saved theme
    try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            root.setAttribute("data-theme", savedTheme);
        }
    } catch (error) {
        console.warn("Unable to access localStorage.", error);
    }

    updateThemeIcon();

    // Toggle theme
    modeButton.addEventListener("click", () => {
        const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", newTheme);

        try {
            localStorage.setItem("theme", newTheme);
        } catch (error) {
            console.warn("Unable to save theme.", error);
        }

        updateThemeIcon();
    });

    // Keep icon correct if the system theme changes
    if (systemDark.addEventListener) {
        systemDark.addEventListener("change", updateThemeIcon);
    }
})();
