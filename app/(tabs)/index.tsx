import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Box, Checkbox, Text } from 'native-base';
import { Link } from 'expo-router';
import Colors from '@constants/Colors';
import axios from 'axios';
import { API_URL } from '@env';

const MaterialHome = () => {
	let isAuth = false;
	const [materials, setMaterials] = useState<any[]>([]);

	useEffect(() => {
		console.log({ API_URL });
		axios
			.get(`${API_URL}/v1/material`)
			.then(({ data }) => {
				console.log(data);
				setMaterials(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Box
			mx='4'
			mt='5'
		>
			<Text
				fontSize='lg'
				fontWeight='bold'
				textAlign='center'
				mb='10'
			>
				Material Home
			</Text>

			{materials.length > 0 &&
				materials.map((item) => (
					<Box key={item.id}>
						<Checkbox
							isChecked={item.isChecked}
							colorScheme='green'
							value={item.id}
						>
							{item.name}({item.quantity})
						</Checkbox>
					</Box>
				))}
		</Box>
	);
};

export default MaterialHome;
