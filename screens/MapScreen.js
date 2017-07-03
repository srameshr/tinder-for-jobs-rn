import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

const styles = StyleSheet.create({
  searchButtonStyle: {
    position: 'absolute',
    backgroundColor: 'green',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

class MapScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Map',
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="room" size={30} color={tintColor} />;
      },
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
    };
  }

  getInitialState() {
    return {
      mapLoaded: false,
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentDidMount() {
    this.setState({
      mapLoaded: true,
    });
  }

  fetchJobs() {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    const { searchButtonStyle } = styles;

    if (!this.state.mapLoaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{flex:1}}>
        <MapView style={{flex:1}}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        />
        <View>
          <Button
            title="Search Jobs Here"
            large
            style={searchButtonStyle}
            onPress={this.fetchJobs.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, actions)(MapScreen);
