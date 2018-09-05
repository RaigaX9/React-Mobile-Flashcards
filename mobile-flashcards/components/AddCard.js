import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { addFlashCard } from '../index';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: 10,
        fontSize: 30,
    },
    textInput: {
        width: 200,
        height: 44,
        padding: 3,
        borderColor: '#000000',
        margin: 30,
        fontSize: 20,
        overflow: 'visible',
    },
    btn: {
        width: 200,
        backgroundColor: '#539FD1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    disabledBtn: {
        display: 'none'
    }
});

export default class AddCard extends Component {

    state = {
        question: "",
        answer: "",
        valid1: false,
        valid2: false
    };

    handleQ = (question) => {
        this.setState({
            question: question
        }, () => {
            if (this.state.question.length > 0) {
                this.setState({
                    valid1: true
                })
            } else {
                this.setState({
                    valid1: false
                })
            }
        })
    };

    handleA = (answer) => {
        this.setState({answer}, () => {
            if (this.state.answer.length > 0) {
                this.setState({
                    valid2: true
                })
            } else {
                this.setState({
                    valid2: false
                })
            }
        })
    };


    clearInputs = () => {
        this.handleQ("");
        this.handleA("");
    };

    displayAddSuccess = () => {
        Alert.alert(
                  'Awesome!',
                  'You just added a card in the deck.',
                  [
                    {text: 'Add another card', onPress: this.clearInputs},
                    {text: 'Go to the Deck List', onPress: () =>  this.props.navigation.navigate('Home')}
                  ],
                  { cancelable: false }
                )
    };


    submitCard = () => {
        let { question, answer } = this.state;
        let { title } = this.props.navigation.state.params;
        let card = {
                question: question,
                answer
            };

        addFlashCard({ title, card })
            .then(this.displayAddSuccess)

    };

    render(){
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                 placeholder='Question'
                 style={styles.textInput}
                 value={this.state.question}
                 onChangeText={this.handleQ}
                />
                 <TextInput
                  placeholder='Answer'
                  style={styles.textInput}
                  value={this.state.answer}
                  onChangeText={this.handleA}
                />

             <TouchableOpacity
                 style={this.state.valid1 && this.state.valid2 ? styles.btn : styles.disabledBtn}
                 disabled={!this.state.valid1 && !this.state.valid2}
                 onPress={this.submitCard}
                 >
                 <View>
                     <Text style={{color: '#FFFFFF', fontSize: 20}}>
                         Submit
                     </Text>
                 </View>
             </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}