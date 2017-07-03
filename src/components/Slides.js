import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  slideStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideTextStyle: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
});

class Slides extends Component {

  renderCompletionButton(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          raised
          title="DONE"
          onPress={this.props.onComplete}
        />
      );
    }
    return null;
  }
  renderSlides() {
    const { slideStyle, slideTextStyle } = styles;
    return this.props.data.map((slide, index) => {
      return (
        <View key={slide.text} style={[slideStyle, { backgroundColor: slide.color }]} >
          <Text style={slideTextStyle}>{slide.text}</Text>
          { this.renderCompletionButton(index) }
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex:1 }}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
      >
        { this.renderSlides() }
      </ScrollView>
    );
  }
}

export default Slides;
