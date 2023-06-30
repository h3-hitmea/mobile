import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Link, Tabs, usePathname } from 'expo-router';
import { stackOptions } from '@config/default';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ICONS_ANT_DESIGN, ICONS_FONT_AWESOME, IONICONS } from '@constants/Icons';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useEffect, useState } from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return (
		<FontAwesome
			size={28}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const user = useSelector((state: any) => state.user.user);

	return (
		<Tabs>
			<Tabs.Screen
				name='index'
				options={{
					...stackOptions,
					// href: _.isEmpty(user.id) ? '/auth' : null,
					title: 'Accueil',
					tabBarIcon: ({ color }) => (
						<AntDesign
							name={ICONS_ANT_DESIGN.HOME}
							size={20}
							color={color}
						/>
					),
				}}
			/>

			{_.isEmpty(user) ? (
				<Tabs.Screen
					name='auth'
					options={{
						...stackOptions,
						title: 'Se connecter',
						tabBarIcon: ({ color }) => (
							<AntDesign
								name={ICONS_ANT_DESIGN.USER}
								size={22}
								color={color}
							/>
						),
					}}
				/>
			) : (
				<Tabs.Screen
					name='auth'
					options={{
						...stackOptions,
						href: null,
						title: 'Se connecter',
						tabBarIcon: ({ color }) => (
							<AntDesign
								name={ICONS_ANT_DESIGN.USER}
								size={22}
								color={color}
							/>
						),
					}}
				/>
			)}
		</Tabs>
	);
}
