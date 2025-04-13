/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useRegisterUserMutation } from "../redux/features/user/userManagement.api";

const RegisterUser = () => {
  const navigate = useNavigate();
  const { Title } = Typography;

  const [RegisterUser] = useRegisterUserMutation();

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Signing Up...");
    try {
      const userInfo = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const res = await RegisterUser(userInfo).unwrap();

      if (res.success) {
        toast.success("Registered successfully", {
          id: toastId,
          duration: 1800,
        });
        setTimeout(() => {
          navigate(`/login`);
          toast.success("Now Login to Your Account to Continue", {
            id: toastId,
            duration: 4000,
          });
        }, 2100);
      } else if (res.error) {
        toast.success(
          res.error.data.message || "Something went Wrong, Try again.",
          {
            id: toastId,
            duration: 2000,
          }
        );
      }
    } catch (err) {
      toast.error(`Something went wrong`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        backgroundColor: "#f0f2f5", // Light background to make the form stand out
        padding: "20px", // Adds padding around the content
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff", // White background for the form container
          padding: "30px",
          borderRadius: "8px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for a modern look
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Sign Up To CarNexa
        </Title>

        <PHForm onSubmit={onSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <PHInput type="text" name="name" label="Name" />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <PHInput type="text" name="email" label="Email" />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <PHInput type="text" name="password" label="Password" />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              marginTop: "20px",
              backgroundColor: "#1890ff", // Primary button color (blue)
              borderColor: "#1890ff", // Border color to match button
              fontSize: "16px", // Slightly larger text
              padding: "10px", // Adds padding inside the button
            }}
          >
            Sign Up
          </Button>
        </PHForm>
      </div>
    </Row>
  );
};

export default RegisterUser;
