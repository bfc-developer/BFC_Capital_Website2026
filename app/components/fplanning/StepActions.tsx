interface StepActionsProps {
    showBack?: boolean;
    onBack?: () => void;
    onContinue: () => void | Promise<void>;
    isSubmitting?: boolean;
    continueLabel?: string;
}

export default function StepActions({
    showBack = false,
    onBack,
    onContinue,
    isSubmitting = false,
    continueLabel = "Continue",
}: StepActionsProps) {
    return (
        <div className="flex flex-row justify-between sm:justify-end gap-3 pt-2">
            {showBack && (
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="w-1/2 sm:w-auto cursor-pointer sm:min-w-[120px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-white border border-[#e0dbdb] hover:bg-[#fafafa] rounded-[10px] flex items-center justify-center gap-2 text-[#44475b] font-medium text-[15px] sm:text-[18px] transition-colors disabled:opacity-55"
                >
                    Back
                </button>
            )}
            <button
                type="button"
                onClick={onContinue}
                disabled={isSubmitting}
                className={`${showBack ? "w-1/2" : "w-full"} cursor-pointer sm:w-auto sm:min-w-[170px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-[#06A358] hover:bg-[#06A358] rounded-[10px] shadow-[3px_3px_8.6px_0px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2 text-white font-medium text-[15px] sm:text-[18px] transition-colors disabled:opacity-75`}
            >
                {isSubmitting ? "Saving..." : continueLabel}
                {!isSubmitting && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                )}
            </button>
        </div>
    );
}
