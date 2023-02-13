export interface RoutesStore {
  navRoutes: any[]
  currentRoute: string,
  navOffsetLeft: number,
  navItem: number
}
export interface GlobalState {
  token: string
  userInfo: string
}
export interface NavAndLeft {
  navItem: number,
  left: number
}