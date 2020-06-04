import React from 'react';
import {
	Text,
	TouchableHighlight,
	View,
} from "react-native";

import styles from "../../Styles";

const Category = ({categories, category, setCategory}) => {

	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>Category</Text>
			<View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
				{
					categories.map((icon, index) => (
						<TouchableHighlight
							key={icon.id}
							onPress={() => setCategory(icon)}
							style={{flex: 1, minWidth: 50, maxWidth: 50, marginLeft: 10, marginRight: 10}}
						>
							<View style={[category.id === icon.id ? styles.grayIcon : styles.blackIcon, {display: "flex", justifyContent: "center", textAlign: "center"}]}>
								<Text style={{fontSize: 40, textAlign: "center"}}>{icon.emoji}</Text>
							</View>
						</TouchableHighlight>
					))
				}
			</View>
			<Text style={styles.headersText}>{category.name}</Text>
		</View>
	)
}

export default Category;
