import { useState, ChangeEvent } from "react";
import StepActions from "./StepActions";

const fieldBase =
    "w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors";

interface FileFieldProps {
    file: File | null;
    onChange: (file: File | null) => void;
}

function FileField({ file, onChange }: FileFieldProps) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
        } else {
            onChange(null);
        }
    };

    return (
        <div className={fieldBase + " flex items-center gap-2"}>
            <label className="flex items-center justify-center bg-[#d9d9d9] border-[0.5px] border-[#b1b1b1] rounded-[5px] w-[60px] h-[20px] text-[10px] text-[#44475b] cursor-pointer flex-shrink-0">
                Browse...
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            <span className="text-[10px] text-[#8b8b8b] whitespace-nowrap truncate">
                {file ? file.name : "No file selected."}
            </span>
        </div>
    );
}

interface PersonalProfileStepProps {
    formData?: {
        fullName: string;
        dob: string;
        mobileNumber: string;
        email: string;
        pan: string;
        panFile: File | null;
        aadharNo: string;
        aadharFile: File | null;
        address: string;
        city: string;
        contactPerson: string;
        emergencyMobile: string;
        emergencyEmail: string;
    };
    setFormData?: React.Dispatch<React.SetStateAction<{
        fullName: string;
        dob: string;
        mobileNumber: string;
        email: string;
        pan: string;
        panFile: File | null;
        aadharNo: string;
        aadharFile: File | null;
        address: string;
        city: string;
        contactPerson: string;
        emergencyMobile: string;
        emergencyEmail: string;
    }>>;
    profileId: string | null;
    setProfileId: React.Dispatch<React.SetStateAction<string | null>>;
    onNext: () => void;
    onBack?: () => void;
    showBack?: boolean;
}

