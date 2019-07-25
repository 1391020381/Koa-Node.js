# koa2-service
1. 小程序登录
* 小程序登录获取code
* 后台通过 appKey(appId) appSecret code 获取到用户信息  ,并根据用户信息建立用户系统   
* const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
* openid  session_key  unionid(满足条件)  errcode errmsg
* `小程序中获取用户的信息(用户名、头像),然后将这些消息通过接口传递给后端服务。`

```
// userSchema 

openId

lastLogin

name

avatar

userType  // 用户类型 标记管理员  普通用户  禁用用户

```
1. 扫码登录
* 访问管理后台,当检测到未登录,跳转到扫码登录页面
* 扫码登录页面请求后台服务器接口,`获取待生成二维码的编码字符串,同时后台服务器存储该编码字符串`
* 扫码登录页面根据后台接口返回的字符串生成二维码
* 用户通过小程序扫码生成的二维码
* 小程序将扫描得到的字符串发送到后端服务接口,同时带着当前的小程序登录凭证
* 后台服务接受到小程序传递来的字符串和登录凭证,根据扫描到的字符串查询之前的存储记录,将当前小程序的登录凭证和之前存储的字符串关联
* 扫描登录页面在生成二维码之后,会不停的轮询请求后端服务来检测当前的二维码是否已经被扫码验证
* 在轮询请求中,发送扫描的二维码并查询之前存储的二维码信息,查询是否存在关联的用户。如果查询到关联用户,表示扫码登录成功,此时生成登录凭证给后端管理网站

```
// codeSchema 

code 

sessionKey

```

## 小程序接口
1. 相册模型  
```
// albumSchema 在小程序中用户输入相册名称 创建相册  userId name __id相册id

userId  name

```
2. 照片模型 

```
// photoSchema 返回的相册列表中有 每个相册的__id  当用户再某个相册上传图片的时候,告诉后台用户再那个相册中上传了图片

userId 

url 

isApproved

albumId ?

isDelete

```


## 后台管理系统
1. 定义用户列表接口
* 用户列表
* 设置管理员 取消管理员  禁用用户
* 获取待审核的照片列表 获取已审核的照片列表  获取审核被拒绝的照片列表
* 审核照片  取消审核照片











* 理清楚业务逻辑,设计数据库字段,定义接口,书写接口/前端页面  前后端联调