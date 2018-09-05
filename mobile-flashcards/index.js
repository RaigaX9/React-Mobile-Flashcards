import { AsyncStorage } from 'react-native';

const asystoragekey = 'Mobile_Flashcards:storage';

export const getDecks = () =>{
    return AsyncStorage.getItem(asystoragekey)
}

export const storeDeck = (title) => {
    return AsyncStorage.mergeItem(asystoragekey, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
};

export const addFlashCard = ({ title, card }) => {
    return AsyncStorage.getItem(asystoragekey).then(resp => {
                    const questions = JSON.parse(resp)[title].questions
                    AsyncStorage.mergeItem(asystoragekey, JSON.stringify({
                        [title]: {
                            title,
                            questions: [...questions, card]
                        }
                    }))
                }).catch(err => console.log(err))
};



