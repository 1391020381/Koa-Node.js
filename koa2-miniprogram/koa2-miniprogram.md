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

# 深入浅出React和Redux
## 组件
1. prop
* 外部组件传递数据给React组件 
* 组件要反馈数据给外部 
* prop的类型不限于纯数据,也可以是函数,函数类型的prop等于让父组件交给子组件一个回调函数,子组件在恰当的实际调用函数类型的prop,可以带上必要参数,这样就可以反过来把信息传递给外部世界。
2. state
* 组件自身的状态
3. 组件生命周期 
*  componentWillReceiveProps(nextProps)
*  主要是父组件的render函数被调用,在render函数里面被渲染的子组件就会经历更新过程。

## Flux 和 Redux
  ### Flux
  * Flux是一个发布订阅模式,Flux维护数据,view中获取Flux中的数据展示,并且可改变Flux中的数据,`也可以在view中监听Flux中数据的变化,再次重新渲染视图`

### Redux
* Redux基本原则
1. 唯一数据源
2. 保持状态只读
3. 数据改变只能通过纯函数


* ActionType.js
* Actions.js 

```
export const increment = (counterCaption) =>{
  return {
    type:ActionTypes.INCREMENT
    counterCaption:counterCaption
  }
}

```
* Reducer.js

```
export default (state,action)=>{
  const { counterCaption } = action
  switch (action.type){
    case  ActionTypes.INCREMENT:
    return  {  ...  state,  [  counterCa pt ion)  :  state  [  counterCaption]  +  1};
    default:
       return state
  }
}

```
* Store.js

```
import  {createStore}  from  ’ redux ’ J
import  reducer  from  ’. / Reducer. ] S ’;
const  initValues  = {
’ Fir st ’: 0,
’ Second  ’: 10,
’ T hird  ’: 20
const  store=  createStore (reducer ,  initValues) ;
export  default  store ;


```

* View.js 发布订阅，监听变化更新视图


## React-Redux
* react-redux的两个最主要功能
  1. connect:连接容器组件和傻瓜组件
  2. Provider：提供包含 store的context

* export  default  connect(mapStateToProps,  mapDispatchToProps)(Counter)   ownProp
* export  default  connect(mapStateToProps,  mapDispatchToProps) 执行结果是一个函数 立刻执行参数是Counter这个傻瓜组件
* 把Store上的状态转化为内层傻瓜组件的prop  (mapStateToProps)
* 把内层傻瓜组件中用户状态转化为派送给Store的动作。 (mapDispatchToProps)

* react-redux 的 store  subscribe  dispatch  getState


* ActionType.js
* Action.js  返回对象中必有一个type字段代表 action 类型,还可能有其他字段代表整个动作承载的数据
* Reducer.js
* Store.js  // createStore  combineReducers


* 当一个包含ref属性的组件完成装载过程的时候,会看一看ref属性是不是一个函数,如果是,就会调用这个函数,参数就是这个组件代表的DOM元素。


* react-redux中connect的装饰器用法 @connect