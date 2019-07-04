## NPM模块
* 完全符合CommonJS规范的模块应包含一下几个文件。
1. package.json:模块的描述性文件
2. bin:存放可执行的二进制文件
3. lib:存放JavaScript代码
4. doc：存放文档
5. test：存放单元测试用例。
   
* 最低限度,模块应包含一个描述文件 package.json及一个存放模块代码的index.js文件。
* package.json文件可通过 npm init命令创建,NPM会在创建过程中对开发者进行引导,根据提示输入内容然后一步步按回车键进行确认即可。 
* 因此,package-lock.json就是NPM为了防止模块包的不一致而进行的功能加强。这个文件在运行命令npm install的时候为了锁定依赖版本和来源而由NPM自动创建,实际上记录了当前状态下安装的所有模块信息,确保了下载时间、开发者、机器和下载源都不相同的情况下也能够得到完全一样的模块包。

## 使用NVM控制Node.js版本

* [Git 以分支的方式同时管理多个项目](https://www.cnblogs.com/huangtailang/p/4748075.html)

