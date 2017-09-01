/**
 * 欢迎页
 * @flow
 * **/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    Platform,
} from 'react-native'
import HomePage from './HomePage'
import ThemeDao from '../expand/dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component {


    // 组件将被加载前调用
    componentWillMount() {

    }

    // 渲染场景
    render() {
        return (
            <View style={styles.container}>
                {/*<Image style={{flex:1,width:null}} resizeMode='repeat' source={require('../../res/images/LaunchScreen.png')}/>*/}
            </View>
        );
    }

    // 组件已加载渲染完成
    componentDidMount() {
        const {navigator} = this.props;
        new ThemeDao().getTheme().then((data => {
            this.theme = data;
        }));
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({
                    component: HomePage,
                    name: 'HomePage',
                    params: {
                        theme: this.theme
                    }
                });
            });
        }, 500);
    }


    // 组件销毁
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});