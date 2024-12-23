import { appendNextRequestCookies, getClientSideCookie, getServerSideCookie } from './utilts/cookieUtils';
import { RequestMethods } from './RequestMethods';
import { handleErrorPayload } from './utilts/handleErrorPayload';
import { RequestConfig } from './types/Request';

export class Request {
request: RequestMethods;

  constructor(private config:RequestConfig) {
    this.request = new RequestMethods(config);
    this.setCsrf();
    this.handlingErrors();
  }

  protected setCsrf() {
    this.request.interceptors.request(async (config) => {

      
      const token = await Request.getCsrfToken(this.config.isServerSide());
      if (token && !config.next) {
        config.headers!['X-XSRF-TOKEN'] = decodeURIComponent(token);
      }
      if(this.config.isServerSide() && !config.next){
        const cookies =await appendNextRequestCookies();
        config.headers!['Cookie'] = cookies
      }
      return config;
    });
  }

  protected handlingErrors() {
    this.request.interceptors.response(undefined, (er)=>handleErrorPayload(er,this.config.isServerSide(),()=>{}));
  }

  static async getCsrfToken(isServerSide:boolean) {
    if (isServerSide) {
      return getServerSideCookie('XSRF-TOKEN');
    } else {
      return getClientSideCookie('XSRF-TOKEN');
    }
  }
}
