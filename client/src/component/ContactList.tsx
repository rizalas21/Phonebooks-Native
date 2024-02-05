import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadPhonebooks} from '../actions/contact';
import ContactItem from './ContactItem';

export default function ContactList({
  keyword,
  sort,
}: {
  keyword: string;
  sort: string;
}) {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {phonebooks, page, pages} = useSelector((state: any) => state.contact);

  useEffect(() => {
    const readData = async () => {
      try {
        dispatch(loadPhonebooks({keyword, sort}));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    readData();
  }, [dispatch, keyword, sort]);
  console.log(phonebooks)

  return (
    <View style={css.container}>
      <FlatList
        data={phonebooks}
        renderItem={({item}: {item: any}) => <ContactItem item={item} />}
      />
    </View>
  );
}

const css = StyleSheet.create({
  container: {},
});
