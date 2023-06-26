import Colors from '@constants/Colors';
import { Link } from 'expo-router';
import { Box, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';

const Historic = () => {
	const [page, setPage] = useState<number>(0);
	const [numberOfItemsPerPageList] = useState([2, 3, 4]);
	const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

	const [items] = useState([
		{
			key: 1,
			name: 'Cupcake',
			calories: 356,
			fat: 16,
		},
		{
			key: 2,
			name: 'Eclair',
			calories: 262,
			fat: 16,
		},
		{
			key: 3,
			name: 'Frozen yogurt',
			calories: 159,
			fat: 6,
		},
		{
			key: 4,
			name: 'Gingerbread',
			calories: 305,
			fat: 3.7,
		},
	]);

	const from = page * itemsPerPage;
	const to = Math.min((page + 1) * itemsPerPage, items.length);

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	return (
		<Box
			mt='5'
			mx='4'
		>
			<Text
				fontSize='lg'
				fontWeight='bold'
				textAlign='center'
				mb='10'
			>
				Historic
			</Text>

			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Dessert</DataTable.Title>
					<DataTable.Title numeric>Calories</DataTable.Title>
					<DataTable.Title numeric>Fat</DataTable.Title>
				</DataTable.Header>

				{items.slice(from, to).map((item) => (
					<DataTable.Row key={item.key}>
						<DataTable.Cell>{item.name}</DataTable.Cell>
						<DataTable.Cell numeric>{item.calories}</DataTable.Cell>
						<DataTable.Cell numeric>{item.fat}</DataTable.Cell>
					</DataTable.Row>
				))}

				<DataTable.Pagination
					page={page}
					numberOfPages={Math.ceil(items.length / itemsPerPage)}
					onPageChange={(page) => setPage(page)}
					label={`${from + 1}-${to} of ${items.length}`}
					numberOfItemsPerPageList={numberOfItemsPerPageList}
					numberOfItemsPerPage={itemsPerPage}
					onItemsPerPageChange={onItemsPerPageChange}
					showFastPaginationControls
					selectPageDropdownLabel={'Rows per page'}
				/>
			</DataTable>

			<Link
				style={{
					color: Colors.primary,
				}}
				href='/material'
			>
				Tous les matériaux
			</Link>
		</Box>
	);
};

export default Historic;
