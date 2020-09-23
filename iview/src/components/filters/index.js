import Vue from 'vue'

import moment from "moment"

Vue.filter('timestamp', function (value) {
  var dateee = new Date(+new Date(new Date(value).toJSON()) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  return dateee
});

Vue.filter('time', function (value) {
  if (value) {
    value = value.toString();
    if (value.length == 10) {
      value = value * 1000;
    } else {
      value = parseInt(value / 1000) * 1000
    }
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
});
Vue.filter('type', function (value) {
  if (value == '') {
    return '其他'
  } else {
    return value
  }
});

Vue.filter('network_event', function (value) {
  switch (value) {
    case 'Time':
      return '时间'
      break;
    case 'Source IP':
      return '源地址'
      break;
    case 'Destination IP':
      return '目的地址'
      break;
    case 'Traffic':
      return '应用'
      break;
    case 'Method':
      return '方式'
      break;
    case 'URL':
      return 'URL'
      break;
    case 'User Agent':
      return '用户代理'
      break;
    case 'Referrer':
      return '来源参考'
      break;
    case 'TTL':
      return 'TTL'
      break;
    case 'Domain':
      return '域名'
      break;
    case 'SectianType':
      return '类型'
      break;
    case 'Mail_from':
      return '邮件_来自'
      break;
    case 'Recpt_to':
      return '接收_到达'
      break;
    case 'User':
      return '用户'
      break;
    case 'Tool':
      return '工具'
      break;
    case 'Issuerdn':
      return '签发者域名'
      break;
    case 'Authorizing':
      return '授权'
      break;
    case 'Notafter':
      return '有效期'
      break;
    case 'Msg_type':
      return '消息_类型'
      break;
    case 'Cname':
      return 'Cname'
      break;
    case 'Realm':
      return '领域'
      break;
    case 'Sname':
      return 'Sname'
      break;
    default:
      return value
      break;
  }

});

Vue.filter('ip_whois', function (value) {
  switch (value) {
    case 'MX':
      return '邮件服务器'
      break;
    case 'MX_ips':
      return '邮件服务器IP'
      break;
    case 'NS':
      return '域名服务器'
      break;
    case 'NS_ips':
      return '域名服务器IP'
      break;
    case 'created':
      return '域名注册时间'
      break;
    case 'domain':
      return '域名'
      break;
    case 'expires':
      return '域名过期时间'
      break;
    case 'org':
      return '注册人组织'
      break;
    case 'registrar_name':
      return '注册机构名称'
      break;
    case 'city':
      return '注册人城市'
      break;
    case 'country':
      return '注册人国家'
      break;
    case 'email':
      return '注册人邮箱'
      break;
    case 'name':
      return '注册人名称'
      break;
    case 'registrar_email':
      return '注册机构邮箱'
      break;
    case 'contact_abuse_email':
      return '滥用报告邮箱'
      break;
    case 'contact_abuse_name':
      return '滥用报告接口人'
      break;
    case 'contact_owner_city':
      return '网络所有者城市'
      break;
    case 'contact_owner_code':
      return '网络所有者编码'
      break;
    case 'contact_owner_country':
      return '网络所有者国家'
      break;
    case 'contact_owner_email':
      return '网络所有者邮箱'
      break;
    case 'contact_owner_name':
      return '网络所有者名称'
      break;
    case 'created':
      return '网络注册时间'
      break;
    case 'net_name':
      return '网络名称'
      break;
    case 'net_range':
      return '网络地址范围'
      break;
    case 'updated':
      return '网络更新时间'
      break;
    case 'asn':
      return '自主系统号（ ASN）'
      break;
    case 'contact_abuse_name':
      return '滥用报告接口人'
      break;
    case 'contact_abuse_email':
      return '滥用报告邮箱'
      break;
    case 'descr':
      return '网络描述'
      break;
  }

});

Vue.filter('degree_sino', function (args) {
  let str = '';
  if (args == '高') {
    str = '高危';
  } else if (args == '中') {
    str = '中危';
  } else if (args == '低') {
    str = '低危';
  }
  return str;
});
// 安全域
Vue.filter('securityDomain', function (args) {
  let str = '';
  // 安全域：terminal，ueba，audit，network
  if (args == 'network') {
    str = '网络';
  } else if (args == 'ueba') {
    str = 'UEBA';
  } else if (args == 'audit') {
    str = '审计';
  } else if (args == 'terminal') {
    str = '端点';
  }
  return str;
});


//威胁等级
Vue.filter('degree', function (args) {
  let str = '';
  if (args == 'high') {
    str = '高危';
  } else if (args == 'medium') {
    str = '中危';
  } else if (args == 'low') {
    str = '低危';
  }
  return str;
});

//失陷确定性
Vue.filter('certainty', function (args) {
  args += ''
  let str = '';
  if (args == '0') {
    str = '';
  } else if (args == '1') {
    str = '已失陷';
  }
  return str;
});

//处理状态(处置-资产维度)
Vue.filter('risk_status', function (args) {
  args += ''
  let str = '';
  if (args == '1') {
    str = '待处置';
  } else if (args == '2') {
    str = '处置中';
  } else if (args == '3') {
    str = '已处置'
  } else if (args == '4') {
    str = '已忽略';
  } else if (args == '5') {
    str = '误报';
  }
  return str;
});

//处理状态(告警)
Vue.filter('alert_status', function (args) {
  args += ''
  let str = '';
  if (args == '0') {
    str = '新告警';
  } else if (args == '1') {
    str = '待处置';
  } else if (args == '2') {
    str = '处置中';
  } else if (args == '3') {
    str = '已处置';
  } else if (args == '4') {
    str = '已忽略';
  } else if (args == '5') {
    str = '误报';
  }
  return str;
});


//处理状态(处置-工单中心)
Vue.filter('work_status', function (args) {
  //console.log(args);
  args += ''
  let str = '';
  switch (args) {
    case '':
      str = '未关联工单';
      break;
    case '0':
      str = '待分配';
      break;
    case '1':
      str = '已分配';
      break;
    case '2':
      str = '处置中';
      break;
    case '3':
      str = '已处置';
      break;
    case '4':
      str = '已取消';
      break;
    default:
      break;
  }
  return str;
});

//优先级
Vue.filter('priority', function (args) {
  let str = '';
  if (args == 'highest') {
    str = '最高';
  } else if (args == 'high') {
    str = '高';
  } else if (args == 'medium') {
    str = '中';
  } else if (args == 'low') {
    str = '低';
  }
  return str;
});
//优先级
Vue.filter('priorityColor', function (args) {
  let str = '';
  if (args == 'highest') {
    str = '#dc5f5f';
  } else if (args == 'high') {
    str = '#e0c840';
  } else if (args == 'medium') {
    str = '#5389e0';
  } else if (args == 'low') {
    str = '#47cad9';
  }
  return str;
});

Vue.filter('filterType', function (args) {
  if (args == '') return;
  if (args == undefined) return;
  if (args == 0) return '0B';
  var k = 1024;
  var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(args) / Math.log(k));
  return (args / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
});

///////////大屏设置
//状态
Vue.filter('sys', function (args) {
  let str = '';
  if (args == 'cpu') {
    str = 'CPU';
  } else if (args == 'disk') {
    str = '硬盘';
  } else if (args == 'mem') {
    str = '内存';
  }
  return str;
});

//大屏攻击阶段
Vue.filter('stage', function (args) {
  let str = '';
  if (args == 'Initial Access') {
    str = '初始访问';
  } else if (args == 'Execution') {
    str = '执行';
  } else if (args == 'Persistence') {
    str = '持久化';
  } else if (args == 'Privilege Escalation') {
    str = '提权';
  } else if (args == 'Defense Evasion') {
    str = '防御逃逸';
  } else if (args == 'Credential Access') {
    str = '凭证访问';
  } else if (args == 'Discovery') {
    str = '信息发现';
  } else if (args == 'Lateral Movement') {
    str = '横向移动';
  } else if (args == 'Collection') {
    str = '信息收集';
  } else if (args == 'Command and Control') {
    str = '命令控制';
  } else if (args == 'Exfiltration') {
    str = '信息泄露';
  } else if (args == 'Impact') {
    str = '毁坏';
  }
  return str;
});

//大屏关注告警
Vue.filter('alarm', function (args) {
  let str = '';
  if (args == 'cnc') {
    str = '僵尸网络C&C';
  } else if (args == 'exploit') {
    str = '漏洞利用';
  } else if (args == 'malware') {
    str = '恶意程序';
  }
  return str;
});

//告警应用特殊处理
Vue.filter('applite', function (args) {
  let str = '';
  if (args != 'None') {
    str = args;
  } else {
    str == '';
  }
  return str;
});
// 对应国家翻译
Vue.filter('country_code', function (args) {
  args = args.toUpperCase()
  let country_cn = ''
  switch (args) {
    case 'O1':
      country_cn = '其他国家'
      break;
    case 'o1':
      country_cn = '其他国家'
      break;
    case 'AD':
      country_cn = '安道尔'
      break;
    case 'AE':
      country_cn = '阿拉伯联合酋长国'
      break;
    case 'AF':
      country_cn = '阿富汗'
      break;
    case 'AG':
      country_cn = '安提瓜和巴布达'
      break;
    case 'AI':
      country_cn = '安圭拉'
      break;
    case 'AL':
      country_cn = '阿尔巴尼亚'
      break;
    case 'AM':
      country_cn = '亚美尼亚'
      break;
    case 'AO':
      country_cn = '安哥拉'
      break;
    case 'AP':
      country_cn = '亚太地区'
      break;
    case 'AQ':
      country_cn = '南极洲'
      break;
    case 'AR':
      country_cn = '阿根廷'
      break;
    case 'AS':
      country_cn = '美属萨摩亚'
      break;
    case 'AT':
      country_cn = '奥地利'
      break;
    case 'AU':
      country_cn = '澳大利亚'
      break;
    case 'AW':
      country_cn = '阿鲁巴'
      break;
    case 'AX':
      country_cn = '奥兰群岛'
      break;
    case 'AZ':
      country_cn = '阿塞拜疆'
      break;
    case 'BA':
      country_cn = '波黑'
      break;
    case 'BB':
      country_cn = '巴巴多斯'
      break;
    case 'BD':
      country_cn = '孟加拉国'
      break;
    case 'BE':
      country_cn = '比利时'
      break;
    case 'BF':
      country_cn = '布基纳法索'
      break;
    case 'BG':
      country_cn = '保加利亚'
      break;
    case 'BH':
      country_cn = '巴林'
      break;
    case 'BI':
      country_cn = '布隆迪'
      break;
    case 'BJ':
      country_cn = '贝宁'
      break;
    case 'BL':
      country_cn = '圣巴泰勒米'
      break;
    case 'BM':
      country_cn = '百慕大'
      break;
    case 'BN':
      country_cn = '文莱达鲁萨兰国'
      break;
    case 'BO':
      country_cn = '玻利维亚'
      break;
    case 'BQ':
      country_cn = '博奈尔岛,圣尤斯达蒂斯和萨巴岛'
      break;
    case 'BR':
      country_cn = '巴西'
      break;
    case 'BS':
      country_cn = '巴哈马'
      break;
    case 'BT':
      country_cn = '不丹'
      break;
    case 'BV':
      country_cn = '布维岛'
      break;
    case 'BW':
      country_cn = '博茨瓦纳'
      break;
    case 'BY':
      country_cn = '白俄罗斯'
      break;
    case 'BZ':
      country_cn = '伯利兹'
      break;
    case 'CA':
      country_cn = '加拿大'
      break;
    case 'CC':
      country_cn = '科科斯（ 基林） 群岛'
      break;
    case 'CD':
      country_cn = '刚果民主共和国'
      break;
    case 'CF':
      country_cn = '中非共和国'
      break;
    case 'CG':
      country_cn = '刚果'
      break;
    case 'CH':
      country_cn = '瑞士'
      break;
    case 'CI':
      country_cn = '科特迪瓦'
      break;
    case 'CK':
      country_cn = '库克群岛'
      break;
    case 'CL':
      country_cn = '智利'
      break;
    case 'CM':
      country_cn = '喀麦隆'
      break;
    case 'CN':
      country_cn = '中国'
      break;
    case 'CO':
      country_cn = '哥伦比亚'
      break;
    case 'CR':
      country_cn = '哥斯达黎加'
      break;
    case 'CU':
      country_cn = '古巴'
      break;
    case 'CV':
      country_cn = '佛得角'
      break;
    case 'CW':
      country_cn = '库拉索'
      break;
    case 'CX':
      country_cn = '圣诞岛'
      break;
    case 'CY':
      country_cn = '塞浦路斯'
      break;
    case 'CZ':
      country_cn = '捷克共和国'
      break;
    case 'DE':
      country_cn = '德国'
      break;
    case 'DJ':
      country_cn = '吉布地'
      break;
    case 'DK':
      country_cn = '丹麦'
      break;
    case 'DM':
      country_cn = '多米尼加'
      break;
    case 'DO':
      country_cn = '多明尼加共和国'
      break;
    case 'DZ':
      country_cn = '阿尔及利亚'
      break;
    case 'EC':
      country_cn = '厄瓜多尔'
      break;
    case 'EE':
      country_cn = '爱沙尼亚'
      break;
    case 'EG':
      country_cn = '埃及'
      break;
    case 'EH':
      country_cn = '西撒哈拉'
      break;
    case 'ER':
      country_cn = '厄立特里亚'
      break;
    case 'ES':
      country_cn = '西班牙'
      break;
    case 'ET':
      country_cn = '埃塞俄比亚'
      break;
    case 'EU':
      country_cn = '欧洲'
      break;
    case 'FI':
      country_cn = '芬兰'
      break;
    case 'FJ':
      country_cn = '斐济'
      break;
    case 'FK':
      country_cn = '福克兰群岛（马尔维纳斯）'
      break;
    case 'FM':
      country_cn = '密克罗尼西亚联邦'
      break;
    case 'FO':
      country_cn = '法罗群岛'
      break;
    case 'FR':
      country_cn = '法国'
      break;
    case 'GA':
      country_cn = '加蓬'
      break;
    case 'GB':
      country_cn = '英国'
      break;
    case 'GD':
      country_cn = '格林纳达'
      break;
    case 'GE':
      country_cn = '佐治亚州'
      break;
    case 'GF':
      country_cn = '法属圭亚那'
      break;
    case 'GG':
      country_cn = '根西岛'
      break;
    case 'GH':
      country_cn = '加纳'
      break;
    case 'GI':
      country_cn = '直布罗陀'
      break;
    case 'GL':
      country_cn = '格陵兰'
      break;
    case 'GM':
      country_cn = '冈比亚'
      break;
    case 'GN':
      country_cn = '几内亚'
      break;
    case 'GP':
      country_cn = '瓜德罗普岛'
      break;
    case 'GQ':
      country_cn = '赤道几内亚'
      break;
    case 'GR':
      country_cn = '希腊'
      break;
    case 'GS':
      country_cn = '南乔治亚岛和南桑威奇群岛'
      break;
    case 'GT':
      country_cn = '危地马拉'
      break;
    case 'GU':
      country_cn = '关岛'
      break;
    case 'GW':
      country_cn = '几内亚比绍'
      break;
    case 'GY':
      country_cn = '圭亚那'
      break;
    case 'HK':
      country_cn = '香港'
      break;
    case 'HM':
      country_cn = '赫德岛和麦克唐纳群岛'
      break;
    case 'HN':
      country_cn = '洪都拉斯'
      break;
    case 'HR':
      country_cn = '克罗地亚'
      break;
    case 'HT':
      country_cn = '海地'
      break;
    case 'HU':
      country_cn = '匈牙利'
      break;
    case 'ID':
      country_cn = '印度尼西亚'
      break;
    case 'IE':
      country_cn = '爱尔兰'
      break;
    case 'IL':
      country_cn = '以色列'
      break;
    case 'IM':
      country_cn = '马恩岛'
      break;
    case 'IN':
      country_cn = '印度'
      break;
    case 'IO':
      country_cn = '英属印度洋领地'
      break;
    case 'IQ':
      country_cn = '伊拉克'
      break;
    case 'IR':
      country_cn = '伊朗伊斯兰共和国'
      break;
    case 'IS':
      country_cn = '冰岛'
      break;
    case 'IT':
      country_cn = '意大利'
      break;
    case 'JE':
      country_cn = '泽西岛'
      break;
    case 'JM':
      country_cn = '牙买加'
      break;
    case 'JO':
      country_cn = '约旦'
      break;
    case 'JP':
      country_cn = '日本'
      break;
    case 'KE':
      country_cn = '肯尼亚'
      break;
    case 'KG':
      country_cn = '吉尔吉斯斯坦'
      break;
    case 'KH':
      country_cn = '柬埔寨'
      break;
    case 'KI':
      country_cn = '基里巴斯'
      break;
    case 'KM':
      country_cn = '科摩罗'
      break;
    case 'KN':
      country_cn = '圣基茨和尼维斯'
      break;
    case 'KP':
      country_cn = '朝鲜民主主义人民共和国'
      break;
    case 'KR':
      country_cn = '韩国'
      break;
    case 'KW':
      country_cn = '科威特'
      break;
    case 'KY':
      country_cn = '开曼群岛'
      break;
    case 'KZ':
      country_cn = '哈萨克斯坦'
      break;
    case 'LA':
      country_cn = '老挝人民民主共和国'
      break;
    case 'LB':
      country_cn = '黎巴嫩'
      break;
    case 'LC':
      country_cn = '圣卢西亚'
      break;
    case 'LI':
      country_cn = '列支敦士登'
      break;
    case 'LK':
      country_cn = '斯里兰卡'
      break;
    case 'LR':
      country_cn = '利比里亚'
      break;
    case 'LS':
      country_cn = '莱索托'
      break;
    case 'LT':
      country_cn = '立陶宛'
      break;
    case 'LU':
      country_cn = '卢森堡'
      break;
    case 'LV':
      country_cn = '拉脱维亚'
      break;
    case 'LY':
      country_cn = '阿拉伯利比亚民众国'
      break;
    case 'MA':
      country_cn = '摩洛哥'
      break;
    case 'MC':
      country_cn = '摩纳哥'
      break;
    case 'MD':
      country_cn = '摩尔多瓦共和国'
      break;
    case 'ME':
      country_cn = '黑山共和国'
      break;
    case 'MF':
      country_cn = '圣马丁'
      break;
    case 'MG':
      country_cn = '马达加斯加'
      break;
    case 'MH':
      country_cn = '马绍尔群岛'
      break;
    case 'MK':
      country_cn = '马其顿'
      break;
    case 'ML':
      country_cn = '马里'
      break;
    case 'MM':
      country_cn = '缅甸'
      break;
    case 'MN':
      country_cn = '蒙古'
      break;
    case 'MO':
      country_cn = '澳门'
      break;
    case 'MP':
      country_cn = '北马里亚纳群岛'
      break;
    case 'MQ':
      country_cn = '马提尼克岛'
      break;
    case 'MR':
      country_cn = '毛里塔尼亚'
      break;
    case 'MS':
      country_cn = '蒙特塞拉特'
      break;
    case 'MT':
      country_cn = '马耳他'
      break;
    case 'MU':
      country_cn = '毛里求斯'
      break;
    case 'MV':
      country_cn = '马尔代夫'
      break;
    case 'MW':
      country_cn = '马拉维'
      break;
    case 'MX':
      country_cn = '墨西哥'
      break;
    case 'MY':
      country_cn = '马来西亚'
      break;
    case 'MZ':
      country_cn = '莫桑比克'
      break;
    case 'NA':
      country_cn = '纳米比亚'
      break;
    case 'NC':
      country_cn = '新喀里多尼亚'
      break;
    case 'NE':
      country_cn = '尼日尔'
      break;
    case 'NF':
      country_cn = '诺福克岛'
      break;
    case 'NG':
      country_cn = '尼日利亚'
      break;
    case 'NI':
      country_cn = '尼加拉瓜'
      break;
    case 'NL':
      country_cn = '荷兰'
      break;
    case 'NO':
      country_cn = '挪威'
      break;
    case 'NP':
      country_cn = '尼泊尔'
      break;
    case 'NR':
      country_cn = '瑙鲁'
      break;
    case 'NU':
      country_cn = '纽埃'
      break;
    case 'NZ':
      country_cn = '新西兰'
      break;
    case 'OM':
      country_cn = '阿曼'
      break;
    case 'PA':
      country_cn = '巴拿马'
      break;
    case 'PE':
      country_cn = '秘鲁'
      break;
    case 'PF':
      country_cn = '法属波利尼西亚'
      break;
    case 'PG':
      country_cn = '巴布亚新几内亚'
      break;
    case 'PH':
      country_cn = '菲律宾'
      break;
    case 'PK':
      country_cn = '巴基斯坦'
      break;
    case 'PL':
      country_cn = '波兰'
      break;
    case 'PM':
      country_cn = '圣皮埃尔和密克隆群岛'
      break;
    case 'PN':
      country_cn = '皮特凯恩'
      break;
    case 'PR':
      country_cn = '波多黎各'
      break;
    case 'PS':
      country_cn = '巴勒斯坦'
      break;
    case 'PT':
      country_cn = '葡萄牙'
      break;
    case 'PW':
      country_cn = '帕劳'
      break;
    case 'PY':
      country_cn = '巴拉圭'
      break;
    case 'QA':
      country_cn = '卡塔尔'
      break;
    case 'RE':
      country_cn = '留尼旺岛'
      break;
    case 'RO':
      country_cn = '罗马尼亚'
      break;
    case 'RS':
      country_cn = '塞尔维亚'
      break;
    case 'RU':
      country_cn = '俄罗斯联邦'
      break;
    case 'RW':
      country_cn = '卢旺达'
      break;
    case 'SA':
      country_cn = '沙特阿拉伯'
      break;
    case 'SB':
      country_cn = '所罗门群岛'
      break;
    case 'SC':
      country_cn = '塞舌尔'
      break;
    case 'SD':
      country_cn = '苏丹'
      break;
    case 'SE':
      country_cn = '瑞典'
      break;
    case 'SG':
      country_cn = '新加坡'
      break;
    case 'SH':
      country_cn = '圣海伦娜'
      break;
    case 'SI':
      country_cn = '斯洛文尼亚'
      break;
    case 'SJ':
      country_cn = '斯瓦尔巴群岛和扬马延'
      break;
    case 'SK':
      country_cn = '斯洛伐克'
      break;
    case 'SL':
      country_cn = '塞拉利昂'
      break;
    case 'SM':
      country_cn = '圣马力诺'
      break;
    case 'SN':
      country_cn = '塞内加尔'
      break;
    case 'SO':
      country_cn = '索马里'
      break;
    case 'SR':
      country_cn = '苏里南'
      break;
    case 'SS':
      country_cn = '南苏丹'
      break;
    case 'ST':
      country_cn = '圣多美和普林西比'
      break;
    case 'SV':
      country_cn = '萨尔瓦多'
      break;
    case 'SX':
      country_cn = '圣马丁'
      break;
    case 'SY':
      country_cn = '阿拉伯叙利亚共和国'
      break;
    case 'SZ':
      country_cn = '斯威士兰'
      break;
    case 'TC':
      country_cn = '特克斯和凯科斯群岛'
      break;
    case 'TD':
      country_cn = '乍得'
      break;
    case 'TF':
      country_cn = '法属南部领地'
      break;
    case 'TG':
      country_cn = '多哥'
      break;
    case 'TH':
      country_cn = '泰国'
      break;
    case 'TJ':
      country_cn = '塔吉克斯坦'
      break;
    case 'TK':
      country_cn = '托克劳'
      break;
    case 'TL':
      country_cn = '东帝汶'
      break;
    case 'TM':
      country_cn = '土库曼斯坦'
      break;
    case 'TN':
      country_cn = '突尼斯'
      break;
    case 'TO':
      country_cn = '汤加'
      break;
    case 'TR':
      country_cn = '土耳其'
      break;
    case 'TT':
      country_cn = '特立尼达和多巴哥'
      break;
    case 'TV':
      country_cn = '图瓦卢'
      break;
    case 'TW':
      country_cn = '台湾'
      break;
    case 'TZ':
      country_cn = '坦桑尼亚联合共和国'
      break;
    case 'UA':
      country_cn = '乌克兰'
      break;
    case 'UG':
      country_cn = '乌干达'
      break;
    case 'UM':
      country_cn = '美国本土外小岛屿'
      break;
    case 'US':
      country_cn = '美国'
      break;
    case 'UY':
      country_cn = '乌拉圭'
      break;
    case 'UZ':
      country_cn = '乌兹别克斯坦'
      break;
    case 'VA':
      country_cn = '罗马教廷（ 梵蒂冈城国）'
      break;
    case 'VC':
      country_cn = '圣文森特和格林纳丁斯'
      break;
    case 'VE':
      country_cn = '委内瑞拉'
      break;
    case 'VG':
      country_cn = '英属维尔京群岛'
      break;
    case 'VI':
      country_cn = '美国维尔京群岛'
      break;
    case 'VN':
      country_cn = '越南'
      break;
    case 'VU':
      country_cn = '瓦努阿图'
      break;
    case 'WF':
      country_cn = '瓦利斯和富图纳群岛'
      break;
    case 'WS':
      country_cn = '萨摩亚'
      break;
    case 'YE':
      country_cn = '也门'
      break;
    case 'YT':
      country_cn = '马约特岛'
      break;
    case 'ZA':
      country_cn = '南非'
      break;
    case 'ZM':
      country_cn = '赞比亚'
      break;
    case 'ZW':
      country_cn = '津巴布韦'
      break;

    default:
      break;
  }

  return country_cn;
});
