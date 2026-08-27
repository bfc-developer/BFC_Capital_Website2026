"use client";

import { useState, ChangeEvent } from "react";
import StepActions from "./StepActions";

interface ProfessionalDetailsStepProps {
  formData?: {
    occupation: string;
    pvtOrGovt: string;
    organisationName: string;
    designation: string;
    workProfile: string;
    businessType: string;
    professionName: string;
    lastOrganisation: string;
    address: string;
    city: string;
    remarks: string;
  };
  setFormData?: React.Dispatch<React.SetStateAction<{
    occupation: string;
    pvtOrGovt: string;
    organisationName: string;
    designation: string;
    workProfile: string;
    businessType: string;
    professionName: string;
    lastOrganisation: string;
    address: string;
    city: string;
    remarks: string;
  }>>;
  profileId: string | null;
  financialProfileId: string | null;
  setFinancialProfileId: React.Dispatch<React.SetStateAction<string | null>>;
  financialProfileExists: boolean;
  setFinancialProfileExists: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export default function ProfessionalDetailsStep({
  formData,
  setFormData,
  profileId,
  financialProfileId,
  setFinancialProfileId,
  financialProfileExists,
  setFinancialProfileExists,
  onNext,
  onBack,
  showBack = false,
}: ProfessionalDetailsStepProps) {
  const [localState, setLocalState] = useState({
    occupation: "",
    pvtOrGovt: "",
    organisationName: "",
    designation: "",
    workProfile: "",
    businessType: "",
    professionName: "",
    lastOrganisation: "",
    address: "",
    city: "",
    remarks: "",
  });

  const activeData = formData || localState;
  const activeSetter = setFormData || setLocalState;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    activeSetter((prev: any) => ({
      ...prev,
      [name]: value,
      ...(name === "occupation" ? {
        pvtOrGovt: "",
        organisationName: "",
        designation: "",
        workProfile: "",
        businessType: "",
        professionName: "",
        lastOrganisation: "",
        remarks: "",
      } : {})
    }));
    setErrors(prev => ({
      ...prev,
      [name]: "",
      ...(name === "occupation" ? {
        pvtOrGovt: "",
        organisationName: "",
        designation: "",
        workProfile: "",
        businessType: "",
        professionName: "",
        lastOrganisation: "",
        remarks: "",
      } : {})
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "city") {
      processedValue = value.replace(/\d/g, "");
    }
    activeSetter((prev: any) => ({
      ...prev,
      [name]: processedValue,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };

  const occupation = (activeData.occupation === "Others" || activeData.occupation === "Other") ? "Other" : activeData.occupation;

  const handleContinue = async () => {
    if (!profileId) {
      alert("Please complete the Personal Profile step first.");
      return;
    }

    const validationErrors: Record<string, string> = {};
    if (!activeData.occupation) {
      validationErrors.occupation = "Occupation is required.";
    } else {
      const occ = occupation;

      const validateCity = () => {
        if (!activeData.city || !activeData.city.trim()) {
          validationErrors.city = "City is required.";
        } else if (/\d/.test(activeData.city)) {
          validationErrors.city = "City name must not contain numbers.";
        } else if (!/^[a-zA-Z\s'.\-]+$/.test(activeData.city.trim())) {
          validationErrors.city = "City name must contain only alphabets and spaces.";
        }
      };

      if (occ === "Service") {
        if (!activeData.pvtOrGovt) validationErrors.pvtOrGovt = "PVT/Govt selection is required.";
        if (!activeData.organisationName.trim()) validationErrors.organisationName = "Organisation name is required.";
        if (!activeData.designation.trim()) validationErrors.designation = "Designation is required.";
        if (!activeData.workProfile.trim()) validationErrors.workProfile = "Work profile is required.";
        if (!activeData.address.trim()) validationErrors.address = "Address is required.";
        validateCity();
        if (!activeData.remarks.trim()) validationErrors.remarks = "Remarks are required.";
      } else if (occ === "Business") {
        if (!activeData.businessType.trim()) validationErrors.businessType = "Type of business is required.";
        if (!activeData.address.trim()) validationErrors.address = "Address is required.";
        validateCity();
      } else if (occ === "Professional") {
        if (!activeData.professionName.trim()) validationErrors.professionName = "Name of profession is required.";
        if (!activeData.address.trim()) validationErrors.address = "Address is required.";
        validateCity();
      } else if (occ === "Retired") {
        if (!activeData.lastOrganisation.trim()) validationErrors.lastOrganisation = "Last organisation is required.";
        if (!activeData.designation.trim()) validationErrors.designation = "Designation is required.";
        if (!activeData.address.trim()) validationErrors.address = "Address is required.";
        validateCity();
        if (!activeData.remarks.trim()) validationErrors.remarks = "Remarks are required.";
      } else if (occ === "Housewife" || occ === "Other") {
        if (!activeData.address.trim()) validationErrors.address = "Address is required.";
        validateCity();
        if (!activeData.remarks.trim()) validationErrors.remarks = "Remarks are required.";
      }
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
        _id: profileId,
        occupation: activeData.occupation === "Other" ? "Others" : activeData.occupation,
        pvtOrGovt: activeData.pvtOrGovt || undefined,
        organisationName: activeData.organisationName || undefined,
        designation: activeData.designation || undefined,
        workProfile: activeData.workProfile || undefined,
        businessType: activeData.businessType || undefined,
        professionName: activeData.professionName || undefined,
        lastOrganisation: activeData.lastOrganisation || undefined,
        address: activeData.address || undefined,
        city: activeData.city || undefined,
        remarks: activeData.remarks || undefined,
      };

      const response = await fetch(
        financialProfileExists && financialProfileId
          ? `http://localhost:5000/api/financial/${financialProfileId}`
          : "http://localhost:5000/api/financial",
        {
          method: financialProfileExists && financialProfileId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.msg || errBody.message || "Failed to submit professional details");
      }

      const resData = await response.json();
      if (resData.data && resData.data._id && setFinancialProfileId) {
        setFinancialProfileId(resData.data._id);
      }

      activeSetter((prev: any) => ({
        ...prev,
        occupation: occupation === "Other" ? "Others" : occupation,
      }));

      setFinancialProfileExists(true);
      onNext();
    } catch (err) {
      alert("Error saving professional details: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex items-center justify-between flex-wrap gap-2 border-bottom">
        <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
          Professional Details
        </h1>
      </div>
      <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />
      <label className="block text-[13px] font-medium text-[#44475b] mb-2">
        Occupation
        <span className="text-red-600"> *</span>
      </label>
      <select
        name="occupation"
        value={occupation}
        onChange={handleSelectChange}
        className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.occupation ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
          }`}
      >
        <option value="" disabled>Select Occupation</option>
        <option value="Service">Service</option>
        <option value="Business">Business</option>
        <option value="Professional">Professional</option>
        <option value="Retired">Retired</option>
        <option value="Housewife">Housewife</option>
        <option value="Other">Other</option>
      </select>
      {errors.occupation && <p className="text-red-500 text-[11px] mt-1">{errors.occupation}</p>}

      {occupation === "Service" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >
            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                PVT/Govt.
                <span className="text-red-600"> *</span>
              </label>
              <select
                name="pvtOrGovt"
                value={activeData.pvtOrGovt}
                onChange={handleSelectChange}
                className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.pvtOrGovt ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
              >
                <option value="" disabled>Select</option>
                <option value="Private">Private</option>
                <option value="Government">Government</option>
              </select>
              {errors.pvtOrGovt && <p className="text-red-500 text-[11px] mt-1">{errors.pvtOrGovt}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Organisation Name
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="organisationName"
                value={activeData.organisationName}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.organisationName ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Organisation"
              />
              {errors.organisationName && <p className="text-red-500 text-[11px] mt-1">{errors.organisationName}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Designation
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="designation"
                value={activeData.designation}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.designation ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Designation"
              />
              {errors.designation && <p className="text-red-500 text-[11px] mt-1">{errors.designation}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Work Profile
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="workProfile"
                value={activeData.workProfile}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.workProfile ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Work Profile"
              />
              {errors.workProfile && <p className="text-red-500 text-[11px] mt-1">{errors.workProfile}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="address"
                value={activeData.address}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="city"
                value={activeData.city}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>

          </div>

          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="lg:col-span-3">
                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                  Remarks
                  <span className="text-red-600"> *</span>
                </label>
                <textarea
                  name="remarks"
                  value={activeData.remarks}
                  onChange={handleInputChange}
                  placeholder="Remarks"
                  rows={2}
                  className={`w-full bg-[#F8F8F8] text-[#44475b] border rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px] ${errors.remarks ? "border-red-500" : "border-[#e9e9e9]"
                    }`}
                />
                {errors.remarks && <p className="text-red-500 text-[11px] mt-1">{errors.remarks}</p>}
              </div>

            </div>
          </div>
        </div>
      )}

      {occupation === "Business" && (

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >
            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Type of Business
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="businessType"
                value={activeData.businessType}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.businessType ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Business"
              />
              {errors.businessType && <p className="text-red-500 text-[11px] mt-1">{errors.businessType}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="address"
                value={activeData.address}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="city"
                value={activeData.city}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>

          </div>

          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="lg:col-span-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={activeData.remarks}
                    onChange={handleInputChange}
                    placeholder="Remarks"
                    rows={2}
                    className="w-full bg-[#F8F8F8] text-[#44475b] border border-[#e9e9e9] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px]"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      )}

      {occupation === "Professional" && (

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >
            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Name of Profession
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="professionName"
                value={activeData.professionName}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.professionName ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Profession"
              />
              {errors.professionName && <p className="text-red-500 text-[11px] mt-1">{errors.professionName}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="address"
                value={activeData.address}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="city"
                value={activeData.city}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>

          </div>

          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="lg:col-span-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={activeData.remarks}
                    onChange={handleInputChange}
                    placeholder="Remarks"
                    rows={2}
                    className="w-full bg-[#F8F8F8] text-[#44475b] border border-[#e9e9e9] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px]"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      )}

      {occupation === "Retired" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >
            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Last Organisation
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="lastOrganisation"
                value={activeData.lastOrganisation}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.lastOrganisation ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Organisation"
              />
              {errors.lastOrganisation && <p className="text-red-500 text-[11px] mt-1">{errors.lastOrganisation}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Designation
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="designation"
                value={activeData.designation}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.designation ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Designation"
              />
              {errors.designation && <p className="text-red-500 text-[11px] mt-1">{errors.designation}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="address"
                value={activeData.address}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="city"
                value={activeData.city}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>

          </div>

          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="lg:col-span-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                    Remarks
                    <span className="text-red-600"> *</span>
                  </label>
                  <textarea
                    name="remarks"
                    value={activeData.remarks}
                    onChange={handleInputChange}
                    placeholder="Remarks"
                    rows={2}
                    className={`w-full bg-[#F8F8F8] text-[#44475b] border rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px] ${errors.remarks ? "border-red-500" : "border-[#e9e9e9]"
                      }`}
                  />
                  {errors.remarks && <p className="text-red-500 text-[11px] mt-1">{errors.remarks}</p>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {occupation === "Housewife" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="address"
                value={activeData.address}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="city"
                value={activeData.city}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>

          </div>

          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="lg:col-span-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                    Remarks
                    <span className="text-red-600"> *</span>
                  </label>
                  <textarea
                    name="remarks"
                    value={activeData.remarks}
                    onChange={handleInputChange}
                    placeholder="Remarks"
                    rows={2}
                    className={`w-full bg-[#F8F8F8] text-[#44475b] border rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px] ${errors.remarks ? "border-red-500" : "border-[#e9e9e9]"
                      }`}
                  />
                  {errors.remarks && <p className="text-red-500 text-[11px] mt-1">{errors.remarks}</p>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {occupation === "Other" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="address"
                value={activeData.address}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                name="city"
                value={activeData.city}
                onChange={handleInputChange}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>

          </div>

          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="lg:col-span-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                    Remarks
                    <span className="text-red-600"> *</span>
                  </label>
                  <textarea
                    name="remarks"
                    value={activeData.remarks}
                    onChange={handleInputChange}
                    placeholder="Remarks"
                    rows={2}
                    className={`w-full bg-[#F8F8F8] text-[#44475b] border rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px] ${errors.remarks ? "border-red-500" : "border-[#e9e9e9]"
                      }`}
                  />
                  {errors.remarks && <p className="text-red-500 text-[11px] mt-1">{errors.remarks}</p>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <StepActions
        showBack={showBack}
        onBack={onBack}
        onContinue={handleContinue}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
