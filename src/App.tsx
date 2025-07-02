import React, {useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import GeneratePdfStack from './navigation/GeneratePdfStack';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <SafeArea edges={['top', 'bottom']}>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: {
                    height: 60,
                    position: 'relative',
                    zIndex: 9,
                  },
                  tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: 20,
                  },
                  tabBarActiveTintColor: '#007aff',
                  tabBarInactiveTintColor: 'gray',
                }}>
                <Tab.Screen
                  name="Cards"
                  component={HomeScreen}
                  options={{
                    tabBarIcon: () => null,
                  }}
                />
                <Tab.Screen
                  name="Generate PDF"
                  component={GeneratePdfStack}
                  options={{
                    tabBarIcon: () => null,
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeArea>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #c5c5c5;
`;


export default App;
