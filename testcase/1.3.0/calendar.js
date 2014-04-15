
console.log(+new Date())

var Calendar = KISSY.Calendar;//日历组件默认在KISSY的命名空间下
var cal = new Calendar('.calendar', {
        popup: true,
        minDate: new Date()
    }
);

KISSY.Event.on('div','click',function(e){
	console.log(e);
})
KISSY.Event.fire('div','click',{aa:1111});

//window.open('http://www.taobao.com/');