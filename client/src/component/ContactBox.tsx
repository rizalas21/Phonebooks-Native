import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ContactBar from './ContactBar';
import ContactList from './ContactList';
import {useState} from 'react';

export default function ContactBox() {
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('asc');

  return (
    <SafeAreaView style={css.container}>
      <ContactBar
        keyword={keyword}
        sort={sort}
        setKeyword={setKeyword}
        setSort={setSort}
      />
      <ContactList keyword={keyword} sort={sort} />
    </SafeAreaView>
  );
}

const css = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: 'white'
  },
});
