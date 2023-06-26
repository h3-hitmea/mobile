import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Box, Button, Checkbox, FormControl, HStack, Input, Stack, VStack } from 'native-base';
import { Link, useRouter } from 'expo-router';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remeberMe, setRemeberMe] = useState<boolean | string>(false);

	return (
		<Box
			mx='4'
			alignItems='center'
			h='full'
			justifyContent='center'
		>
			{/* <JAlert show={errorHandler.show} status={errorHandler.status} text={errorHandler.text} /> */}
			<HStack w='100%'>
				<FormControl
					display='flex'
					style={{ gap: 10 }}
				>
					<Stack>
						<FormControl.Label>Email</FormControl.Label>
						<Input
							type='text'
							defaultValue={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</Stack>
					<Stack>
						<FormControl.Label>Password</FormControl.Label>
						<Input
							type='password'
							defaultValue={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</Stack>
					<Link href='/auth'>Login</Link>
					<Stack mt='2'>
						<Button
							colorScheme='success'
							onPress={() => console.log('Sign up')}
						>
							Sign up
						</Button>
					</Stack>
				</FormControl>
			</HStack>
		</Box>
	);
};

const styles = StyleSheet.create({});

export default Signup;
