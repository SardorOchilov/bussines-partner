import {$http} from "./baseHttp.ts";
import {
  TAuth
} from "../types/";
import {COMPANY_DB} from "../utils/config";

export const Login = (data: TAuth.Login.Request): Promise<TAuth.Login.Response> => $http.post('/Login', {
  CompanyDB: COMPANY_DB,
  ...data
}).then(res => res.data);
