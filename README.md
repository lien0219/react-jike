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
