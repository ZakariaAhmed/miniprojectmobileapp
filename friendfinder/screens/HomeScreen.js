import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
//import MapView, { Marker } from 'react-native-maps';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle:{
            backgroundColor:"#7fffd4"
        },
        headerTintColor: 'black',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
      };

    state = {
        location: null,
        errorMessage: null,
        flex:0,
        address:null
        };

        componentWillMount() {
            if (Platform.OS === 'android' && !Constants.isDevice) {
              this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
              });
            } else {
              this._getLocationAsync();
            }
          }

        _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            errorMessage: 'Permission to access location was denied',
            });
        }
    
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        location = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        let address = await Location.reverseGeocodeAsync(location);
        address = { postalCode: address[0].postalCode, city: address[0].city, street: address[0].street, name: address[0].name };
        console.log(address);
        this.setState({ location:location, address:address });
        };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View> 
          <Text> {text}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
  });