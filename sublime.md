# 关于工具sublime
sublime是一个非常“性感”的编辑器，最吸引我的地方就是打开速度非常快，各种插件，各种快捷键，自从喜欢用sublime以后，妈妈再也不用担心我的学习了。。。

## 安装
我使用的版本是Sublime Text3 x64，官网下载傻瓜式安装即可。

## 注册
附上亲测可用的注册码
```
----- BEGIN LICENSE -----
Tao Bao (China) Software Co., Ltd
100 User License
EA7E-1161155
5BD691BA 54D245A0 8E9F7B3D 56D559E1
F6EC0CF9 06125BEC EFE8C959 0888ADD4
413F9A10 902A3EE5 243AAA3C A589863A
65572FCD ABB8A154 5732574D DEA2256E
5E9A709F AC93E77D 3C6D46F9 0B91AD4F
693FC5DD 6E3DCF69 07CAF8A5 C966DD46
10E6A631 6F6D64B6 F22AC503 229E9E96
A411A28D A501628A E7CDFECE ACACCB54
------ END LICENSE ------
```

## 常用插件安装与使用

### Package Control
安装：
方法一：代码安装
View->Show Console菜单打开命令行，粘贴如下代码
```
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

把上述代码复制到：View>Show Console，回车，可能会出现Error
方法二：手动安装
-点击Preferences > Browse Packages菜单
-进入打开的目录的上层目录，然后再进入Installed Packages/目录
-下载[Package Control.sublime-package](https://sublime.wbond.net/Package%20Control.sublime-package)并复制到Installed Packages/目录
-重启Sublime Text

使用：
按下 Ctrl+Shift+P 调出命令面板，输入pci， 调出 Install Package 选项并回车，然后在列表中选中要安装的插件。

### Emmet插件
安装：
安装Emmet时出现：please wait a bit while pyV8 binary错误
解决方法：
下载PyV8，
解压修改文件名为PyV8,放到Installed Packages文件夹下，删掉原来的，重启一下就好了

使用：
举两个例子
- !+Tab：快速新建html结构
- ul\>.item$\*10按ctrl+E：\>号生成子元素，\$产生序号上

Emmet插件的更多使用栗子请戳【[速查表](https://docs.emmet.io/cheat-sheet/)】

### HTML/CSS/JS Prettify
ctrl+shift+h

### JsFormat
ctrl+alt+F对JS进行格式化，修改为ctrl+shift+J，代码是
```
[
  {
    "keys": ["ctrl+shift+j"], "command": "js_format",
    "context": [{"key": "selector", "operator": "equal", "operand": "source.js,source.json"}]
  }
]
```

### Vueformatter
不用安装这个插件，只要安装了HTML/CSS/JS Prettify，在>HTML/CSS/JS Prettify->Plugin options Default中
修改html的allowed_file_extensions: ["htm", "html", "xhtml", "shtml", "xml", "svg","vue"] 加上vue就好了

### advancednewfile
ctrl+alt+N输入目录和文件全名，如：js/test.js

### BracketHighlighter
大括号、对号的配对提示，再也不用在括号中迷茫了

### sidebarenhancement
增强侧边栏

### colorpicker
按Ctrl+Shift+C可调出取色面板

### View In Browser
安装完成后，使用默认的快捷键：
Firefox浏览器： Ctrl + Alt + f
Chrome浏览器： Ctrl + Alt + c
IE浏览器： Ctrl + Alt + i
Safari浏览器： Ctrl + Alt + s
也可以自定义快捷键。

### docblockr
Ctrl+/: 行注释;
Ctrl+Shift+/: 块注释。
在写好的函数上方输入/\*\*按tab键，自动补充函数说明格式。类似于VS的///，也可以自定义注释：
  Preference -> Package Settings -> DocBlockr -> Settings - User
```
  {
      "jsdocs_extra_tags": [
          "@Author 陈新华",
          "@DateTime {{datetime}}"
      ]
  }
```


### FindKeyConflicts
查询所有快捷键：FindKeyConflicts: All Key Maps to Quick Panel
查询所有冲突按键：FindKeyConflicts: (Direct) Conflicts to Quick Panel

### 插件卸载
按下 Ctrl+Shift+P 调出命令面板，输入remove，进入Remove Package选项并回车，选择要删除的插件即可

### 全局配置自动换行
找到“word_wrap”选项，将值设置为true。
