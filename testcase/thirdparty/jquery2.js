var $ = jQuery;

console.log()
describe("other element function",function(){
    //wrap
    //$( "p" ).wrap( document.createElement( "div" ) );
    $("p").wrap(function(){
        console.log(this);
        return $('div');
        return document.createElement( "div" );
        return 'div';
    })

    //text
    $("p").text(function(index,text){
        console.log(index);
        console.log(text);
        return "ceshitext";
    })

    //html
    $("p").html(function(index,text){
        console.log(index);
        console.log(text);
        return "<span>haha</span>";
    })

    //val

    $("input").val(function(index,v){
        console.log(index);
        console.log(v);
        return "hahaha";
    });

    //css
    $('input').css('color',function(index,value){
        console.log(index);
        console.log(value);
        return 'red';
    })
});