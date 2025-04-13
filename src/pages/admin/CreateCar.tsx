import { Row, Col, Divider, Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHDatePicker from "../../components/form/PHDatePicker";
import PHForm from "../../components/form/PHForm";
import PHImageInput from "../../components/form/PHImageInput";
import PHInput from "../../components/form/PHInput";
import PHSelect from "../../components/form/PHSelect";
import { useAddACarMutation } from "../../redux/features/product/productManagement.api";
import dayjs from "dayjs";
import { toast } from "sonner";
import { TError } from "../../types";

const carCategories = ["Sedan", "SUV", "Truck", "Coupe", "Convertible"];

const inStockOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const categoryOptions = carCategories.map((item) => ({
  label: item,
  value: item,
}));

const CreateCar = () => {
  const [addACar] = useAddACarMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Car. Please Wait a moment.");

    const modifiedData = {
      brand: data.brand,
      model: data.model,
      year: dayjs(data.year).year(),
      price: Number(data.price),
      category: data.category,
      description: data.description,
      quantity: Number(data.quantity),
      inStock: data.inStock,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    data?.images.forEach((file: File) => {
      formData.append("files", file);
    });

    console.log("formData", Object.fromEntries(formData));
    const result = await addACar(formData);

    if (result?.data?.success) {
      toast.success(result?.data?.message, { id: toastId });
    } else if (result?.error) {
      toast.error((result?.error as TError)?.data.message, { id: toastId });
    } else toast.error("Something Went Wrong. Try again.", { id: toastId });
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={[]}>
          <Divider>Car Info</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="brand" label="Brand" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="model" label="Model" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHDatePicker picker="year" name="year" label="Year" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="number" name="price" label="Price" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHSelect
                name="category"
                label="Category"
                options={categoryOptions}
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="number" name="quantity" label="Quantity" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="textarea"
                rows={4}
                name="description"
                label="Description"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHSelect
                name="inStock"
                label="In Stock"
                options={inStockOptions}
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHImageInput name="images" label="Upload Car Pictures" />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateCar;
