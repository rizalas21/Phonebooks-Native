import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {deletePhonebooks, updateData} from '../actions/contact';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export default function ContactItem({item}: {item: any}) {
  const [isEdit, setIsEdit] = useState(false);
  const [newData, setNewData] = useState({name: item.name, phone: item.phone});
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const submit = ({item}: {item: any}) => {
    Alert.alert(
      'Delete Contact',
      `Are you sure to delete this contact ${item.name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => navigation.navigate('Home'),
        },
        {text: 'OK', onPress: () => dispatch(deletePhonebooks({id: item.id}))},
      ],
    );
  };

  const handleData = ({id}: {id: number}) => {
    dispatch(updateData(id, newData));
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <View style={css.containerContent}>
        <View style={css.containerData}>
          <TouchableOpacity
            style={css.containerImage}
            onPress={() => navigation.navigate('Avatar')}>
            <Image
              source={{
                uri: `http://192.168.100.167:3001/images/${
                  item.avatar ? item.avatar : 'Defaultavatar.png'
                }`,
              }}
              style={css.avatar}
            />
          </TouchableOpacity>
          <View style={css.list}>
            <TextInput
              style={css.input}
              value={newData.name}
              onChangeText={text => setNewData({...newData, name: text})}
            />
            <TextInput
              style={css.input}
              value={newData.phone}
              onChangeText={text => setNewData({...newData, phone: text})}
            />
            <View style={css.button}>
              <TouchableOpacity
                style={css.btnEdit}
                onPress={() => handleData({id: item.id})}>
                <FontAwesomeIcon size={20} icon={faFloppyDisk} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={css.containerContent}>
        <View style={css.containerData} key={item.name}>
          <TouchableOpacity
            style={css.containerImage}
            onPress={() =>
              navigation.navigate('Avatar', {id: item.id, avatar: item.avatar})
            }>
            <Image
              source={{
                uri: `http://192.168.100.167:3001/images/${
                  item.avatar ? item.avatar : 'Defaultavatar.png'
                }`,
              }}
              style={css.avatar}
            />
          </TouchableOpacity>
          <View style={css.list}>
            <Text style={css.text}>{item.name}</Text>
            <Text style={css.text}>{item.phone}</Text>
            <View style={css.button}>
              <TouchableOpacity
                style={css.btnEdit}
                onPress={() => setIsEdit(!isEdit)}>
                <FontAwesomeIcon size={20} icon={faPenToSquare} />
              </TouchableOpacity>
              <TouchableOpacity
                style={css.btnDelete}
                onPress={() => submit({item})}>
                <FontAwesomeIcon size={20} icon={faTrashCan} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  containerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerData: {
    backgroundColor: '#3333',
    width: '90%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  containerImage: {
    width: '30%',
    height: '100%',
  },
  avatar: {
    height: 110,
    width: 100,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'fill',
  },
  list: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '170%',
    height: 40,
    marginBottom: 10,
  },
  button: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnEdit: {},
  btnDelete: {},
  text: {
    marginBottom: 7,
  },
});
