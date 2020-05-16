// import Axios from 'axios';
// // import store from '../redux/store';

// const instance = Axios.create({
//     baseURL:"",
//     transformResponse:[(data) => {
//         return data;
//     }],
//     responseType: 'json'
// })

// // 请求拦截
// instance.interceptors.request.use((config) =>{
//     // store.dispatch({
//     //     type:"ADD_COUNTER",
//     // })
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// // 响应
// instance.interceptors.response.use((response) => {
//     // store.dispatch({
//     //     type:"REDUCE_COUNTER",
//     // })
//     try{
//         const data = response.data;
//         if(typeof(data) === 'string'){
//             return JSON.parse(response.data) ? JSON.parse(response.data) : null;
//         }else{
//             return response.data;
//         }        
//     }catch(error){
//         return error;
//     }
//   }, (error) => {
//     // store.dispatch({
//     //     type:"REDUCE_COUNTER",
//     // })
//     return Promise.reject(error);
// });

// function AxiosPOST(url:string,prama:object){
//     return instance.post(url,prama)
// }

// function AxiosGET(url:string,prama:object){
//     return instance.get(url,{params:prama});
// }

// // 创建供应商评分类型模板
// export function createSupplierTeamplate(data:object){
//     return AxiosPOST('/scoreSupplier?type=createScoreSupplierType',data);
// }

// // 修改供应商评分模板
// export function modifySupplierTeamplate(data:object){
//     return AxiosPOST('/scoreSupplier?type=modifyScoreSupplierType',data);
// }

// // 供应商评分模板列表
// export function supplierTeamplateList(data:object){
//     return AxiosPOST('/scoreSupplier?type=scoreSupplierTypeList',data);
// }

// // 供应商评分模板明细
// export function supperlierTeamplateDetail(data:object){
//     return AxiosPOST('/scoreSupplier?type=getScoreSupplierTypeInfoById',data);
// }

// // 根据流程明细获取打分信息
// export function flowDetailGrade(data:object){
//     return AxiosPOST('/scoreSupplier?type=getScoreQuotaGradeInfo',data);
// }

// // 修改审核打分信息 --反馈节点
// export function modifyAuditGradeFeedback(data:object){
//     return AxiosPOST('/scoreSupplier?type=modifyGradeInfoForFeedback',data);
// }

// // 修改审核打分信息 -- 审核节点
// export function modefyAuditGradeAudit(data:object){
//     return AxiosPOST('/scoreSupplier?type=modifyGradeInfoForExamine',data);
// }

// // 供应商考核评分记录
// export function supplierGradeList(data:object){
//     return AxiosPOST('/scoreSupplier?type=getSupplierExamineList',data);
// }

// // 供应商考核评分导出
// export function supplierGradeListExport(data:object){
//     return AxiosPOST('/scoreSupplier?type=supplierExamineListExport',data);
// }

// // 上传文件
// export function upLoadFile(url:string,data:object){
//     return instance.post(url,data)
// }

// // 评分删除文件
// export function deleteGradeListFile(data:object){
//     return AxiosPOST('/scoreSupplier?type=deleteScoreQuotaGradeFile',data);
// }

// // 判断用户是否有权限操作上传附件和确认操作
// export function oprateAuthority(data:object){
//     return AxiosPOST('/scoreSupplier?type=chargeIsCanOperate',data);
// }

// // 供应商考核模板明细备份
// export function getTypeCopy(data:object){
//     return AxiosPOST('/scoreSupplier?type=getTypeCopy',data);
// }

// // 修改副本考核指标评分人
// export function modifyTypeCopyPFR(data:object){
//     return AxiosPOST('/scoreSupplier?type=modifyTypeCopyPFR',data);
// }

// // 获取供应商考核模版副本
// export function supplierTeamplateCopy(data:object){
//     return AxiosPOST('/scoreSupplier?type=getTypeCopy',data);
// }

// // 获取选择设定评分人员信息接口 getUserList
// export function getUserList(data:object){
//     return AxiosPOST('/scoreSupplier?type=getUserList',data);
// }

