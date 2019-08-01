import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import {bindCodeWithSessionKey } from '../../service/api'
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
    navigationBarTitleText: '简易云相册'
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
     this.getAuthorize()
  }

  componentDidShow() { }

  componentDidHide() { }
  async scanCode() {
    try {
      const { errMsg, result } = await Taro.scanCode({})
      if (errMsg === 'scanCode:ok') {
        console.log('result-scanCode:', result)
        await bindCodeWithSessionKey(result)
      }
    } catch (e) {
      console.log('scanCode-e:', e)
    }

  }
  async getUserInfo(e) {
    console.log(e)
    try {
      const result = await Taro.getUserInfo()
      console.log('result:', result)
    } catch (e) {
      console.log('getUserInfo:', e)
    }
  }
  async getAuthorize() {
    try {
      const result = Taro.authorize({ scope: 'scope.record' })
      console.log('result:', result)
    } catch (e) {
      console.log(e)
    }
  }
  goAlbumList(){
    Taro.navigateTo({url:'/pages/album/index'})
  }
  render() {
    return (
      <View className='home'>
        <View className='title'>欢迎使用,云相册</View>
        {/* <Button type='onGetUserInfo' onClick={this.getUserInfo}>请授权获取用户头像</Button> */}
        <AtButton type='primary' className='scan-code' onClick={this.scanCode.bind(this)}>扫码登录后台管理系统</AtButton>
        <View className='at-row bottom'>
          <View className='at-col icon'>
            <View className='at-icon at-icon-home'></View>
            <View>我的</View>
          </View>
          <View className='at-col icon' onClick={this.goAlbumList.bind(this)}>
            <View className='at-icon at-icon-image'></View>
            <View>相册</View>
          </View>
        </View>
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
