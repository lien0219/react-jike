

# 项目启动

### `npm start`

### `npm test`

### `npm run build`

### `npm run eject`

## 配置

1.安装craco工具包

2.增加craco.config.js配置文件

3.修改scripts命令

npm i @craco/craco -D

craco.config.js

const path=require("path")

module.exports={

​		webpack:{

​				alias:{

​					//配置别名

​					’@‘:path.resolve(__dirname,'src')

​				}

​		}

}

"scripts":{

​		"start":"craco start",

​		"build":"craco build",

​		"test":"craco test",

​		"eject":"react-scripts eject"

}



