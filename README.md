### 环境准备

- Node.js v14.15.5
- MongoDB v4.2.17

### 安装MongoDB数据库

进入[官网](https://www.mongodb.com/try/download/community)下载，版本是4.2.17，平台是Windows，安装包为msi格式

### 项目开发 

#### 1. 克隆项目至本地：
 
```sh
$ git clone git@github.com:miqilin21/vue-blog.git
$ cd vue-blog
$ pnpm i
```

#### 2. 安装前后台(admin、web)及后端(server)项目依赖：

```sh
$ pnpm install-all
```

#### 3. 运行前后台(admin、web)及后端(server)项目：

```sh
$ pnpm serve-all
```

#### 4. 打开浏览器预览：

http://localhost:5000 打开前台本地页面；http://localhost:5500 打开后台本地页面。


### 后台管理系统

- 新增分类
- 分类列表(增删改查)

- 新增文章
- 文章列表(增删改查)

- Markdown 编辑器集成
- 图片上传功能

- 新增用户
- 用户列表(增删改查)

- 通用增删改查接口实现(中间件 resourceMiddleware)

- 登录注册功能
- 登出功能
- 添加 jwt 校验（1. 用户名查找 2. 密码校验 3. 返回 token）
- 添加 http 拦截器（request、response)

### 博客系统

- 博客首页 UI
- 博客首页接口实现
- 博客归档页面 UI
- 博客归档页面接口实现
- 博客标签页面 UI
- 博客标签页面接口实现
- 博客文章页面 UI
- 博客文章页面接口实现

