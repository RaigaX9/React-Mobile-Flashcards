import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';

const Statusbar = () => {
    return (
        <View style={{ backgroundColor: '#000000', height: 25 }}>
            <StatusBar />
        </View>
    )
};
export default Statusbar;
