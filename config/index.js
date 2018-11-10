import env from './env'
// 环境变量配置
let config = {
  env: env,
  mock_api_url: `https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/`,
  domain: {
    development: 'http://localhost',
    production: 'http://jinding.jd.com'
  }[env],
  ssoBackend: {
    development: 'http://localhost:8080',
    production: 'http://sso.kiwi.com'
  }[env],
  loginUrl: {
    development: `http://localhost/login`,
    production: `http://sso.kiwi.com/login`
  }[env]
}

console.log(`env is: `, env, ` config is: `, config)
export default config
