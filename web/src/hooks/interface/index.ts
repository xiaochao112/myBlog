export namespace TatleList {
  export interface Pageable {
    pageNo: number,
    pageSize: number,
    total: number
  }
  export interface State {
    cardList: any[],
    pageable: Pageable,
    contentList: string
  }
}