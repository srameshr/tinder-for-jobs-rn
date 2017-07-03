import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="favorite" size={30} color={tintColor} />;
      },
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          backgroundColor="rgba(0,0,0,0)"
          color="blue"
        />
      )
    }
  }

  renderLikedJobs() {
    return this.props.likedJobs.map(liked => {
      const { company, url, jobkey } = liked;
      return(
        <Card key={jobkey}>
          <View style={{height: 200}}>
            <View>
              <Text>{company}</Text>
            </View>
            <Button
              title="Apply Now"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      )
    })
  }

  render() {
    return(
      <ScrollView>
        { this.renderLikedJobs() }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
