import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Form, Input, Switch } from 'antd';
import './style.scss'
const AddModal = ({ title, open = false, columns = [], ok, cancel, value }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (value === null) {
      form.resetFields();
    } else {
      form.setFieldsValue(value);
    }
  }, [value, open, form]);

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
    cancel && cancel()
    form.resetFields();
    setIsModalOpen(false);
  };

  // ValueEnum 转数组
  const valueEnumToArray = (valueEnum) => {

    try {
      const arr = Object.keys(valueEnum).map(key => ({
        value: key,
        label: valueEnum[key].text
      }));

      return arr;
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        className='add-modal'
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          {columns.map((column) => {
            if (column.editable === true) {
              return <Form.Item key={column.key} label={column.title} name={column.dataIndex} rules={[{ required: false, message: `Please input ${column.title}!` }]}>
                {column.valueType === 'text' && <Input />}
                {column.valueType === 'switch' && <Switch />}
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
