import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios'
import join from 'url-join'

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// absolute URL จะเป็นแบบเต็ม มี http://
//แทรกแซงตัว config โดยการเปลี่ยน config เดิมไปเป็น config ใหม่
axios.interceptors.request.use(async (config)=> {
    if (!isAbsoluteURLRegex.test(config.url)) {
        const jwtToken = await AsyncStorage.getItem("token")        
        if (jwtToken != null) {
            config.headers = { 'x-access-token': jwtToken }
        }
        config.url = join(global.MyURL+'/api/v1', config.url);
    }
    return config;
});

export const httpClient = axios
