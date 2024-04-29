import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Form, Input } from 'antd';

const AddModal = ({ title, open = false, columns = [], ok, cancel, value }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(value);
  }, [value, open, form])
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        ok && ok(values, form.resetFields)
      })
      .catch((errorInfo) => {
        console.log('errorInfo: ', errorInfo);

      });
  };

  const handleCancel = () => {
    form.resetFields();
    cancel && cancel()
    setIsModalOpen(false);
  };

  // ValueEnum 转数组
  const valueEnumToArray = (valueEnum) => {

    try {
      const arr = Object.keys(valueEnum).map(key => ({
        value: key && Number(key),
        label: valueEnum[key].text
      }));
      return arr
    } catch (error) {

      return []
    }
  }
  return (
    <>
      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          {columns.map((column) => {
            if (column.editable === true) {
              return <Form.Item key={column.key} label={column.title} name={column.dataIndex} rules={[{ required: true, message: `Please input ${column.title}!` }]}>
                {column.valueType === 'text' && <Input />}
                {column.valueType === 'select' &&
                  <Select
                    options={valueEnumToArray(column.valueEnum)}
                  />
                }
              </Form.Item>
            }

          })}
        </Form>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      valueType: PropTypes.string.isRequired,
      valueEnum: PropTypes.objectOf(
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
      editable: PropTypes.bool.isRequired,
    })
  ),
  ok: PropTypes.func,
  cancel: PropTypes.func,
  value: PropTypes.object,
};


export default AddModal;
