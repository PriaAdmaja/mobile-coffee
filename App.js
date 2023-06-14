import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { useEffect } from "react"
import store, { persistor } from './src/redux/store';
import messaging from '@react-native-firebase/messaging'
import notifee, {AndroidImportance} from '@notifee/react-native'

import Router from './router';

const App = () => {

  const onSendNotification = async (title, body) => {
    try {
      await notifee.requestPermission()
      await notifee.createChannel({
        id: 'urgent',
        name: 'high_priority',
        sound: 'default',
        importance: AndroidImportance.HIGH
      })
      await notifee.displayNotification({
        android: {
          channelId: 'urgent',
        },
        title,
        body
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const onMessageReceived = async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      onSendNotification(title, body)
    };
    messaging().onMessage(onMessageReceived)
    messaging().setBackgroundMessageHandler(onMessageReceived)
  }, [])
  
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    
  )
};

export default App;