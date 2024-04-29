import { useRef, useEffect, useState } from 'react'
import './style.css'
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd'
import { getModels, getModule } from '../api/module'


function ModelTable() {

  const actionRef = useRef();
  const [moduleData, setModuleData] = useState([]);

  const columns = [
    {
      title: '英文名称',
      dataIndex: 'engName',
      key: 'engName',
      valueType: 'text',
      width: '25%',
    },
    {
      title: '所属模块',
      dataIndex: 'moduleId',
      key: 'moduleId',
      valueType: 'select',
      width: '25%',
      render: (e, k) => {
        const module = moduleData.find((m) => m.id === k.moduleId);
        return module ? module.name : '-'
      },
      valueEnum: moduleData.reduce((acc, cur) => { acc[cur.id] = { text: cur.name }; return acc }, {})
    },
    {
      title: '中文描述',
      dataIndex: 'remark',
      key: 'remark',
      valueType: 'text',
      width: '25%',

    },

    {
      title: '操作',
      key: 'option',
      // width: '100px',
      fixed: "right",
      valueType: 'option',
      // eslint-disable-next-line no-unused-vars
      render: (_, record) => [
        // eslint-disable-next-line react/jsx-key
        <Button type='link'>编辑</Button>,
        // eslint-disable-next-line react/jsx-key
        <Button type='link' danger>删除</Button>,
      ],
    },
  ]

  const fetchModuleData = async () => {
    try {
      const msg = await getModule({ page: 1, pageSize: 1000 });

      setModuleData(msg.list);
    } catch (error) {
      setModuleData([]);
    }
  }


  useEffect(() => {
    fetchModuleData()
  }, [])
  const [searchHeight, setSearchHeight] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // 使用 setTimeout 延迟执行获取高度的操作
      setTimeout(() => {
        const cardElement = document.querySelector('.ant-pro-table-search');
        if (cardElement) {
          const { height } = cardElement.getBoundingClientRect();

          setSearchHeight(height); // 修改这里
        }
      }, 0);
    };

    // 初次加载时获取一次
    handleResize();
  }, [collapsed]);


  const scroll = { y: `calc(100vh - (${searchHeight}px + 420px))` }
  const pagination = {
    size: "default",
    defaultPageSize: 10,
    showSizeChanger: true,
  }
  const search = {
    span: 6,
    collapsed: collapsed, // 状态可控
    labelWidth: 'auto',
    onCollapse: (value) => { // 通过方法手动修改状态
      setCollapsed(value)
    },
    defaultCollapsed: true,
  }
  return (
    <div className='TableDemo'>

      <ProTable
        className='zk-pro-table-custom'
        columns={columns}
        actionRef={actionRef}
        pagination={pagination}
        toolBarRender={() => [
          <Button key="button" type="primary">
            新建
          </Button>,
          <Button key="button" type="primary">
            导出
          </Button>,
        ]}
        scroll={scroll}
        search={search}
        request={async (params) => {

          try {
            const msg = await getModels({
              page: params.current,
              pageSize: params.pageSize,
            });

            return {
              data: msg.list,
              success: true, // 需要返回 true 表示成功
              total: msg.total, // 如果使用分页，需要传入 total
            };
          } catch (error) {
            return {
              data: [],
              success: true, // 需要返回 true 表示成功
              total: 0, // 如果使用分页，需要传入 total
            };
          }
        }}
      />

    </div>
  )
}

export default ModelTable