import React, { useState, useEffect, useCallback } from "react";
import {
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  message,
  Drawer,
  Divider,
  Button
} from "antd";
import api from "../../service";
import { DivOperation, TableAll } from "./styles";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { Link } from "react-router-dom";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  Key,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" && title === "Price" ? (
      <InputNumber
        min={0}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
      />
    ) : inputType === "number" && title === "Quantity" ? (
      <InputNumber min={0} />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Listar({ data }) {
  const [form] = Form.useForm();
  const [products, setProducts] = useState(data);
  const [productDetail, setProductDetail] = useState([]);
  const [productAtualName, setProductAtualName] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [visible, setVisible] = useState(false);


  const showDrawer = (productAtual) => {
    setVisible(true);
    setProductAtualName(productAtual.name);
    setProductDetail(productAtual.product_detail);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const getProducts = useCallback(async () => {
    const response = await api.get("product");
    setProducts(response.data);
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      price: "",
      quantity: "",
      ...record,
    });
    console.log(record);
    setEditingKey(record.id);
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...products];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        await api
          .put(`product/${id}`, row)
          .then(() => {
            getProducts();
          })
          .catch((error) => {
            alert("erro ao atualizar produto");
            console.log(error);
          });
        setEditingKey("");
      } else {
        newData.push(row);
        setProducts(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  async function productDelete(id) {
    await api.delete(`product/${id}`);
    message.success("Product Deleted");
    getProducts();
  }

  function cancel() {
    setEditingKey("");
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "15%",
      editable: false,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "operation",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.id, record)}
              style={{
                marginRight: 8,
              }}
              href="#"
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href="#">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <DivOperation>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>

            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => productDelete(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a disabled={editingKey !== ""} href="#">
                Delete
              </a>
            </Popconfirm>

            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => showDrawer(record)}
            >
              Details
            </Typography.Link>
          </DivOperation>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "name" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
    <Button type="primary" >
    <Link to='/create' > Create Product</Link>
        </Button>
      <Form form={form} component={false}>
        <TableAll
        
        scroll={{ y: 475 }} style={{ width: '100%', height: '100%' }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={products}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={(product) => product.id}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>

      <Drawer
        title={<Title level={3}>{productAtualName}</Title>}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        
      >
        {productDetail.map((item) => {
          return (
            <>
              <Title level={5}>Updated on date:</Title>{" "}
              {moment(item.inDate).format("MM/DD/YYYY hh:mm:ss a")}
              <Title level={5}>Quantity:</Title> {item.quantity}
              <Divider />
            </>
          );
        })}
      </Drawer>


    </>
  );
}
