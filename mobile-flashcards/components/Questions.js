import React, { Component } from 'React';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    viewpage: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    btn: {
        width: 250,
        height: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#539fd1'

    },
    correctBtn: {
        width: 150,
        height: 40,
        margin: 15,
        marginBottom: 50,
        backgroundColor: '#0a9639',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    incorrectBtn: {
        width: 150,
        height: 40,
        margin: 15,
        marginBottom: 50,
        backgroundColor: '#960a10',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    flashcard: {
        flex: 1,
        margin: 10,
        marginTop: 140,
        marginBottom: 140,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});

export default class Questions extends Component {
    state = {
        questions: [],
        score: 0,
        numQuestions: 1,
        validquestionbool: true,
        qnum: 0,
    };

    componentDidMount(){
        this.setState({ questions: this.props.navigation.state.params.card.questions })
    }

    moveFC = () => {
        if (this.state.qnum < this.state.questions.length - 1) {
            this.setState((prevState) => ({
                qnum: prevState.qnum + 1
            }))
        } else {
            this.moveCalcScore()
        }
    };

    moveCalcScore = () => {
        this.props.navigation.navigate('Results', {
            score: this.state.score,
            totalQuestions: this.state.questions.length,
            card: this.props.navigation.state.params.card,
        })
    };
    moveQuestion = () => {
        this.setState((prevState) => ({ validquestionbool: !prevState.validquestionbool }), this.moveFC)
    };
    storelocPoints = () => {
        this.setState((prevState) => ( { score: prevState.score + 1 }), () => this.moveQuestion())
    };

    changeView = () => {
        this.setState((prevState) => ({ validquestionbool: !prevState.validquestionbool }))
    };

    render(){
        const { questions, qnum, validquestionbool, score } = this.state
        return(
            <View style={styles.viewpage}>
                {questions.length > 0 && (validquestionbool ?
                        (
                        <View>
                            <View style={{marginTop: 30, marginLeft: 30}}>
                                <Text style={{fontSize: 20}}>
                                    {qnum + 1}/{questions.length}
                                </Text>
                            </View>
                            <View style={styles.flashcard}>
                                <Text style={{fontSize: 20}}>
                                    {questions[qnum].question}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={this.changeView}>
                                <View>
                                    <Text style={{color: '#FFFFFF', fontSize: 20}}>
                                        Display Correct Answer
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <View>
                            <View style={{marginTop: 30, marginLeft: 30}}>
                                <Text style={{fontSize: 20}}>
                                    {qnum + 1}/{questions.length}
                                </Text>
                            </View>
                            <View style={styles.flashcard}>
                                <Text  style={{fontSize: 20}}>
                                    {questions[qnum].answer}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TouchableOpacity
                                    style={styles.correctBtn}
                                    onPress={this.storelocPoints}>
                                    <View>
                                        <Text style={{color: '#FFFFFF', fontSize: 20}}>
                                            Correct
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.incorrectBtn}
                                    onPress={this.moveQuestion}>
                                    <View>
                                        <Text style={{color: '#FFFFFF', fontSize: 20}}>
                                            Incorrect
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                )}
            </View>
        )
    }
}