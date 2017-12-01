/*
*
* 帮助器
*
* */
class CommonHelper {
  constructor()
  {

  }
  //数据列表 去重
  public distinct(sourList:any[], target:string):any
  {
    let ret_list = [];
    if (sourList.length > 0)
    {
      for (let i = 0 ; i < sourList.length;i++)
      {
        if (sourList[i].hasOwnProperty(target))
        {
          let index = ret_list.findIndex(function (obj){
            return sourList[i][target] == obj[target];
          });
          if (index == -1)
          {
            ret_list.push(sourList[i]);
          }
        }
      }
      return ret_list;
    }
    else
    {
      return sourList;
    }
  }
}
export {CommonHelper};
