import React from 'react';
import {
	Text,
	TouchableHighlight,
	View,
} from "react-native";

import styles from "../../Styles";

const Category = ({categories, category, setCategory}) => {
	
	const isCurrentCategory = (categoryId) => {
		return category.id === categoryId;
	}

	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>Category is {!!category ? category.name : "not selected"}</Text>
			<View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
				{
					categories.map((category) => (
						<TouchableHighlight
							key={category.id}
							onPress={() => setCategory(category)}
							style={{flex: 1, minWidth: 50, maxWidth: 50, marginLeft: 10, marginRight: 10}}
						>
							<View style={[isCurrentCategory(category.id) ? styles.grayIcon : styles.blackIcon, {display: "flex", justifyContent: "center", textAlign: "center"}]}>
								<Text style={{fontSize: 40, textAlign: "center"}}>{category.emoji}</Text>
							</View>
						</TouchableHighlight>
					))
				}
			</View>
		</View>
	)
}

export default Category;
