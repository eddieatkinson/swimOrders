const INITIAL_STATE = {
  loading: false,
  email: '',
  password: '',
  user: null,
  errorMessage: null,
  successMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  } 
}
