import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Box, Checkbox, Text } from 'native-base';
import { Link } from 'expo-router';
import Colors from '@constants/Colors';

const MaterialHome = () => {
	const fakeData = [
		{ id: 1, name: 'Finish list Screen', isChecked: false },
		{ id: 2, name: 'Buy milk', isChecked: true },
		{ id: 3, name: 'Go to store', isChecked: true },
	];
	const [data, setData] = useState<any[]>(fakeData);

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

			{fakeData.map((item) => (
				<Box key={item.id}>
					<Checkbox
						isChecked={item.isChecked}
						colorScheme='green'
						value='1'
					>
						{item.name}
					</Checkbox>
				</Box>
			))}

			<Link
				style={{
					color: Colors.primary,
					marginTop: 12,
				}}
				href='/home/historic'
			>
				Mes products
			</Link>
		</Box>
	);
};

export default MaterialHome;
