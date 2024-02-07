export namespace IEntity {
  export interface ListItem {
    CardCode: string
    CardName: string
    CardType: string
    Currency: string
    Country: string
    Phone1: string
  }

  export type selectParam =
    'CardCode'
    | 'CardName'
    | 'CardType'
    | null

  export interface Form {
    CardCode: string
    CardName: string
    CardType: string
    Phone1: string
  }
}

export namespace List {
  export interface Param {
    select: IEntity.selectParam
  }

  export interface Response {
    value: IEntity.ListItem[]
  }
}

export namespace Single {
  export interface Request {
  }

  export interface Response {
  }
}

export namespace Create {
  export interface Request extends IEntity.Form {

  }

  export interface Response {
  }
}

export namespace Update {
  export interface Request extends IEntity.Form {
  }

  export interface Response {
  }
}

export namespace Delete {
  export interface Response {

  }
}
