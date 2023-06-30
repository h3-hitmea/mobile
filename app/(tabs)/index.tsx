import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Box, Checkbox, Text } from 'native-base';
import { Link } from 'expo-router';
import Colors from '@constants/Colors';
import axios from 'axios';
import { API_URL } from '@env';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const MaterialHome = () => {
	let isAuth = false;
	const [materials, setMaterials] = useState<any[]>([]);
	const user = useSelector((state: any) => state.user.user);

	const loadData = async () => {
		try {
			let { data } = await axios.get(`${API_URL}/v1/material`);
			data = _.orderBy(data, ['name'], ['asc']);

			// if (!_.isEmpty(user.token)) {
			// 	let { data: userMaterails } = await axios.get(`${API_URL}/v1/user-material`, {
			// 		headers: {
			// 			Authorization: `Bearer ${user.token}`,
			// 		},
			// 	});

			// 	data = data.map((item: any) => {
			// 		if (userMaterails.length > 0) {
			// 			userMaterails.forEach((userMaterial: any) => {
			// 				console.log(item.id, userMaterial.materialId);
			// 				if (item.id === userMaterial.materialId) {
			// 					console.log(item.name);

			// 					item.isChecked = true;
			// 				} else {
			// 					item.isChecked = false;
			// 				}
			// 			});
			// 		}
			// 		return item;
			// 	});
			// }

			// console.log({ data });
			setMaterials(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadData();
	}, [user?.token]);

	const add = async (id: string) => {
		try {
			const req = await axios.post(
				`${API_URL}/v1/user-material/create`,
				{
					materialId: id,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const data = materials.map((item) => {
				if (item.id === id) {
					item.quantity = item.quantity - 1;
					item.isChecked = true;
				}
				return item;
			});
			// console.log(data);
			setMaterials(data);
		} catch (err) {
			console.error(err);
		}
	};

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
						<Text>
							{item.name}({item.quantity})
						</Text>

						{/* {!_.isEmpty(user?.token) ? (
							<Checkbox
								colorScheme='green'
								value={item.id}
								isChecked={item.isChecked}
								onChange={(e) => {
									if (e) {
										add(item.id);
									}
								}}
							>
								{item.name}({item.quantity})
							</Checkbox>
						) : (
							<Text>
								{item.name}({item.quantity})
							</Text>
						)} */}
					</Box>
				))}
		</Box>
	);
};

export default MaterialHome;
