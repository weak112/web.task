# 光影旋律 - 电影音乐推荐网站

一个纯前端的电影和音乐推荐网站，支持用户注册登录、浏览搜索、收藏管理等功能。

## 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- 本地存储 (localStorage)
- 响应式设计

## 目录结构

```
project/
├── index.html              # 首页
├── login.html              # 登录页
├── register.html           # 注册页
├── list.html             # 内容列表页
├── detail.html           # 内容详情页
├── publish.html          # 内容发布页
├── center.html           # 个人中心页
├── admin/
│   ├── index.html        # 后台首页
│   ├── goods-manage.html  # 内容管理页
│   └── user-manage.html  # 用户管理页
├── css/
│   ├── common/
│   │   ├── reset.css     # 样式重置
│   │   ├── responsive.css # 响应式样式
│   │   └── common.css   # 通用样式
│   └── page/
│       ├── index.css      # 首页样式
│       ├── list.css       # 列表页样式
│       ├── detail.css      # 详情页样式
│       ├── auth.css        # 登录注册样式
│       ├── center.css    # 个人中心样式
│       ├── publish.css    # 发布页样式
│       └── admin.css     # 管理后台样式
├── js/
│   ├── common/
│   │   ├── utils.js     # 工具函数
│   │   ├── storage.js  # 存储管理
│   │   └── validate.js # 表单验证
│   ├── data/
│   │   └── mock-data.js # 模拟数据
│   └── page/
│       ├── index.js      # 首页逻辑
│       ├── list.js       # 列表页逻辑
│       ├── detail.js      # 详情页逻辑
│       ├── login.js    # 登录页逻辑
│       ├── register.js  # 注册页逻辑
│       ├── center.js   # 个人中心逻辑
│       ├── publish.js # 发布页逻辑
│       ├── admin.js     # 后台首页逻辑
│       ├── admin-goods.js # 内容管理逻辑
│       └── admin-users.js # 用户管理逻辑
└── assets/
    ├── images/
    └── icons/
```

## 功能模块

### 用户系统
- 用户注册
- 用户登录
- 个人信息管理
- 修改密码
- 用户登出

### 首页
- 轮播图展示
- 热门推荐
- 分类筛选

### 列表页
- 内容展示
- 搜索功能
- 分类筛选
- 分页功能

### 详情页
- 内容详情展示
- 相关推荐
- 收藏功能

### 个人中心
- 收藏管理
- 个人信息编辑

### 管理后台
- 数据统计
- 内容管理
- 用户管理

## 默认账号

- 管理员邮箱: admin@movieapp.com
- 密码: 123456

## 运行项目

1. 直接在浏览器中打开 `index.html` 文件即可
2. 或者使用本地服务器运行：
   - Python: `python -m http.server 8000`
   - 然后访问 http://localhost:8000

## 设计规范

- 变量/函数：小驼峰 (camelCase)
- 组件/类：大驼峰 (PascalCase)
- 常量：全大写加下划线 (UPPER_SNAKE_CASE)
- 文件名：小写加连字符 (kebab-case)
