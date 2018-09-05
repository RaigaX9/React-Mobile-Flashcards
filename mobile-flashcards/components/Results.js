import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createLocNotification, clearNotification } from '../utils/Notification';

const styles = StyleSheet.create({
    questionBtn: {
        width: 100,
        height: 40,
        backgroundColor: '#539fd1',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        marginBottom: 50
    },
    deckrouteBtn: {
        width: 160,
        height: 40,
        backgroundColor: '#539fd1',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 50,
        margin: 15
    }
});

export default class Results extends Component {

    componentDidMount(){
        clearNotification().then(createLocNotification)
    }

    deckroute = () => {
        this.props.navigation.navigate('CardDeckInfo', {
            name: this.props.navigation.state.params.card.title,
        })
    };

    routequestion = () => {
        this.props.navigation.navigate('Questions', {
            card: this.props.navigation.state.params.card,
        })
    };

    render(){
        let { score, totalQuestions } = this.props.navigation.state.params;
        let totalpoints = score/totalQuestions;
        return (
            <View style={{ justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>
                    Result {score} out of {totalQuestions}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={styles.questionBtn} onPress={this.routequestion}>
                        <View>
                            <Text style={{color: "#FFFFFF", fontSize: 20}}>
                                Restart
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deckrouteBtn} onPress={this.deckroute}>
                        <View>
                            <Text style={{color: "#FFFFFF", fontSize: 20}}>
                                Back to the deck
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}