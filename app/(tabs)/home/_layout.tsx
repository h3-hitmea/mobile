import { Redirect, Stack, useRouter } from 'expo-router';

import { stackOptions } from '@config/default';
import _ from 'lodash';

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ ...stackOptions }}
			/>
			<Stack.Screen
				name='historic'
				options={{ ...stackOptions }}
			/>
		</Stack>
	);
}
