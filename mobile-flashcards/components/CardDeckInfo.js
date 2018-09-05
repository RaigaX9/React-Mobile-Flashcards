import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getDecks } from '../index';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckname: {
        margin: 20,
        fontSize: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numCards: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        fontSize: 25
    },
    buttonAddCard: {
        width: 200,
        height: 40,
        backgroundColor: '#539fd1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    questionBtn: {
        width: 200,
        height: 40,
        backgroundColor: '#539fd1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    disabledQuesBtn: {
        display: 'none'
    }
});

export default class CardDeckInfo extends Component {
    state = {
        card: null,
        listener: null
    };

    componentDidMount(){
        this.setState({ listener: this.props.navigation.addListener('didFocus', () => {
            this.getdata()
        })
       }
      );
    }

    getdata = () => {
        let name = this.props.navigation.state.params.name;

        getDecks().then(resp => {
                this.setState({
                    card: JSON.parse(resp)[name]
                })
            }).catch((err) => console.log(err))
    };

    newcardroute = () => {
        this.props.navigation.navigate('AddCard', { title: this.state.card.title })
    };

    beginQuiz = () => {
        this.props.navigation.navigate('Questions', { card: this.state.card })
    };

    componentWillUnmount(){
        this.state.listener.remove();
    }

    render(){
        return (
            <View style={styles.container}>
                {this.state.card &&
                (
                    <View style={styles.container}>
                    <Text
                        style={[styles.deckname]}>
                        {this.state.card.title}
                    </Text>
                    <Text
                        style={[styles.numCards]}>
                        {this.state.card.questions.length} Cards
                    </Text>
                    <TouchableOpacity
                        style={this.state.card.questions.length === 0 ? styles.disabledQuesBtn : styles.questionBtn}
                        onPress={this.beginQuiz}
                        disabled={this.state.card.questions.length === 0}>
                        <View>
                            <Text style={{color: '#FFFFFF', fontSize: 20}}>
                                Start Questions
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonAddCard}
                        onPress={this.newcardroute}>
                        <View>
                            <Text style={{color: '#FFFFFF', fontSize: 20}}>
                                Add Card
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                )}
            </View>
        )
    }
}
