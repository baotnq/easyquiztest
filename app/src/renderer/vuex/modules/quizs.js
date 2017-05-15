import * as types from '../mutation-types'
import quizApi from '../../api/quiz'
const state = {
    all: [],
    currentQuestion:{},
    next: true,
    previous: true,
    
}

// getters
const getters = {
    getAllQuizs: state => state.all,
    getCurrentQuestion: (state) => state.currentQuestion,
    previous: (state) => state.all.map(x=>x).shift().id !== state.currentQuestion.id ,
    next: (state)=> state.currentQuestion.id !== state.all.map(x=>x).pop().id
}

// actions
const actions = {
    getAllQuizs({ commit}) {
        quizApi.getQuizs().then( function(quizs)  {
            console.log('quiz', quizs)
            commit(types.RECEIVE_QUIZS, {
                quizs
            })
        })
    },
    goToQuestion({commit},currentQuestion) {
        commit(types.GO_TO_QUESTION,{id: currentQuestion.id})
    }
}
const mutations = {
    [types.RECEIVE_QUIZS](state, { quizs}) {
        state.all = quizs
    },
    [types.GO_TO_QUESTION](state, question) {
        console.log('question',question);
        let questionFilter = state.all.filter( x=> x.id==question.id)
        console.log('questionFilter',questionFilter)
        if(questionFilter){
            state.currentQuestion= questionFilter[0]
        }
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}