var $ = jQuery;
//$Event,$each

describe('CSS', function () {
    it("CSS", function () {
        //addClass
        $('.taeapp_im_auth').addClass('test');
        $('.taeapp_im_auth').addClass(function(index,currentClass){
            if(currentClass.indexOf("empty")>0){
                $('.empty').removeClass('empty');
                console.log(index+':'+currentClass);
                return "full";
            }
        });

        //css
        console.log($('.taeapp_im_auth').css('color'));
        console.log($('.taeapp_im_auth').css([
            "width", "height", "color", "background-color"
        ]));
        $('.taeapp_im_auth').css('color','red');
        $('.taeapp_im_auth').css({
            backgroundColor : "#ddd",
            fontWeight: ""
        });

        $('.taeapp_im_auth').css('height',function(index,value){
            return parseFloat(value)*3;
        });

        //hasClass
        console.log($('.full').hasClass('taeapp_im_auth'));

        //height
        console.log($('.taeapp_im_auth').height());
        $('.taeapp_im_auth').height(20);
        $('.taeapp_im_auth').height(function(index,height){
            if(index == 1){
                console.log(index+':'+height);
                return 40;
            }
        });

        //innerHeight
        console.log($('.taeapp_im_auth').innerHeight());

        ////innerWidth
        console.log($('.taeapp_im_auth').innerWidth());

        //offset
        console.log($('.full').offset());
        console.log($('.full').offset().left());
        $('.full').css('background-color','red').offset({top:100,left:10}).offset(function(index,co){
            console.log(index+":"+co.left+":"+co.top);
            return {
                top:60,
                left:100
            }
        });

        //outerHeight
        console.log($('.taeapp_im_auth').outerHeight());
        console.log($('.taeapp_im_auth').outerHeight(true));

        ////outerWidth
        console.log($('.taeapp_im_auth').outerWidth());
        console.log($('.taeapp_im_auth').outerWidth(true));

        //position
        console.log($('.full').position().left());

        //removeClass
        $('.taeapp_im_auth').removeClass('test');
        $('.taeapp_im_auth').removeClass(function(index,classes){
            if(classes.indexOf('full')>0){
                console.log(index+':'+classes);
                return 'taeapp_im_auth'
            }
        });

        //scrollLeft,scrollTop
        $('.content').css({
            width:500,
            height:50,
            overflow:"scroll"
        });
        console.log($('.content').scrollLeft());
        $('.content').scrollLeft(10) ;
        console.log($('.content').scrollTop());
        $('.content').scrollTop(10) ;

        //toggleClass
        $('.full').toggleClass('taeapp_im_auth',false);
        $('.full').toggleClass('taeapp_im_auth');
        $('.full').toggleClass(function(index,curClass,curSwitch){
            console.log(index+":"+curClass+":"+curSwitch);
            return 'taeapp_im_auth';
        },true);
        $('.full').toggleClass(function(index,curClass,curSwitch){
            console.log(index+":"+curClass+":"+curSwitch);
            return 'taeapp_im_auth';
        });
        $('.full').toggleClass(false);
        $('.full').toggleClass();

        //width
        console.log($('.content').width());
        $('.content').width(800);
        $('.content').width(function(index,width){
            console.log(index+":"+width);
            return width+200;
        })
    })
});


