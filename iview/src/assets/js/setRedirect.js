
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
  }else if(per.includes('4')){

    if(per.includes('5')){
      redirect = '/handle/assets';
    }else if(per.includes('6')){
      if(per.includes('7')){
        redirect = '/handle/risks/outside';
      }else if(per.includes('8')){
        redirect = '/handle/risks/locality';
      }else if(per.includes('9')){
        redirect = '/handle/risks/lateral';
      }else if(per.includes('10')){
        redirect = '/handle/risks/outreath';
      }
    }else if(per.includes('11')){
      redirect = '/handle/works';
    }
    //告警
  }else if(per.includes('12')){

    if(per.includes('12')){
      redirect = '/emerge/network';
    }

    //追查
  }else if(per.includes('14')){

    if(per.includes('15')){
      redirect = '/invest/dns';
    }else if(per.includes('16')){
      redirect = '/invest/url';
    }else if(per.includes('17')){
      redirect = '/invest/host';
    }else if(per.includes('18')){
      redirect = '/invest/user';
    }else if(per.includes('19')){
      redirect = '/invest/file';
    }else if(per.includes('20')){
      redirect = '/invest/data';
    }else if(per.includes('21')){
      redirect = '/invest/flow';
    }else if(per.includes('22')){
      redirect = '/invest/ioc';
    }else if(per.includes('23')){
      redirect = '/invest/sandbox';
    }

    //报表
  }else if(per.includes('24')){

    if(per.includes('25')){
      redirect = '/report/create';
    }else if(per.includes('26')){
      redirect = '/report/sending';
    }

    //系统
  }else if(per.includes('27')){
    if(per.includes('28')){
      if(per.includes('29')){
        redirect = '/system/control/move';
      }else if(per.includes('30')){
        redirect = '/system/control/safe';
      }
    }else if(per.includes('31')){
      if(per.includes('32')){
        redirect = '/system/setting/wizard';
      }else if(per.includes('33')){
        redirect = '/system/setting/electric';
      }else if(per.includes('34')){
        redirect = '/system/setting/option';
      }else if(per.includes('35')){
        redirect = '/system/setting/monitor';
      }else if(per.includes('36')){
        redirect = '/system/setting/threat';
      }else if(per.includes('37')){
        redirect = '/system/setting/account';
      }else if(per.includes('38')){
        redirect = '/system/setting/rule';
      }else if(per.includes('39')){
        redirect = '/system/setting/intellience';
      }else if(per.includes('40')){
        redirect = '/system/setting/label';
      }else if(per.includes('41')) {
        redirect = '/system/setting/react';
      }else if(per.includes('42')) {
        redirect = '/system/setting/record';
      }else if(per.includes('282')) {
        redirect = '/system/setting/resume';
      }else if(per.includes('288')) {
        redirect = '/system/setting/licence';
      }
    }
  }
  return redirect;
}
