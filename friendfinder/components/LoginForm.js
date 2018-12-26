import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Alert} from 'react-native'
import {RkTextInput, RkButton} from 'react-native-ui-kitten';
import Fetch from 'react-native-fetch'

import {login} from '../facade';

export default class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:''
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const { username, password } = this.state;

        Alert.alert('Credentials', `${username} + ${password}`);

        const friends = login(username, password, 12.11, 53.40, 400);
            console.log(friends)

        // (async () => {
        //     const rawResponse = await fetch('https://polar-hollows-16046.herokuapp.com/api/auth/login', {
        //       method: 'POST',
        //       headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify({username: username, password: password, longitude:12.11, latitude:53.4, distance:400})
        //     });
        //     const content = await rawResponse.json();
          
        //     console.log(content);
        //   })();
          
    }

    componentDidMount() {
        fetch('https://polar-hollows-16046.herokuapp.com/api/users').then( (res) => res.json() ).then( (resJson) => {
            console.log(resJson)
        } )
    }

  render() {
      console.log(this.state.username)
    return (
      <View style={styles.container}>
      <RkTextInput value={this.state.username} onChangeText={username => this.setState({username})} placeholder='Username'/>

      <RkTextInput secureTextEntry={true} value={this.state.password} onChangeText={password => this.setState({password})} placeholder='Password'/>
      <View style={styles.buttonContainer}>
      <Button onPress={this.handleLogin} style={styles.buttonText} title='Login' />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    input:{
        height:40,
        backgroundColor:'#ecf0f1',
        marginBottom:20,
        color:'#FFF',
        paddingHorizontal:10
    },
    buttonContainer:{
        paddingVertical:15,
        marginBottom:100
    },
    buttonText: {
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700',
        paddingBottom:10,
        width:100+'%'
    }
})
