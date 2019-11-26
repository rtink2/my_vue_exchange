import { db } from '@/db';
import { firestoreAction } from 'vuexfire';

export default {
  namespaced: true,
  state() {
    return {
      items: []
    };
  },
  actions: {
    getExchanges() {
      db.collection('exchanges')
        .doc('ykPoNZ2nHuByiX8W54t8')
        .get()
        .then(snapshot => {
          const exchange = snapshot.data();

          return exchange;
        });
      // commit('setExchanges', exchanges);
    },
    bindExchanges: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('items', db.collection('exchanges'));
    })
  },
  mutations: {
    setExchanges(state, exchanges) {
      state.items = exchanges;
    }
  }
};
