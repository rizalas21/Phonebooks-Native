import {faCamera, faImage} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';

export default function Avatar({navigate, route}: {navigate: any; route: any}) {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const [file, setFile]: any = useState(null);
  const {id, avatar} = route.params;
  console.log(file);

  const handleAvatar: Function = useCallback(
    (type: string, options: any) => {
      if (type === 'camera') {
        launchCamera(options, data => {
          if (!data?.didCancel) {
            setFile(data);
            setIsShow(false);
          }
        });
      } else if (type === 'album') {
        launchImageLibrary(options, data => {
          if (!data?.didCancel) {
            setFile(data);
            setIsShow(false);
          }
        });
      }
    },
    [setIsShow, setFile],
  );
  const save = () => {
    const formData = new FormData();
    formData.append('avatar', {});
  };
  return (
    <View style={css.container}>
      <View style={css.formAvatar}>
        <View style={css.text}>
          <TouchableOpacity
            style={css.buttonExecuteCancel}
            onPress={() => navigation.navigate('Home')}>
            <Text style={css.p}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={css.buttonExecuteSave}>
            <Text style={css.p}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={css.containerContent}>
          <Text style={css.h2}>Updating Avatar</Text>
          <View style={css.containerPicture}>
            <Text style={css.h3}>Preview: </Text>
            {isShow ? (
              <Image
                source={{
                  uri: `http://192.168.100.167:3001/images/${
                    avatar ? avatar : 'Defaultavatar.png'
                  }`,
                }}
                style={css.avatar}
              />
            ) : (
              <Image
                source={{
                  uri: `http://192.168.100.167:3001/images/${
                    avatar ? avatar : 'Defaultavatar.png'
                  }`,
                }}
                style={css.avatar}
              />
            )}
          </View>
          <View style={css.buttonPicture}>
            <TouchableOpacity
              style={css.button}
              onPress={() =>
                handleAvatar('camera', {
                  mediaType: 'photo',
                  includeBase64: false,
                  saveToPhotos: true,
                  maxWidth: 100,
                  maxHeight: 100,
                })
              }>
              <FontAwesomeIcon icon={faCamera} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={css.button}
              onPress={() =>
                handleAvatar('album', {
                  mediaType: 'photo',
                  selectionLimit: 1,
                  includeBase64: false,
                  maxWidth: 100,
                  maxHeight: 100,
                })
              }>
              <FontAwesomeIcon icon={faImage} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
  },
  formAvatar: {
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
    height: 'auto',
    paddingVertical: 10,
  },
  containerContent: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3333',
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'rgb(175, 107, 24)',
    margin: 10,
  },
  buttonExecuteSave: {
    backgroundColor: '#198754',
    padding: 5,
    borderRadius: 5,
  },
  buttonExecuteCancel: {
    padding: 5,
    backgroundColor: '#b02a37',
    borderRadius: 5,
  },
  avatar: {
    maxHeight: 100,
    maxWidth: 100,
  },
  containerPicture: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  buttonPicture: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  h2: {
    fontSize: 25,
    color: 'black',
    fontWeight: '600',
  },
  h3: {
    fontSize: 15,
  },
  p: {
    color: 'white',
  },
});
