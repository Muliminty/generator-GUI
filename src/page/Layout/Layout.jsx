import { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import './styel.scss'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import router from '../router';
// import ModelTable from '../ModelTable';
// import ModuleTable from '../ModuleTable';
// import ModelPropsTable from '../ModelPropsTable';
import { useNavigate } from 'react-router-dom';
const AntdLayout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [key, setKey] = useState('/ModuleTable');
  useEffect(() => {
    setItems(() => {
      return router[0].children.map((r) => {

        if (r.path === '/') {
          return null
        }
        return {
          key: r.path,
          icon: r.icon,
          label: r.label,
          element: r.element
        }
      }).filter(Boolean)

    })
  }, [])

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();


  useEffect(() => {
    // setItems(route);
    // 
  }, []);
  return (
    <div>
      <div className='header'>
        代码生成器
      </div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[key]}
            items={items}
            onClick={({ key }) => {
              setKey(key)
              navigate(key);
            }
            }
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {items.map((item, i) => {
                return <>
                  {i}
                  <Route
                    key={item.key}
                    path={item.key}
                    element={item?.element}
                  />
                </>
              })}
              <Route path="/" element={<Navigate to="/ModuleTable" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default AntdLayout;