import { Button, Input, Form } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import Navbar from "../components/layout/Navbar";

const Contact = () => {
  const user = useAppSelector(currentUser);

  return (
    <div>
      {user ? <></> : <Navbar />}
      <div className="max-w-7xl flex flex-col" style={{margin: "50px auto" , minHeight: "70vh"}}>
        <div
          className="flex flex-col text-center"
          style={{ alignItems: "center", marginBottom: "30px" }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl">
            We'd love to hear from you! Whether you have a question about
            features, pricing, need a demo, or anything else — our team is ready
            to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div
            className="bg-white border border-gray-200 shadow-md rounded-lg"
            style={{ padding: "20px" }}
          >
            <Form layout="vertical">
              <Form.Item
                label="Your Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter a message" }]}
              >
                <Input.TextArea placeholder="Write your message" rows={5} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="bg-blue-600 hover:bg-blue-700"
                  size="large"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Contact Information */}
          <div
            className="bg-white border border-gray-200 shadow-md rounded-lg flex flex-col gap-6 justify-center"
            style={{ padding: "20px" }}
          >
            <div className="flex items-center gap-4">
              <MailOutlined className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-600">support@carnexa.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <PhoneOutlined className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-700">Phone</p>
                <p className="text-gray-600">+880 1234 567890</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <EnvironmentOutlined className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-700">Address</p>
                <p className="text-gray-600">Banani, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
