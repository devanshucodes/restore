import { Modal, Form, Input, Row, Col, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import React, { useEffect, useState } from "react";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

// Default image URLs for products
const defaultImages = {
  electronics: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
  furniture: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
  fashion: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  other: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
};

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
      if (selectedProduct.images && selectedProduct.images.length > 0) {
        setImages(selectedProduct.images.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: 'done',
          url: url
        })));
      }
    }
  }, [selectedProduct]);

  const getRandomUnsplashImage = (query) => {
    // Clean the query string and use it for the image
    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Use a random seed to get different images for the same query
    const randomSeed = Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/random/800x600/?${cleanQuery}&sig=${randomSeed}`;
  };

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      
      // Get existing products
      const storedProducts = localStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [];
      
      // Get image URLs from the images state or generate new one
      const imageUrls = images.length > 0 
        ? images.map(img => img.url)
        : [getRandomUnsplashImage(values.name)];
      
      if (selectedProduct) {
        // Edit existing product
        products = products.map(p => 
          p._id === selectedProduct._id 
            ? { 
                ...p, 
                ...values, 
                images: imageUrls,
                updatedAt: new Date().toISOString() 
              }
            : p
        );
      } else {
        // Add new product
        const newProduct = {
          ...values,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: "pending",
          images: imageUrls
        };
        products.push(newProduct);
      }
      
      // Save to localStorage
      localStorage.setItem('products', JSON.stringify(products));
      
      dispatch(SetLoader(false));
      message.success(selectedProduct ? "Product updated successfully" : "Product added successfully");
      getData();
      setShowProductForm(false);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      // Get the product name from the form
      const productName = formRef.current.getFieldValue('name');
      // Generate a random image based on the product name
      const randomImage = getRandomUnsplashImage(productName);
      
      setImages([{
        uid: info.file.uid,
        name: info.file.name,
        status: 'done',
        url: randomImage
      }]);
    }
  };

  const handleImageRemove = () => {
    setImages([]);
  };

  return (
    <Modal
      title={selectedProduct ? "Edit Product" : "Add Product"}
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      footer={null}
      width={1000}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        ref={formRef}
        initialValues={{
          billAvailable: false,
          warrantyAvailable: false,
          accessoriesAvailable: false,
          boxAvailable: false,
        }}
      >
        <Form.Item label="Name" name="name" rules={rules}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={rules}>
          <TextArea placeholder="Description" />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item label="Price" name="price" rules={rules}>
              <Input type="number" placeholder="Price" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Category" name="category" rules={rules}>
              <Input placeholder="Category" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Age" name="age" rules={rules}>
              <Input type="number" placeholder="Age" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Images" name="images">
          <Upload
            listType="picture-card"
            fileList={images}
            beforeUpload={() => false}
            onChange={handleImageUpload}
            onRemove={handleImageRemove}
            maxCount={1}
          >
            {images.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalThings.map((item) => {
            return (
              <Form.Item
                label={item.label}
                name={item.name}
                valuePropName="checked"
              >
                <input type="checkbox" />
              </Form.Item>
            );
          })}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md"
            onClick={() => setShowProductForm(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            {selectedProduct ? "Update" : "Add"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default ProductsForm;