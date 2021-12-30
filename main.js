//main.js
//控制应用生命周期和创建原生浏览器窗口的模组

const {app,BrowserWindow, ipcMain}=require('electron')
const fs=require('fs')//导入文件读取的node
const path=require('path')
const {top_playlist,top_song,playlist_detail,song_url,lyric,song_detail}=require('NeteaseCloudMusicApi')
const Store=require('electron-store')//electron提供的简单的数据持久化工具
let option={
    name:"config",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
    cwd:app.getPath('userData'),//文件位置,尽量不要动，默认情况下，它将通过遵循系统约定来选择最佳位置。C:\Users\xxx\AppData\Roaming\test\config.json
//    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
const store=new Store(option)

//导入网易云的api

function createWindow(){
    //创建浏览器窗口
    const mainWindow=new BrowserWindow({
        width:1000,
        height:680,
        frame: false,          //禁止缩放
        resizable: false,      //兼容mac与Windows
        titleBarStyle:"hidden",
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity:false,
            preload:path.join(__dirname,'preload.js')
        }
    })

    //加载index.html
    mainWindow.loadFile('dist/index.html')
    //Windows窗口的操作
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
    //获取mp3文件的专辑封面
    ipcMain.on('getMusicImg',(event, localUrl) =>{
        const jsmediatags = require('jsmediatags')
        new jsmediatags.Reader(localUrl)
            .setTagsToRead(["title", "artist","picture"])
            .read({
                onSuccess: function(tag) {
                    console.log(tag);
                    event.sender.send('replyMusicImg',tag)
                },
                onError: function(error) {
                    console.log(':(', error.type, error.info);
                }
            });
    } )
    //读取和设置用户json储存的本地文件地址
    ipcMain.on('getLocalUrl',event => {
        console.log(store.get('localMusic'))
        event.sender.send('getLocalUrl1',store.get('localMusic'))
    })
    ipcMain.on('setLocalUrl',(event,localUrl) => {
        store.set('localMusic',localUrl)
        console.log(store.get('localMusic'))
    })
    //文件读取的操作
    //读取文件列表
    ipcMain.on('readList',(event, listUrl)=>{
        const listObject=fs.readdirSync(listUrl).filter(function (file) {
            file=path.extname(file).toLowerCase()
            return file === '.mp3';
        });
        event.sender.send('listObject',listObject)
    })
    //获取网易云的音乐
    ipcMain.on('getNetMusic',async (event, id) =>{
        try {
            const music=await song_url({
                id:id,
                br:320000
            })
            const musicLrc=await lyric({
                id:id
            })
            const musicDetail=await song_detail({
                ids:id.toString()
            })
            event.sender.send('getNetMusic1',music,musicLrc,musicDetail)
        }catch (error){
            console.log(error)
        }

    } )
    //获取网易云的歌单
    ipcMain.on('getNetEaseCloudMusic',async (event)=>{
        try {
            const result=await top_playlist({
                order:'hot',
                limit:4
            })
            event.sender.send('musicList',result.body.playlists)
        }catch (error){
            console.log(error)
        }

    })
    //获取最新音乐
    ipcMain.on('getNetEaseCloudMusicNew',async (event)=>{
        try {
            const result=await top_song({
                type:0
            })
            event.sender.send('newMusicList',result.body.data)
        }catch (error){
            console.log(error)
        }
    })
    //获取网易云音乐歌单具体信息
    ipcMain.on('getMusicList',async (event,id) => {
        try {
            const musicList=await playlist_detail({
                id:id
            })
            event.sender.send('getMusicList1',musicList)
        }catch (error){
            console.log(error)
        }
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

