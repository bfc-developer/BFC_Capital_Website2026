"use client";
import React, { useState, useEffect } from 'react';
import SuccessPopup from '../common/SuccessPopup';
import { endpoints, wms_URL } from '../urls/URLS';

interface BookSessionButtonProps {
    buttonText: string;
    className?: string;
}

// 2026 public holidays in India
const HOLIDAYS_2026: Record<string, string> = {
    "2026-01-26": "Republic Day",
    "2026-03-03": "Holi",
    "2026-03-20": "Eid-ul-Fitr",
    "2026-04-03": "Good Friday",
    "2026-04-14": "Ambedkar Jayanti",
    "2026-06-26": "Muharram",
    "2026-08-15": "Independence Day",
    "2026-10-02": "Gandhi Jayanti",
    "2026-10-19": "Ramnavmi",
    "2026-10-20": "Dussehra",
    "2026-11-08": "Diwali",
    "2026-11-09": "Diwali",
    "2026-11-10": "Diwali",
    "2026-12-25": "Christmas",
};

const TIME_SLOTS = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM"
];

const getEndTime = (startTime: string): string => {
    const nextSlotMap: Record<string, string> = {
        "10:00 AM": "10:30 AM",
        "10:30 AM": "11:00 AM",
        "11:00 AM": "11:30 AM",
        "11:30 AM": "12:00 PM",
        "12:00 PM": "12:30 PM",
        "12:30 PM": "01:00 PM",
        "01:00 PM": "01:30 PM",
        "01:30 PM": "02:00 PM",
        "02:00 PM": "02:30 PM",
        "02:30 PM": "03:00 PM",
        "03:00 PM": "03:30 PM",
        "03:30 PM": "04:00 PM",
        "04:00 PM": "04:30 PM",
        "04:30 PM": "05:00 PM",
        "05:00 PM": "05:30 PM",

    };
    return nextSlotMap[startTime] || "";
};



const isSlotInPast = (slotStr: string, dateStr: string): boolean => {
    // Get current time in Indian Standard Time (IST, UTC+5:30)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const indiaTime = new Date(utc + (3600000 * 5.5));

    const yyyy = indiaTime.getFullYear();
    const mm = String(indiaTime.getMonth() + 1).padStart(2, '0');
    const dd = String(indiaTime.getDate()).padStart(2, '0');
    const localTodayStr = `${yyyy}-${mm}-${dd}`;

    if (dateStr < localTodayStr) return true;
    if (dateStr > localTodayStr) return false;

    const parts = slotStr.split(' ');
    if (parts.length !== 2) return false;
    const [time, modifier] = parts;
    const timeParts = time.split(':');
    if (timeParts.length !== 2) return false;
    let slotHours = parseInt(timeParts[0], 10);
    const slotMinutes = parseInt(timeParts[1], 10);

    if (modifier === 'PM' && slotHours < 12) {
        slotHours += 12;
    }
    if (modifier === 'AM' && slotHours === 12) {
        slotHours = 0;
    }

    const currentHours = indiaTime.getHours();
    const currentMinutes = indiaTime.getMinutes();

    const slotTotal = slotHours * 60 + slotMinutes;
    const currentTotal = currentHours * 60 + currentMinutes;

    return slotTotal < currentTotal;
};

