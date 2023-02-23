export default [
  {
    "path": "/home",
    "redirect": "/home/index",
    "component": "Layout",
    "children": [
      {
        "path": "/home/index",
        "name": "home",
        "component": "/home",
        "meta": {
          "role": [1, 2],
          "keepAlive": true,
          "title": "首页",
          "icon": "icon-shouye"
        }
      }
    ],
    "meta": {
      "role": [1, 2],
      "title": "首页",
      "icon": "icon-shouye"
    }
  },
  {
    "path": "/userList",
    "name": "userList",
    "component": "Layout",
    "children": [
      {
        "path": "/userList/user",
        "name": "user",
        "component": "/userList/user",
        "meta": {
          "role": [1, 2],
          "keepAlive": true,
          "title": "用户",
          "icon": "icon-yonghu"
        }
      },
      {
        "path": "/userList/admin",
        "name": "admin",
        "component": "/userList/admin",
        "meta": {
          "role": [1],
          "keepAlive": true,
          "title": "管理员",
          "icon": "icon-guanliyuan"
        }
      }
    ],
    "meta": {
      "role": [1, 2],
      "title": "用户管理",
      "icon": "icon-yonghuguanli"
    }
  },
  {
    "path": "/tag",
    "component": "Layout",
    "children": [
      {
        "path": "/tag/index",
        "name": "tag",
        "component": "/tag",
        "meta": {
          "role": [1, 2],
          "keepAlive": true,
          "title": "标签",
          "icon": "icon-guanjianci"
        }
      }
    ],
    "meta": {
      "role": [1],
      "title": "标签",
      "icon": "icon-guanjianci"
    }
  },
  {
    "path": "/log",
    "component": "Layout",
    "children": [
      {
        "path": "/log/index",
        "name": "log",
        "component": "/log",
        "meta": {
          "role": [1, 2],
          "keepAlive": true,
          "title": "操作日志",
          "icon": "icon-guanjianci"
        }
      }
    ],
    "meta": {
      "role": [1, 2],
      "title": "操作日志",
      "icon": "icon-shouye"
    }
  },
  {
    "path": "/documenter",
    "name": "documenter",
    "component": "Layout",
    "children": [
      {
        "path": "/documenter/webVocabulary",
        "name": "webVocabulary",
        "component": "/documenter/webVocabulary",
        "meta": {
          "role": [1, 2],
          "keepAlive": true,
          "title": "前端词汇",
          "icon": "icon-cidianku"
        }
      },
      {
        "path": "/documenter/card",
        "name": "card",
        "component": "/documenter/card",
        "meta": {
          "role": [1, 2],
          "keepAlive": true,
          "title": "个人信息",
          "icon": "icon-wj-zlk"
        }
      }
    ],
    "meta": {
      "role": [1, 2],
      "title": "资料卡",
      "icon": "icon-cidianku"
    }
  },
  {
    "path": "/bk",
    "component": "Layout",
    "children": [
      {
        "name": "bk",
        "path": "/bk/index",
        "component": "/bk",
        "meta": {
          "role": [1],
          "title": "博客发表",
          "icon": "icon-shouye"
        }
      }
    ],
    "meta": {
      "role": [1],
      "title": "博客发表",
      "icon": "icon-shouye"
    }
  }
]