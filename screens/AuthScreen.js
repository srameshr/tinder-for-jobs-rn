import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button } from "react-native-elements";
class AuthScreen extends Component {
	componentDidMount() {
		this.props.facebookLogin();
		this.onAuthComplete(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if (props.token) {
			this.props.navigation.navigate("map");
		}
	}

	loginAgain() {
		this.props.facebookLogin();
	}

	backHome() {
		this.props.navigation.navigate("welcome");
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<View style = {{flexDirection: 'column', height : 200, justifyContent: "space-between"}}>
					<Button
						raised
						title="Login !!"
						onPress={this.loginAgain.bind(this)}
					/>
					<Button
						raised
						title="Back to Home"
						onPress={this.backHome.bind(this)}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		token: auth.token
	};
};

export default connect(mapStateToProps, actions)(AuthScreen);
