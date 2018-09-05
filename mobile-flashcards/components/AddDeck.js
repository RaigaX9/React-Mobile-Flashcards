import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, StyleSheet
} from 'react-native';
import { storeDeck, getDecks } from '../index';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 300,
        height: 50,
        borderColor: '#000000',
        fontSize: 25,
        overflow: 'visible'
    },
    btn: {
        width: 200,
        backgroundColor: '#539fd1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    disabledBtn: {
        display: 'none'
    }
});

export default class AddDeck extends Component {

    state = {
        deckName: '',
        validinput: false,
    };

    handleTextChange = (deckName) => {
        this.setState({
            deckName
        }, () => {
            if (this.state.deckName.length > 0) {
                this.setState({
                    validinput: true
                })
            } else {
                this.setState({
                    validinput: false
                })
            }
        })
    };

    deckDetailRoute = () => {
        const { deckName } = this.state;
        this.setState({
            deckName: ''
        }, () => {
                this.setState({
                    validinput: false
                }, () => {
                    this.props.navigation.navigate('CardDeckInfo', { name: deckName })
                })
        })
    };


    createDeck = () => {
        Keyboard.dimiss;
        storeDeck(this.state.deckName).then(this.deckDetailRoute);
    };

    SubmitDeck = () => {
      Keyboard.dismiss();
      this.createDeck();
    };
    render(){
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={{margin: 10, fontSize: 30}}>
                    Create a name of your new deck
                </Text>
                <TextInput style={styles.textInput} value={this.state.deckName} onChangeText={this.handleTextChange} />
             <TouchableOpacity style={this.state.validinput ? styles.btn : styles.disabledBtn}
                 onPress={this.SubmitDeck.bind(this)}>
                 <View>
                     <Text style={{color: '#FFFFFF', fontSize: 20}}>
                         Create Deck
                     </Text>
                 </View>
             </TouchableOpacity>
         </KeyboardAvoidingView>
        )
    }
}