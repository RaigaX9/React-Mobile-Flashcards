import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';


const notificationkey = 'Mobile_Flashcards:notifications';

export const performNotification = () => {
    return {
        title: 'Want to study? Do some flashcards!',
        body: "Create a deck and start learning!",
        android: {
            sound: true,
            priority: 'high',
            sticky: true,
            vibrate: true
        },
        ios: {
            sound: true,
            priority: 'high',
            sticky: true,
            vibrate: true
        }
    }
}

export const createLocNotification = () =>{
    AsyncStorage.getItem(notificationkey).then(JSON.parse).then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                        if (status === "granted"){
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let nextday = new Date();
                            nextday.setDate(nextday.getDate() + 1);
                            nextday.setHours(20);
                            nextday.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                performNotification(),
                                {
                                    time: nextday,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(notificationkey, JSON.stringify(true));
                        }
                    })
            }
        })
};

export const clearNotification = () => {
    return AsyncStorage.removeItem(notificationkey).then(Notifications.cancelAllScheduledNotificationsAsync)
};