import { useFormikContext } from "formik";
import { DatePicker } from "zaman";

interface Props {
  color?: string;
  name: string;
  position: "right" | "left" | "center";
  placeholder: string;
}

const DatePickerInput = ({ name, placeholder, position, color }: Props) => {
  const { values, setValues } = useFormikContext<any>();

  const onChange = ({ value }: { value: string }) => {
    setValues((prev: any) => ({
      ...prev,
      [name]: new Date(value)
        .toLocaleString()
        .split(",")[0]!
        .split("/")
        .reverse()
        .join("-"),
    }));
  };

  return (
    <DatePicker
      onChange={onChange as any}
      position={position}
      accentColor={color}
      inputAttributes={{ placeholder: placeholder }}
      defaultValue={values[name] ? new Date(values[name]) : undefined}
    />
  );
};

export default DatePickerInput;
