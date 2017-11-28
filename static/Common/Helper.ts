import {CommonHelper} from './CommonHelper'
import {ReqConfig} from './ReqConfig'

let reqConfig = new ReqConfig('http://apiExample.com');
let commonHelper = new CommonHelper();
console.log(commonHelper);
export default
{
  'ReqConfig':reqConfig ,
  'CommonHelper':commonHelper
};