describe('Utilities', function () {
    it("Utilities", function () {
        var content = $('.content');
        //dequeue clearQueue
        $( "#start" ).click(function() {
            var myDiv = $( ".myDiv" );
            myDiv.show( "slow" );
            myDiv.animate({
                left:"+=200"
            }, 5000 );

            myDiv.queue(function() {
                var that = $(".myDiv");
                that.addClass( "newcolor" );
                that.dequeue();
            });

            myDiv.animate({
                left:"-=200"
            }, 1500 );
            myDiv.queue(function() {
                var that = $(".myDiv");
                that.removeClass( "newcolor" );
                that.dequeue();
            });
            myDiv.slideUp();
        });

        $( "#stop" ).click(function() {
            var myDiv = $( ".myDiv" );
            myDiv.clearQueue();
            myDiv.stop();
        });

        //each
        $each(["one", "two", "three", "four", "five" ],function(i,val){
            console.log(i+":"+val);
        });

        //grep
        var arr = [ 1, 9, 3, 8, 6, 1, 5, 9, 4, 7, 3, 8, 6, 9, 1 ];
        arr = $grep(arr, function( n, i ) {
            return ( n !== 5 && i > 4 );
        });
        console.log(arr.join( ", " ));

        //inArray
        var arr = [ 4, "Pete", 8, "John" ];
        console.log( $inArray( "John", arr ) );
        console.log( $inArray( 4, arr ) );
        console.log( $inArray( "Karl", arr ) );
        console.log( $inArray( "Pete", arr, 2 ) );

        //isArray
        console.log($isArray([]));

        // isEmptyObject
        console.log($isEmptyObject({ }));
        console.log($isEmptyObject({ foo: "bar" }));

        //isFunction
        function stub() {}
        var objs = [
            function() {},
            { x:15, y:20 },
            null,
            stub,
            "function"
        ];
        $each(objs,function(i){
            console.log($isFunction(objs[i]));
        });

        //isNumeric
        console.log($isNumeric( "-10" ));     // true
        console.log($isNumeric( 16 ));        // true
        console.log($isNumeric( 0xFF ));      // true
        console.log($isNumeric( "0xFF" ));    // true
        console.log($isNumeric( "8e5" ));     // true (exponential notation string)
        console.log($isNumeric( 3.1415 ));    // true
        console.log($isNumeric( +10 ));       // true
        console.log($isNumeric( 0144 ));      // true (octal integer literal)
        console.log($isNumeric( "" ));        // false
        console.log($isNumeric({}));          // false (empty object)
        console.log($isNumeric( NaN ));       // false
        console.log($isNumeric( null ));      // false
        console.log($isNumeric( true ));      // false
        console.log($isNumeric( Infinity ));  // false
        console.log($isNumeric( undefined ));

        //isPlainObject
        console.log($isPlainObject({})); // true
        console.log($isPlainObject( "test" ));

        //makeArray
        var obj = $( "span" );
        var arr = $makeArray( obj );
        console.log(arr);

        //map
        var fakeArray = { "length": 2, 0: "Addy", 1: "Subtracty" };
        var realArray = $makeArray( fakeArray );
        $map( realArray, function( val, i ) {
            console.log(val+";"+i);
        });

        //merge
        console.log($merge( [ 0, 1, 2 ], [ 2, 3, 4 ]).join(','));

        //noop
        console.log($noop());

        //now
        console.log($now());

        //parsehtml
        //console.log($parseHTML("hello, <b>my name is</b> jQuery."));

        //parseJSON
        console.log($parseJSON( '{ "name": "John" }').name);
        /*
        //proxy
        var me = {
            type: "zombie",
            test: function( event ) {
                var element = event.target;
                $( element ).css( "background-color", "red" );
                console.log(( "Hello " + this.type + "<br>" ));
                $( "#test" ).off( "click", this.test );
            }
        };

        var you = {
            type: "person",
            test: function( event ) {
                console.log(( this.type + " " ));
            }
        };


        var youClick = $proxy( you.test, you ); console.log(youClick);debugger;
        $( ".test" )
            // this === "zombie"; handler unbound after first click
            .on( "click", $proxy( me.test, me ) )

            // this === "person"
            .on( "click", youClick )

            // this === "zombie"
            .on( "click", $proxy( you.test, me ) )

            // this === "<button> element"
            .on( "click", you.test );
        */
       /*
        //extend
        var defaults = { validate: false, limit: 5, name: "foo" };
        var options = { validate: true, name: "bar" };
        var obj = $extend(defaults,options);
        console.log(defaults.name); //foo
        console.log(obj.name);   //bar
         */
        //support
        console.log($support.boxModel);

        //trim
        console.log($trim("    hello, how are you?    "));

        //type
        console.log($type(null));
    })
});

