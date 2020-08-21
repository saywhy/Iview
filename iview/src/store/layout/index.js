import axios from "axios";

import {
  asyncRouterMap,
  constantRouterMap
} from "@/router";
import {
  getToken,
  setToken,
  removeToken
} from "./cookie";
import {
  forRoleList,
  formatList
} from './auth'

export default {
  state: {
    highligh: {
      navIndex: '0',
      asideIndex: '0'
    },
    routers: constantRouterMap,
    addRouters: [],
    token: getToken(),
    roles: [],
    isCollapse: false,
    sysMonitor: false,
    sandbox: false
  },
  getters: {
    token: state => state.token,
    roles: state => state.roles,
    addRouters: state => state.addRouters,
    sysMonitor: state => state.sysMonitor
  },
  mutations: {
    SET_TOKEN: (state, args) => {
      state.token = args;
    },

    SET_SANDBOX: (state, args) => {
      state.sandbox = args;
    },

    SET_ROLES: (state, args) => {
      state.roles = args;
    },

    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },

    TOGGLE_COLLAPSE: (state, args) => {
      state.isCollapse = args;
    },
    CHANGE_SYS: (state, args) => {
      state.sysMonitor = args;
    },
  },
  actions: {
    //登录
    LoginByUsername({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        //只要登录就删除token
        removeToken();
        axios.post('/yiiapi/site/login', {
          "LoginForm": userInfo,
          "login-button": ""
        }).then(resp => {

          //把工单中心上面tabs清空
          window.sessionStorage.removeItem('activeName');

          let datas = resp.data;

         // console.log(datas)

          let {
            status,
            msg,
            data
          } = datas;

          let tips = '输入用户名或密码错误';
          if (msg.username) {
            tips = msg.username[0];
          } else if (msg.password) {
            tips = msg.password[0];
          } else if (msg.allow_ip) {
            tips = msg.allow_ip;
          } else {
            tips = msg;
          }
          //用户名密码正确
          if (status == 202 || status == 0) {
            let isTaken = (data == '') ? userInfo.username : data.token
            setToken(isTaken);
            commit('SET_TOKEN', isTaken);
            resolve([true, tips]);
            //用户名密码错误
          } else {
            resolve([false, tips]);
          }
        }).catch(error => {
          console.log(error);
        })
      });
    },

    //权限设置
    async GetAuth({
      commit,
      dispatch,
    }) {
      try {
        //真实数据
        //let resp = await axios('/yiiapi/site/menu');

        //let resp = await axios('../static/data/menu.json');

        //console.log(resp)

        let resp = {data:{status:0,msg:'', data: [
              {
                "function_name": "首页",
                "id": "1",
                "menu_order": "1",
                "parent_id": "0",
                "permissions_id": "1",
                "child":[
                  {
                    "function_name":"总览",
                    "id": "2",
                    "menu_order": "2",
                    "parent_id": "1",
                    "permissions_id": "2"
                  }
                ]
              },
              {
                "function_name": "处置",
                "id": "13",
                "menu_order": "3",
                "parent_id": "0",
                "permissions_id": "13",
                "child":[
                  {
                    "function_name": "资产维度",
                    "id": "14",
                    "menu_order": "14",
                    "parent_id": "13",
                    "permissions_id": "14"
                  },
                  {
                    "function_name": "风险维度",
                    "id": "23",
                    "menu_order": "23",
                    "parent_id": "13",
                    "permissions_id": "23",
                    "child":[
                      {
                        "function_name": "外部威胁",
                        "id": "24",
                        "menu_order": "24",
                        "parent_id": "23",
                        "permissions_id": "24"
                      },
                      {
                        "function_name": "横向威胁",
                        "id": "32",
                        "menu_order": "32",
                        "parent_id": "23",
                        "permissions_id": "32"
                      },
                      {
                        "function_name": "外联威胁",
                        "id": "40",
                        "menu_order": "40",
                        "parent_id": "23",
                        "permissions_id": "40"
                      }
                    ]
                  },
                  {
                    "function_name": "工单中心",
                    "id": "48",
                    "menu_order": "48",
                    "parent_id": "13",
                    "permissions_id": "48"
                  }
                ]
              },
              {
                "function_name": "告警",
                "id": "58",
                "menu_order": "58",
                "parent_id": "0",
                "permissions_id": "58",
                "child":[
                  {
                    "function_name": "网络告警",
                    "id": "59",
                    "menu_order": "59",
                    "parent_id": "58",
                    "permissions_id": "59"
                  }
                ]
              },
              {
                "function_name": "追查",
                "id": "76",
                "menu_order": "76",
                "parent_id": "0",
                "permissions_id": "76",
                "child":[
                  {
                    "function_name": "DNS追查",
                    "id": "77",
                    "menu_order": "77",
                    "parent_id": "76",
                    "permissions_id": "77"
                  },
                  {
                    "function_name": "IP/URL追查",
                    "id": "81",
                    "menu_order": "81",
                    "parent_id": "76",
                    "permissions_id": "81"
                  },
                  {
                    "function_name": "主机追查",
                    "id": "85",
                    "menu_order": "85",
                    "parent_id": "76",
                    "permissions_id": "85"
                  },
                  {
                    "function_name": "用户追查",
                    "id": "93",
                    "menu_order": "93",
                    "parent_id": "76",
                    "permissions_id": "93"
                  },
                  {
                    "function_name": "文件追查",
                    "id": "97",
                    "menu_order": "97",
                    "parent_id": "76",
                    "permissions_id": "97"
                  },
                  {
                    "function_name": "数据传输追查",
                    "id": "101",
                    "menu_order": "101",
                    "parent_id": "76",
                    "permissions_id": "101"
                  },
                  {
                    "function_name": "流量方向追查",
                    "id": "105",
                    "menu_order": "105",
                    "parent_id": "76",
                    "permissions_id": "105"
                  },
                  {
                    "function_name": "IOC扫描器",
                    "id": "109",
                    "menu_order": "109",
                    "parent_id": "76",
                    "permissions_id": "109"
                  },
                  {
                    "function_name": "沙箱",
                    "id": "117",
                    "menu_order": "117",
                    "parent_id": "76",
                    "permissions_id": "117"
                  },
                  {
                    "function_name": "沙箱",
                    "id": "117",
                    "menu_order": "117",
                    "parent_id": "76",
                    "permissions_id": "117"
                  }
                ]
              },
              {
                "function_name": "报表",
                "id": "123",
                "menu_order": "123",
                "parent_id": "0",
                "permissions_id": "123",
                "child":[
                  {
                    "function_name": "报表生成",
                    "id": "124",
                    "menu_order": "124",
                    "parent_id": "123",
                    "permissions_id": "124"
                  },
                  {
                    "function_name": "报表发送",
                    "id": "130",
                    "menu_order": "130",
                    "parent_id": "123",
                    "permissions_id": "130"
                  },
                  {
                    "function_name": "报表发送",
                    "id": "222",
                    "menu_order": "222",
                    "parent_id": "123",
                    "permissions_id": "222"
                  }
                ]
              },
              {
                "function_name": "系统",
                "id": "132",
                "menu_order": "132",
                "parent_id": "0",
                "permissions_id": "132",
                "child":[
                  {
                    "function_name": "设备管理",
                    "id": "133",
                    "menu_order": "133",
                    "parent_id": "132",
                    "permissions_id": "133"
                  },
                  {
                    "function_name": "受监控IP",
                    "id": "139",
                    "menu_order": "139",
                    "parent_id": "132",
                    "permissions_id": "139"
                  },
                  {
                    "function_name": "账号管理",
                    "id": "144",
                    "menu_order": "144",
                    "parent_id": "132",
                    "permissions_id": "144"
                  },
                  {
                    "function_name": "网络配置",
                    "id": "157",
                    "menu_order": "157",
                    "parent_id": "132",
                    "permissions_id": "157"
                  },
                  {
                    "function_name": "系统选项",
                    "id": "162",
                    "menu_order": "162",
                    "parent_id": "132",
                    "permissions_id": "162"
                  },
                  {
                    "function_name": "规则库及白名单",
                    "id": "169",
                    "menu_order": "169",
                    "parent_id": "132",
                    "permissions_id": "169"
                  },
                  {
                    "function_name": "联动",
                    "id": "183",
                    "menu_order": "183",
                    "parent_id": "132",
                    "permissions_id": "183"
                  },
                  {
                    "function_name": "威胁通知",
                    "id": "187",
                    "menu_order": "187",
                    "parent_id": "132",
                    "permissions_id": "187"
                  },
                  {
                    "function_name": "日志",
                    "id": "191",
                    "menu_order": "191",
                    "parent_id": "132",
                    "permissions_id": "191"
                  },
                  {
                    "function_name": "恢复/重启",
                    "id": "204",
                    "menu_order": "204",
                    "parent_id": "132",
                    "permissions_id": "204"
                  },
                  {
                    "function_name": "许可证",
                    "id": "207",
                    "menu_order": "207",
                    "parent_id": "132",
                    "permissions_id": "207"
                  },
                  {
                    "function_name": "重启/恢复",
                    "id": "239",
                    "menu_order": "239",
                    "parent_id": "132",
                    "permissions_id": "239"
                  }
                ]
              }
            ]}}

        console.log(resp);

        let roles = forRoleList(resp);

        roles = [...roles,...['995','2']]
        //临时测试数据
        roles = [...roles,...['61','62','611','612','621','622','623','624','625',
          '626','627','628','629','6210','6211','6212','6213','44']];

        if (!roles.includes('117')) {
          roles.push('117');
          commit('SET_SANDBOX', false);
        } else {
          commit('SET_SANDBOX', true);
        }
        commit('SET_ROLES', roles);

        return roles;

      } catch (err) {
        console.log(err);
      }
    },

    async LogOut({
      commit,
      dispatch
    }) {
      try {
        let resp = await axios('/yiiapi/site/logout');
        let {
          status,
          msg,
          data
        } = resp.data;

        if (status == 0) {
          commit('SET_ROLES', []);
          commit('SET_TOKEN', data);
          removeToken();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async GenerateRoutes({
      commit
    }, data) {

      return new Promise(resolve => {
        const {
          roles
        } = data;

        const accessedRouters = formatList(asyncRouterMap, roles);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}
