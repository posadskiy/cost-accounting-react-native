import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

 export const SmallPhone = () => {
	return width <= 375;
}

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
		fontSize: SmallPhone() ? 14 : 20,
		fontWeight: "700",
	},
	generalText: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 11 : 16,
		fontWeight: "400",
		textAlign: "left",
	},
	categoryItem: {
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		flex: 1,
		minWidth: SmallPhone() ? 40 : 50,
		maxWidth: SmallPhone() ? 40 : 50,
		marginLeft: SmallPhone() ? 5 : 10,
		marginRight: SmallPhone() ? 5 : 10,
		marginTop: SmallPhone() ? 3 : 5,
		marginBottom: SmallPhone() ? 3 : 5,
	},
	categoryItemText: {
		fontSize: SmallPhone() ? 35 : 40,
		textAlign: "center",
	},
	sectionContainer: {
		color: Colors.lighter,
		marginTop: SmallPhone() ? 16 : 32,
		paddingHorizontal: 24,
	},
});

export default styles;
