import api from '../lib/request'
import { message } from 'antd'
export const getModule = (params) => {
  return api.sendRequest({
    url: '/module/page',
    method: 'get',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 删除模块
export const deleteModule = (params) => {
  return api.sendRequest({
    url: `/module/${params.id}`,
    method: 'delete',
  })
    .then(response => {
      if (response.code === 'error') {
        message.error(response.message)
      }
      if (response.code === 'success') {
        message.success(response.message)
      }
      return response.data
    })
    .catch(error => {
      // 返回错误信息
      return error.response.data
    });
}

// 新建模块

export const addModule = (params) => {

  return api.sendRequest({
    url: '/module',
    method: 'post',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 编辑模块
export const editModule = ({ id, ...params }) => {
  return api.sendRequest({
    url: `/module/${id}`,
    method: 'put',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}
// ---------------------------------------------------

export const getModels = (params) => {
  return api.sendRequest({
    url: '/model/page',
    method: 'get',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 删除模块
export const deleteModel = (params) => {
  return api.sendRequest({
    url: `/model/${params.id}`,
    method: 'delete',
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      // 返回错误信息
      return error.response.data
    });
}

// 新建模块

export const addModel = (params) => {

  return api.sendRequest({
    url: '/model',
    method: 'post',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 编辑模块
export const editModel = ({ id, ...params }) => {
  return api.sendRequest({
    url: `/model/${id}`,
    method: 'put',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}
// -----------------------------------------

export const getModelProps = (params) => {
  return api.sendRequest({
    url: '/modelProps/page',
    method: 'get',
    params: { ...params }
  })
    .then(response => {
      console.log('response: ', response);
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 删除模型属性
export const deleteModelProps = (params) => {
  return api.sendRequest({
    url: `/modelProps/${params.id}`,
    method: 'delete',
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 新建模型属性

export const addModelProps = (params) => {
  return api.sendRequest({
    url: '/modelProps',
    method: 'post',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 编辑模型属性
export const editModelProps = ({ id, ...params }) => {
  return api.sendRequest({
    url: `/modelProps/${id}`,
    method: 'put',
    params: { ...params }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}

// 生成代码
export const generateCode = (params) => {
  return api.sendRequest({
    url: '/model/generate',
    method: 'post',
    params: { ...params },
    headers: {
      'Content-Type': 'application/json; application/octet-stream'
    },
    responseType: 'blob',

  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
    });
}