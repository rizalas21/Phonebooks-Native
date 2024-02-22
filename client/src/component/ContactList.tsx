import {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadPage, loadPhonebooks} from '../actions/contact';
import ContactItem from './ContactItem';
import {err} from 'react-native-svg';

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

  const handleScroll = async () => {
    try {
      if (page < pages) {
        setIsLoading(true);
        const newPage = page + 1;
        dispatch(loadPage({page: newPage, keyword, sort}));
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('handle scroll error', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <View style={css.container}>
      <FlatList
        style={css.container}
        data={phonebooks}
        renderItem={({item}: {item: any}) => <ContactItem item={item} />}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
});
