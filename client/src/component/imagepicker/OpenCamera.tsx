import {PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

export default function OpenCamera({
  setIsShow,
  setFile,
}: {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: any;
}) {
  const OpenCamera = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, res => {
      if (res.didCancel) {
        console.log('user canceled image picker');
      } else if (res.errorCode) {
        console.log('error image picker', res.errorMessage);
      } else {
        const data = res.assets;
        console.log('ini response', res);
        setIsShow(false);
        setFile(data);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        OpenCamera();
      } else {
        console.log('Camera permission denied', granted);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestCameraPermission();
}
