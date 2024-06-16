# 项目启动

### `npm start`

### `npm test`

### `npm run build`

### `npm run eject`

## 配置

1.安装 craco 工具包

2.增加 craco.config.js 配置文件

3.修改 scripts 命令

npm i @craco/craco -D

craco.config.js

const path=require("path")

module.exports={

​ webpack:{

​ alias:{

​ //配置别名

​ ’@‘:path.resolve(\_\_dirname,'src')

​ }

​ }

}

"scripts":{

​ "start":"craco start",

​ "build":"craco build",

​ "test":"craco test",

​ "eject":"react-scripts eject"

}

样式 reset

npm install normalize.css

html,
body {
margin: 0;
height: 100%;
}

#root {
height: 100%;
}

富文本编辑器
npm i react-quill@2.0.0-beta.2

打包-打包体积分析
业务背景
通过分析打包体积，才能知道项目中的哪部分内容体积过大，方便知道哪些包如何来优化
使用步骤

1. 安装分析打包体积的包：npm i source-map-explorer
2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
3. 对项目打包：npm run build（如果已经打过包，可省略这一步）
4. 运行分析命令：npm run analyze
5. 通过浏览器打开的页面，分析图表中的包体积
   核心代码：
   "scripts": {
   "analyze": "source-map-explorer 'build/static/js/\*.js'",
   }
