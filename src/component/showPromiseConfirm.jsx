import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

export const showPromiseConfirm = ({ title, content, ok, cancel }) => {

  confirm({
    title: title,
    icon: <><ExclamationCircleFilled /></>,
    content: content,
    async onOk() {
      try {
        ok && await ok()
      } catch {
        return console.log('Oops errors!');
      }
    },
    onCancel() { cancel && cancel() },
  });
};
