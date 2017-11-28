/**
 *
 * Http请求配置
 * */
class ReqConfig
{
  public RootUrl:string = '';
  public API_VoLTE:string = '';
  public constructor(_rootUrl:string )
  {
    this.RootUrl = _rootUrl;
    this.API_VoLTE = this.RootUrl + '/api'
  }
}

export {ReqConfig};
