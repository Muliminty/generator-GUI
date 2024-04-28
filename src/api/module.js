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
