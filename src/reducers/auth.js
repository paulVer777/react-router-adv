
export default (state = {}, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        uid:action.uid
      };
    case 'LOGOUT':
      return {};    
    default: 
      return state;
  }
}

// this reducer informs our entire app if user is logged in or logged out