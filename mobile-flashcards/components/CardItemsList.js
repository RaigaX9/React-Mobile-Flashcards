import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listItem: {
        margin: 15,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const DeckListItem = ({ title, questions }) => {
    return (
        <View style={styles.listItem}>
            <Text style={{fontSize: 30}}>{title}</Text>
            {
                questions ? (<Text>{questions.length} Cards</Text>) : (<Text>0 Cards</Text>)
            }
        </View>
    )
};

export default DeckListItem;