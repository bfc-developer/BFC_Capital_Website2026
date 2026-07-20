export default function PortfolioReview() {
    return (
        <>
            <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="mb-4">
                    <h1 className="font-bold text-[16px] sm:text-[19px] md:text-[21px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                        Do You Need a Portfolio Review?
                    </h1>
                </div>

                <div className="space-y-3 mb-5">
                    <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            role="radio"
                            className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                            <span className="text-gray-700 items-center flex gap-1">
                                <span className="text-gray-700 group-hover:text-white">Yes</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                            </span>
                        </button>
                        <button
                            type="button"
                            role="radio"
                            className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                            <span className="text-gray-700 items-center flex gap-1">
                                <span className="text-gray-700 group-hover:text-white">No</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-4 sm:mb-4" />
                <div className="pt-6 space-y-5">

                    <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="lg:col-span-12">

                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Any specific concerns or details?
                            </label>
                            <textarea
                                placeholder="Tell us More..."
                                rows={3}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 resize-none"
                            />

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
