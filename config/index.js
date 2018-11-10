let { env } = require('./env')
// 环境变量配置
let config = {
  env: env,
  domain: {
    development: 'http://localhost',
    test: 'http://sso.kiwi.com.cn',
    production: 'http://sso.kiwi.com'
  }[env],
  backend: {
    development: 'http://localhost:8080',
    test: 'http://sso.kiwi.com.cn:8080',
    production: 'http://sso.kiwi.com'
  }[env],
  loginUrl: {
    development: `http://localhost:8081/login`,
    test: 'http://sso.kiwi.com.cn/login',
    production: `http://sso.kiwi.com/login`
  }[env]
}
console.log(`env is: `, env, ` config is: `, config)
module.exports = config
