import { PropsWithChildren, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoader } from "@/components/ui/PageLoader";

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ErrorBoundary>
            <Sonner />
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    {children}
                </Suspense>
            </BrowserRouter>
        </ErrorBoundary>
    );
};
