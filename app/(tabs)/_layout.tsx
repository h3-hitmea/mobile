import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Link, Tabs, usePathname } from 'expo-router';
import { stackOptions } from '@config/default';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ICONS_ANT_DESIGN, ICONS_FONT_AWESOME, IONICONS } from '@constants/Icons';

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

	return (
		<Tabs>
			<Tabs.Screen
				name='home'
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

			<Tabs.Screen
				name='auth'
				options={{
					...stackOptions,
					// href: _.isEmpty(user.id) ? '/auth' : null,
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
		</Tabs>
	);
}