// // 获取办公用品
// export function getOfficeSuppliyList(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/getOfficeSupplyList.jsp',data);
// }

// // 生成采购单
// export function createGoodOrder(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/createGoodOrder.jsp',data);
// }

// // 获取采购单编号 
// export function getPurchaseNum(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/getPurchaseNum.jsp',data);
// }

// // 获取采购单详细
// export function orderDetail(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/goodOrderDetail.jsp',data);
// }

// // 获取采购单列表
// export function getOrderList(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/getGoodOrderList.jsp',data);
// }

// // 确认收货接口
// export function confirmReceipt(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/confirmReceipt.jsp',data);
// }

// // 创建收货单号
// export function getReceiptNum(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/getReceiptNum.jsp',data);
// }

// // 获取收货单列表
// export function getReceiptList(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/getReceiptList.jsp',data);
// }

// // 获取收货单明细
// export function goodReceiptDetail(data:object){
//     return AxiosPOST('/Shein/cqx/admin/flow/goodReceiptDetail.jsp',data);
// }



// // 请求拦截
// Axios.interceptors.request.use((config) =>{
//     // store.dispatch({
//     //     type:"ADD_COUNTER",
//     // })
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// // 响应
// Axios.interceptors.response.use((response) => {
//     // store.dispatch({
//     //     type:"REDUCE_COUNTER",
//     // })
//     try{
//         const data = response.data;
//         if(typeof(data) === 'string'){
//             return JSON.parse(response.data) ? JSON.parse(response.data) : null;
//         }else{
//             return response.data;
//         }        
//     }catch(error){
//         return error;
//     }
//   }, (error) => {
//     // store.dispatch({
//     //     type:"REDUCE_COUNTER",
//     // })
//     return Promise.reject(error);
// });

// // 物资维修流程查询界面
// // 查询待维修信息
// export function waiteRepairt(data:any){    
//     return Axios({
//         method: 'post',
//         url: '/Shein/custom/yyb/waitrepairPage.jsp',
//         data: data.replace("?",""),
//         headers: { 'content-type': 'application/x-www-form-urlencoded'}
//     });
// }

// // 填报维修结果
// export function repairtResult(data:any){
//     return Axios({
//         method: 'post',
//         url: '/Shein/custom/yyb/clickbutton.jsp',
//         data: data.replace("?",""),
//         headers: {'content-type':'application/x-www-form-urlencoded'}
//     });
// }

// // 物资二次维修
// export function secondaryrepair(data:any){
//     return Axios({
//         method: 'post',
//         url: '/Shein/custom/yyb/secondaryrepairPage.jsp',
//         data: data.replace("?",""),
//         headers: {'content-type':'application/x-www-form-urlencoded'}
//     });
// }

// // 物资外部维修 externalrepairPage
// export function externalrepair(data:any){
//     return Axios({
//         method: 'post',
//         url: '/Shein/custom/yyb/externalrepairPage.jsp',
//         data: data.replace("?",""),
//         headers: {'content-type':'application/x-www-form-urlencoded'}
//     });
// }

// // 获取查询物资基础数据， 公司，地点
// export function getBaseDataList(prama:any){
//     return Axios({
//         method: 'post',
//         url: '/materialSolidCapitalBI',
//         data:prama,
//         headers:{'content-type':'application/x-www-form-urlencoded'},
//         transformRequest: [
//             (data) => {
//                 let ret = '';
//                 for (const it in data) {
//                     if(data.hasOwnProperty(it)){
//                         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
//                     }    
//                 }
//                 return ret;
//             }
//         ],
//     });
// } 



// // 借衣还衣 财务确认还衣
// //  获取超期未还流程列表
// export function overdueAndNoReturnedList(data:any){
//     return AxiosGET('/wms?type=overdueAndNoReturnedList',data);
// }

// // 财务确认结果
// export function financeConfirmInfo(data:any){
//     return AxiosPOST('/wms?type=pushFinanceConfirmInfo',data);
// }
