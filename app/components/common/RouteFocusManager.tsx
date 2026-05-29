"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteFocusManager() {
    const pathname = usePathname();

    useEffect(() => {
        // When path changes, wait slightly for the DOM to update, then focus the main content area
        const focusMain = () => {
            const mainContent = document.getElementById("main-content");
            if (mainContent) {
                // Ensure it has tabindex for programmatic focus
                if (!mainContent.hasAttribute("tabindex")) {
                    mainContent.setAttribute("tabindex", "-1");
                }
                // Avoid visual outline on programmatic focus unless necessary
                mainContent.style.outline = "none";
                mainContent.focus();
            }
        };

        // Delay slightly to ensure React has committed the DOM changes
        const timeoutId = setTimeout(focusMain, 100);
        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}
