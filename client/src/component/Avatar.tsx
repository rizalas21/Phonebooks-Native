import {faCamera, faImage} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {useDispatch} from 'react-redux';

export default function Avatar() {
  const dispatch: any = useDispatch();
  const store: any = useRoute();
  const navigation: any = useNavigation();
  const info = store.params;
  const [isShow, setIsShow] = useState(true);
  const [file, setFile]: any = useState(null)

  const handleAvatar = ({type, options}: {type: string; options: any}) => {
    if(type === 'camera') {
      launchCamera(options, data => {
        if(!data?.didCancel) {
          setFile(data)
          setIsShow(false)
        }
      })
    } else if(type === 'album') {
      launchImageLibrary(options, data => {
        if(!data?.didCancel) {
          setFile(data)
          setIsShow(false)
        }
      })
    }
  };
  const save = () => {};
  return (
    <View style={css.container}>
      <View style={css.formAvatar}>
        <View style={css.text}>
          <Text style={css.h2}>Updating Avatar</Text>
        </View>
        <View style={css.containerContent}>
          {isShow ? (
            <Image
              source={{
                uri: `http://192.168.1.61:3001/images/${
                  info.avatar ? info.avatar : 'Defaultavatar.png'
                }`,
              }}
              style={css.avatar}
            />
          ) : (
            <Image
              source={{
                uri: `http://192.168.1.61:3001/images/${
                  info.avatar ? info.avatar : 'Defaultavatar.png'
                }`,
              }}
              style={css.avatar}
            />
          )}

          <View style={css.containerPicture}>
            <TouchableOpacity style={css.button}>
              <FontAwesomeIcon icon={faCamera} />
            </TouchableOpacity>
            <TouchableOpacity style={css.button}>
              <FontAwesomeIcon icon={faImage} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={css.buttonExecute}>
            <Text style={css.p}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={css.buttonExecute}>
            <Text style={css.p}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {},
  formAvatar: {},
  button: {},
  buttonExecute: {},
  avatar: {},
  takeImage: {},
  containerPicture: {},
  text: {},
  containerContent: {},
  h2: {},
  p: {},
});
