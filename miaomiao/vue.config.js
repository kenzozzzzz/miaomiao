module.exports= {
    // NODE_ENV: '"production"',
    publicPath :'/miaomiao',
    devServer :{
        proxy :{
            '/api2' :{
                target :'http://localhost:3000', //反向代理
                // target :'http://47.106.15.129/', //代理服务器的数据库
                changeOrigin : true
            },
            '/api' :{
                target :'http://39.97.33.178',
                changeOrigin : true
            }
        }
    }
}