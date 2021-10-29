//////Use
/*
  @Select(AppState.userId)
  userId$;
  ngOninit:
    this.userId$.subscribe((userId: string) => {
      this.userId = userId;
    });
  Set:
  constructor: private store: Store
  this.store.dispatch(new SetUserId(x));
*/

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetServerGcode } from './app.action';

export interface AppStateModel {
  serverGcode: string;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    serverGcode: '',
  },
})
export class AppState {
  @Selector()
  static serverGcode(state: AppStateModel) {
    return state.serverGcode;
  }

  @Action(SetServerGcode)
  setServerGcode(context: StateContext<AppStateModel>, action: SetServerGcode) {
    context.patchState({
      serverGcode: action.serverGcode,
    });
  }
}
