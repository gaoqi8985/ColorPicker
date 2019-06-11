# ColorPicker 简单颜色取色器

#### 使用说明

文件引入ColorPicker.js
`<script src="ColorPicker.js"></script>`

在文档加载完成后 调用方法
`var picker= ColorPicker("#picker");`

使用 setRGB(r,g,b) 或setHex('#ffaacc')方法设定当前颜色的值；

`
    picker.setRGB(255,100,0);
    picker.setHex('#FFa000');

`

使用 getRGB() 或getHex()方法获取当前颜色的值；

`
    picker.getRGB();//[255,100,0]
    picker.getHex(); //'#FFa000'

`
当颜色选择框弹出时 需要点击确认键才能保存数值
当颜色框没有弹出时，直接设定rgb三个值生效即保存