const time12To24 = (time12: string): string => {
    const parts = time12.split(' ');
    if (parts.length !== 2) return time12;
    const [time, modifier] = parts;
    const timeParts = time.split(':');
    if (timeParts.length !== 2) return time;
    let h = parseInt(timeParts[0], 10);
    const m = timeParts[1];
    if (modifier === 'PM' && h < 12) h += 12;
    if (modifier === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${m}`;
};

declare global {
    interface Window {
        __bfc_floating_tab_rendered?: boolean;
    }
}

export default function BookSessionButton({ buttonText, className }: BookSessionButtonProps) {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'booking' | 'callback'>('booking');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string,
        email?: string,
        mobile?: string,
        consent?: string,
        date?: string,
        time?: string
    }>({});
    const [dateError, setDateError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [apiSlots, setApiSlots] = useState<any[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFloatingTab, setShowFloatingTab] = useState(false);
    const [minDate, setMinDate] = useState('');

    // Old Apps Script URL that saves details to your Google Sheet
    const CALLBACK_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbxf8XuWvVM-Q51zbNWsVvTSyFKs7KvY6WtKXobCNVosjZlq_iZoKSkzwFFSua9vvplehw/exec";

    // New Apps Script URL specifically for Google Calendar availability & scheduling
    // const CALENDAR_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbz25_Qjo0UC4EUp1luNUv7LOSwmi-B35xe9l9XR3WiOGGDgqfaBeh1Jm43LHUhT3elk/exec"; // 👈 paste your new Google Calendar Web App URL here

    // Manage scroll locking when modal is open
    useEffect(() => {
        if (isBookingModalOpen) {
            document.body.style.overflow = 'hidden';
            setName('');
            setEmail('');
            setMobile('');
            setSelectedDate('');
            setSelectedTime('');
            setDateError('');
            setSubmitError('');
            setBookedSlots([]);
            setConsent(false);
            setErrors({});
            setActiveTab('booking'); // default to booking tab when opening

            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            setMinDate(`${yyyy}-${mm}-${dd}`);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [isBookingModalOpen]);

    // Ensure only one floating tab is rendered if multiple BookSessionButton instances are on the same page
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!window.__bfc_floating_tab_rendered) {
                window.__bfc_floating_tab_rendered = true;
                setShowFloatingTab(true);
            }
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.__bfc_floating_tab_rendered = false;
            }
        };
    }, []);

    const isSunday = (date: Date): boolean => {
        return date.getDay() === 0;
    };

    const isSecondOrFourthSaturday = (date: Date): boolean => {
        const day = date.getDay();
        if (day !== 6) return false;
        const dateNum = date.getDate();
        return (dateNum >= 8 && dateNum <= 14) || (dateNum >= 22 && dateNum <= 28);
    };

    const getHolidayName = (dateStr: string): string | null => {
        return HOLIDAYS_2026[dateStr] || null;
    };

    const loadBookedSlots = async (dateStr: string) => {
        setIsLoadingSlots(true);
        setApiSlots([]);
        try {
            const res = await fetch(`${wms_URL}${endpoints.getWMSCalendarSlots}/${dateStr}`);
            if (res.ok) {
                const json = await res.json();
                if (json.success && json.data && json.data.slots) {
                    setApiSlots(json.data.slots);
                }
            }
        } catch (err) {
            console.warn("Could not fetch slots from API:", err);
        }

        try {
            let slots: string[] = [];
            const localData = localStorage.getItem('bfc_booked_slots');
            if (localData) {
                const parsed = JSON.parse(localData);
                if (parsed[dateStr]) {
                    slots = Array.from(new Set([...slots, ...parsed[dateStr]]));
                }
            }
            setBookedSlots(slots);
        } catch (err) {
            console.warn("Could not load local slots:", err);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    const handleDateChange = (dateStr: string) => {
        setSelectedDate(dateStr);
        setSelectedTime('');
        setDateError('');
        setBookedSlots([]);

        if (!dateStr) return;

        const date = new Date(dateStr);

        if (isSunday(date)) {
            setDateError("Sundays are non-working days. Please select another date.");
            return;
        }

        if (isSecondOrFourthSaturday(date)) {
            setDateError("BFC Capital is closed on the 2nd & 4th Saturday of the month.");
            return;
        }

        const holiday = getHolidayName(dateStr);
        if (holiday) {
            setDateError(`Office closed for holiday: ${holiday}. Please select another date.`);
            return;
        }

        const availableSlots = TIME_SLOTS.filter(slot => !isSlotInPast(slot, dateStr));
        if (availableSlots.length === 0) {
            setDateError("All slots for today are in the past. Please select a future date.");
            return;
        }

        loadBookedSlots(dateStr);
    };

    const validate = () => {
        let newErrors: any = {};
        if (!name.trim()) newErrors.name = 'Required';
        if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = 'Valid email required';
        if (!mobile.trim() || !/^\d{10}$/.test(mobile)) newErrors.mobile = 'Valid 10-digit mobile required';
        if (!consent) newErrors.consent = 'Required';

        if (activeTab === 'booking') {
            if (!selectedDate) {
                newErrors.date = 'Required';
            } else if (dateError) {
                newErrors.date = dateError;
            }

            if (!selectedTime) {
                newErrors.time = 'Required';
            } else if (bookedSlots.includes(selectedTime)) {
                newErrors.time = 'Slot already booked';
            } else if (isSlotInPast(selectedTime, selectedDate)) {
                newErrors.time = 'Slot is in the past';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        setSubmitError('');

        const localApiPayload = activeTab === 'booking' ? {
            sessionType: "schedule_session",
            fullName: name,
            mobileNumber: mobile,
            email: email,
            selectedDate: selectedDate,
            timeSlot: {
                startTime: selectedTime,
                endTime: getEndTime(selectedTime)
            }
        } : {
            sessionType: "request_callback",
            fullName: name,
            mobileNumber: mobile,
            email: email
        };

        try {
            // 1. Send session query API (non-blocking)
            fetch("https://prodigypro-new.bfcsofttech.in/api/v2/query/create-session-query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(localApiPayload)
            }).catch(err => {
                console.error("Local session query API failed (non-blocking):", err);
            });

            // 2. Send Custom Email via local SMTP Endpoint (Nodemailer)
            const emailPayload = {
                name,
                mobile,
                email,
                date: selectedDate,
                time: selectedTime,
                type: activeTab // 'booking' or 'callback'
            };

            const emailRes = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailPayload)
            });

            if (!emailRes.ok) {
                throw new Error("SMTP Email API failed");
            }

            // ==========================================
            // FUTURE USE: Google Apps Script Web App Integration
            // ==========================================
            /*
            if (activeTab === 'booking') {
                const bookingPayload = {
                    name,
                    mobile,
                    email,
                    date: selectedDate,
                    time: selectedTime,
                    consent
                };

                if (typeof CALENDAR_SCRIPT_URL !== 'undefined' && CALENDAR_SCRIPT_URL && CALENDAR_SCRIPT_URL.trim() !== "") {
                    const calRes = await fetch(CALENDAR_SCRIPT_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookingPayload),
                    });

                    if (calRes.status !== 0 && !calRes.ok) {
                        throw new Error("Calendar Web App API failed");
                    }
                }
            } else {
                const callbackPayload = {
                    name,
                    mobile,
                    email,
                    consent
                };

                if (typeof CALLBACK_SCRIPT_URL !== 'undefined' && CALLBACK_SCRIPT_URL) {
                    const cbRes = await fetch(CALLBACK_SCRIPT_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(callbackPayload),
                    });

                    if (cbRes.status !== 0 && !cbRes.ok) {
                        throw new Error("Callback Web App API failed");
                    }
                }
            }
            */
            // ==========================================

            if (activeTab === 'booking' && apiSlots.length > 0) {
                const slot24 = time12To24(selectedTime);
                const matchingSlot = apiSlots.find(s => s.startTime === slot24);
                if (matchingSlot && matchingSlot._id) {
                    try {
                        const updateRes = await fetch(`${wms_URL}operations/update-slot-status/${matchingSlot._id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "pending" })
                        });
                        if (!updateRes.ok) {
                            console.error("Failed to update slot status to pending via WMS API");
                        }
                    } catch (err) {
                        console.error("Error updating slot status:", err);
                    }
                }
            }

            // Save booking to localStorage so slot shows as booked during offline testing
            if (activeTab === 'booking') {
                const localData = localStorage.getItem('bfc_booked_slots') || '{}';
                const parsed = JSON.parse(localData);
                if (!parsed[selectedDate]) {
                    parsed[selectedDate] = [];
                }
                if (!parsed[selectedDate].includes(selectedTime)) {
                    parsed[selectedDate].push(selectedTime);
                }
                localStorage.setItem('bfc_booked_slots', JSON.stringify(parsed));
            }

            setIsBookingModalOpen(false);
            setIsSuccessPopupOpen(true);

        } catch (err) {
            console.error("Submission failed:", err);
            setSubmitError("Server Under maintainace please try after sometime");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Inline Button passed as child or standard CTA */}
            <button
                onClick={() => setIsBookingModalOpen(true)}
                className={className}
                aria-haspopup="dialog"
                aria-expanded={isBookingModalOpen}
            >
                {buttonText}
            </button>

            {/* Floating Sticky Tab for Desktop (Hidden on mobile) */}
            {showFloatingTab && (
                <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-[9999]">
                    <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="bg-[#024B39] text-white py-5 px-3 rounded-l-2xl shadow-[0_4px_20px_rgba(2,75,57,0.3)] hover:bg-[#06A358] transition-all duration-300 flex flex-col items-center justify-center gap-2 border-l border-y border-white/20 group cursor-pointer"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                        }}
                        aria-label="Open slot booking dialog"
                    >
                        <span className="font-bold text-xs tracking-widest uppercase flex items-center gap-2 select-none group-hover:scale-105 transition-transform duration-200">
                            📅 Book Your Slot
                        </span>
                    </button>
                </div>
            )}

            {/* Floating Action Button (FAB) for Mobile (Hidden on desktop) */}
            {showFloatingTab && (
                <div className="md:hidden fixed bottom-6 right-6 z-[9999]">
                    <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="bg-[#024B39] text-white w-14 h-14 rounded-full shadow-[0_4px_16px_rgba(2,75,57,0.4)] hover:bg-[#06A358] transition-all duration-300 flex items-center justify-center border border-white/10 cursor-pointer animate-bounce"
                        aria-label="Open slot booking dialog"
                    >
                        <span className="text-2xl">📅</span>
                    </button>
                </div>
            )}

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div
                        className="relative w-full max-w-3xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[95vh] border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        aria-describedby="booking-modal-desc"
                    >
                        <button
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                            aria-label="Close popup"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="text-center mb-6">
                            <h2
                                id="booking-modal-title"
                                className="text-[26px] md:text-[36px] font-bold mb-2 leading-tight inline-block"
                                style={{
                                    background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}
                            >
                                {activeTab === 'booking' ? 'Book Your Financial Session' : 'A Thoughtful Start to Your Financial Journey!'}
                            </h2>
                            <p id="booking-modal-desc" className="text-[#44475B] text-[15px] md:text-[17px] font-medium max-w-lg mx-auto">
                                {activeTab === 'booking'
                                    ? 'Select a date and time slot to connect with our certified advisors.'
                                    : 'Good financial decisions don’t begin with products; they begin with conversations.'}
                            </p>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-100 mb-8 w-full max-w-md mx-auto">
                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab('booking');
                                    setErrors({});
                                    setSubmitError('');
                                }}
                                className={`flex-1 text-center pb-3 text-[14px] md:text-[15px] font-bold border-b-2 transition-all duration-300 cursor-pointer ${activeTab === 'booking'
                                    ? 'border-[#024B39] text-[#024B39]'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                📅 Schedule Session
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full text-left flex flex-col items-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-8 w-full">
                                {/* Name Input */}
                                <div className="relative">
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#44475B] mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        aria-label="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`w-full border-b py-2 text-[#44475B] bg-transparent outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 font-medium">{errors.name}</p>}
                                </div>

                                {/* Mobile Input */}
                                <div className="relative">
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#44475B] mb-1">Mobile Number</label>
                                    <input
                                        type="text"
                                        placeholder="10-digit mobile number"
                                        aria-label="Mobile Number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        className={`w-full border-b py-2 text-[#44475B] bg-transparent outline-none transition-colors ${errors.mobile ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 font-medium">{errors.mobile}</p>}
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#44475B] mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        aria-label="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full border-b py-2 text-[#44475B] bg-transparent outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 font-medium">{errors.email}</p>}
                                </div>

                                {/* Conditionally Rendered Date Selector (Booking Tab Only) */}
                                {activeTab === 'booking' && (
                                    <div className="relative">
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#44475B] mb-1">Select Date</label>
                                        <input
                                            type="date"
                                            aria-label="Select Date"
                                            value={selectedDate}
                                            min={minDate}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            className={`w-full border-b py-2 text-[#44475B] bg-transparent outline-none transition-colors cursor-pointer ${errors.date || dateError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                        />
                                        {(errors.date || dateError) && (
                                            <p className="text-red-500 text-xs mt-1 absolute -bottom-5 font-medium max-w-full truncate">{errors.date || dateError}</p>
                                        )}
                                    </div>
                                )}

                                {/* Conditionally Rendered Time Dropdown (Booking Tab Only) */}
                                {activeTab === 'booking' && (
                                    <div className="relative md:col-span-2">
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Select Time Slot</label>
                                        <select
                                            aria-label="Select Time Slot"
                                            value={selectedTime}
                                            disabled={!selectedDate || !!dateError || isLoadingSlots}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className={`w-full border-b py-2 text-[#44475B] bg-transparent outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${errors.time ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'
                                                }`}
                                        >
                                            <option value="" className="text-gray-400">
                                                {isLoadingSlots
                                                    ? "Checking slot availability..."
                                                    : !selectedDate
                                                        ? "Please select a date first"
                                                        : dateError
                                                            ? "Date is unavailable"
                                                            : "Choose an available 30-minute slot"
                                                }
                                            </option>
                                            {!isLoadingSlots && selectedDate && !dateError && TIME_SLOTS.filter(slot => !isSlotInPast(slot, selectedDate)).map((slot) => {
                                                let isBooked = bookedSlots.includes(slot);
                                                let statusText = "Already Booked";

                                                if (apiSlots.length > 0) {
                                                    const slot24 = time12To24(slot);
                                                    const apiSlot = apiSlots.find(s => s.startTime === slot24);
                                                    if (apiSlot) {
                                                        isBooked = apiSlot.status !== 'available';
                                                        if (apiSlot.status === 'pending') {
                                                            statusText = "Already Booked";
                                                        } else if (apiSlot.status === 'booked') {
                                                            statusText = "Already Booked";
                                                        }
                                                    } else {
                                                        isBooked = true;
                                                        statusText = "Unavailable";
                                                    }
                                                }

                                                return (
                                                    <option key={slot} value={slot} disabled={isBooked} className="text-[#44475B]">
                                                        {slot} {isBooked ? `(${statusText})` : ""}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {errors.time && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 font-medium">{errors.time}</p>}
                                    </div>
                                )}
                            </div>

                            {/* Consent Checkbox */}
                            <div className="mb-8 text-left w-full mt-4">
                                <label htmlFor="booking-consent-checkbox" className="flex items-start gap-4 cursor-pointer relative group">
                                    <div className="relative flex items-center justify-center mt-1 w-[22px] h-[22px] shrink-0">
                                        <input
                                            type="checkbox"
                                            id="booking-consent-checkbox"
                                            className="peer appearance-none w-[22px] h-[22px] rounded-[4px] shrink-0 border-[2px] border-[#024B39] checked:border-transparent transition-all outline-none cursor-pointer"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                        />
                                        <div
                                            className={`absolute inset-0 rounded-[4px] pointer-events-none transition-opacity flex items-center justify-center ${consent ? "opacity-100" : "opacity-0"}`}
                                            style={{ background: "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)" }}
                                        >
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[14px] text-[#44475B] leading-[1.6]">
                                            I hereby consent to the processing of my personal information by BFC Capital Pvt. Ltd. for financial planning communication, consultation, and related follow-ups, in accordance with the provisions of DPDP Act, 2023.
                                        </span>
                                        {errors.consent && <p className="text-red-500 text-xs mt-1 block font-medium">{errors.consent}</p>}
                                    </div>
                                </label>
                            </div>

                            {/* Submit Error Message */}
                            {submitError && (
                                <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                                    ⚠️ {submitError}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="text-center w-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || (activeTab === 'booking' && (isLoadingSlots || !!dateError))}
                                    className={`bg-[#024B39] text-white px-10 py-3.5 rounded-xl hover:bg-[#013527] transition duration-300 font-semibold text-[16px] flex items-center justify-center gap-2 w-full sm:w-auto shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                                >
                                    {isSubmitting && (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {activeTab === 'booking'
                                        ? (isSubmitting ? 'Securing Your Slot...' : 'Book Your Slot Now')
                                        : (isSubmitting ? 'Sending Request...' : 'Request a Callback')
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <SuccessPopup
                isOpen={isSuccessPopupOpen}
                onClose={() => setIsSuccessPopupOpen(false)}
            />
        </>
    );
}
