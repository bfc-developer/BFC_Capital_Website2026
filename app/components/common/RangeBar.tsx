interface BarNameValueProp {
  maxLimit: number;
  value: number;
  setValue: (value: number) => void;
}

const RangeBar: React.FC<BarNameValueProp> = ({
  maxLimit = 30,
  value,
  setValue,
}) => {
  const min = 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  // Calculate percentage
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
        className="w-full appearance-none h-2 rounded-lg cursor-pointer"
        style={{
          background: `linear-gradient(to right,
            #06A358 0%,
            #001EFE ${percent}%,
            #e0e7ff ${percent}%,
            #e0e7ff 100%)`,
        }}
      />
    </div>
  );
};

export default RangeBar;