describe('Attributes', function () {
    it("Attributes", function () {
        //attr
        $('.J_check').attr('checked','checked');
        console.log($('.J_check').attr('checked'));
        $('.J_check').attr({
            checked:"",
            title:"test checkbox"
        });
        $('.J_check').attr('title',function(index,attr){
            console.log(index+":"+attr);
            return "test";
        });

        //html
        console.log($('.taeapp_im_auth').html());
        $('.taeapp_im_auth').html('<p>test html</p>');

        //prop
        $('.J_check').prop('checked',false);
        console.log($('.J_check').prop('checked'));
        $('.J_check').prop({
            checked:true,
            title:"test checkbox"
        });
        $('.J_check').prop('title',function(index,oldProp){
            console.log(index+":"+oldProp);
            return "test";
        });

        //removeAttr
        $('.J_check').removeAttr('title');

        //removeProp
        $('.J_check').removeProp('title');     //class="undefined"

        //val
        console.log($('.J_input').val());
        $('.J_input').val("test input");
        $('.J_input').val(function(index,value){
            console.log(index+":"+value);
            return value + ' success!';
        });
    });
});

describe('Data', function () {
    it("Data", function () {
        //data
        $('.J_input').data('foo',52);
        console.log($('.J_input').data());
        $('.J_check').data({
            foo:32,
            bar:"hahaha"
        });
        console.log($('.J_check').data('bar'));

        //removeData
        $('.J_check').removeData('bar');
        console.log($('.J_check').data('bar'));
        $('.J_check').removeData();
        console.log($('.J_check').data('foo'));

        //hasData
        var p = $( "a" );
        console.log("hasdata"+$hasData(p.get(0)));
        p.data('a','test');
        console.log(p.data('a'));
        console.log($hasData(p.get(0)));
    })
});

describe('Event', function () {
    it("Broweser Event",function(){
        //scroll
        $('.content').scroll(function(){
            console.log('scroll ');
        });
        $('.content').scroll({msg:"happen"},function(e){
            console.log('scroll '+ e.data.msg);
        });
        $('.content').scroll();
    });
    it("Event Handler Attachment",function(){
        //bind

        $('.content').bind('click',function(e){
            console.log(e.currentTarget);
            $(e.currentTarget).css('background-color','blue');
            console.log(e.pageX+":"+ e.pageY);
        });
        $('.content').bind('click',{msg:'click'},function(e){
            console.log(e.data.msg+e.pageX+":"+ e.pageY);
        })
        $('.content').bind('click',{msg:'click'},false);
        $('.content').bind({
            click:function(){console.log('click')},
            mouseenter:function(){console.log('mouseenter')},
            mouseleave:function(){console.log('mouseleave')}
        });

        //delegate
        var func = function(e){
            console.log('delegate click');
            console.log($(e.target).html());
        };
        $('.content').delegate('.taeapp_im_auth','click',func);
        $('.content').delegate('.taeapp_im_auth','click',{msg:"happen"},function(e){
            console.log('delegate click '+ e.data.msg);
            // console.log($(e.target).html());
        });

        //off
      /*  $('.content').off('click','.taeapp_im_auth',func);
        $('.content').off('click');
        $('.content').off();       */

        //on
        $('.link').on('click',function(e){
            //    e.preventDefault();
        });
        $('.form').on('click','.link','prevent goto taobao!',function(e){
            e.preventDefault();
            console.log(e.data);
        });
        $('span').on('click',function(e){
            e.stopPropagation();
            //   e.stopImmediatePropagation();
        });
        $('span').on('click',function(e){
            $(e.target).css('color','red');
        });

        //one
        $('span').one('mouseenter',function(){
            console.log('this will display only once');
        });

        //trigger
        $('.trigger').on('changeColor',function(e){
            $(e.currentTarget).css('color',"red");
            console.log('change color to '+e.color);
        });
        // $('.trigger').trigger('click');
        var event = $Event('changeColor',{color:"red"});
        $('.trigger').trigger(event);

        //triggerHandler
        var handler = function(e,param){
            console.log("triggerHandler ",param);
            $(e.currentTarget).css('color',param);
        };
        $('.trigger').bind('click',handler);
        $('.trigger').triggerHandler('click',['yellow']);

        //unbind
        $('.trigger').click(function(){
            console.log('click trigger');
        });
        $('.trigger').unbind();
        $('.trigger').unbind('click');

        //undelegate
        $('.content').undelegate('click');
        $('.content').undelegate();
    });
    it("Form Event", function () {
        //blur
        $('.J_input').blur(function(){
            console.log('blur');
        });
        $('.J_input').blur({msg:"happen"},function(e){
            console.log('blur '+ e.data.msg);
        });
        $('.J_input').blur();

        //change
        $('.J_input').change(function(){
            console.log('change to '+$('.J_input').val());
        });
        $('.J_input').change({msg:"happen"},function(e){
            $('.J_input').val(e.data.msg);
            console.log('change to '+ e.data.msg);
        });
        $('.J_input').change();

        //focusin
        $('.J_input').focusin({msg: 'success!'}, function (e) {
                $(e.currentTarget).val('focus '+ e.data.msg);
            });

        //focus
        $('.J_input').focus({msg: 'success!'},function (e) {
            $(e.currentTarget).val('focus '+ e.data.msg);
        });
        $('.J_input').focus();

        //select
        $('.J_input').select({msg: 'success!'},function (e) {
            console.log("something was selected "+ e.data.msg);
        });
        $('.J_input').select();

        //submit
        $('form').submit({msg : "fail"} , function(e){
            e.preventDefault();
            console.log("form submit " + e.data.msg);
        });
        $('form').submit();
    });
    it("Keyboard Event",function(){
        //focusout
         $('.J_input').focusout({msg:'success'},function(e){
             console.log('focusout '+ e.data.msg);
         });

         //keydown
         $('.J_input').keydown({msg:'keydown: '},function(e){
             console.log(e.data.msg+ e.keyCode);
         });
        $('.J_input').keydown();

        //keypress
        $('.J_input').keypress({msg:'keypress: '},function(e){
            console.log(e.data.msg+ e.keyCode);
        });
        $('.J_input').keypress();

        //keyup
        $('.J_input').keyup({msg:'keyup: '},function(e){
            console.log(e.data.msg+ e.keyCode);
        });
        $('.J_input').keyup();
    });
    it("Mouse Event",function(){
        //click
        $('.J_input').click(function(){
            console.log('click ');
        });
        $('.J_input').click({msg:"happen"},function(e){
            console.log('click '+ e.data.msg);
        });
        $('.J_input').click();

        //dblclick
        $('span').dblclick({msg:'dblclick '},function(e){
            console.log(e.data.msg+'success');
        });
        $('span').dblclick();

        //hover
        $('.trigger').hover(function(e){
            $(e.currentTarget).html('hover in');
        },function(e){
            $(e.currentTarget).html('hover out');
        });


        //"mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"
        var props = ["mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"];
        for(var i = 0; i < props.length; i++){
            var tmp = props[i];
            $('.trigger')[tmp]({msg: tmp},function(e){
                 console.log(e.data.msg);
            });
            $('.trigger')[tmp]();
        }
    })
});

