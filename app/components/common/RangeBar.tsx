interface BarNameValueProp {
  maxLimit: number;
  value: number;
  setValue: (value: number) => void;
  ariaLabel?: string;
}

const RangeBar: React.FC<BarNameValueProp> = ({
  maxLimit = 30,
  value,
  setValue,
  ariaLabel,
}) => {
  const min = 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const percent = ((value - min) / (maxLimit - min)) * 100;

  return (
    <div className="mt-3">
      <input
        type="range"
        min={min}
        max={maxLimit}
        step="1"
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel || "Range slider"}
        className="w-full appearance-none h-2 rounded-lg cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D9D9D9] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D9D9D9] [&::-moz-range-thumb]:border-none"
        style={{
          background: `linear-gradient(to right,
            #06A358 0%,
            #001EFE ${percent}%,
            rgba(6, 163, 88, 0.15) ${percent}%,
            rgba(0, 30, 254, 0.15) 100%)`,
        }}
      />
    </div>
  );
};

export default RangeBar;