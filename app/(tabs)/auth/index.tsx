import { Box, Button, Checkbox, FormControl, HStack, Input, Stack, VStack } from 'native-base';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	useWindowDimensions,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { API_URL } from '@env';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '@features/counter/authSlice';
const Signup = () => {
	const router = useRouter();
	const { width } = useWindowDimensions();
	const height = Math.round((width * 4) / 3);
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [displayCamera, setDisplayCamera] = useState(false);

	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();
	const [savedPhoto, setSavedPhoto] = useState<string>('');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		(async () => {
			const cameraPermission = (await Camera.requestCameraPermissionsAsync()) as any;
			setHasCameraPermission(cameraPermission.status === 'granted');
		})();
	}, []);

	if (hasCameraPermission === undefined) {
		return <Text>Requesting permissions...</Text>;
	} else if (!hasCameraPermission) {
		return <Text>Permission for camera not granted. Please change this in settings.</Text>;
	}

	let takePic = async () => {
		let options = {
			quality: 1,
			base64: true,
			exif: false,
		};

		let newPhoto = await cameraRef.current.takePictureAsync(options);
		setPhoto(newPhoto);
	};

	const login = async () => {
		try {
			const formData = new FormData();

			console.log(savedPhoto.uri);
			const photoFormData = {
				uri: savedPhoto.uri,
				type: 'image/jpeg',
				name: 'photo.jpg',
			};
			formData.append('email', email);
			formData.append('photo', photoFormData);
			formData.append('authFromTelephone', 'true');

			const request = await axios.post(`${API_URL}/v1/auth/login`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setIsFormSubmitted(true);
			setIsAuthenticated(true);

			console.log(request.data.token);
			const user = jwt_decode(request.data.token);
			dispatch(setUser(user));
			console.log(user);
			router.push('/');
		} catch (e) {
			setIsAuthenticated(false);
			console.error(e);
		}
	};

	if (photo) {
		// let sharePic = () => {
		// 	shareAsync(photo.uri).then(() => {
		// 		setPhoto(undefined);
		// 	});
		// };
		const discardHandler = () => {
			setPhoto(undefined);
			setDisplayCamera(false);
		};

		const savecHandler = () => {
			setPhoto(undefined);
			setSavedPhoto(photo);
			setDisplayCamera(false);
		};

		return (
			<SafeAreaView style={styles.previewContainer}>
				<Image
					style={styles.preview}
					source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
				/>

				<Button onPress={() => discardHandler()}>Annuler</Button>
				<Button onPress={() => savecHandler()}>Garder</Button>
			</SafeAreaView>
		);
	}

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
					{isFormSubmitted && (
						<Stack>
							{isAuthenticated ? (
								<Text style={{ color: 'green' }}>Authentifié</Text>
							) : (
								<Text style={{ color: 'red' }}>
									CONCURRENCY_LIMIT_EXCEEDED
								</Text>
							)}
						</Stack>
					)}

					<Stack>
						<FormControl.Label>Email</FormControl.Label>
						<Input
							type='text'
							defaultValue={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</Stack>
					<Stack>
						{!displayCamera && (
							<Button
								onPress={() => setDisplayCamera(true)}
								disabled={!email.length}
							>
								Ouvrir le camera
							</Button>
						)}

						{displayCamera && (
							<Camera
								ratio='4:3'
								style={{
									...styles.cameraContainer,
									height: height,
									width: '100%',
								}}
								ref={cameraRef}
								type={Camera.Constants.Type.front}
							>
								<View style={styles.buttonContainer}>
									<Button onPress={takePic}>Prendre une photo</Button>
								</View>
								<StatusBar style='auto' />
							</Camera>
						)}
					</Stack>
					<Link href='/auth/signup'>Créer un compte</Link>
					<Stack mt='2'>
						<Button
							colorScheme='success'
							onPress={() => login()}
							disabled={!email.length && !savedPhoto}
						>
							Se connecter
						</Button>
					</Stack>
				</FormControl>
			</HStack>
		</Box>
	);
};

const styles = StyleSheet.create({
	previewContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cameraContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		backgroundColor: '#fff',
		alignSelf: 'flex-end',
	},
	preview: {
		alignSelf: 'stretch',
		flex: 1,
	},
});

export default Signup;
