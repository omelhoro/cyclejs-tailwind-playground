import xs from "xstream";
import merge from "deepmerge";

const initialState = { title: "Cycle.js Test", size: 10 };

export const store = {
  state: initialState,
  set: function(state: Partial<typeof initialState>) {
    this.state = merge(this.state, state);
    store$.shamefullySendNext(this.state);
    return state;
  }
};

export const store$ = xs.createWithMemory<typeof initialState>({
  start: listener => listener.next(store.state),
  stop: () => {}
});
