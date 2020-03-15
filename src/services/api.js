import axios from 'axios';

//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL:'http://192.168.0.49:8000/api/',
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('@AShowMoura:token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    } catch (err) {
        alert(err);
    }
});

export default api;
//http://10.0.3.2:8000/api/ ---- Funcionando
//https://ashowmoura.ifce.edu.br/api/



