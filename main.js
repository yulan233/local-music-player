//main.js

//控制应用生命周期和创建原生浏览器窗口的模组
const {app,BrowserWindow, ipcMain}=require('electron')
const path=require('path')

//准备读取文件的地方，等下补充


// windows通过process.argv获取打开文件的路径



function createWindow(){
    //创建浏览器窗口
    const mainWindow=new BrowserWindow({
        width:1000,
        height:680,
        frame: false,          //禁止缩放
        resizable: false,      //兼容mac与Windows
        titleBarStyle:"hidden",
        webPreferences:{
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity:false,
            preload:path.join(__dirname,'preload.js')
        }
    })

    //加载index.html
    mainWindow.loadFile('dist/index.html')

    ipcMain.on('close',()=>{
        mainWindow.close()
        app.quit()
    })
    ipcMain.on('minimize',()=>{
        mainWindow.minimize()
    })
    ipcMain.on('move',()=>{
        mainWindow.setPosition()
    })

    //打开开发者工具
    mainWindow.webContents.openDevTools()
}

/*这段程序将会在Electron结束初始化
* 和创建浏览器窗口的时候调用
* 部分API在ready事件触发后才能使用 */
app.whenReady().then(()=>{
    createWindow()

    app.on('activate',function (){
        /*通常在macOS上，当点击dock中的应用程序图标时，如果没有其他
        * 打开窗口，那么程序会重新创建一个窗口*/
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()

    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit()
})


// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。

