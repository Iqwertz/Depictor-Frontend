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
import { SetIp } from './app.action';
import { environment } from '../../environments/environment';

export interface AppStateModel {
  ip: string;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    ip: environment.ip,
  },
})
export class AppState {
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
