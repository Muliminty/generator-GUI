import { useRef, useEffect, useState } from 'react'
import './style.css'
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd'
import { getModule, deleteModule, addModule, editModule } from '../api/module'
import { showPromiseConfirm } from '../component/showPromiseConfirm.jsx'
import AddModal from '../component/AddModal.jsx'
/**
 * 模块组件
 *
 * @return {*} 
 */
function ModuleTable() {

  const actionRef = useRef();
  const columns = [
    {
      title: '模块名称',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      // width: '30%',
      editable: true,
      placeholder: "比如：门禁模块",
      require: true,
      // hideInSearch: true,

    },
    {
      title: '模块编码',
      dataIndex: 'code',
      key: 'code',
      valueType: 'text',
      // width: '40%',
      editable: true,
      require: true,
      placeholder: "比如：acc",
      // hideInSearch: true,
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
        <Button type='link' onClick={() => {
          setValue(record)
          setOpen(true)
        }} >编辑</Button>,
        // eslint-disable-next-line react/jsx-key
        <Button type='link' danger onClick={
          () => {
            showPromiseConfirm({
              title: '确认删除？',
              content: '删除后将无法恢复',
              ok: async () => {
                try {
                  let res = await deleteModule({ id: record.id })
                  if (res.code === 'error') {
                    message.error(res.message)
                  }
                  if (res.code === 'success') {
                    message.success('删除成功')
                  }
                  actionRef.current?.reload()
                } catch (error) {
                  console.log('error: ', error.message);

                }
              }
            })
          }
        }>删除</Button>,
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


  const scroll = { y: `calc(100vh - (${searchHeight}px + 400px))` }
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <div className='TableDemo'>
      <AddModal
        title={value ? '编辑模块' : '新建模块'}
        open={open}
        value={value}
        columns={columns}
        ok={async (values, resetFields) => {
          value ? await editModule({ id: value.id, ...values }) : await addModule(values)
          await actionRef.current?.reload()
          setValue(null)
          resetFields()
          setOpen(false)
        }}
        cancel={() => {
          setOpen(false)
        }}
      />
      < ProTable
        className='zk-pro-table-custom'
        columns={columns}
        actionRef={actionRef}
        pagination={pagination}
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={() => {
            setOpen(true)
          }}>
            新建
          </Button>,
        ]}
        scroll={scroll}
        search={search}
        request={async (params) => {

          try {
            const msg = await getModule({
              ...params,
              page: params.current,
              pageSize: params.pageSize,

            });
            return {
              data: msg.list,
              success: true, // 需要返回 true 表示成功
              total: msg.totalCount, // 如果使用分页，需要传入 total
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

export default ModuleTable