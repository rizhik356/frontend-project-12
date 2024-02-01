const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  getChannels: () => [apiPath, 'data'].join('/'),
};

export default routes;
