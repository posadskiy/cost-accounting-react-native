import React from 'react';
import {
	Text,
	TouchableHighlight,
	View,
} from "react-native";

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import styles, {SmallPhone} from "../../Styles";

const Category = ({categories, category, setCategory}) => {
	
	const isCurrentCategory = (categoryId) => {
		return category.id === categoryId;
	}

	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>{!!category ? category.name : "Not selected"}</Text>
			<View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
				{
					categories.map((category) => (
						<TouchableHighlight
							key={category.id}
							onPress={() => setCategory(category)}
              underlayColor="#333333"
						>
							<View style={styles.categoryItem}>
                <FontAwesome5 style={{alignSelf: "center"}} name={category.emoji} size={SmallPhone() ? 28 : 35} color={isCurrentCategory(category.id) ? "yellow" : "white"} />
							</View>
						</TouchableHighlight>
					))
				}
			</View>
		</View>
	)
}

export default Category;
