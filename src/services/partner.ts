import {$http} from "./baseHttp.ts";
import {
  TPartner
} from "../types/";

export const List = (params: TPartner.List.Param): Promise<TPartner.List.Response> => $http.get('/BusinessPartners', {params}).then(res => res.data);
export const Single = (id: string): Promise<TPartner.Single.Response> => $http.get(`/BusinessPartners/${id}`).then(res => res.data);
export const Create = (data: TPartner.Create.Request): Promise<TPartner.Create.Response> => $http.post(`/BusinessPartners`, data).then(res => res.data);
export const Update = (id: string, data: TPartner.Update.Request): Promise<TPartner.Update.Response> => $http.put(`/BusinessPartners/${id}`, data).then(res => res.data);
export const Delete = (id: string): Promise<TPartner.Delete.Response> => $http.delete(`/BusinessPartners/${id}`);
