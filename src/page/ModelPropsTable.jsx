import { useRef, useEffect, useState } from 'react'
import './style.css'
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd'
import { getModelProps } from '../api/module'

function ModelPropsTable() {

  const actionRef = useRef();
  const columns = [
    // {
    //   title: '模型属性ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 200,
    // },
    {
      title: '模型ID',
      dataIndex: 'modelId',
      key: 'modelId',
      width: 200,
    },
    {
      title: '属性键',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      render: (e, k) => k.engName || '-'
    },
    {
      title: '属性名称',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 200,
    },
    {
      title: '属性类型长度',
      dataIndex: 'dataLength',
      key: 'dataLength',
      width: 200,
    },
    {
      title: '是否显示在搜索',
      dataIndex: 'showInSearch',
      key: 'showInSearch',
      width: 200,
      render: (e, k) => k.showInSearch || '-'
    },
    {
      title: '是否显示在表单',
      dataIndex: 'showInForm',
      key: 'showInForm',
      width: 200,
      render: (e, k) => k.showInForm || '-'
    },
    {
      title: '是否表单必填',
      dataIndex: 'required',
      key: 'required',
      width: 200,
      render: (e, k) => k.required || '-'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
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


  const scroll = { x: 500, y: `calc(100vh - (${searchHeight}px + 420px))` }
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
            const msg = await getModelProps({
              page: params.current,
              pageSize: params.pageSize,
            });
            console.log('msg: ', msg);
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

export default ModelPropsTable