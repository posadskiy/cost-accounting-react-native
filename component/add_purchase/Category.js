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
						>
							<View style={[isCurrentCategory(category.id) ? styles.grayIcon : styles.blackIcon, styles.categoryItem]}>
								<Text style={styles.categoryItemText}>{category.emoji}</Text>
							</View>
						</TouchableHighlight>
					))
				}
			</View>
		</View>
	)
}

export default Category;
