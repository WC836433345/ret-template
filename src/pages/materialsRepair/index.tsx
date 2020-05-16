import "../../assets/lib/flexable";
import "../../assets/less/common.less";
import "./assets/css/common.less";
import 'antd-mobile/dist/antd-mobile.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { HashRouter as Router,Switch, Route} from 'react-router-dom';
import {Toast,Modal} from 'antd-mobile';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import {getUseAreaList,getCompanyList,getWzwxRole} from './axios/axios';
import {makeQuery,getCookie} from '../../assets/lib/common';
import store from './redux/store';

import './index.less';


/*
各模块路由界面
*/
import MaintenanceSupervisor from './view/maintenanceSupervisor/maintenanceSupervisor'; // 物资维修管理员
import MaintenanceMan from './view/maintenanceMan/maintenanceMan'; // 选择物资维修人员
import WriteRepairResult from './view/writeRepairResult/WriteRepairResult'; // 填写维修结果界面
import Maintainer from './view/maintainer/Maintainer'; // 维修员界面

/* 
公用组件
 */
import {Loadding} from '../../publicComponents/index'


class App extends React.Component<any,any>{
	constructor(Props:any){
		super(Props);
		this.state = {
			baseData:{},
			modal1:false
		}
	}

	public componentWillMount(){
		const Mobile_NS = (window as any).Mobile_NS;
        const userID = Mobile_NS ? Mobile_NS.getCurrUser() : "";
		// 获取用户角色
		getWzwxRole({
			"type":"getWzwxRole",
			"userid":userID
		}).then((res:any) => {
			if(res.code === 0){
				const result = res.object;
				const history = createHashHistory();
				if(result.ispdy === 1){
					history.replace({
						pathname:"/supervisor"
					}); 
				}else if(result.iswxy){
					history.replace({
						pathname:"/maintainer"
					});
				}else{
					// history.replace({
					// 	pathname:"/supervisor"
					// });
					this.setState({modal1:true});
				}
				
			}else{
				Toast.fail(res.message,1);
			}
		}).catch((error:any) => {
			Toast.fail(error.message,1);
		})
		// 获取公司
		getCompanyList({
			"type":"getCompanyList"
		}).then((res:any) => {
			if(res.code === 0){
				let result = res.object;
				result = result.map((item:any) =>  {
					return {
						"label":item.name,
						"value":item.id
					}
				})
				store.dispatch({
					type:'SET_BASEDATA',
					baseData:result
				})
			}else{
				Toast.fail(res.message,1);
			}
		}).catch((error:any) => {
			Toast.fail(error.message,1);
		})
		// 获取使用区域
		getUseAreaList({
			
		}).then((res:any) => {
			try{
				if(res.code === 0){
					let result = res.object;
					result = result.map((item:any) =>  {
						return {
							"label":item.syqy,
							"value":item.syqy // syqy item.id  // 查询的区域是名称。不是id
						}
					})
					store.dispatch({
						type:'SET_USEAREALIST',
						areaList:result
					})
				}
			}catch(error){
				Toast.fail(error.message,1);
			}
		})
	}

	// 关闭提示弹窗
	public onClose = (key:string) => () =>{
		this.setState({modal1:false},() => {
			window.top.close();
		});
	}

	public render(){
		const {loadding} = this.props
		return(
			<Router>
				<Route path="/supervisor" exact={true}  component={MaintenanceSupervisor} />
				<Route path="/selectperson" component={MaintenanceMan} />
				<Route path="/writeRepairResult" component={WriteRepairResult} />
				<Route path="/maintainer" component={Maintainer} />
				{loadding > 0 && <Loadding />}
				<Modal
					visible={this.state.modal1}
					transparent
					maskClosable={false}
					title="提示"
					footer={[{ text: '确定', onPress: () => {this.onClose('key')()} }]}
					>
					您没有权限，请找管理员配置权限！
				</Modal>
			</Router>				
		)
	}
}

const mapStateToProps = (state:any) => {
	return {
		loadding:state.loaddings.loadding
	};
};

const Index = connect(mapStateToProps)(App);


ReactDOM.render(<Provider store={store}><Index /></Provider>,document.getElementById('app'));

if ((module as any).hot) {
	(module as any).hot.accept();
}