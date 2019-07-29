import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput,AtButton  } from 'taro-ui'
import {createAlbum} from '../../service/api'
import './index.scss'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion


class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '创建相册'
  }
  constructor() {
    super(...arguments)
    this.state = {
      title: ''
    }
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillMount() {
  }
  componentWillUnmount() {

  }

  componentDidShow() { }

  componentDidHide() { }
  handleChange(value){
   this.setState({
     title:value
   })
  }
  async createAlbum(){
    if(!this.state.title){
      Taro.showToast({
        title: '请输入相册名称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    try{
      const {data,status} = await createAlbum(this.state.title)
      if(status === 0){
        this.go2Back()
      }
    }catch(e){
      console.log(e)
    }
  }
  go2Back(){
    Taro.navigateTo({url:'/pages/album/index'}) 
  }
  render() {
    return (
      <View className='create-album'>
        <AtInput
          name='value'
          title=''
          type='text'
          placeholder='请输入相册名称'
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
        />
        <AtButton type='primary' className='btn' onClick={this.createAlbum.bind(this)}>创建相册</AtButton>
        <AtButton type='secondary' className='btn' onClick={this.go2Back.bind(this)}>返回</AtButton>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<{}, {}>
