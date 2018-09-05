import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DeckListItem from './CardItemsList';
import { getDecks } from '../index';

const styles = StyleSheet.create({
    homelist: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    emptydeck: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class ListOfCardDeck extends Component {

    state = {
        decks: [],
        listener: null,
    };

    componentDidMount(){
        let deckListener = this.props.navigation.addListener('didFocus', () => {
            this.retrieveData()
        });
        this.setState({ listener: deckListener })
    }

    componentWillUnmount(){
        this.state.listener.remove();
    }

    retrieveData = () => {
        getDecks().then(resp => {
            if(resp === null){
                console.log('Deck is empty!');
            }
            else {
                this.setState({decks: Object.values(JSON.parse(resp)).reverse()})
            }
            }).catch(err => console.warn(err));
    };

    displayCardInfo = ({ item: x }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'CardDeckInfo', { name: x.title }
            )}>
                <DeckListItem {...x} />
            </TouchableOpacity>
        )
    };

    render(){
        const decks = getDecks();
        return (
            <View>
                {this.state.decks.length > 0 ? (
                <View style={styles.homelist}>
                    <FlatList data={this.state.decks} renderItem={this.displayCardInfo} keyExtractor={item => item.title} />
            </View>
            ) : (
                <View style={styles.emptydeck}>
                    <Text style={{fontSize: 25}}>
                        Empty! Please add a deck.
                    </Text>
                </View>
            )}
            </View>
        )
    }
}

