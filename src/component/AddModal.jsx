import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input } from 'antd';

const AddModal = ({ title, open = false, columns = [], ok, cancel, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(value);
  }, [value])
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        ok && ok(values, form.resetFields)
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    cancel && cancel()
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          {columns.map((column) => {
            if (column.editable === true) {
              return <Form.Item key={column.key} label={column.title} name={column.dataIndex} rules={[{ required: true, message: `Please input ${column.title}!` }]}>
                {column.valueType === 'text' && <Input />}
              </Form.Item>
            }

          })}
        </Form>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  open: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
    })
  ),
};

export default AddModal;
