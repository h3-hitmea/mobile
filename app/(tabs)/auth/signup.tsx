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

const Signup = () => {
	const { width } = useWindowDimensions();
	const height = Math.round((width * 4) / 3);

	const [email, setEmail] = useState('');
	const [remeberMe, setRemeberMe] = useState<boolean | string>(false);
	const [displayCamera, setDisplayCamera] = useState(false);

	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();
	const [savedPhoto, setSavedPhoto] = useState<string>('');

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
		console.log(Object.keys(newPhoto));
		setPhoto(newPhoto);
	};

	const createAccount = async () => {
		try {
			// const request = await Auth.signup(
			// 	email,
			// 	'data:image/jpg;base64,' + savedPhoto.base64
			// );
			// console.log(request);
			// RNFetchBlob.fetch(
			// 	'POST',
			// 	'http://www.example.com/upload-form',
			// 	{
			// 		Authorization: 'Bearer access-token',
			// 		otherHeader: 'foo',
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// 	[
			// 		// element with property `filename` will be transformed into `file` in form data
			// 		{
			// 			name: 'photo',
			// 			filename: 'avatar.png',
			// 			data: 'data:image/jpg;base64,' + savedPhoto.base64,
			// 		},
			// 		{
			// 			name: 'data',
			// 			data: JSON.stringify({
			// 				email,
			// 			}),
			// 		},
			// 	]
			// )
			// 	.then((resp) => {
			// 		// ...
			// 	})
			// 	.catch((err) => {
			// 		// ...
			// 	});
		} catch (e) {
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
					<Link href='/auth'>Se connecter</Link>
					<Stack mt='2'>
						<Button
							colorScheme='success'
							onPress={() => createAccount()}
						>
							Créer un compte
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
