export interface IConf {
  port: number
  jwtSecretKey: string
  db?: any
}

export const baseConf: IConf = {
  port: 8004,
  jwtSecretKey: 'novel',
}