import {launchImageLibrary} from 'react-native-image-picker';

export default function openLibrary({
  setIsShow,
  setFile,
}: {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: any;
}) {
  launchImageLibrary({mediaType: 'photo'}, res => {
    if (res.didCancel) {
      console.log('user canceled image picker');
    } else if (res.errorCode) {
      console.log('error image picker', res.errorMessage);
    } else {
      const data = res.assets;
      setIsShow(false);
      setFile(data);
    }
  });
}
