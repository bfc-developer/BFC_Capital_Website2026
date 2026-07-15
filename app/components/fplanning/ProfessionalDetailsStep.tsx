"use client";

import { useState, ChangeEvent } from "react";

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
}

export default function ProfessionalDetailsStep({ formData, setFormData }: ProfessionalDetailsStepProps) {
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
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    activeSetter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const occupation = activeData.occupation;

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
        className="cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
      >
        <option value="" disabled>Select Occupation</option>
        <option value="Service">Service</option>
        <option value="Business">Business</option>
        <option value="Professional">Professional</option>
        <option value="Retired">Retired</option>
        <option value="Housewife">Housewife</option>
        <option value="Other">Other</option>
      </select>

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
                className="cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
              >
                <option value="" disabled>Select</option>
                <option value="Select1">Select1</option>
                <option value="Select1">Select2</option>
                <option value="Select1">Select3</option>
                <option value="Other">Other</option>
              </select>
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Organisation" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Designation" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Work Profile" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Address" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="City" 
              />
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
                  className="w-full bg-[#F8F8F8] text-[#44475b] border border-[#e9e9e9] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px]"
                />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Business" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Address" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="City" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Profession" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Address" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="City" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Organisation" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Designation" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Address" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="City" 
              />
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
                    className="w-full bg-[#F8F8F8] text-[#44475b] border border-[#e9e9e9] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px]"
                  />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Address" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="City" 
              />
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
                    className="w-full bg-[#F8F8F8] text-[#44475b] border border-[#e9e9e9] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px]"
                  />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="Address" 
              />
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" 
                placeholder="City" 
              />
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
                    className="w-full bg-[#F8F8F8] text-[#44475b] border border-[#e9e9e9] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 placeholder:text-[13px]"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}