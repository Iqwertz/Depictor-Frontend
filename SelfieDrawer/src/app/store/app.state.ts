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
import { SetServerGcode, SetIp } from './app.action';
import { environment } from '../../environments/environment';

export interface AppStateModel {
  serverGcode: string;
  ip: string;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    serverGcode: '',
    ip: environment.ip,
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

  @Selector()
  static ip(state: AppStateModel) {
    return state.ip;
  }

  @Action(SetIp)
  SetIp(context: StateContext<AppStateModel>, action: SetIp) {
    context.patchState({
      ip: action.ip,
    });
  }
}
