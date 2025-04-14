import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
  name: string;
  label?: string;
  picker?: "date" | "month" | "quarter" | "time" | "week" | "year";
  required?: boolean;
};

const PHDatePicker = ({
  name,
  label,
  picker,
  required,
}: TPHDatePickerProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              required={required}
              picker={picker}
              {...field}
              id={name}
              size="large"
              style={{ width: "100%" }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
