import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import counterReducer from './counterSlice';
import cartoonReducer from './cartoonSlice';
import imagesReducer from './imageSlice';
import orgDetailsSlice from './orgDetailsSlice'
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['images', 'orgDetails'],
};

const rootReducer = combineReducers({
  images: imagesReducer,
  counter: counterReducer,
  cartoons: cartoonReducer,
  orgDetails: orgDetailsSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;