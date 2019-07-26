import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'
import { getAlbumList,upladPhoto  } from '../../service/api.ts'
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
    navigationBarTitleText: '相册列表'
  }
  constructor() {
    super(...arguments)
    this.state = {
      albumList: [],
      files: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillMount() {
    console.log('getAlbumList')
    this.getAlbumList()
  }
  componentWillUnmount() {

  }

  componentDidShow() { }

  componentDidHide() { }
  async getAlbumList() {
    try {
      const { data, status } = await getAlbumList()
      console.log(data, status)
      if (status === 0) {
        this.setState(
          {
            albumList: data || []
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
  onChange(files) {
    console.log('files:', files)
    this.uploadImage(files)

  }
  async uploadImage(files, name) {
    try {
      const { data, status } = await upladPhoto(files, 'photo')
      if (status === 0) {
        this.setState({
          files
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    return (
      <View className='album'>
        {!this.state.albumList.length && <AtImagePicker
          files={this.state.files}
          onChange={this.onChange.bind(this)}
        />}
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
