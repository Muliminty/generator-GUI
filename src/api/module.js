import api from '../lib/request'

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
      return response.data
    })
    .catch(error => {
      console.log('error: ', error);
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
      console.log('error: ', error);
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
