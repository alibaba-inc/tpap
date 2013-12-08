var S = KISSY;
var SideNav = KISSY.SideNav; 
var a = new SideNav({
        node: '.side-nav',
        effect: 'zoom',
        easing: 'ease-out',
        duration: 300,
        frequency: 100,
        top: {
            node: '.back-top',
            easing: 'ease-out',
            duration: 300
        },
        when: {
            type: 1,
            top: 200
        },
        map: {
            enable: true,
            curNavCls: 'cur-nav',
            curPannelCls: 'cur-pannel',
            easing: 'ease',
            duration: 300,
            rule: {
                '.nav-item-1' : '.section-1',
                '.nav-item-2' : '.section-2',
                '.nav-item-3' : '.section-3',
                '.nav-item-4' : '.section-4',
                '.nav-item-5' : '.section-5'
            }
        }
    });