import { useRef, useEffect, useState } from 'react'
import './style.css'
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd'
import { getModelProps, getModels, deleteModelProps, addModelProps, editModelProps } from '../api/module'
import { showPromiseConfirm } from '../component/showPromiseConfirm.jsx'
import AddModal from '../component/AddModal.jsx'
import { dataType } from '../enums/dataType.js'

function ModelPropsTable() {

  const actionRef = useRef();


  const [modelsData, setModelsData] = useState([]);

  const fetchModelsData = async () => {
    try {
      const msg = await getModels({ page: 1, pageSize: 1000 });

      setModelsData(msg.list);
    } catch (error) {
      setModelsData([]);
    }
  }

  useEffect(() => {
    fetchModelsData()
  }, [])

  const getDataTypeValueEnum = () => {
    const valueEnum = dataType.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.text };
      return acc;
    }, {});

    return valueEnum;
  }
  const columns = [
    {
      title: '模型ID',
      dataIndex: 'modelId',
      key: 'modelId',
      width: 200,
      editable: true,
      valueType: 'select',
      render: (e, k) => {
        const module = modelsData.find((m) => m.id === k.modelId);
        return module ? module.engName : '-'
      },
      valueEnum: modelsData.reduce((acc, cur) => { acc[cur.id] = { text: cur.engName }; return acc }, {})
    },
    {
      title: '属性键',
      dataIndex: 'engName',
      key: 'engName',
      width: 200,
      editable: true,
      valueType: 'text',
      render: (e, k) => k.engName || '-'
    },
    {
      title: '属性名称',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      editable: true,
      valueType: 'text',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 200,
      editable: true,
      valueType: 'select',
      valueEnum: getDataTypeValueEnum()
    },
    {
      title: '属性类型长度',
      dataIndex: 'dataLength',
      key: 'dataLength',
      width: 200,
      editable: true,
      valueType: 'text',
    },
    {
      title: '是否显示在搜索',
      dataIndex: 'showInSearch',
      key: 'showInSearch',
      width: 200,
      editable: true,
      valueType: 'switch',
      render: (e, k) => k.showInSearch || '-'
    },
    {
      title: '是否显示在表单',
      dataIndex: 'showInForm',
      key: 'showInForm',
      width: 200,
      editable: true,
      valueType: 'switch',

      render: (e, k) => k.showInForm || '-'
    },
    {
      title: '是否表单必填',
      dataIndex: 'required',
      key: 'required',
      width: 200,
      editable: true,
      valueType: 'switch',
      render: (e, k) => k.required || '-'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      valueType: 'date',
    },
    {
      title: '操作',
      key: 'option',
      width: 200,
      fixed: "right",
      valueType: 'option',
      // eslint-disable-next-line no-unused-vars
      render: (_, record) => [
        // eslint-disable-next-line react/jsx-key
        <Button type='link' onClick={() => {
          setValue({ ...record, modelId: `${record.modelId}` })
          setOpen(true)
        }} >编辑</Button>,

        // eslint-disable-next-line react/jsx-key
        <Button type='link' danger onClick={
          () => {

            showPromiseConfirm({
              title: '确认删除？',
              content: '删除后将无法恢复',
              ok: async () => {
                await deleteModelProps({ id: record.id })
                actionRef.current?.reload()
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <div className='TableDemo'>
      <AddModal
        title={value ? '编辑模块' : '新建模块'}
        open={open}
        value={value}
        columns={columns}
        ok={async (values) => {
          value ? await editModelProps({ id: value.id, ...values }) : await addModelProps(values)
          await actionRef.current?.reload()
          setValue(null)
          setOpen(false)
        }}
        cancel={() => {
          setOpen(false)
        }}
      />
      <ProTable
        className='zk-pro-table-custom'
        columns={columns}
        actionRef={actionRef}
        pagination={pagination}
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={() => {
            setValue(null)
            setOpen(true)
          }}>
            新建
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