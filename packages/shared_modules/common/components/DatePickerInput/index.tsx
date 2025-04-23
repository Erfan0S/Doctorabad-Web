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
  const d = new Date(values[name]);
  // console.log(new Date(values[name]));
  // console.log(new Date(values[name]).toLocaleString());
  // console.log(new Intl.DateTimeFormat("fa-IR").format(d));

  const onChange = ({ value }: { value: string }) => {
    setValues((prev: any) => {
      const d = new Date(value);
      return {
        ...prev,
        [name]: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      };
    });
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
