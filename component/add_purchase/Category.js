import React from 'react';
import nodeEmoji from 'node-emoji';
import {
	Text,
	TouchableHighlight,
	View,
} from "react-native";

import styles from "../../Styles";

const Category = ({icons, category, setCategory}) => {

	return (
		<View style={styles.sectionContainer}>
			<Text>Category</Text>
			<View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
				{
					icons.map((icon, index) => (
						<TouchableHighlight
							key={icon.id}
							onPress={() => setCategory(index)}
							style={{flex: 1, minWidth: 50, maxWidth: 50, marginLeft: 10, marginRight: 10}}
						>
							<View style={{display: "flex", justifyContent: "center", textAlign: "center", backgroundColor: category === index ? "lightblue" : "white"}}>
								<Text style={{fontSize: 40, textAlign: "center"}}>{nodeEmoji.get(icon.icon)}</Text>
							</View>
						</TouchableHighlight>
					))
				}
			</View>
		</View>
	)
}

export default Category;
