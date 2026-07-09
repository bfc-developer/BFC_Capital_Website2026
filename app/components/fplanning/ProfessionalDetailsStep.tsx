"use client";

import { useState, ChangeEvent } from "react";

export default function ProfessionalDetailsStep() {
  const [occupation, setOccupation] = useState<string>("");

  const handleOccupationChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    setOccupation(e.target.value);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <label className="block text-[13px] font-medium text-[#44475b] mb-2">
        Occupation
        <span className="text-red-600"> *</span>
      </label>
      <select value={occupation}
        onChange={handleOccupationChange} className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
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
              <select className="cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                <option value="" selected disabled hidden>Select</option>
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
              <input type="text" className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" placeholder="Organisation" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Designation
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Designation" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Work Profile
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Work Profile" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Address" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="City" />
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
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Business" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Address" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="City" />
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
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Profession" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Address" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="City" />
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
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Organisation" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Designation
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Designation" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Address
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Address" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="City" />
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
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Address" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="City" />
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
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Address" />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                City
                <span className="text-red-600"> *</span>
              </label>
              <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="City" />
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