<template>
  <div class="handle-locality"
       v-cloak>
    <vm-handle-risks :threats="threats">
      <slot slot="name">
        <span>本机</span>
      </slot>
      <slot>
        <div class="outside-middle">
          <div class="osm-top">
            <img class="osm-img"
                 src="../../../../assets/images/handle/risks/edit.png">
            <span class="osm-title">威胁及安全建议</span>
          </div>
          <div class="osm-middle">
            <dl>
              <dt class="osm-dt">威胁描述</dt>
              <dd class="osm-dd">本机威胁是指攻击者在一个资产内部的执行恶意程序、脚本和命令的攻击行为，其目的是为了执行某个程序、提权、防御逃逸、窃取账号密码以及获得在该资产上持久性的访问等。 </dd>
            </dl>
            <dl>
              <dt class="osm-dt">安全建议</dt>
              <dd class="osm-dd">
                <ul>
                  <li>1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；</li>
                  <li>2、部署带有静态分析、动态分析、漏洞防御、主机防火墙、主机IPS等多重防御功能的端点安全解决方案；</li>
                  <li>3、采用端点检测和响应解决方案（EDR）大力提升在端点上的威胁检测和响应的能力。</li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </slot>
    </vm-handle-risks>
  </div>
</template>

<script type="text/ecmascript-6">
import VmHandleRisks from '../vm-handle/vm-handle-risks'
import { eventBus } from '@/components/common/eventBus.js';
export default {
  name: 'handle-locality',
  data () {
    return {
      threats: 'nativethreat'
    };
  },
  components: { VmHandleRisks },
  created () {
    //this.check_passwd();
  },
  methods: {
    // 测试密码过期
    check_passwd () {
      this.$axios.get('/yiiapi/site/CheckPasswdReset')
        .then((resp) => {
          let {
            status,
            msg,
            data
          } = resp.data;
          if (status == '602') {
            this.$message(
              {
                message: msg,
                type: 'warning',
              }
            );
            eventBus.$emit('reset')
          }
        })
    }
  }
};
</script>

<style scoped lang="less">
</style>

