# comeUS
目录说明
页面文件简介（如index页面）

1、index.wxml 标签语言，结合基础组件、事件系统，可以构建出页面的结构（类似 html）

2、index.wxss 样式语言，用于描述 WXML 的组件样式（基本类似 css）

3、index.js 小程序开发框架的逻辑层

4、index.json 小程序的一些基本配置项

├── README.md  说明
├── app.js     全局逻辑层
├── app.json   项目的页面路径、界面表现配置
├── project.config.json  开发工具个性化配置
├── app.wxss   全局样式配置
├── images     图片资源
├── pages
│   ├── index   主页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── 发起活动的页面   
│   │   ├── Launch.js
│   │   ├── Launch.json
│   │   ├── Launch.wxml
│   │   └── Launch.wxss
    ├── template   模板用于复用    
│   │   └── list-template 首页列表模板
└── utils  工具
    └── https.js    封装的https请求