describe('Effects',function(){
    it("basic",function(){
        //hide
        $('.hide').on('click',function(){
            $('.tar').hide({
                    duration: 'slow' ,
                    complete: function(){
                        console.log("hide success");
                    }
                });
        });
        $('.show').on('click',function(){
            $('.tar').show('slow',function(){
                console.log("show success");
            });
        });
        $('.toggle').on('click',function(){
            $('.tar').toggle('slow',function(){
                console.log("toggle success");
            });
        });
    });
    it("custom",function(){
        //animate
        $( "#clickme1" ).click(function() {
            $( "#book" ).animate({
                opacity: 0.25,
                left: "+=50",
                height: "toggle"
            }, 5000, function() {
                console.log("Animation complete.");
            });
        });

        $( "#clickme2" ).click(function() {
            $( "#book" ).animate({
                width: [ "toggle", "swing" ],
                height: [ "toggle", "swing" ],
                opacity: "toggle"
            }, 5000, "linear", function() {
                $( this ).after( "<div>Animation complete.</div>" );
            });
        });

        $( "#clickme3" ).click(function() {
            $( "#book" ).animate({
                width: "toggle",
                height: "toggle"
            }, {
                duration: 5000,
                specialEasing: {
                    width: "linear"//,
                   // height: "easeOutBounce"
                },
                complete: function() {
                    $( this ).after( "<div>Animation complete.</div>" );
                }
            });
        });

        //delay
        $( ".button1" ).click(function() {
            $( ".first" ).slideUp( 300 ).delay( 800 ).fadeIn( 400 );
            $( ".second" ).slideUp( 300 ).fadeIn( 400 );
        });

        //finish
        var horiz = $( "#path" ).width() - 20,
            vert = $( "#path" ).height() - 20;
        var btns = {
            bstt: function() {
                $( "div.box" ).stop( true, true );
            },
            bs: function() {
                $( "div.box" ).stop();
            },
            bsft: function() {
                $( "div.box" ).stop( false, true );
            },
            bf: function() {
                $( "div.box" ).finish();
            },
            bcf: function() {
                $( "div.box" ).clearQueue().finish();
            },
            bsff: function() {
                $( "div.box" ).stop( false, false );
            },
            bstf: function() {
                $( "div.box" ).stop( true, false );
            },
            bcs: function() {
                $( "div.box" ).clearQueue().stop();
            }
        };

        $( "button.b" ).on( "click", function(e) {
            btns[ $(e.currentTarget).attr('id') ]();
        });

        $( "#go" ).on( "click", function() {
            $( ".box" )
                .clearQueue()
                .stop()
                .css({
                    left: 10,
                    top: 10
                })
                .animate({
                    top: vert
                }, 3000 )
                .animate({
                    left: horiz
                }, 3000 )
                .animate({
                    top: 10
                }, 3000 );
        });
    });
    it("fade",function(){
        //fadeIn
        $( "#clickme4" ).click(function() {
            $( "#book" ).fadeIn( "slow", function() {
                console.log("Animation complete");
            });
        });

        //fadeOut
        $( "#clickme5" ).click(function() {
            $( "#book" ).fadeOut( "slow", function() {
                console.log("Animation complete");
            });
        });

        //fadeTo
        $( "#clickme6" ).click(function() {
            $( "#book" ).fadeTo( "slow" , 0.5, function() {
                console.log("Animation complete");
            });
        });

        //fadeToggle
        $( ".fadeToggle1" ).click(function() {
            $( ".p1" ).fadeToggle( "slow", "linear" );
        });
        $( ".fadeToggle2" ).click(function() {
            $( ".p2" ).fadeToggle( "fast", function() {
                   $( ".anim" ).append( "<div>finished</div>" );
            });
        });
    });
    it("sliding",function(){
        //slideDown
        $( "#clickme7" ).click(function() {
            $( "#book" ).slideDown( "slow", function() {
                console.log("Animation complete.");
            });
        });

        //slideUp
        $( "#clickme8" ).click(function() {
            $( "#book" ).slideUp( "slow", function() {
                // Animation complete.
            });
        });

        //slideToggle
        $( "#clickme9" ).click(function() {
            $( "#book" ).slideToggle( "slow", function() {
                // Animation complete.
            });
        });
    })
});

