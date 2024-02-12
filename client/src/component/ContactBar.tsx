import {
  faArrowDownZA,
  faArrowUpAZ,
  faMagnifyingGlass,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ContactBar({
  keyword,
  sort,
  setKeyword,
  setSort,
}: {
  keyword: string;
  sort: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigation: any = useNavigation();
  return (
    <KeyboardAvoidingView style={css.containerSearch}>
      <View style={css.icon}>
        {sort === 'asc' ? (
          <TouchableOpacity
            style={css.btnIcon}
            onPress={() => {
              setSort('desc');
            }}>
            <FontAwesomeIcon size={20} icon={faArrowUpAZ} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={css.btnIcon}
            onPress={() => {
              setSort('asc');
            }}>
            <FontAwesomeIcon size={20} icon={faArrowDownZA} />
          </TouchableOpacity>
        )}
      </View>
      <View style={css.inputContainer}>
        <TouchableOpacity disabled={true} style={css.buttonSearch}>
          <FontAwesomeIcon size={20} icon={faMagnifyingGlass} />
        </TouchableOpacity>
        <TextInput
          value={keyword}
          onChangeText={text => setKeyword(text)}
          style={css.inputField}
        />
      </View>
      <View style={css.icon}>
        <TouchableOpacity
          style={css.btnIcon}
          onPress={() => navigation.navigate('Add Contact')}>
          <FontAwesomeIcon size={20} icon={faUserPlus} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const css = StyleSheet.create({
  containerSearch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    padding: 5,
  },
  icon: {
    backgroundColor: 'rgb(175, 107, 24)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: '10%',
    paddingBottom: 5,
  },
  btnIcon: {
    backgroundColor: 'rgb(175, 107, 24)',
    padding: 5,
    paddingTop: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    height: '75%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    paddingLeft: 5,
  },
  inputField: {
    width: '90%',
    borderRadius: 3,
    marginLeft: '10%',
  },
  buttonSearch: {
    width: '10%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 3,
  },
});