export default function PersonalProfileStep({
    formData,
    setFormData,
    profileId,
    setProfileId,
    onNext,
    onBack,
    showBack = false,
}: PersonalProfileStepProps) {
    const [localState, setLocalState] = useState({
        fullName: "",
        dob: "",
        mobileNumber: "",
        email: "",
        pan: "",
        panFile: null as File | null,
        aadharNo: "",
        aadharFile: null as File | null,
        address: "",
        city: "",
        contactPerson: "",
        emergencyMobile: "",
        emergencyEmail: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const activeData = formData || localState;
    const activeSetter = setFormData || setLocalState;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let processedValue = value;

        if (name === "pan") {
            processedValue = value.toUpperCase();
        } else if (name === "fullName" || name === "contactPerson" || name === "city") {
            // Remove numbers from name fields and city field
            processedValue = value.replace(/\d/g, "");
        } else if (name === "mobileNumber" || name === "emergencyMobile") {
            // Allow only digits
            processedValue = value.replace(/\D/g, "");
        } else if (name === "aadharNo") {
            // Format Aadhaar as XXXX-XXXX-XXXX
            const digits = value.replace(/\D/g, "");
            let formatted = "";
            if (digits.length > 0) {
                formatted += digits.substring(0, 4);
            }
            if (digits.length > 4) {
                formatted += "-" + digits.substring(4, 8);
            }
            if (digits.length > 8) {
                formatted += "-" + digits.substring(8, 12);
            }
            processedValue = formatted;
        }

        activeSetter((prev: any) => ({
            ...prev,
            [name]: processedValue,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleContinue = async () => {
        const validationErrors: Record<string, string> = {};
        if (!activeData.fullName || !activeData.fullName.trim()) {
            validationErrors.fullName = "Full name is required.";
        } else if (/\d/.test(activeData.fullName)) {
            validationErrors.fullName = "Full name must not contain numbers.";
        } else if (!/^[a-zA-Z\s'.\-]+$/.test(activeData.fullName.trim())) {
            validationErrors.fullName = "Full name must contain only alphabets and spaces.";
        }

        if (!activeData.dob) {
            validationErrors.dob = "Date of birth is required.";
        } else {
            const birthDate = new Date(activeData.dob);
            const today = new Date();
            if (birthDate > today) {
                validationErrors.dob = "Date of birth cannot be in the future.";
            } else {
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

            }
        }

        if (!activeData.mobileNumber || !activeData.mobileNumber.trim()) {
            validationErrors.mobileNumber = "Mobile number is required.";
        } else if (!/^[6-9]\d{9}$/.test(activeData.mobileNumber.trim())) {
            validationErrors.mobileNumber = "Please enter a valid 10-digit Indian mobile number starting with 6-9.";
        }

        if (!activeData.email || !activeData.email.trim()) {
            validationErrors.email = "Email ID is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeData.email.trim())) {
            validationErrors.email = "Please enter a valid email address.";
        }



        if (!activeData.pan || !activeData.pan.trim()) {
            validationErrors.pan = "PAN is required.";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(activeData.pan.trim().toUpperCase())) {
            validationErrors.pan = "Please enter a valid PAN format (e.g. ABCDE1234F).";
        }

        if (activeData.aadharNo && activeData.aadharNo.trim()) {
            const cleanAadhar = activeData.aadharNo.replace(/[\s-]/g, "");
            if (!/^\d{12}$/.test(cleanAadhar)) {
                validationErrors.aadharNo = "Aadhar number must be exactly 12 digits.";
            }
        }

        if (!activeData.address || !activeData.address.trim()) {
            validationErrors.address = "Address is required.";
        }

        if (!activeData.city || !activeData.city.trim()) {
            validationErrors.city = "City is required.";
        } else if (/\d/.test(activeData.city)) {
            validationErrors.city = "City name must not contain numbers.";
        } else if (!/^[a-zA-Z\s'.\-]+$/.test(activeData.city.trim())) {
            validationErrors.city = "City name must contain only alphabets and spaces.";
        }

        if (activeData.contactPerson && activeData.contactPerson.trim()) {
            if (/\d/.test(activeData.contactPerson)) {
                validationErrors.contactPerson = "Contact person name must not contain numbers.";
            } else if (!/^[a-zA-Z\s'.\-]+$/.test(activeData.contactPerson.trim())) {
                validationErrors.contactPerson = "Contact person name must contain only alphabets and spaces.";
            }
        }

        if (activeData.emergencyMobile && activeData.emergencyMobile.trim()) {
            if (!/^[6-9]\d{9}$/.test(activeData.emergencyMobile.trim())) {
                validationErrors.emergencyMobile = "Please enter a valid 10-digit Indian mobile number starting with 6-9.";
            }
        }

        if (activeData.emergencyEmail && activeData.emergencyEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeData.emergencyEmail.trim())) {
            validationErrors.emergencyEmail = "Please enter a valid email address.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstErrorKey = Object.keys(validationErrors)[0];
            const errorElement = document.getElementsByName(firstErrorKey)[0];
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                errorElement.focus();
            }
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                fullName: activeData.fullName || undefined,
                dob: activeData.dob || undefined,
                mobileNumber: activeData.mobileNumber || undefined,
                email: activeData.email || undefined,
                pan: activeData.pan || undefined,
                panCardUrl: activeData.panFile ? `https://example.com/${activeData.panFile.name}` : undefined,
                aadhaarNumber: activeData.aadharNo || undefined,
                aadhaarCardUrl: activeData.aadharFile ? `https://example.com/${activeData.aadharFile.name}` : undefined,
                address: activeData.address || undefined,
                city: activeData.city || undefined,
                emergencyContactName: activeData.contactPerson || undefined,
                emergencyMobile: activeData.emergencyMobile || undefined,
                emergencyEmail: activeData.emergencyEmail || undefined,
            };

            const url = profileId
                ? `http://localhost:5000/api/personal/${profileId}`
                : "http://localhost:5000/api/personal";
            const method = profileId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.message || "Failed to submit personal profile details");
            }

            const resData = await response.json();
            if (resData.data && resData.data._id) {
                setProfileId(resData.data._id);
            }
            onNext();
        } catch (err) {
            alert("Error saving details: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="space-y-6 sm:space-y-8 w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">

                <div className="flex items-center justify-between flex-wrap gap-2 border-bottom">
                    <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                        Personal Profile
                    </h1>
                </div>
                <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Full Name
                            <span className="text-red-600"> *</span>
                        </label>
                        <input
                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                }`}
                            type="text"
                            placeholder="Enter Name"
                            name="fullName"
                            value={activeData.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Date of Birth
                            <span className="text-red-600"> *</span>
                        </label>
                        <input
                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.dob ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                }`}
                            type="date"
                            name="dob"
                            value={activeData.dob}
                            onChange={handleChange}
                        />
                        {errors.dob && <p className="text-red-500 text-[11px] mt-1">{errors.dob}</p>}
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Mobile Number
                            <span className="text-red-600"> *</span>
                        </label>
                        <input
                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.mobileNumber ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                }`}
                            type="tel"
                            maxLength={10}
                            placeholder="10 Digits Mobile No."
                            name="mobileNumber"
                            value={activeData.mobileNumber}
                            onChange={handleChange}
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-[11px] mt-1">{errors.mobileNumber}</p>}
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Email ID
                            <span className="text-red-600"> *</span>
                        </label>
                        <input
                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                }`}
                            type="email"
                            placeholder="Enter Email ID"
                            name="email"
                            value={activeData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                </div>

                <div className="pt-6 border-t border-[#e9e9e9]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                PAN
                                <span className="text-red-600"> *</span>
                            </label>
                            <input
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors uppercase ${errors.pan ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                    }`}
                                type="text"
                                maxLength={10}
                                placeholder="Enter"
                                name="pan"
                                value={activeData.pan}
                                onChange={handleChange}
                            />
                            {errors.pan && <p className="text-red-500 text-[11px] mt-1">{errors.pan}</p>}
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Upload PAN Card
                            </label>
                            <FileField
                                file={activeData.panFile}
                                onChange={(file) => activeSetter((prev: any) => ({ ...prev, panFile: file }))}
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Aadhar No.
                            </label>
                            <input
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.aadharNo ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                    }`}
                                type="text"
                                maxLength={14}
                                placeholder="XXXX-XXXX-XXXX"
                                name="aadharNo"
                                value={activeData.aadharNo}
                                onChange={handleChange}
                            />
                            {errors.aadharNo && <p className="text-red-500 text-[11px] mt-1">{errors.aadharNo}</p>}
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Upload Aadhar Card
                            </label>
                            <FileField
                                file={activeData.aadharFile}
                                onChange={(file) => activeSetter((prev: any) => ({ ...prev, aadharFile: file }))}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-[#e9e9e9] space-y-5">

                    <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">
                        Residential Address Details
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div className="lg:col-span-3">
                            <div>
                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                    Address (House No, Building, Area)
                                    <span className="text-red-600"> *</span>
                                </label>
                                <input
                                    className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                        }`}
                                    type="text"
                                    placeholder="Enter Your Address"
                                    name="address"
                                    value={activeData.address}
                                    onChange={handleChange}
                                />
                                {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                City
                                <span className="text-red-600"> *</span>
                            </label>
                            <input
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                    }`}
                                type="text"
                                placeholder="e.g. Lucknow"
                                name="city"
                                value={activeData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-[#e9e9e9] space-y-5">
                    <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">Emergency Contact Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Contact Person
                            </label>
                            <input
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.contactPerson ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                    }`}
                                type="text"
                                placeholder="Enter Name"
                                name="contactPerson"
                                value={activeData.contactPerson}
                                onChange={handleChange}
                            />
                            {errors.contactPerson && <p className="text-red-500 text-[11px] mt-1">{errors.contactPerson}</p>}
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Mobile No
                            </label>
                            <input
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.emergencyMobile ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                    }`}
                                type="tel"
                                maxLength={10}
                                placeholder="10 Digits Mobile No."
                                name="emergencyMobile"
                                value={activeData.emergencyMobile}
                                onChange={handleChange}
                            />
                            {errors.emergencyMobile && <p className="text-red-500 text-[11px] mt-1">{errors.emergencyMobile}</p>}
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Emergency Email
                            </label>
                            <input
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.emergencyEmail ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#06A358]"
                                    }`}
                                type="email"
                                placeholder="Enter Email ID"
                                name="emergencyEmail"
                                value={activeData.emergencyEmail}
                                onChange={handleChange}
                            />
                            {errors.emergencyEmail && <p className="text-red-500 text-[11px] mt-1">{errors.emergencyEmail}</p>}
                        </div>
                    </div>
                </div>
                <StepActions
                    showBack={showBack}
                    onBack={onBack}
                    onContinue={handleContinue}
                    isSubmitting={isSubmitting}
                />
            </div>
        </>
    );
}
