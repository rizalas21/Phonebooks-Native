import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addPhonebooks} from '../actions/contact';

export default function ContactAdd() {
  const [user, setUser] = useState({name: '', phone: ''});
  const [error, setError] = useState('');
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const handleAdd = () => {
    if (user.name.length === 0 && user.phone.length === 0) {
      setError('Please Fill in the Section Below');
      return;
    }
    console.log('masuk dispatch');
    dispatch(addPhonebooks({contact: user}));
    navigation.navigate('Home');
  };
  return (
    <View style={css.containerAdd}>
      <View style={css.box}>
        <View style={css.input}>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
          <TextInput
            onChangeText={text => setUser({...user, name: text})}
            style={css.inputAdd}
            placeholder="Input Name Here"
          />
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
          <TextInput
            onChangeText={text => setUser({...user, phone: text})}
            style={css.inputAdd}
            placeholder="Input Phone Number Here"
          />
        </View>
        <View style={css.containerButton}>
          <TouchableOpacity style={css.button} onPress={() => handleAdd()}>
            <Text style={css.text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={css.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={css.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  containerAdd: {
    height: '100%',
    width: '100%',
    fontStyle: 'normal',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: 'white',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputAdd: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgb(175, 107, 24)',
    borderRadius: 4,
    width: '48%',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
});
