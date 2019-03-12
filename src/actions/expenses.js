import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = ( expenseData = {}) => {
   return ( dispatch, getState ) => {  //  <== this function gets called internally by redux
    const uid= getState().auth.uid
    const {
       description = '',
       note = '',
       amount = 0,
       createdAt = 0
    } = expenseData //destructuring object that comes from function argument
    const expense = { description, note, amount, createdAt }

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
      return ref.key
    })
  }
}

// REMOVE_EXPENSE
export const removeExpense = ( id ) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id }) => {
  return (dispatch, getState) => {
    const uid=getState().auth.uid
    database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense(id))
    })
  }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch,getState) => {
    const uid=getState().auth.uid
    return database.ref(`users/${uid}/expenses/${id}`).update({...updates}).then( () => { // 'return' needed in tests
      dispatch(editExpense(id,updates))
    })
  }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type:'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid=getState().auth.uid
    return database.ref(`users/${uid}/expenses`).once('value', (snapshot) => {
      const objectFromDatabase=snapshot.val()      
      const expenses=[]

      for (const key in objectFromDatabase) {
        expenses.push({
          id:key,
          ...objectFromDatabase[key]
        })
      }
      dispatch(setExpenses(expenses))
    })
  }
}
