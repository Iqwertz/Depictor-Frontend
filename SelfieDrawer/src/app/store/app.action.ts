export class SetIp {
  static type = 'SetIp';
  constructor(public ip: string) {}
}

export class SetAutoRouting {
  static type = 'SetAutoRouting';
  constructor(public autoRouting: boolean) {}
}
