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
	buttonTextCenter: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 11 : 16,
		fontWeight: "700",
		textAlign: "center",
    alignItems: "center",
	},
	smallText: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 8 : 13,
		fontWeight: "400",
		textAlign: "left",
	},
  generalTextRight: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 11 : 16,
		fontWeight: "400",
		textAlign: "right",
	},  
  purchaseTextRight: {
    color: "lightcoral",
		fontSize: SmallPhone() ? 11 : 16,
		fontWeight: "400",
		textAlign: "right",
	},  
  incomeTextRight: {
    color: "greenyellow",
		fontSize: SmallPhone() ? 11 : 16,
		fontWeight: "400",
		textAlign: "right",
	},
  eventDate: {
    color: Colors.lighter,
    fontSize: SmallPhone() ? 17 : 22,
    fontWeight: "300",
    fontFamily: 'OpenSans',
    textAlign: "left",
  },
	eventName: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 19 : 26,
		textAlign: "left",
    fontFamily: 'OpenSans',
    fontWeight: 'bold'
	},
	eventNameYellow: {
		color: "yellow",
		fontSize: SmallPhone() ? 17 : 23,
		textAlign: "left",
    fontFamily: 'OpenSans',
    fontWeight: 'bold'
	},
	eventCategory: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 13 : 18,
		fontWeight: "400",
		textAlign: "left",
	},
	eventEmoji: {
		color: Colors.lighter,
		fontSize: SmallPhone() ? 16 : 28,
		fontWeight: "900",
		textAlign: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
	},
	categoryItem: {
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
		flex: 1,
		minWidth: SmallPhone() ? 40 : 50,
		maxWidth: SmallPhone() ? 40 : 50,
		marginLeft: SmallPhone() ? 5 : 10,
		marginRight: SmallPhone() ? 5 : 10,
		marginTop: SmallPhone() ? 5 : 10,
		marginBottom: SmallPhone() ? 5 : 10,
	},
	categoryItemText: {
	  color: "white",
		fontSize: SmallPhone() ? 35 : 40,
		textAlign: "center",
	},
	sectionContainer: {
		color: Colors.lighter,
    marginTop: 10,
    marginBottom: 10,
	},
	statisticsContainer: {
		color: Colors.lighter,
    margin: 10,
	},
  sectionContainerRow: {
    color: Colors.lighter,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    height: SmallPhone() ? 25 : 40,
  },
  touchableSaveButton: {
	  backgroundColor: "#3333dd"
  }
});

export default styles;
