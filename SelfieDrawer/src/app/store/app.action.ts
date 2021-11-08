export class SetServerGcode {
  static type = 'SetServerGcode';
  constructor(public serverGcode: string) {}
}

export class SetIp {
  static type = 'SetIp';
  constructor(public ip: string) {}
}
