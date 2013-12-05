
    var $ = KISSY.all;

	var Stepbar = KISSY.Stepbar;
    var step = new Stepbar('#steps-demo-1',{
    	'act':1,
    	'color':'blue'
    	}
    );

    //激活第二个步骤
    step.set('act',4);

    //改变激活后触发
    step.on('afterActChange',function(ev){
        console.log('属性名：'+ev.attrName+'，新的值：' + ev.newVal + ',旧的值：' + ev.prevVal);
    });

    //改变颜色后触发
    step.on('afterColorChange',function(ev){
        console.log('允许设置的颜色值有：' + step.allowColor() + '，你设置的颜色值为：' + ev.newVal);
    });

    //监听第一个按钮点击事件
    $('#demo-5-btn1').on('click',function(ev){
        step.set('act',3);
    });
    //监听第二个按钮点击事件
    $('#demo-5-btn2').on('click',function(ev){
        step.set('color','red');
    });
    //监听第三个按钮点击事件
    $('#demo-5-btn3').on('click',function(ev){
        step.reset();
    })
    
    //console.log(step.allowColor);
    step.render();
