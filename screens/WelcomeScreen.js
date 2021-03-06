import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import MapScreen from "./MapScreen";
import * as actions from "../actions";
import Slides from "../src/components/Slides";
import { connect } from "react-redux";
const SLIDE_DATA = [
	{ text: "First screen", color: "teal" },
	{ text: "Second screen", color: "indigo" }
];

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null
		};
	}
	async updateToken() {
		const token = await AsyncStorage.getItem("fb_token");
		if (token) {
			this.setState({ token });
		} else {
			this.setState({
				token: false
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		this.updateToken();
	}

	componentWillMount() {
    this.updateToken();
	}

	renderApp() {
    
		if (this.state.token === null) {
			return <AppLoading />;
		} else if (this.state.token === false) {
			return (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Slides
						data={SLIDE_DATA}
						onComplete={this.onSlidesComplete.bind(this)}
					/>
				</View>
			);
		} else {
			this.props.navigation.navigate("map");
			return null;
		}
	}

	onSlidesComplete() {
		this.props.navigation.navigate("auth");
	}

	render() {
		return this.renderApp();
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		token: auth.token
	};
};
export default connect(mapStateToProps, actions)(WelcomeScreen);
