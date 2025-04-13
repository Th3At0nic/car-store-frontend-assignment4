import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHImageInputProps = {
  name: string;
  label: string;
};

const PHImageInput = ({ name, label }: TPHImageInputProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <Form.Item label={label}>
            <Input
              multiple
              type="file"
              value={value?.fileName}
              {...field}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                onChange(files); // Store array of File objects
              }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHImageInput;
