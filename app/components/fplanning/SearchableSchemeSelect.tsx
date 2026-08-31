"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, X, Loader2 } from "lucide-react";

interface SearchableSchemeSelectProps {
    id?: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder?: string;
    isLoading?: boolean;
    disabled?: boolean;
    hasError?: boolean;
}

export default function SearchableSchemeSelect({
    id,
    value,
    options,
    onChange,
    placeholder = "Select Scheme",
    isLoading = false,
    disabled = false,
    hasError = false,
}: SearchableSchemeSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Filter options based on search query (case-insensitive substring match)
    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) return options;
        const q = searchQuery.toLowerCase().trim();
        return options.filter((opt) => opt.toLowerCase().includes(q));
    }, [options, searchQuery]);

    // Handle outside clicks to close the dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen) {
            setSearchQuery("");
            setHighlightedIndex(-1);
            const timer = setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Scroll highlighted option into view
    useEffect(() => {
        if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
            optionRefs.current[highlightedIndex]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [highlightedIndex]);

    const handleTriggerClick = () => {
        if (disabled) return;
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (scheme: string) => {
        onChange(scheme);
        setIsOpen(false);
        triggerRef.current?.focus();
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        setSearchQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                handleSelect(filteredOptions[highlightedIndex]);
            } else if (filteredOptions.length > 0) {
                handleSelect(filteredOptions[0]);
            } else if (searchQuery.trim()) {
                handleSelect(searchQuery.trim());
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
            triggerRef.current?.focus();
        }
    };

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            setIsOpen(true);
        }
    };

    return (
        <div ref={containerRef} className={`relative w-full ${isOpen ? "z-30" : ""}`}>
            {/* Trigger Button */}
            <button
                ref={triggerRef}
                id={id}
                type="button"
                disabled={disabled}
                onClick={handleTriggerClick}
                onKeyDown={handleTriggerKeyDown}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] flex items-center justify-between text-left transition-colors outline-none ${
                    hasError
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                        : isOpen
                        ? "border-[#04b488] ring-1 ring-[#04b488]"
                        : "border-[#e9e9e9] focus:border-[#04b488]"
                } ${
                    disabled
                        ? "opacity-60 bg-gray-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-[#04b488]/60"
                }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="truncate pr-2 flex-1 min-w-0">
                    {value ? (
                        <span className="text-[#44475b] font-medium" title={value}>
                            {value}
                        </span>
                    ) : (
                        <span className="text-[#8b8b8b]">{placeholder}</span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    {isLoading ? (
                        <Loader2 size={16} className="text-[#04b488] animate-spin" />
                    ) : value && !disabled ? (
                        <span
                            role="button"
                            tabIndex={-1}
                            onClick={handleClear}
                            className="p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                            title="Clear scheme"
                        >
                            <X size={14} />
                        </span>
                    ) : null}

                    <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#04b488]" : ""
                        }`}
                    />
                </div>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div
                    className="absolute left-0 right-0 z-50 bg-white border border-gray-200 overflow-hidden"
                    style={{
                        top: "calc(100% + 6px)",
                        minWidth: "100%",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Search Bar Input */}
                    <div
                        className="bg-gray-50 border-b border-gray-100"
                        style={{ padding: "10px" }}
                    >
                        <div className="relative flex items-center w-full">
                            <Search
                                size={15}
                                className="absolute text-gray-400 pointer-events-none shrink-0"
                                style={{
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type to search scheme..."
                                style={{
                                    paddingLeft: "38px",
                                    paddingRight: searchQuery ? "34px" : "12px",
                                    height: "38px",
                                    borderRadius: "8px",
                                }}
                                className="w-full bg-white border border-gray-200 text-[13px] text-[#44475b] placeholder:text-gray-400 focus:outline-none focus:border-[#04b488] focus:ring-1 focus:ring-[#04b488] transition"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    style={{
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                    }}
                                    className="absolute p-0.5 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer flex items-center justify-center"
                                    title="Clear search"
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Count Bar */}
                    {options.length > 0 && (
                        <div className="px-3 py-1.5 bg-gray-50/60 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                            <span>
                                {filteredOptions.length} of {options.length} schemes
                            </span>
                            {searchQuery && (
                                <span className="text-[#04b488] font-medium">Filtered</span>
                            )}
                        </div>
                    )}

                    {/* Options List */}
                    <div
                        className="custom-scheme-scrollbar divide-y divide-gray-50"
                        style={{
                            maxHeight: "220px",
                            overflowY: "auto",
                            overscrollBehavior: "contain",
                            padding: "6px",
                        }}
                        role="listbox"
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((scheme, index) => {
                                const isSelected = scheme === value;
                                const isHighlighted = index === highlightedIndex;

                                return (
                                    <button
                                        key={scheme}
                                        ref={(el) => {
                                            optionRefs.current[index] = el;
                                        }}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => handleSelect(scheme)}
                                        style={{ borderRadius: "8px" }}
                                        className={`w-full text-left px-3 py-2.5 text-[13px] transition-all flex items-center justify-between gap-2 my-0.5 cursor-pointer ${
                                            isSelected
                                                ? "bg-[#e6f7f2] text-[#04b488] font-medium"
                                                : isHighlighted
                                                ? "bg-gray-100 text-[#44475b]"
                                                : "text-[#44475b] hover:bg-[#f0fdf4] hover:text-[#04b488]"
                                        }`}
                                    >
                                        <span className="break-words line-clamp-2 leading-snug">
                                            {scheme}
                                        </span>
                                        {isSelected && (
                                            <Check
                                                size={15}
                                                className="text-[#04b488] shrink-0 ml-2"
                                            />
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="py-6 px-4 text-center">
                                <p className="text-[13px] text-gray-500 font-medium">
                                    No schemes found
                                </p>
                                {searchQuery && (
                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                        No results matching &ldquo;{searchQuery}&rdquo;
                                    </p>
                                )}
                                {searchQuery.trim() && (
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(searchQuery.trim())}
                                        style={{ borderRadius: "6px" }}
                                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#04b488] bg-[#e6f7f2] hover:bg-[#d1f2e7] transition-colors cursor-pointer"
                                    >
                                        <span>Use &ldquo;{searchQuery.trim()}&rdquo;</span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
