import { useRef, useEffect, useState } from 'react'
import './style.css'
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal,Tabs,Radio } from 'antd'
import { getModels, getModule, deleteModel, addModel, editModel, generateCode } from '../api/module'
import { showPromiseConfirm } from '../component/showPromiseConfirm.jsx'
import AddModal from '../component/AddModal.jsx'
import CodeBlock from '../component/CodeBlock'

function ModelTable() {

  const actionRef = useRef();
  const [moduleData, setModuleData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [activeKey, setActiveKey] = useState("1");

  const [itemData1, setItemData1] = useState([]);
  const [activeKey1, setActiveKey1] = useState("1");
  const [size, setSize] = useState('end');
  

  const columns = [
    {
      title: '所属模块',
      dataIndex: 'moduleId',
      key: 'moduleId',
      valueType: 'select',
      // width: '25%',
      editable: true,
      require: true,
      render: (e, k) => {
        const module = moduleData.find((m) => m.id === k.moduleId);
        return module ? module.name : '-'
      },
      valueEnum: moduleData.reduce((acc, cur) => { acc[cur.id] = { text: cur.name }; return acc }, {})
    },
    {
      title: '模型名称',
      dataIndex: 'remark',
      key: 'remark',
      valueType: 'text',
      // width: '25%',
      editable: true,
      placeholder: "比如：门",
      hideInSearch: true,
      require: true,
    },
    {
      title: '模型编码',
      dataIndex: 'engName',
      key: 'engName',
      valueType: 'text',
      // width: '25%',
      placeholder: "比如：Door",
      editable: true,
      hideInSearch: true,
      require: true
    },
    {
      title: '错误码缩写',
      dataIndex: 'properties',
      key: 'properties',
      valueType: 'text',
      // width: '25%',
      placeholder: "比如：ZCAC",
      editable: true,
      hideInSearch: true,
      require: true,
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
          record.moduleId = `${record.moduleId}`
          console.log('record: ', record);
          setValue(record)
          setOpen(true)
        }} >编辑</Button>,
        <Button type='link' onClick={async () => {
          const module = moduleData.find((m) => m.id === record.moduleId);
          let isReadFile = "1"
          const data = await generateCode({ ...record, moduleName: `${module.code}`, module ,isReadFile})
          previewCode(data)
        }}> 预览代码</Button>,
        // eslint-disable-next-line react/jsx-key
        <Button type='link' onClick={async () => {
          showPromiseConfirm({
            title: `点击确认生成${record.engName}代码`,
            content: '',
            ok: async () => {
              const module = moduleData.find((m) => m.id === record.moduleId);
              try {
                const data = await generateCode({ ...record, moduleName: `${module.code}`, module })

                const link = document.createElement('a');
                const url = `http://${data.IP}:3000/${data.fileName}`
                link.href = url;

                // 模拟点击该链接，触发下载
                link.click();

                // 清理 URL 对象
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.log('Error generating code:', error);
              }
            }
          })
        }}> 生成代码</Button>,
        // eslint-disable-next-line react/jsx-key
        <Button type='link' danger onClick={
          () => {
            showPromiseConfirm({
              title: '确认删除？',
              content: '删除后将无法恢复',
              ok: async () => {
                try {
                  let res = await deleteModel({ id: record.id })
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

  const previewCode = async (data) => {
    
    // 后端
    let templateNames = data.templateNames
    let res=[]
    templateNames.forEach((item,i) => {
      // 将响应转换为文本
      res.push({
        key: (i + 1) + "",
        label: item.templateName,
        children: <CodeBlock language={item.outSuffix} code={item.template} />,
      })
    });
    setActiveKey("1")
    setItemData(res)


    // 前端
    let fontTemplateNames = data.fontTemplateNames
    let tabs=[]
    fontTemplateNames.forEach((item,i) => {
      // 将响应转换为文本
      tabs.push({
        key: (i + 1) + "",
        label: item.templateName,
        children: <CodeBlock language={item.outSuffix} code={item.template} />,
      })
    });
    setActiveKey1("1")
    setItemData1(tabs)
    
    setIsModalOpen(true)


    return res
  }

  const fetchModuleData = async () => {
    try {
      const msg = await getModule({ page: 1, pageSize: 1000 });

      setModuleData(msg.list);
    } catch (error) {
      console.log('error: ', error);
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const onChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className='TableDemo'>
      <Modal width={1000} title="代码预览" open={isModalOpen} 
        destroyOnClose
        footer={false}
        maskClosable={false}
        onOk={() => { setIsModalOpen(false) }} onCancel={() => { setIsModalOpen(false) }}>
          <Radio.Group
            value={size}
            onChange={onChange}
            style={{
              marginBottom: 16,
            }}
          >
          <Radio.Button value="end">后端</Radio.Button>
          <Radio.Button value="font">前端</Radio.Button>
        </Radio.Group>
        {size === "end" && <Tabs activeKey={activeKey} items={itemData} onChange={(key)=>{setActiveKey(key)}} />}
        {size === "font" && <Tabs activeKey={activeKey1} items={itemData1} onChange={(key)=>{setActiveKey1(key)}} />}
      </Modal>
      <AddModal
        title={value ? '编辑模块' : '新建模块'}
        open={open}
        value={value}
        columns={columns}
        ok={async (values, resetFields) => {
          console.log('values: ', values);
          value ? await editModel({ id: value.id, ...values }) : await addModel(values)
          await actionRef.current?.reload()
          setValue(null)
          resetFields()
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
            setOpen(true)
            setValue(null)
          }}>
            新建
          </Button>,

        ]}
        // scroll={scroll}
        search={search}
        request={async (params) => {

          try {
            const msg = await getModels({
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

export default ModelTable