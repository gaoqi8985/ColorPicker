
function ColorPicker(selector){

    function rgbToHsv(arr) {
        var h = 0, s = 0, v = 0;
        var r = arr[0], g = arr[1], b = arr[2];
        arr.sort(function (a, b) {
            return a - b;
        })
        var max = arr[2]
        var min = arr[0];
        v = max / 255;
        if (max === 0) {
            s = 0;
        } else {
            s = 1 - (min / max);
        }
        if (max === min) {
            h = 0;//事实上，max===min的时候，h无论为多少都无所谓
        } else if (max === r && g >= b) {
            h = 60 * ((g - b) / (max - min)) + 0;
        } else if (max === r && g < b) {
            h = 60 * ((g - b) / (max - min)) + 360
        } else if (max === g) {
            h = 60 * ((b - r) / (max - min)) + 120
        } else if (max === b) {
            h = 60 * ((r - g) / (max - min)) + 240
        }
        h = (h/360);
        s = (s);
        v = (v);
        return [h, s, v]
    }
    function hsvToRgb(arr) {
        var h = arr[0], s = arr[1], v = arr[2];
        h=h*360;
        s = s ;
        v = v ;
        var r = 0, g = 0, b = 0;
        var i = parseInt((h / 60) % 6);
        var f = h / 60 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i) {
            case 0:
                r = v; g = t; b = p;
                break;
            case 1:
                r = q; g = v; b = p;
                break;
            case 2:
                r = p; g = v; b = t;
                break;
            case 3:
                r = p; g = q; b = v;
                break;
            case 4:
                r = t; g = p; b = v;
                break;
            case 5:
                r = v; g = p; b = q;
                break;
            default:
                break;
        }
        r = Math.round(r * 255.0)
        g =  Math.round(g * 255.0)
        b =  Math.round(b * 255.0)
        return [r, g, b];
    }
    function _ColorPicker(selector){
        var div= document.querySelector(selector);

        var pickerDiv= document.createElement('div')
        pickerDiv.className+="colorpicker";
        div.appendChild(pickerDiv);
        var innerhtml =''
        +'    <div class="color_item"><input /></div>'
        +'            <div class="color_item"><input /></div>'
        +'            <div class="color_item"><input /></div>'
        +'            <div class="color_show">'
        +'                <div class="select_color">'
        +'                    <div class="select_color_select">'
        +'                        <div class="colormap">'
        +'                            <div class="mask1"></div>'
        +'                            <div class="mask2"></div>'
        +'                            <div class="point"></div>'
        +'                        </div>'
        +'                        <div class="huemap">'
        +'                                <div class="huepoint"></div>'
        +'                        </div>'
        +'                    </div>'
        +'                    <div class="select_color_input">'
        +'                        <div class="input_hex"><input /></div>'
        +'                        <button class="submit_color">确认</button>'
        +'                    </div>'
        +'                </div>'
        +'            </div>'
        +'            <style>'
        +'                .colorpicker{'
        +'                    display: flex;'
        +'                    width: 100%;'
        +'                    align-items:center;'
        +'                    user-select:none;'
        +'                }'
        +'                .color_item input{'
        +'                width:80%;'
        +'                padding:0px;'
        +'                border:0px;'
        +'                box-shadow: 0px 0px 1px gray;'
        +'                border-bottom:1px solid gray;'
        +'                height:25px;'
        +'                }'
        +'                .color_item{'
        +'                    padding :0px;'
        +'                    margin :0px;'
        +'                    flex-grow: 1;'
        +'                }'
        +'                .color_show{'
        +'                    flex-shrink: 0;'
        +'                    width: 20px;'
        +'                    height: 20px;'
        +'                    box-shadow: 0px 0px 1px gray;'
        +'                    position: relative;'
        +'                }'
        +'            .select_color{'
        +'                position:absolute;'
        +'                width:220px;'
        +'                height:220px;'
        +'                display: flex;'
        +'                bottom:30px;'
        +'                right:0px;'
        +'                box-shadow: 1px 1px 3px gray;'
        +'                background-color: #fafafa;'
        +'                flex-direction: column;'
        +'            }'
        +'            .colorpicker .select_color_select{'
        +'                flex-grow: 8;'
        +'                display: flex;'
        +'                flex-direction: row;'
        +'            }'
        +'            .colorpicker .select_color_input{'
        +'                display: flex;'
        +'                flex-direction: row;'
        +'                }'
        +'                .colorpicker .colormap{'
        +'                position: relative;'
        +'                flex-grow: 10;'
        +'                margin:5px;'
        +'                margin-right:0px;'
        +'                background-color: #f00;'
        +'                }'
        +'                .colorpicker .colormap .mask1{'
        +'                    position: absolute;'
        +'                    width: 100%;'
        +'                    height: 100%;'
        +'                    background: linear-gradient(90deg,#FFF,hsla(0,0%,100%,0));'
        +'                }'
        +'                .colorpicker .colormap .mask2{'
        +'                    position: absolute;'
        +'                    width: 100%;'
        +'                    height: 100%;'
        +'                    background:linear-gradient(0deg,#000,transparent);'
        +'                }'
        +'                .colorpicker .colormap .point{'
        +'                    position: absolute;'
        +'                    width: 3px;'
        +'                    height: 3px;'
        +'                    left:66px;'
        +'                    top:60px;'
        +'                    user-select:false;'
        +'                    pointer-events: none;'
        +'                    border-radius: 2px;'
        +'                    border:1px solid white;'
        +'                }'
        +'                .colorpicker .huemap{'
        +'                    position: relative;'
        +'                margin:5px;'
        +'                flex-direction: row;'
        +'                flex-grow: 1;'
        +'                background:linear-gradient(red,#FF0,#0F0,#0FF,#00F,#F0F,red);'
        +'                }'
        +'                .colorpicker .huemap .huepoint{'
        +'                    position: absolute;'
        +'                    user-select:false;'
        +'                    pointer-events: none;'
        +'                    width: 100%;'
        +'                    margin-top:-2px;'
        +'                    height: 2px;'
        +'                    border-top: 2px solid black;'
        +'                    border-bottom: 2px solid black;'
        +'                }'
        +'                .colorpicker .input_hex{'
        +'                    flex-grow: 2;'
        +'                }'
        +'                .colorpicker .input_hex input{'
        +'                    color:gray;'
        +'                width:60%;'
        +'                margin:5px 10px;'
        +'                height:20px;'
        +'                }'
        +'                .colorpicker .submit_color{'
        +'                    flex-shrink: 0;'
        +'                    display: inline-block;'
        +'                    margin:2px;'
        +'                }'
        +'            </style>'
                
            pickerDiv.innerHTML=innerhtml;
        //数据中心


        var real_hsv={h:0,s:0,v:0}
        var hsv_color={h:0,s:0,v:0}
        
        var input_r=pickerDiv.getElementsByClassName("color_item")[0].getElementsByTagName("input")[0];
        var input_g=pickerDiv.getElementsByClassName("color_item")[1].getElementsByTagName("input")[0];
        var input_b=pickerDiv.getElementsByClassName("color_item")[2].getElementsByTagName("input")[0];
        var showdiv=pickerDiv.getElementsByClassName("color_show")[0];
        var selectDiv=pickerDiv.getElementsByClassName("select_color")[0];
        var point=pickerDiv.getElementsByClassName("point")[0];
        var huepoint=pickerDiv.getElementsByClassName("huepoint")[0];
        var input_hex =pickerDiv.getElementsByClassName("input_hex")[0].getElementsByTagName("input")[0];
        var submit_color =pickerDiv.getElementsByClassName("submit_color")[0];


        //submit_color
        submit_color.onclick=function(){
            saveRealHsv()
          closeDiv()
        }
        function saveRealHsv(){
            real_hsv.h=hsv_color.h
            real_hsv.s=hsv_color.s
            real_hsv.v=hsv_color.v
        }
        var _is_showDiv=false;
        
        // 颜色展示图标 控制取色器显示隐藏
        showdiv.onclick=(function(){
            selectDiv.style.display="none"
           return function(e){
               if(e.target===showdiv){
                _is_showDiv=!_is_showDiv;
                selectDiv.style.display=_is_showDiv?"flex":"none"
                // 点击其他地方 没点保存时 不保存结果
                if(!_is_showDiv){
                    hsv_color.h=real_hsv.h
                    hsv_color.s=real_hsv.s
                    hsv_color.v=real_hsv.v
                    setColor();
                }
               }
           }
        })()
        var hueIsMouseDown=false;
        var pointIsMouseDown=false;

        function closeDiv(){
            selectDiv.style.display="none";
            _is_showDiv=false;
            hsv_color.h=real_hsv.h
                    hsv_color.s=real_hsv.s
                    hsv_color.v=real_hsv.v
                    setColor();
        }
        document.addEventListener("mouseup",function(e){
            hueIsMouseDown=false;
            pointIsMouseDown=false;
             setColor()

        })
        document.addEventListener("mousedown",function(e){
            var t= e.target;
            var inDivSection=false;
            while(t.parentNode){
                if(t==pickerDiv){
                    inDivSection=true;
                    break;
                }
                t=t.parentNode
            }
            if(!inDivSection){
                closeDiv()
            }
        })
        //hue  设置相应
        huepoint.parentNode.addEventListener("mousedown", handleHueMouseDown)
        huepoint.parentNode.addEventListener("mousemove", handleHueMouseMove)
        function handleHueMouseDown(e){
            hueIsMouseDown=true;
            handleHueMouseMove(e)
        }
        function handleHueMouseMove(e){
            if(!hueIsMouseDown){return}
            if(e.target==huepoint){return}
            var percent=e.layerY/huepoint.parentNode.offsetHeight;
            hsv_color.h=percent;
            setColor()
           
            
        }
        // 主画面的color事件绑定
        point.parentNode.addEventListener("mousedown", handlePointMouseDown)
        point.parentNode.addEventListener("mousemove", handlePointMouseMove)
        function handlePointMouseDown(e){
            pointIsMouseDown=true;
            handlePointMouseMove(e)
        }
        function handlePointMouseMove(e){
            if(!pointIsMouseDown){return}
            if(e.target==point){return}
            var percentX=e.layerX/point.parentNode.offsetWidth;
            var percentY=1.0-e.layerY/point.parentNode.offsetHeight;
            hsv_color.s= percentX;
            hsv_color.v =percentY;
            setColor()
        }
        // input 框解析
        input_r.oninput=function(e){
            var t=parseInt(e.target.value);
            rgb= hsvToRgb([hsv_color.h,hsv_color.s,hsv_color.v]);
            if(isNaN(t)||t<0||t>255){
                    e.target.value=rgb[0];
                    return;
            }
            rgb[0]= parseInt(e.target.value)
            var hsv= rgbToHsv(rgb)
            hsv_color.h=hsv[0];
            hsv_color.s=hsv[1];
            hsv_color.v=hsv[2];
            setColor()
            if(selectDiv.style.display=="none"){
                saveRealHsv()
            }


        }
        input_g.oninput=function(e){
            var t=parseInt(e.target.value);
            rgb= hsvToRgb([hsv_color.h,hsv_color.s,hsv_color.v]);
            if(isNaN(t)||t<0||t>255){
                    e.target.value=rgb[1];
                    return;
            }
            rgb[1]= parseInt(e.target.value)
            var hsv= rgbToHsv(rgb)
            hsv_color.h=hsv[0];
            hsv_color.s=hsv[1];
            hsv_color.v=hsv[2];
            setColor()
            if(selectDiv.style.display=="none"){
                saveRealHsv()
            }


        }
        input_b.oninput=function(e){
            var t=parseInt(e.target.value);
            rgb= hsvToRgb([hsv_color.h,hsv_color.s,hsv_color.v]);
            if(isNaN(t)||t<0||t>255){
                    e.target.value=rgb[2];
                    return;
            }
            rgb[2]= parseInt(e.target.value)
            var hsv= rgbToHsv(rgb)
            hsv_color.h=hsv[0];
            hsv_color.s=hsv[1];
            hsv_color.v=hsv[2];
            setColor()
            if(selectDiv.style.display=="none"){
                saveRealHsv()
            }

        }
        
        function setColor(){
            
            var fc= hsvToRgb([hsv_color.h,hsv_color.s,hsv_color.v])
            showdiv.style.backgroundColor='rgb('+fc[0] +','+fc[1]+','+fc[2]+')'
            //huv point处理
            var c=(hsvToRgb([hsv_color.h,1,1]));
            point.parentNode.style.backgroundColor='rgb('+c[0] +','+c[1]+','+c[2]+')';
            huepoint.style.top=Math.floor(huepoint.parentElement.offsetHeight*hsv_color.h/1)+"px";

            // point 处理
            point.style.top=Math.floor(point.parentElement.offsetHeight*(1.0-hsv_color.v/1))+"px";
            point.style.left=Math.floor(point.parentElement.offsetWidth*(hsv_color.s/1))+"px";

            //

            input_r.value=fc[0];
            input_g.value=fc[1];
            input_b.value=fc[2];
            //
            input_hex.value ="#" + ((1 << 24) + (fc[0] << 16) + (fc[1] << 8) + fc[2]).toString(16).slice(1);
            input_hex.readOnly=true;

        }

        function setRGB(r,g,b){
            var rgb= rgbToHsv([r,g,b])
            real_hsv.h=hsv_color.h=rgb[0]
            real_hsv.s=hsv_color.s=rgb[1]
            real_hsv.v=hsv_color.v=rgb[2]
            setColor()
        }
        function setHex(hex){
            var h=""+hex;
            if(h[0]=="#"){
                h=h.slice(1)
            }
            r= parseInt(h.slice(0,2),16)
            g= parseInt(h.slice(2,4),16)
            b= parseInt(h.slice(4,6),16)

            setRGB(r,g,b)
        }
        setRGB(0,0,0);
        function getRGB(){
            var rgb= hsvToRgb([real_hsv.h,real_hsv.s,real_hsv.v]);
            return rgb;
        }
        function getHex(){
            var rgb= hsvToRgb([real_hsv.h,real_hsv.s,real_hsv.v]);
            return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
        }

        return {
            setRGB:setRGB,
            getRGB:getRGB,
            getHex:getHex,
            setHex:setHex,


        }

    }
    return _ColorPicker(selector)
}