describe("Ajax",function(){
    it("Helper Functions",function(){
        //param
        var myObject = {
            a: {
                one: 1,
                two: 2,
                three: 3
            },
            b: [ 1, 2, 3 ]
        };
        console.log($param( myObject ));

        //serialize
        console.log($('.J_Form').serialize());

        //serializeArray
        console.log($('.J_Form').serializeArray()[0].name);
    });
    it("Low-Level Interface",function(){
         //todo  ajax
    });
    it("Shorthand Methods",function(){
        //todo  ajax
    })
});

describe("Properties",function(){
    it("Properties of jQuery Object Instances",function(){
        //jquery
        console.log($('.J_Form').jquery);

        //length
        console.log($('form').length);
    })
});

describe("Traversing",function(){
    $( "li" ).each(function( index ,elem) {
        console.log( index + ": " + elem );
        console.log($(elem).text());
    });
    it("Filtering",function(){
        //eq
        $('button').eq(2).css('color','red');
        $('button').eq(-2).css('color','blue');

        //filter
        $('button').filter(":even").css('border-color','red');
        $('button').filter($('#go')).css('border-color','blue');

        //first
        $('button').first().css('background','yellow');

        //has
        $( "li" ).has( "ul" ).css( "background-color", "red" );

        //is
        console.log($('#go').is('li'));
        console.log($('#go').is($('#go')));
        console.log($('#go').is(function(idx) {
            console.log(idx);
        }));

        //last
        $('button').last().css('background','yellow');

        //map
        $( "button" )
            .map(function(idx,elem) {
                console.log(idx,elem);
            });

        //not
        $( "li" ).not( ":even" ).css( "background-color", "yellow" );

        //slice
        $( "li" ).slice( 2,3 ).css( "background-color", "red" );
    });
    it("Miscellaneous Traversing",function(){
        //add
        $( "p" ).add("<span>Again</span>").appendTo( ".myDiv");        //todo
        $( "p" ).add("body").css('color','red');

        //addBack
        $( "div.left, div.right" ).find( "div, div > p" ).addClass( "border" );
        $( "div.before-addback" ).find( "p" ).addClass( "background" );
        $( "div.after-addback" ).find( "p" ).addBack().addClass( "background" );

        //contents
        console.log($( ".container" ).contents());

        //end
        $( "ul.first" )
            .find( ".foo" )
            .css( "background-color", "red" )
            .end()
            .find( ".bar" )
            .css( "background-color", "green" );

    });
    it("Tree Traversal",function(){
        //children
        $( "li" ).children().css( "background-color", "blue" );

        //closest
        $( "li.item-a" )
            .closest( "ul" )
            .css( "background-color", "brown" );

        //find

        //next
        $( "li.foo" ).next().css( "background-color", "red" );

        //nextAll
        $( "li.foo" ).nextAll().css( "background-color", "#ddd" );

        //nextUntil
        $( "#term-2" )
            .nextUntil( "dt" )
            .css( "background-color", "red" );

        //offsetparent
        $( "li.item-a" ).offsetParent().css( "background-color", "#eee" );

        //parent
        $( "li.item-a" ).parent('li').css( "color", "#ddd" );

        //parents
       $( "li.item-a" ).parents().css( "color", "#ddd" );

        //parentsUntil
        $( "li.item-a" )
            .parentsUntil( ".level-1" )
            .css( "background-color", "red" );
        $( "li.item-2" )
            .parentsUntil( $( "ul.level-1" ), ".yes" )
            .css( "border", "3px solid green" );

        //prev
        $( "li.item-2" ).prev().css( "color", "red" );

        //prevAll
        $( "li.item4" ).prevAll().css( "color", "yellow" );

        //prevUntil
        $( "#term-2" ).prevUntil( "dt" )
            .css( "background-color", "red" );

        //siblings
        $( "li.item4" ).siblings().css( "color", "black" );
    })
});

