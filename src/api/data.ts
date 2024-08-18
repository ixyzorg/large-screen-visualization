import request from '@/utils/request'
import type { IRequestResult } from '@/types/requestResult'
export const getDataService = () => request.get<IRequestResult>('/visualization')
