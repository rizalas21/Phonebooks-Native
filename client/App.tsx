import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './store';
import ContactBox from './src/component/ContactBox';
import Avatar from './src/component/Avatar';
import ContactAdd from './src/component/ContactAdd';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ContactBox} />
          <Stack.Screen name="Avatar" component={Avatar} />
          <Stack.Screen name="Add Contact" component={ContactAdd} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
