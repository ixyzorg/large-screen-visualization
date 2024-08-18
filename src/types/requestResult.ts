export interface IAbnormalData {
  abnormals: {
    id: number
    name: string
    value: number
  }[]
}
export interface IMapData {
  categoryData: { [prop: string]: { name: string; value: number }[] }
  colors: string[]
  topData: { [prop: string]: { name: string; value: number }[] }
  voltageLevel: string[]
}

export interface IRegionData {
  regions: {
    id: number
    name: string
    value: number
  }[]
}
export interface IRlationData {
  relations: {
    id: number
    name: string
    source: string
    speed: number
    target: string
    value: number[]
  }[]
}

export interface IRiskData {
  risks: {
    id: number
    name: string
    value: number
  }[]
}

export interface IServerData {
  servers: {
    id: number
    name: string
    value: number
  }[]
}

export interface ITotalData {
  [prop: string]: string
}
export interface IWordCloundData {
  datas: {
    name: string
    value: number
  }[]
}
export interface IRequestResultData {
  abnormalData: IAbnormalData
  mapData: IMapData
  regionData: IRegionData
  relationData: IRlationData
  riskData: IRiskData
  serverData: IServerData
  totalData: ITotalData
  wordCloudData: IWordCloundData
}

export interface IRequestResult {
  code: number
  message: string
  success: boolean
  data: IRequestResultData
}
