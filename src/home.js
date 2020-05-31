import * as React from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import {images} from './img';
import * as axios from 'axios';
const DEVICE_WIDTH = Dimensions.get('window').width;

export class Home extends React.Component {
  state = {
    indonesia: null,
    global: null,
  };

  async componentWillMount() {
    try {
      const http = axios.default;
      const responseIndonesia = await http.get(
        'http://localhost:2020/indonesia',
      );
      const indonesia = responseIndonesia.data;
      const responseGlobal = await http.get('http://localhost:2020/global');
      const global = responseGlobal.data;
      this.setState({indonesia, global});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <Image
          source={images.bg}
          style={{width: '100%', height: 300, resizeMode: 'stretch'}}
        />
        <View style={{position: 'absolute', zIndex: 2}}>
          <View style={{padding: 40}}>
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 30}}>
              COVID-19
            </Text>
            <Text style={{color: '#FFF', fontSize: 18}}>
              Information Center
            </Text>
          </View>
          {this.state.indonesia && (
            <DataCard title={'Indonesia'} data={this.state.indonesia} />
          )}
          {this.state.global && (
            <DataCard title={'Global'} data={this.state.global} />
          )}
        </View>
      </View>
    );
  }
}

const DataCard = props => {
  return (
    <View
      style={{
        marginTop: 40,
        width: DEVICE_WIDTH,
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#FFF',
          height: 140,
          width: (90 / 100) * DEVICE_WIDTH,
          borderRadius: 10,
          padding: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#575757',
              }}>
              {props.title}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{color: '#9C9C9C'}}> Last Update</Text>
            <Text style={{color: '#9C9C9C'}}> {props.data.lastUpdate}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#CBA800',
              }}>
              {props.data.positive || props.data.country}
            </Text>
            <Text style={{color: '#9C9C9C'}}>
              {props.data.positive ? 'Positive' : 'Country'}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              borderColor: '#9C9C9C',
              borderLeftWidth: 1,
              borderRightWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#00B02B',
              }}>
              {props.data.recovered || props.data.confirmed}
            </Text>
            <Text style={{color: '#9C9C9C'}}>
              {props.data.recovered ? `Recovered` : `Confirmed`}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#BE0303',
              }}>
              {props.data.death}
            </Text>
            <Text style={{color: '#9C9C9C'}}>Death</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
