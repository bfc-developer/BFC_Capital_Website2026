"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { ClipLoader } from "react-spinners";

/* =========================================================
   CONTEXT TYPES
========================================================= */
interface LoaderContextType {
    loading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

/* =========================================================
   CONTEXT
========================================================= */
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

/* =========================================================
   CONTROLLER (OPTIONAL EXTERNAL ACCESS)
========================================================= */
let showLoaderFn: (() => void) | null = null;
let hideLoaderFn: (() => void) | null = null;

export const showGlobalLoader = () => showLoaderFn?.();
export const hideGlobalLoader = () => hideLoaderFn?.();

/* =========================================================
   PROVIDER
========================================================= */
export const GlobalLoaderProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    /* Register controller callbacks */
    useEffect(() => {
        showLoaderFn = showLoader;
        hideLoaderFn = hideLoader;

        return () => {
            showLoaderFn = null;
            hideLoaderFn = null;
        };
    }, []);

    return (
        <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
            {children}
            <GlobalLoader />
        </LoaderContext.Provider>
    );
};

/* =========================================================
   HOOK
========================================================= */
export const useGlobalLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error(
            "useGlobalLoader must be used inside GlobalLoaderProvider"
        );
    }
    return context;
};

/* =========================================================
   LOADER UI
========================================================= */
const GlobalLoader = () => {
    const context = useContext(LoaderContext);
    if (!context || !context.loading) return null;

    return (
        <div className="global-loader-overlay">
            <ClipLoader size={60} color="#011EFE" />
        </div>
    );
};

export default GlobalLoaderProvider;
