
export function setRedirect(per) {

  let redirect = '/404';
  //首页
  if (per.includes('1')) {
    if(per.includes('2')){
      redirect = '/home/overview';
    }else if(per.includes('995')){
      if(per.includes('996')){
        redirect = '/home/base_screen';
      }else if(per.includes('997')){
        redirect = '/home/top_index';
      }else if(per.includes('998')){
        redirect = '/home/aside_content';
      }
    }
  //处置
  }else if(per.includes('13')){

    if(per.includes('14')){
      redirect = '/handle/assets';
    }else if(per.includes('23')){
      if(per.includes('24')){
        redirect = '/handle/risks/outside';
      }else if(per.includes('32')){
        redirect = '/handle/risks/lateral';
      }else if(per.includes('40')){
        redirect = '/handle/risks/outreath';
      }
    }else if(per.includes('48')){
      redirect = '/handle/works';
    }
    //告警
  }else if(per.includes('58')){

    if(per.includes('59')){
      redirect = '/emerge/network';
    }

    //追查
  }else if(per.includes('76')){

    if(per.includes('77')){
      redirect = '/invest/dns';
    }else if(per.includes('81')){
      redirect = '/invest/url';
    }else if(per.includes('85')){
      redirect = '/invest/host';
    }else if(per.includes('93')){
      redirect = '/invest/user';
    }else if(per.includes('97')){
      redirect = '/invest/file';
    }else if(per.includes('101')){
      redirect = '/invest/data';
    }else if(per.includes('105')){
      redirect = '/invest/flow';
    }else if(per.includes('109')){
      redirect = '/invest/ioc';
    }else if(per.includes('117')){
      redirect = '/invest/sandbox';
    }

    //报表
  }else if(per.includes('123')){

    if(per.includes('124')){
      redirect = '/report/create';
    }else if(per.includes('130')){
      redirect = '/report/sending';
    }

    //系统
  }else if(per.includes('132')){
    if(per.includes('61')){
      if(per.includes('611')){
        redirect = '/system/control/move';
      }else if(per.includes('612')){
        redirect = '/system/control/safe';
      }
    }else if(per.includes('62')){
      if(per.includes('621')){
        redirect = '/system/setting/wizard';
      }else if(per.includes('622')){
        redirect = '/system/setting/electric';
      }else if(per.includes('623')){
        redirect = '/system/setting/option';
      }else if(per.includes('624')){
        redirect = '/system/setting/monitor';
      }else if(per.includes('625')){
        redirect = '/system/setting/threat';
      }else if(per.includes('626')){
        redirect = '/system/setting/account';
      }else if(per.includes('627')){
        redirect = '/system/setting/rule';
      }else if(per.includes('628')){
        redirect = '/system/setting/intellience';
      }else if(per.includes('629')){
        redirect = '/system/setting/label';
      }else if(per.includes('6210')) {
        redirect = '/system/setting/react';
      }else if(per.includes('6211')) {
        redirect = '/system/setting/record';
      }else if(per.includes('6212')) {
        redirect = '/system/setting/resume';
      }else if(per.includes('6213')) {
        redirect = '/system/setting/licence';
      }
    }
  }
  return redirect;
}
