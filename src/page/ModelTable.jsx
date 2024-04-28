import { useRef, useEffect, useState } from 'react'
import './style.css'
import ProTable from '@ant-design/pro-table';
import { Input, Button } from 'antd'
const arr = new Array(20).fill(1).map((v, i) => {
  return {
    key: i,
    value: v
  };
});
const mock = arr

function ModelTable() {

  const actionRef = useRef();
  const columns = [
    {
      title: 'ModelTable',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      valueType: 'textarea',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      valueType: 'digit',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      valueType: 'money',
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'date',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '未开始', status: 'Default' },
        1: { text: '进行中', status: 'Processing' },
        2: { text: '已完成', status: 'Success' },
        3: { text: '已取消', status: 'Error' },
      },
    },
    {
      title: 'renderFormItem',
      dataIndex: 'age2',
      key: 'age2',
      valueType: 'age2',
      width: '300px',
      renderFormItem: (_, { type, defaultRender, fieldProps, }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');
        if (status !== 'open') {
          return (
            // value 和 onchange 会通过 form 自动注入。
            <Input
              // 组件的配置
              {...fieldProps}
              // 自定义配置
              placeholder="renderFormItem渲染的结果"
            />
          );
        }
        return defaultRender(_);
      },
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
        request={async (params, sort, filter) => {

          try {
            // const msg = await myQuery({
            //   page: params.current,
            //   pageSize: params.pageSize,
            // });
            // return {
            //   data: msg.result,
            //   success: true, // 需要返回 true 表示成功
            //   total: msg.total, // 如果使用分页，需要传入 total

            return {
              data: mock,
              success: true, // 需要返回 true 表示成功
              total: 100, // 如果使用分页，需要传入 total
            };
            // };
          } catch (error) {
            return {
              data: mock,
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