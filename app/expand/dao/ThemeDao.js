/**
 * ThemeDao
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';
import ThemeFactory, {ThemeFlags} from '../../../res/styles/ThemeFactory'
// 定义常量
const THEME_KEY = 'theme_key';

export default class ThemeDao {
    /**
     * AsyncStorage异步存储
     * 如果现在有一个需求，是要把用户的账号密码保存到本地，如果在android中，
     * 会想到SharedPreferences,这是一个以键值对的形式进行存储的。
     * 那如果在react native中，
     * AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。这是官网上对它的介绍。可以知道，这个asyncstorage也是以键值对的形式进行存储数据的。
     * @returns {Promise}
     */
    getTheme() {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(THEME_KEY, (error, result)=> {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            })
        })
    }

    // setItem()方法体参数key、value、callback
    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error, result)=> {

        })
    }
}