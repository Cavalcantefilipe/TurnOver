import React from "react";
import { Form, Input, Button, Space, InputNumber, message } from "antd";
import "antd/dist/antd.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../../service";
import { ButtonMenu, DivForm } from "./styles";
import { Link } from "react-router-dom";

export default function AddMany() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    api
      .post("products", values)
      .then(() => {
        form.resetFields();
        message.success("Products successfully registered");
      })
      .catch((error) => {
        message.error("Error :(");
      });
  };

  return (
    <>
      <DivForm>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Missing name" }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "price"]}
                      fieldKey={[field.fieldKey, "price"]}
                      rules={[{ required: true, message: "Missing price" }]}
                    >
                      <InputNumber
                        placeholder="Price"
                        min={0}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      fieldKey={[field.fieldKey, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber min={0} placeholder="Quantity" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add More Products
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <ButtonMenu type="primary" >
              <Link to="/">
              Back to Menu
              </Link>
            </ButtonMenu>
          </Form.Item>
        </Form>
      </DivForm>
    </>
  );
}
