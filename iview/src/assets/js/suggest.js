var suggest_list = [{
    key: 0,
    name: '',
    des: '',
    handle: [],
    reinforce: [],
  },
  {
    key: 1,
    name: '恶意文件通讯	',
    des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
    handle: [
      '1、把机器从网络隔离；',
      '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
      '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
      '4、安装防病毒软件做全盘扫描。',
    ],
    reinforce: [
      '1、提升端点安全能力；',
      '2、用网络安全设备禁止不需要联网的设备联网；',
      '3、用网络威胁检测工具及早发现外联威胁。',
    ],
  },
  {
    key: 2,
    name: '广告软件	Adware',
    des: '广告软件是危险性相对较低的恶意软件，但可能会导致更大的威胁发生，所以也需要及时清除。',
    handle: [
      '1、把机器从网络隔离；',
      '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
      '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
      '4、安装防病毒软件做全盘扫描。',
    ],
    reinforce: [
      '1、提升端点安全能力；',
      '2、用网络安全设备禁止不需要联网的设备联网；',
      '3、用网络威胁检测工具及早发现外联威胁。',
    ],
  },
  {
    key: 3,
    name: '危险工具	graytool',
    des: '危险工具有可能被管理员或者是内部的安全工具所使用，但大部分情况是网络失陷的标志。这些工具有可能用于扫描、信息收集或者是控制，需要看具体工具确定攻击目的。',
    handle: [
      '1、确认是否是管理员或者是安全工具的合法使用；',
      '2、如果不是，需要根据威胁指标的提示做相应的处置。',
    ],
    reinforce: [
      '根据实际使用的危险工具做具体的加固。'
    ],
  },
  {
    key: 4,
    name: '漏洞利用	Exploit',
    des: '攻击者利用机器上所装应用或者服务的漏洞进行漏洞利用攻击。在网络流量中检测到这种漏洞利用行为并不一定代表被攻击机器中漏洞利用的成功。',
    handle: [
      '1、在被攻击机器上确认漏洞利用是否成功；',
      '2、如果漏洞利用成功， 隔离该机器并做安全分析',
    ],
    reinforce: [
      '1、对Web应用程序采用WAF减小攻击面；',
      '2、关闭机器上不必要的服务，采用Windows EMET等技术防止漏洞利用；',
      '3、对机器上的应用和服务采用应用隔离、沙箱、以及最小权限等措施减少被攻击后的访问权限；',
      '4、做好网络划分，增加横向移动难度；',
      '5、利用威胁情报以及定期做漏洞扫描发现漏洞，及时打重要漏洞补丁。',
    ],
  },
  {
    key: 5,
    name: '其他	Others',
    des: '无',
    handle: ['无'],
    reinforce: ['无'],
  },
  {
    key: 6,
    name: 'EICAR	eicar',
    des: 'EICAR是一个用于测试的不具有危害的但防病毒软件会告警的程序。',
    handle: ['不需要处置。'],
    reinforce: ['无'],
  },
  {
    key: 7,
    name: 'SQL注入	sqlinjection',
    des: 'SQL注入是攻击者利用数据库设计、开发、缺乏校验等漏洞而导致应用做非设计本意的行为。',
    handle: [
      '1、根据SQL注入脚本确认注入是否成功；',
      '2、由于SQL注入漏洞的不同，注入可以导致不同的结果。根据具体注入脚本的行为做处置。',
    ],
    reinforce: [
      '1、采用WAF等安全设备减小攻击面；',
      '2、对机器上的应用和服务采用应用隔离、沙箱、以及最小权限等措施减少被攻击后的访问权限；',
      '3、定期做漏洞扫描发现漏洞，及时打重要漏洞补丁。',
    ],
  },
  {
    key: 8,
    name: '暴力破解	BruteForce',
    des: '攻击者采用大量的猜测的账号和密码组合或者是少量的符合网络密码策略的常用密码(password spraying)尝试登录网络，一旦登录成功，就是合法账号登录，极难再被检测到。常见的被暴力破解攻击的服务包括：SSH (22/TCP)、Telnet (23/TCP)、FTP (21/TCP)、NetBIOS / SMB / Samba (139/TCP & 445/TCP)、LDAP (389/TCP)、Kerberos (88/TCP)、RDP / Terminal Services (3389/TCP)、HTTP/HTTP Management Services (80/TCP & 443/TCP)、MSSQL (1433/TCP)、Oracle (1521/TCP)、MySQL (3306/TCP)、VNC (5900/TCP)。',
    handle: [
      '1、查看被攻击机器的系统登录日志确认是否暴力破解登录成功。如果成功，修改该账号密码；',
      '2、如果是外部威胁，在安全网关上阻止该攻击地址。',
    ],
    reinforce: [
      '1、采用合适的账号锁定策略，在一定数量的失败登录后锁定账号。但这个策略不能制定太严格，避免在攻击的时候造成被攻击的大量账号全部被锁定。对于关键应用，在一定数量的失败登录后要求格外的验证可以有效解决这个问题；',
      '2、采用多因素认证；',
      '3、参考NIST密码策略制定网络密码策略。'
    ],
  },
  {
    key: 9,
    name: 'WebShell	WebShell',
    des: 'Web Shell是利用失窃账号或者漏洞而放置在Web服务器上用来和攻击者交互的入口。',
    handle: [
      '1、确认是否成功，如果成功，隔离机器并做清除、扫描和安全分析；',
      '2、重点关注是否有横向移动的痕迹。',
    ],
    reinforce: [
      '1、根据根因分析结果打补丁或者修改账号密码；',
      '2、管理Web服务器的账号需要和内网的账号做区分。',
    ],
  },
  {
    key: 10,
    name: "扫描	Scan",
    des: '攻击者通过扫描发现运行在机器上的服务，包括可能存在漏洞的服务。 ',
    handle: [
      '无',
    ],
    reinforce: [
      '1、及时打重大漏洞补丁；',
      '2、禁用不需要的服务；',
      '3、对关键服务，创建访问列表防止未知机器的访问甚至限制远程访问。',
    ],
  },
  {
    key: 11,
    name: "恶意程序	malwarefile",
    des: '下载了一个恶意程序到机器里，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
    handle: [
      '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程下载了恶意程序；',
      '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
      '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
      '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
    ],
  },
  {
    key: 12,
    name: "恶意地址	malware",
    des: '机器访问了带有恶意程序的地址。',
    handle: [
      '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个恶意地址；',
      '2、安装防病毒软件并且更新到最新做全盘查杀。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、用户安全意识培训提升安全意识。',
    ],
  },
  {
    key: 13,
    name: "tor出口节点	tor_exit_node",
    des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
    handle: [
      '1、确认机器的使用者是否合法使用Tor；',
      '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止Tor节点地址。',
    ],
  },
  {
    key: 14,
    name: "tor入口节点	tor_node",
    des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
    handle: [
      '1、确认机器的使用者是否合法使用Tor；',
      '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止Tor节点地址。',
    ],
  },
  {
    key: 15,
    name: "垃圾邮件	spam ",
    des: '垃圾邮件本身不具有安全威胁，是不想在网络里出现的信息。',
    handle: [
      '无',
    ],
    reinforce: [
      '通过网络安全设备阻止垃圾邮件地址。',
    ],
  },
  {
    key: 16,
    name: '僵尸网络C&C	botc&c ',
    des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
    handle: [
      '1、把机器从网络隔离；',
      '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
      '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
      '4、安装防病毒软件做全盘扫描。',
    ],
    reinforce: [
      '1、提升端点安全能力；',
      '2、用网络安全设备禁止不需要联网的设备联网；',
      '3、用网络威胁检测工具及早发现外联威胁。',
    ],
  },
  {
    key: 17,
    name: '移动恶意软件	mobilemalware',
    des: '下载了一个恶意程序到机器里，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
    handle: [
      '1、根据告警详情里的“网络事件”里的机器端口定位是什么进程下载了恶意程序；',
      '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
      '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
      '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
    ],
  },
  {
    key: 18,
    name: '网络诈骗	fraud',
    des: '通过社交工程等手段引诱用户上当。',
    handle: [
      '1、如果存在金钱损失等情况应及时做相应的应急处理；',
      '2、对机器做扫描和安全分析。',
    ],
    reinforce: [
      '1、考虑用网络安全设备拦截网络诈骗地址；',
      '2、用户通过安全意识培训识别社交工程等手段。',
    ],
  },
  {
    key: 19,
    name: '恶意重定向	maliciousredirect',
    des: '通过重定向把用户引入恶意地址。',
    handle: [
      '1、如果存在恶意感染、信息泄露等情况应及时做相应的应急处理；',
      '2、对机器做扫描和安全分析。',
    ],
    reinforce: [
      '1、考虑用网络安全设备拦截恶意重定向地址；',
      '2、用户通过安全意识培训提升安全意识。',
    ],
  },
  {
    key: 20,
    name: '网络代理	proxy',
    des: '攻击者用网络代理隐藏攻击来源和加密通讯通道，但也存在部分用户用网络代理保护隐私的情况。',
    handle: [
      '1、确认机器的使用者是否合法使用网络代理；',
      '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个节点，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止网络代理地址。',
    ],
  },
  {
    key: 21,
    name: '钓鱼网站	phishing',
    des: '通过社交工程等手段引诱用户点击某个链接、下载文档甚至可执行文件或者输入账号等信息达到窃取信息、利用浏览器漏洞或者植入恶意程序的目的。',
    handle: [
      '1、如果存在账号等信息失窃行为应及时更改账号密码和相应的应急处理；',
      '2、对机器做扫描和安全分析。',
    ],
    reinforce: [
      '1、考虑用网络安全设备拦截钓鱼地址；',
      '2、用户通过安全意识培训识别社交工程等手段。',
    ],
  },
  {
    key: 22,
    name: '勒索软件通讯	ransomwareurl',
    des: '该地址用于下载勒索软件或者是跟勒索软件通讯。',
    handle: [
      '1、把机器从网络隔离；',
      '2、如果是下载了勒索软件，及时清除该软件；',
      '3、如果被勒索软件加密，先搜索安全公司的网站看是否有解密工具。',
    ],
    reinforce: [
      '1、用网络安全设备阻止该地址；',
      '2、安装防病毒软件并且及时更新病毒库。',
    ],
  },
  {
    key: 23,
    name: '已知APT攻击',
    des: '本威胁是检测到网络与曾经被APT组织使用过的地址通讯或者是相关工具出现在网络中。',
    handle: [
      '1、确认被检测的威胁指标是否还有效；',
      '2、如果确认有效，需要根据APT组织的相关情报信息做应急响应并做最高优先级处理。',
    ],
    reinforce: [
      '根据该APT组织的战术、技术和流程（TTP）做相应的安全加固。',
    ],
  },
  {
    key: 24,
    name: '恶意证书',
    des: '机器里的程序采用恶意的ssl证书跟外界通讯。',
    handle: [
      '1、把机器从网络隔离；',
      '2、根据告警详情里的“网络事件”里的机器端口定位机器的恶意进程；',
      '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
      '4、安装防病毒软件做全盘扫描。',
    ],
    reinforce: [
      '1、提升端点安全能力；',
      '2、用网络安全设备禁止不需要联网的设备联网；',
      '3、用网络威胁检测工具及早发现外联威胁。',
    ],
  },
  {
    key: 25,
    name: 'VPN地址',
    des: 'VPN地址是公共VPN服务商的VPN服务器地址，攻击者利用VPN绕过企业的安全策略，但也存在少量的合法使用公共VPN的情形。',
    handle: [
      '1、确认机器的使用者是否合法使用VPN；',
      '2、如果确认被攻击，根据告警详情里的“网络事件”里的机器端口定位是什么进程访问了这个地址，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止该公共VPN地址。',
    ],
  },
  {
    key: 31,
    name: '扫描Scanning host',
    des: '攻击者通过扫描发现运行在机器上的服务，包括可能存在漏洞的服务。 ',
    handle: [
      '无',
    ],
    reinforce: [
      '1、及时打重大漏洞补丁;',
      '2、禁用不需要的服务；',
      '3、对关键服务，创建访问列表防止未知机器的访问甚至限制远程访问。',
    ],
  },
  {
    key: 32,
    name: '恶意程序/恶意文件/移动恶意软件 MalicousHash Malware mobilemalware',
    des: '检测到一个恶意程序，可能是恶意文件下载、恶意文件拷贝或者是恶意的邮件附件等。',
    handle: [
      '1、定位是什么进程下载了恶意程序；',
      '2. 如果机器里安装有防病毒软件，根据本系统检测的文件名或者哈希值确认恶意程序是否已经被查杀；',
      '3、如果没有被查杀，而且恶意程序没有被执行，手动清除恶意程序；',
      '4. 如果恶意程序得到了执行，清除执行后的进程、子进程以及可能生成的或者下载的更多的恶意程序。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、用户安全意识培训避免下载恶意程序或者点击恶意邮件附件。',
    ],
  },
  {
    key: 33,
    name: '3.恶意地址	malware',
    des: '机器访问了带有恶意程序的地址。',
    handle: [
      '1、定位是什么进程访问了这个恶意地址；',
      '2、安装防病毒软件并且更新到最新做全盘查杀。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、用户安全意识培训提升安全意识。',
    ],
  },
  {
    key: 34,
    name: '4.tor出口节点/tor入口节点/洋葱节点	tor_exit_node tor_node',
    des: '攻击者用Tor隐藏攻击来源和加密通讯通道，但也存在部分用户用Tor保护隐私的情况。',
    handle: [
      '1、确认机器的使用者是否合法使用Tor；',
      '2、如果确认被攻击，定位是什么进程访问了这个节点，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止Tor节点地址。',
    ],
  },
  {
    key: 35,
    name: '5.垃圾邮件	spam ',
    des: '垃圾邮件本身不具有安全威胁，属于不想在网络里出现的信息。',
    handle: [
      '无',
    ],
    reinforce: [
      '通过网络安全设备阻止垃圾邮件地址。',
    ],
  },
  {
    key: 36,
    name: '6.网络诈骗	fraud',
    des: '通过社交工程等手段引诱用户上当。',
    handle: [
      '1、如果存在金钱损失等情况应及时做相应的应急处理；',
      '2、对机器做扫描和安全分析。',
    ],
    reinforce: [
      '1、考虑用网络安全设备拦截网络诈骗地址；',
      '2、用户通过安全意识培训识别社交工程等手段。',
    ],
  },
  {
    key: 37,
    name: '7.恶意重定向	maliciousredirect',
    des: '通过重定向把用户引到恶意地址。',
    handle: [
      '1、如果存在恶意感染、信息泄露等情况应及时做相应的应急处理；',
      '2、对机器做扫描和安全分析。',
    ],
    reinforce: [
      '1、考虑用网络安全设备拦截恶意重定向地址；',
      '2、用户通过安全意识培训提升安全意识。',
    ],
  },
  {
    key: 38,
    name: '8.网络代理	proxy',
    des: '攻击者用网络代理隐藏攻击来源和加密通讯通道，但也存在部分用户用网络代理保护隐私的情况。',
    handle: [
      '1、确认机器的使用者是否合法使用网络代理；',
      '2、如果确认被攻击，定位是什么进程访问了这个节点，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止网络代理地址。',
    ],
  },
  {
    key: 39,
    name: '9.钓鱼网站	phishing',
    des: '通过社交工程等手段引诱用户点击某个链接、下载文档甚至可执行文件或者输入账号等信息达到窃取信息、利用浏览器漏洞或者植入恶意程序的目的。 ',
    handle: [
      '1、如果存在账号等信息失窃行为应及时更改账号密码和相应的应急处理；',
      '2、对机器做扫描和安全分析。',
    ],
    reinforce: [
      '1、考虑用网络安全设备拦截钓鱼地址；',
      '2、用户通过安全意识培训识别社交工程等手段。',
    ],
  },
  {
    key: 310,
    name: '勒索地址	ransom',
    des: '该地址用于下载勒索软件或者是跟勒索软件通讯。',
    handle: [
      '1、把机器从网络隔离；',
      '2、如果是下载了勒索软件，及时清除该软件；',
      '3、如果被勒索软件加密，先搜索安全公司的网站看是否有解密工具。',
    ],
    reinforce: [
      '1、用网络安全设备阻止该地址；',
      '2、安装防病毒软件并且及时更新病毒库。',
    ],
  },
  {
    key: 311,
    name: 'VPN地址vpn',
    des: 'VPN地址是公共VPN服务商的VPN服务器地址，攻击者利用VPN绕过企业的安全策略，但也存在少量的合法使用公共VPN的情形。',
    handle: [
      '1、确认机器的使用者是否合法使用VPN；',
      '2、如果确认被攻击，定位是什么进程访问了这个地址，从而做相应的处置。',
    ],
    reinforce: [
      '1、安装防病毒软件并且及时更新病毒库；',
      '2、考虑用网络安全设备阻止该公共VPN地址。',
    ],
  },
  {
    key: 312,
    name: '僵尸网络C&C botc&C',
    des: '攻击者在机器上装了恶意程序，该恶意程序通过常见的协议或者定制的协议和外部服务器通讯。',
    handle: [
      '1、把机器从网络隔离；',
      '2、定位跟C&C地址通讯的恶意进程；',
      '3、做安全分析确认根因以及威胁扩散程度。如果安装有EDR解决方案，可以直接通过历史信息做安全事件调查快速定位问题；',
      '4、安装防病毒软件做全盘扫描。',
    ],
    reinforce: [
      '1、提升端点安全能力；',
      '2、用网络安全设备禁止不需要联网的设备联网；',
      '3、用网络威胁检测工具及早发现外连威胁。',
    ],
  },
]
export default suggest_list
