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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value)); // ✅ force number
  };
  return (
    <>
      <div className="investment-slider mt-3">
        <div className="d-flex justify-content-between">

        </div>
        <div className="position-relative">
          <input
            type="range"
            min="1"
            max={maxLimit}
            step="1"
            value={value}
            onChange={handleChange}
            className="range-slider"
            style={{
              width: "100%",
              background: `linear-gradient(to right, #06A358,#001EFE ${((value - 1) / (maxLimit - 1)) * 100}%, #e0e7ff ${((value - 1) / (maxLimit - 1)) * 100}%)`,
            }}
          />
        </div>
      </div>
    </>
  )
}
export default RangeBar