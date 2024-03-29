import React, {createContext, useCallback, useEffect, useReducer, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../Styles';
import axios from 'axios';
import hmacSha256 from 'crypto-js/hmac-sha256';
import {URL, url} from '../../common/URL';

const initialState = {
  isAuth: false,
  user: {},
  error: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_initial_data':
      return action.data;
    case 'auth_success':
      return {...state, isAuth: true, user: action.data};
    case 'auth_error':
      return {...state, isAuth: false, error: action.error};
    case 'get_user_success':
      return {...state, user: action.data}
    default:
      throw new Error();
  }
};

export const UserContext = createContext(null);

const Login = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getLoginData = async () => {
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    if (!loginDetails) return;

    const user = JSON.parse(loginDetails);

    getUserById(user.id);
    return {
      isAuth: true,
      user,
      error: undefined,
    }
  }

  useEffect(() => {
    async function login() {
      const loginData = await getLoginData();
      if (!!loginData) {
        dispatch({type: 'set_initial_data', data: loginData});
      }
    }

    login();
  }, [dispatch])

  const login = useCallback(() => {
    const user = {
      email: email.toLowerCase(),
      password: hmacSha256(password, '$!@#$%$#@').toString(),
    };
    axios.post(url(URL.LOGIN.login), JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(response => {
        AsyncStorage.setItem('loginDetails', JSON.stringify(response.data));
        dispatch({type: 'auth_success', data: response.data});
      })
      .catch(error => dispatch({type: 'auth_error', error}));
  }, [email, password]);

  const getUserById = useCallback((id) => {
    axios.get(url(URL.USER.getById(id)), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(response => {
        console.log(response.data);
        AsyncStorage.setItem('loginDetails', JSON.stringify(response.data));
        dispatch({type: 'get_user_success', data: response.data});
      })
  }, [email, password]);

  const onClear = () => {
    clear();
  };

  const clear = () => {
    setEmail('');
    setPassword('');
  };

  const onLogin = () => {
    login();
  };

  if (state.isAuth) {
    const user = state.user;
    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.headersText}>Email</Text>
      <TextInput
        style={styles.headersText}
        value={email}
        onChangeText={setEmail}
        placeholder="name@domain.com"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="done"
        autoCompleteType="email"
        autoCapitalize="none"
      />
      <Text style={styles.headersText}>Password</Text>
      <TextInput
        style={styles.headersText}
        value={password}
        onChangeText={setPassword}
        placeholder="8+ chars"
        placeholderTextColor="gray"
        returnKeyType="done"
        textContentType="password"
        autoCompleteType="password"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button onPress={onClear} title="Clear"/>
      <Button onPress={onLogin} title="Login"/>
    </View>
  );
};

export default Login;
