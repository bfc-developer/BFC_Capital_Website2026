"use client";
import React, { useState, useEffect } from 'react';
import SuccessPopup from '../common/SuccessPopup';
import { endpoints, WMS_url, wms_URL } from '../urls/URLS';

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
        "05:30 PM": "06:00 PM",
    };
    return nextSlotMap[startTime] || "";
};

const isSlotInPast = (slotStr: string, dateStr: string): boolean => {
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
    const bufferTime = new Date(indiaTime.getTime() + 2 * 60 * 60 * 1000);
    const currentTotal = bufferTime.getHours() * 60 + bufferTime.getMinutes();
    const slotTotal = slotHours * 60 + slotMinutes;

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

const getApiSlotState = (status?: string) => {
    if (status === "available") {
        return { isBooked: false, label: "" };
    }
    return { isBooked: true, label: "Already Booked" };
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
    const [apiSlots, setApiSlots] = useState<Array<{ startTime: string; endTime: string; status: string; _id?: string }>>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFloatingTab, setShowFloatingTab] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // OTP states
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isOtpVerifying, setIsOtpVerifying] = useState(false);
    const [verificationToken, setVerificationToken] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpSuccessMessage, setOtpSuccessMessage] = useState('');

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
            setActiveTab('booking');
            setIsPreviewMode(false);
            setOtp('');
            setIsOtpSent(false);
            setIsOtpSending(false);
            setIsOtpVerified(false);
            setIsOtpVerifying(false);
            setVerificationToken('');
            setOtpError('');
            setOtpSuccessMessage('');

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
            setDateError("All slots for today are booked. Please select a future date.");
            return;
        }

        loadBookedSlots(dateStr);
    };

    const getSlotBookingInfo = (slot: string) => {
        let isBooked = bookedSlots.includes(slot);
        let statusText = isBooked ? "Already Booked" : "";

        if (apiSlots.length > 0) {
            const slot24 = time12To24(slot);
            const apiSlot = apiSlots.find(s => s.startTime === slot24);
            if (apiSlot) {
                const slotState = getApiSlotState(apiSlot.status);
                isBooked = slotState.isBooked;
                statusText = slotState.label;
            } else {
                isBooked = true;
                statusText = "Unavailable";
            }
        }
        return { isBooked, statusText };
    };

    const isValidIndianMobile = (input: string) => {
        return /^[6-9]\d{9}$/.test(input);
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Required';
        if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = 'Valid email required';
        if (!mobile.trim() || !isValidIndianMobile(mobile)) newErrors.mobile = 'Enter a valid Indian mobile number';
        if (!consent) newErrors.consent = 'Required';

        if (activeTab === 'booking') {
            if (!selectedDate) {
                newErrors.date = 'Required';
            } else if (dateError) {
                newErrors.date = dateError;
            }

            if (!selectedTime) {
                newErrors.time = 'Required';
            } else if (getSlotBookingInfo(selectedTime).isBooked) {
                newErrors.time = 'Slot already booked';
            } else if (isSlotInPast(selectedTime, selectedDate)) {
                newErrors.time = 'Slot is in the past';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        if (activeTab === 'booking') {
            const trimmedEmail = email.trim();
            setIsPreviewMode(true);
            setIsOtpSending(true);
            setSubmitError('');
            setOtpError('');
            setOtpSuccessMessage('');

            fetch(`${wms_URL}${endpoints.sendOTP}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmedEmail })
            }).then(async (response) => {
                if (response.ok) {
                    setIsOtpSent(true);
                    setOtpSuccessMessage(`An OTP has been successfully sent to ${trimmedEmail}`);
                } else {
                    const errData = await response.json().catch(() => ({}));
                    setOtpError(errData.message || "Failed to send OTP. Please try again.");
                }
            }).catch((err) => {
                console.error("Error sending OTP in background:", err);
                setOtpError("Failed to send OTP. Please check your internet connection.");
            }).finally(() => {
                setIsOtpSending(false);
            });
        } else {
            setIsPreviewMode(true);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) {
            setOtpError("Please enter the OTP.");
            return;
        }
        setIsOtpVerifying(true);
        setOtpError('');
        setOtpSuccessMessage('');
        const trimmedEmail = email.trim();
        const trimmedOtp = otp.trim();

        try {
            const response = await fetch(`${wms_URL}${endpoints.verifyOTP}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: trimmedEmail,
                    otp: trimmedOtp
                })
            });

            if (response.ok) {
                const resData = await response.json();
                if (resData.success && resData.verificationToken) {
                    setVerificationToken(resData.verificationToken);
                    setIsOtpVerified(true);
                    setOtpSuccessMessage("OTP verified successfully!");
                } else {
                    setOtpError(resData.message || "Failed to retrieve verification token. Please try again.");
                }
            } else {
                const errData = await response.json().catch(() => ({}));
                setOtpError(errData.message || "Invalid OTP. Please check and try again.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setOtpError("Connection error. Please try again.");
        } finally {
            setIsOtpVerifying(false);
        }
    };

    const handleConfirmSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError('');
        const normalizedMobile = mobile.replace(/\D/g, '');

        const localApiPayload: any = {
            fullName: name,
            mobileNumber: normalizedMobile,
            email: email.trim(),
            selectedDate: selectedDate,
            timeSlot: {
                startTime: time12To24(selectedTime),
                endTime: time12To24(getEndTime(selectedTime))
            }
        };

        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        if (activeTab === 'booking' && verificationToken) {
            headers["Authorization"] = `Bearer ${verificationToken}`;
        }

        try {
            const response = await fetch(`${wms_URL}${endpoints.createSessionQuery}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(localApiPayload)
            });

            if (!response.ok) {
                console.error("Session query API failed");
            }

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

            setIsPreviewMode(false);
            setIsBookingModalOpen(false);
            setIsSuccessPopupOpen(true);

        } catch (err) {
            console.error("Submission failed:", err);
            setSubmitError("Server under maintenance, please try again after some time.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formattedDate = selectedDate
        ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <>
            {/* Inline Button */}
            <button
                onClick={() => setIsBookingModalOpen(true)}
                className={className}
                aria-haspopup="dialog"
                aria-expanded={isBookingModalOpen}
            >
                {buttonText}
            </button>

            {/* Floating Sticky Tab for Desktop */}
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

            {/* Floating Action Button for Mobile */}
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
                        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[95vh] border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
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

                        {isPreviewMode ? (
                            <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}>
                                {/* ── Header with BFC Capital Gradient Title & Icon ── */}
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '50%',
                                        background: 'linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 16px',
                                        boxShadow: '0 4px 14px rgba(2, 75, 57, 0.25)'
                                    }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h2 style={{
                                        fontSize: '26px',
                                        fontWeight: '800',
                                        margin: '0 0 8px',
                                        letterSpacing: '-0.01em',
                                        background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    }}>
                                        Almost done!
                                    </h2>
                                    <p style={{ fontSize: '15px', color: '#44475B', margin: 0, lineHeight: '1.6', fontWeight: '500' }}>
                                        Review your details and confirm your booking.
                                    </p>
                                </div>

                                {/* ── Info Row Card (Crisp Dark Text) ── */}
                                <div className="flex flex-col md:flex-row justify-around items-center gap-6 md:gap-4" style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px 20px', marginBottom: '20px', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    {/* Name */}
                                    <div className="flex flex-col items-center text-center flex-1 min-w-0 w-full">
                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(2,75,57,0.1) 0%, rgba(1,30,254,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024B39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        </div>
                                        <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#44475B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</p>
                                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827', wordBreak: 'break-word', lineHeight: '1.3' }}>{name}</p>
                                    </div>

                                    <div className="hidden md:block" style={{ width: '1px', alignSelf: 'stretch', backgroundColor: '#f3f4f6' }}></div>
                                    <div className="md:hidden" style={{ height: '1px', width: '100%', backgroundColor: '#f3f4f6' }}></div>

                                    {/* Mobile */}
                                    <div className="flex flex-col items-center text-center flex-1 min-w-0 w-full">
                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(2,75,57,0.1) 0%, rgba(1,30,254,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024B39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                                        </div>
                                        <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#44475B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mobile</p>
                                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827', wordBreak: 'break-word', lineHeight: '1.3' }}>+91 {mobile}</p>
                                    </div>

                                    <div className="hidden md:block" style={{ width: '1px', alignSelf: 'stretch', backgroundColor: '#f3f4f6' }}></div>
                                    <div className="md:hidden" style={{ height: '1px', width: '100%', backgroundColor: '#f3f4f6' }}></div>

                                    {/* Email */}
                                    <div className="flex flex-col items-center text-center flex-1 min-w-0 w-full">
                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(2,75,57,0.1) 0%, rgba(1,30,254,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#024B39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                        </div>
                                        <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#44475B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
                                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827', wordBreak: 'break-all', lineHeight: '1.3' }}>{email}</p>
                                    </div>
                                </div>

                                {/* ── Scheduled Session Banner (BFC Capital Gradient) ── */}
                                {activeTab === 'booking' && (
                                    <div style={{
                                        background: 'linear-gradient(269.9deg, #024B39 24.53%, #001EFE 156.82%)',
                                        borderRadius: '16px', padding: '16px 20px',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        textAlign: 'center', gap: '6px',
                                        marginBottom: '20px',
                                        boxShadow: '0 4px 16px rgba(2, 75, 57, 0.2)'
                                    }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                        </div>
                                        <div>
                                            <p style={{ margin: '0 0 3px', fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Scheduled Session</p>
                                            <p style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: '800', color: '#ffffff', lineHeight: '1.3' }}>{formattedDate}</p>
                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.95)' }}>{selectedTime}</p>
                                        </div>
                                    </div>
                                )}

                                {/* ── OTP Verification Section ── */}
                                {activeTab === 'booking' && (
                                    <div style={{
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        marginBottom: '20px',
                                        backgroundColor: '#f9fafb',
                                        textAlign: 'left'
                                    }}>
                                        <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#44475B', fontWeight: '500', lineHeight: '1.5' }}>
                                            ✉️ {isOtpSending ? "Sending OTP to your email..." : (otpSuccessMessage || `An OTP has been sent to your email: ${email}`)}
                                        </p>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                maxLength={6}
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                disabled={isOtpVerified || isOtpVerifying}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 14px',
                                                    borderRadius: '10px',
                                                    border: otpError ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
                                                    fontSize: '15px',
                                                    outline: 'none',
                                                    backgroundColor: isOtpVerified ? '#f3f4f6' : '#ffffff',
                                                    color: '#111827',
                                                    letterSpacing: '0.05em',
                                                    fontWeight: '600'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleVerifyOtp}
                                                disabled={isOtpVerified || isOtpVerifying || otp.length < 4}
                                                style={{
                                                    padding: '12px 20px',
                                                    borderRadius: '10px',
                                                    background: isOtpVerified
                                                        ? '#06A358'
                                                        : 'linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)',
                                                    color: '#ffffff',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                    border: 'none',
                                                    cursor: (isOtpVerified || isOtpVerifying || otp.length < 4) ? 'not-allowed' : 'pointer',
                                                    opacity: (isOtpVerified || isOtpVerifying || otp.length < 4) ? 0.7 : 1,
                                                    transition: 'all 0.2s ease-in-out',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                {isOtpVerifying ? (
                                                    <>
                                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: '16px', height: '16px', color: '#ffffff' }}>
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Verifying...
                                                    </>
                                                ) : isOtpVerified ? (
                                                    "Verified ✓"
                                                ) : (
                                                    "Verify OTP"
                                                )}
                                            </button>
                                        </div>
                                        {otpError && (
                                            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#ef4444', fontWeight: '500' }}>
                                                ⚠️ {otpError}
                                            </p>
                                        )}
                                        {isOtpVerified && (
                                            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#06A358', fontWeight: '600' }}>
                                                ✓ OTP verified successfully! You can now confirm your booking.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* ── Error ── */}
                                {submitError && (
                                    <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium text-sm">
                                        ⚠️ {submitError}
                                    </div>
                                )}

                                {/* ── Confirm CTA Button with BFC Capital Gradient ── */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center', marginTop: '16px' }}>
                                    <button
                                        type="button"
                                        onClick={handleConfirmSubmit}
                                        disabled={isSubmitting || (activeTab === 'booking' && !isOtpVerified)}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            borderRadius: '12px',
                                            border: 'none',
                                            color: '#ffffff',
                                            background: (activeTab === 'booking' && !isOtpVerified)
                                                ? 'linear-gradient(269.9deg, rgba(6, 163, 88, 0.5) 24.53%, rgba(0, 30, 254, 0.5) 156.82%)'
                                                : 'linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)',
                                            cursor: (activeTab === 'booking' && !isOtpVerified) ? 'not-allowed' : 'pointer',
                                            boxShadow: '0 4px 14px rgba(2, 75, 57, 0.25)',
                                            transition: 'all 0.3s ease-in-out',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {(isSubmitting || isOtpSending) ? (
                                            <>
                                                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', display: 'inline-block' }}>
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {isOtpSending ? 'Sending OTP...' : 'Confirming...'}
                                            </>
                                        ) : 'Confirm & Book Session'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsPreviewMode(false)}
                                        style={{
                                            width: '100%', padding: '10px',
                                            background: 'none', border: 'none',
                                            color: '#44475B', fontWeight: '600',
                                            fontSize: '15px', cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        ← Edit my details
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
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
                                        {activeTab === 'booking' ? 'Book Your Session' : 'A Thoughtful Start to Your Financial Journey!'}
                                    </h2>
                                    <p id="booking-modal-desc" className="text-[#44475B] text-[15px] md:text-[17px] font-medium max-w-lg mx-auto">
                                        {activeTab === 'booking'
                                            ? 'Select a date and time slot to connect with our experts.'
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

                                        {/* Conditionally Rendered Date Selector */}
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

                                        {/* Conditionally Rendered Time Dropdown */}
                                        {activeTab === 'booking' && (
                                            <div className="relative md:col-span-2">
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Select Time Slot</label>
                                                <select
                                                    aria-label="Select Time Slot"
                                                    value={selectedTime}
                                                    disabled={!selectedDate || !!dateError || isLoadingSlots}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                    className={`w-full border-b py-2 text-[#44475B] bg-transparent outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${errors.time ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
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
                                                        const { isBooked, statusText } = getSlotBookingInfo(slot);
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

                                    {/* Submit Button */}
                                    <div className="text-center w-full">
                                        <button
                                            type="submit"
                                            disabled={isOtpSending || (activeTab === 'booking' && (isLoadingSlots || !!dateError))}
                                            className={`bg-[#024B39] text-white px-10 py-3.5 rounded-xl hover:bg-[#013527] transition duration-300 font-semibold text-[16px] flex items-center justify-center gap-2 w-full sm:w-auto shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                                        >
                                            {isOtpSending && (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            {isOtpSending ? 'Sending OTP...' : 'Book Your Slot Now'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
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
