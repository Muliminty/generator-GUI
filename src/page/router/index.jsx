import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import App from '../../App.jsx'
import ModelTable from '../ModelTable.jsx';
import ModuleTable from '../ModuleTable.jsx';
import ModelPropsTable from '../ModelPropsTable.jsx';

const router = [
  {
    path: "/",
    element: <><App /></>,
    children: [
      {
        path: "/ModuleTable",
        icon: <UserOutlined />,
        label: '模块管理',
        element: <><ModuleTable /></>,
      },
      {
        path: "/ModelTable",
        label: '模型管理',
        icon: <VideoCameraOutlined />,
        element: <><ModelTable /></>,
      },
      {
        path: "/ModelPropsTable",
        icon: <UploadOutlined />,
        label: '模型属性管理',
        element: <><ModelPropsTable /></>,
      },
    ]
  }
]

export default router