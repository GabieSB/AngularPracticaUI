export interface IError {
  Code: number;
  Message: string;
}

export interface BaseResponse {
  Result: boolean;
  ErrorInfo: IError;
}

export interface IMaterialManagerResponse extends BaseResponse {

}
//#endregion

export interface  IResponse <T> extends BaseResponse {
  Data: T;
}