describe("Manipulation",function(){
    it("Copying",function(){
        //clone
       $( ".hello" ).clone().appendTo( ".goodbye" );
    });
    it("DOM Insertion, Around",function(){
        // unwrap
        $('.item-2').unwrap();

        //wrap
        $('.item-2').wrap($('<ul></ul>'));

        //wrapAll
        $('span').wrapAll($('<div></div>'));

        //wrapInner
        $('span').wrapInner('<div></div>');
    });
    it("DOM Insertion, Inside",function(){
       //appendTo
        $( "<p>Test end</p>" ).appendTo( $(".content") );

        //prepend
        $( ".content" ).prepend( "<p>Test head</p>" );

        //prependTo
        $( "<p>Test again</p>" ).prependTo( ".content" );

        //text
        var str = $( ".trigger" ).text();
        $( "span" ).text( "<b>Some</b> new text." );
    });
    it("DOM Insertion, Outside",function(){
        //after
        $( ".content" ).after( "<p>Test after</p>" );

        //before
        $( ".content" ).before( "<p>Test before</p>" );

        //insertAfter
        $( "<p>Test insertAfter</p>" ).insertAfter( ".content" );

        //insertBefore
        $( "<p>Test insertBefore</p>" ).insertBefore( ".content" );
    });
    it("DOM Removal",function(){
        //detach
        $('li').detach('.item-2');

        //empty
        $('.item-a').empty();

        //remove
        $('li').remove('.item-a');
    });
    it("DOM Replacement",function(){
        //replaceAll
        $( "<h2>New heading</h2>" ).replaceAll( "span" );

        //replaceWith
        $( "p" ).replaceWith( "<h2>New heading</h2>" );
    });
});


describe("Miscelluneous",function(){
    //get
    console.log( $( "li").get(0));

    //index
    console.log($( "li" ).index( $('#bar') ));
    console.log($( "li" ).index( $('#bar').get(0) ));
    console.log($( "#bar" ).index( 'li') );
    console.log($( "#bar" ).index( ) );


});




