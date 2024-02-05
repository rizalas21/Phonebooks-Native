import {
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
import {confirmAlert} from 'react-confirm-alert';
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
    confirmAlert({
      title: 'CONFIRM TO DELETE',
      message: `Are you sure to delete this contact ${item.name}`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deletePhonebooks({id: item.id})),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleData = ({id}: {id: number}) => {
    dispatch(updateData(id, newData));
    setIsEdit(false);
  };

  if (isEdit) {
    return (
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
              onPress={() => handleData(item.id)}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={css.containerData} key={item.name}>
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
          <Text>{item.name}</Text>
          <Text>{item.phone}</Text>
          <View style={css.button}>
            <TouchableOpacity
              style={css.btnEdit}
              onPress={() => setIsEdit(!isEdit)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </TouchableOpacity>
            <TouchableOpacity
              style={css.btnDelete}
              onPress={() => submit(item)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  containerData: {},
  containerImage: {},
  avatar: {},
  list: {},
  input: {},
  button: {},
  btnEdit: {},
  btnDelete: {},
});
