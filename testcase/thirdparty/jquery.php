<!--页头公共资源引入-->
<? include("../common/head.php");?>
<script src="http://a.tbcdn.cn/apps/taesite/libs/jquery-ui/jquery-1.9.1.js"></script>
 <style>
     div.myDiv {
         background: blue;
         margin: 3px;
         width: 40px;
         height: 40px;
         background: green;
         position: absolute;
         left: 0px;
         top: 30px;
         display: none;
     }
     div.newcolor{
         background: blue;
     }
 </style>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign"> 的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->
<div id="dom-test" data-componentid="uniqueSign" class="J_TScriptedModule">
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <div class="myDiv"></div>

    <div class="container">
        <div class="hello">Hello</div>
        <div class="goodbye">Goodbye</div>
    </div>

    <div class="content">
        <div class="taeapp_im_auth" style="color:black">haha</div>
        <div class="taeapp_im_auth empty"></div>
        <div class="taeapp_im_auth"></div>
        <div class="taeapp_im_auth"></div>
        <div class="taeapp_im_auth"></div>
    </div>
    <form action="http://www.taobao.com" method="get">
        <div class="form">
            <input name="check" type="checkbox" class="J_check">
            <input name="input" class="J_input">
            <a class="link" href="http://www.taobao.com">goto taobao</a>
            <span>test</span>
            <button>submit</button>
        </div>
    </form>
    <div>
        <div class="trigger">test trigger</div>
        <button class="test">click</button>
    </div>
    <div class="anim">
        <button class="hide">hide</button><button class="show">show</button><button class="toggle">toggle</button>
        <div class="tar">click me to hide me!</div>

        <div id="clickme1">
            Animate1
        </div>
        <div id="clickme2">
            Animate2
        </div>
        <div id="clickme3">
            Animate3
        </div>
        <div id="clickme4">
            FadeIn
        </div>
        <div id="clickme5">
            FadeOut
        </div>
        <div id="clickme6">
            FadeTo
        </div>
        <div id="clickme7">
            slideDown
        </div>
        <div id="clickme8">
            slideUp
        </div>
        <div id="clickme9">
            slideToggle
        </div>
        <img id="book" src="http://gtms01.alicdn.com/tps/i1/T1lMjCFcBiXXckL6Z0-130-130.png" alt="" width="100" height="123"
             style="position: relative; left: 10px;">

        <div id="path" style="position:relative;height: 244px;font-size: 70%;border-left: 2px dashed red;border-bottom: 2px dashed green;border-right: 2px dashed blue;">
            <div class="box" style="position: absolute;top: 10px;left: 10px;width: 15px; height: 15px;background: black;"></div>

            <button id="go" style="width: 12em;display: block;text-align: left;margin: 0 auto;">Go</button>
            <br>
            <button id="bstt" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.stop( true,true )</button>
            <button id="bcf" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.clearQueue().finish()</button>
            <br>
            <button id="bstf" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.stop( true, false )</button>
            <button id="bcs" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.clearQueue().stop()</button>
            <br>
            <button id="bsff" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.stop( false, false )</button>
            <button id="bs" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.stop()</button>
            <br>
            <button id="bsft" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.stop( false, true )</button>
            <br>
            <button id="bf" class="b" style="width: 12em;display: block;text-align: left;margin: 0 auto;">.finish()</button>
        </div>

        <p class="intervalBtn"><input type="button" value="Run"></p>
        <div class="interval" style="width: 50px;
    height: 30px;
    margin: 5px;
    float: left;
    background: green;"></div>

        <button class="fadeToggle1">fadeToggle p1</button>
        <button class="fadeToggle2">fadeToggle p2</button>
        <p class="p1">This paragraph has a slow, linear fade.</p>
        <p class="p2">This paragraph has a fast animation.</p>

        <p><button class="button1">Run</button></p>
        <div style="width: 60px;height: 60px;background: #3f3;float: left;position: absolute;" class="first"></div>
        <div style="width: 60px;height: 60px;background: #3f3;float: left;position: absolute;left: 80px;" class="second"></div>


    </div>

    <form class="J_Form">
        <select name="single">
            <option>Single</option>
            <option>Single2</option>
        </select>

        <br>
        <select name="multiple" multiple="multiple">
            <option selected="selected">Multiple</option>
            <option>Multiple2</option>
            <option selected="selected">Multiple3</option>
        </select>

        <br>
        <input type="checkbox" name="check" value="check1" id="ch1">
        <label for="ch1">check1</label>
        <input type="checkbox" name="check" value="check2" checked="checked" id="ch2">
        <label for="ch2">check2</label>

        <br>
        <input type="radio" name="radio" value="radio1" checked="checked" id="r1">
        <label for="r1">radio1</label>
        <input type="radio" name="radio" value="radio2" id="r2">
        <label for="r2">radio2</label>
    </form>
    <ul class="level-1 yes">
        <li>list item 1</li>
        <li>list item 2
            <ul class="level-2 yes">
                <li>list item 2-a</li>
                <li class="item-a">B
                    <ul>
                        <li>1</li>
                        <li class="item-2">2</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>list item 3</li>
        <li class="item4">list item 4</li>
    </ul>
    <div class="container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        <br><br>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
        <br><br>
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur.
    </div>
    <div class="left">
        <p><strong>Before <code>addBack()</code></strong></p>
        <div class="before-addback">
            <p>First Paragraph</p>
            <p>Second Paragraph</p>
        </div>
    </div>
    <div class="right">
        <p><strong>After <code>addBack()</code></strong></p>
        <div class="after-addback">
            <p>First Paragraph</p>
            <p>Second Paragraph</p>
        </div>
    </div>
    <ul class="first">
        <li class="foo">list item 1</li>
        <li>list item 2</li>
        <li class="bar">list item 3</li>
    </ul>
    <ul class="second">
        <li class="foo">list item 1</li>
        <li>list item 2</li>
        <li class="bar">list item 3</li>
    </ul>
    <dl>
        <dt id="term-1">term 1</dt>
        <dd>definition 1-a</dd>
        <dd>definition 1-b</dd>
        <dd>definition 1-c</dd>
        <dd>definition 1-d</dd>
        <dt id="term-2">term 2</dt>
        <dd>definition 2-a</dd>
        <dd>definition 2-b</dd>
        <dd>definition 2-c</dd>
        <dt id="term-3">term 3</dt>
        <dd>definition 3-a</dd>
        <dd>definition 3-b</dd>
    </dl>
    <ul>
        <li>foo</li>
        <li id="bar">bar</li>
        <li>baz</li>
    </ul>


</div>

<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">
    KISSY.config(
        {
            debug: true,
            packages: [
                {
                    name: "openjs", //包名
                    tag: "20130527",//时间戳, 添加在动态脚本路径后面, 用于更新包内模块代码
                    path:"../../assets", //包对应路径, 相对路径指相对于当前页面路径    //
                    charset: "utf-8" //包里模块文件编码格式
                }
            ]
        }
    );
    cajaConfig={//配置下你需要引入的模块名称，最后会被use到
        modules:"openjs/jquery/1.9/index"
    }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
$jsurl="testcase/thirdparty/jquery.js";//注意路径
$jsservice="../common/cajoled_service.php";//注意路径
include("../common/foot.php");//引入foot
?>

