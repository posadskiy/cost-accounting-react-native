import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.black,
	},
	body: {
		backgroundColor: Colors.black,
	},
	backIcon: {
		backgroundColor: Colors.black,
	},
	grayIcon: {
		backgroundColor: Colors.dark
	},
	headersText: {
		color: Colors.lighter,
		fontSize: 20,
		fontWeight: "700",
	},
	sectionContainer: {
		color: Colors.lighter,
		marginTop: 32,
		paddingHorizontal: 24,
	},
});

export default styles;
