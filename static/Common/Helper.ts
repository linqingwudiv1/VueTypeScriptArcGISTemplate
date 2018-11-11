import {CommonHelper} from './CommonHelper'
import {ReqConfig} from './ReqConfig'

let reqConfig = new ReqConfig('http://apiExample.com');
let commonHelper = new CommonHelper();
export default
{
  'ReqConfig':reqConfig ,
  'CommonHelper':commonHelper
};
