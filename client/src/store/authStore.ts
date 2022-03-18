interface IState {
  isSignedIn: boolean,
}

const getInitialState = (): IState => ({
  isSignedIn: false,
});

export const mutations = {
  setIsSignedIn(state: IState, paylad: boolean): void {
    state.isSignedIn = paylad;
  },
};

export const state = getInitialState;
