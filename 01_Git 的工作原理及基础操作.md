
在学习完本章之后，你应该能够配置并初始化一个仓库（repository）、开始或停止跟踪（track）文件、暂存（stage）或提交（commit）更改。

# 第一次使用 git 前的配置
如果是第一次使用git，需要提供身份认证，配置用户名和邮箱
- 查看配置的信息：`$ git config -l`

- 配置用户名和邮箱：建议和 GitHub 里的保持一致：
`$ git config --global user.name xxx`
`$ git config --global user.email xxx`


# 获取 git 仓库
有两种取得 Git 项目仓库的方法。

## 在现有目录下初始化一个仓库

1. 在本地创建一个空仓库
`$ git init`初始化，创建一个 git 空仓库
会在当前目录创建一个空仓库，生成一个`.git文件，主要用于保存本地版本历史信息，不能删除`。但这仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。


2. 关联本地仓库与远程 github 仓库

- 查看所有的关联信息：`$ git remote -v`
- 建立关联：`$ git remote add <xxx> [远程仓库git地址]`
xxx 是和远程仓库关联在一起的名字，默认 origin，可以自定义。

- 移除关联：`$ git remote remove <xxx>`

## 克隆现有的仓库
`$ git clone [git 仓库地址]`，完成在本地创建，关联两步操作。
clone 的是默认配置下远程 Git 仓库中的每一个文件的每一个版本(对远程仓库的完整镜像)，而不仅仅是所需要的文件，一旦远程 github 坏掉，本地的数据完全可用。

还可以自定义本地仓库的名称：`$ git clone [git 仓库地址] [new-name]`

默认情况下，git clone 命令会自动设置本地 master 分支跟踪克隆的远程仓库的 master 分支（或不管是什么名字的默认分支）。

## .gitignore
在 git仓库根目录创建一个.gitignore 文件（没有后缀名），主要用于存储 git 提交要忽略的文件

哪些文件需要忽略呢？
```
# dependencies
node_modules

# testing   斜杠表示是根目录
/coverage

# production
/build

# npm / yarn 
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# webStorm
.idea
```

# git 的工作原理和基础操作
## 三种文件状态
> Git 项目中的文件有三种状态
>- 已修改（modified）
>- 已暂存（staged）
>- 已提交（committed）

由此引入 Git 项目的三个工作区域的概念：
- **工作区**：编辑代码的地方
- **暂存区**：临时存储要生成版本代码的地方 （一个功能分块写，每一块内容先保存在暂存区写完整体提交到历史区）
- **历史区（Git 仓库）**：存储的是生成的每一个版本代码（生成一个版本号，对应当前版本的代码，完整）

如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态。如果作了修改并已 add 到暂存区域，就属于已暂存状态。如果修改到的文件已保存到 Git 仓库中，生成一个版本号，就属于已提交状态。


## git status
执行 `$ git status`(gst)：查看代码或者文件的状态：（当前处于哪个区）
```
On branch master
nothing to commit, working directory clean
```
这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过，也没有未跟踪文件。最后，该命令还显示了当前所在分支。


还可能出现以下情况：
- `Untracked files（**红色**）`: 文件处于已修改的状态，还没有 add 到暂存区被跟踪。
- `Changes to be committed（**绿色**）`: 在暂存区域生成了快照，等待被 commit，文件已暂存（staged）
- `Changes not staged for commit（**红色**）`: 表明文件已经修改，但是还没有暂存，基于当前修改没有重新生成一次快照。已修改状态。

注意：
- **红色**：当前处于工作区，没有暂存，**绿色**：当前处于暂存区，没有提交。
- 一定记住：commit 操作，只有暂存区域的文件（即：文件状态为“Changes to be committed”）才会被提交。

你工作目录下的每一个文件都不外乎这两种状态：`已跟踪`或`未跟踪`。 已跟踪的文件是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能处于未修改，已修改或已放入暂存区。


## 工作区到暂存区
如果文件已被跟踪，git add 就是把当前工作区中最新修改的文件，提交到暂存区。
如果文件没有被跟踪，git add 开始跟踪一个文件

- 全部提交：`git add .`或 `git add -A`
- 部分提交：`git add [file-path1] [file-path2]`： git status 拿到的文件路径，以空格隔开


## 暂存区到历史区
`$ git commit`
这样执行后，会弹出一个提交文本输入界面，需要我们编写本次提交，当前版本的备注信息：
先按 i 进入编辑插入模式
=>输入备注信息
=>按esc
=>输入“:wq”保存并退出

相当于`$ git commit -m '备注信息'`

跳过使用暂存区域: `$ git commit -am '备注信息'`

1. --amend 选项
有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交注释信息写错了。 此时，可以运行带有 --amend 选项的提交命令尝试重新提交：`$ git commit --amend`

如果是漏掉了几个文件：先 add，再 amend commit
如果是修改提交 message：直接 amend commit

这个命令会出来文本编辑框，编辑完，保存退出即可。


## 查看每个区代码区别

- 工作区 VS 暂存区: `$ git diff` 「如果现在把所有文件都 add，你会向暂存区中增加什么」

> 注意：git diff 的操作一般是比较工作区和暂存区同一个文件的修改情况。如果是在工作区新建的文件，暂存区没有，git diff 是不会有输出的。

- 工作区 VS 历史区: `$ git diff [branch-name]` 
- 暂存区 VS 历史区：`git diff --cached` 或 `$ git diff --staged` 「立即执行 git commit，将会提交什么」

> 注意：只要有差异，git diff master 和 git diff --cached 都会有输出




# 本地 git 仓库的工作流程
1. 第一步：在 github 上 New 一个 repository（远程仓库）
有时是团队 leader 来创建，开发者是没有操作权限的，需要 leader 在 gitHub 上邀请其他成员：仓库 => setting => Collabotators 加小组成员，需要成员在自己的邮箱中确认同意。


2. 第二步：将远程仓库 clone 下来，`$ git clone [git 仓库地址]`，完成在本地创建，关联两步操作。
相当于 `$ git init`和`$ git remote add <xxx> [git仓库地址]`。


3. 本地写代码，提交到历史区，生成 commit 版本记录
执行 `$ git add . `和`$ git commit -m "注释"`

4. 同步中央 GitHub
多人协作开发，第一件事情是先拉取代码，保持本地仓库与远程仓库的同步
执行 `$ git pull origin [branch-name]`
然后再把历史区的信息推送到远程仓库上
`$ git push origin [branch-name]`
origin 和 branch-name 可以省略， 直接 git pull / git push。

5. 冲突合并
	+ 同一个文件不同行代码冲突：在提示的冲突命令行中确认即可
   文本编辑模式：按 ESC 输入:wq (按下ENTER键即可)
	+ 同一个文件，同一行代码冲突：如右图所示，git 自动合并失败，需要手动进行合并，然后重新提交




# 查看提交历史
`$ git log`查看提交的记录（查看版本信息）：列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。

还可以加上次数，`$ git log -2`：查看最近两次提交

`$ git log --stat`：查看每次提交的简略的统计信息。在每次提交的下面列出所有被修改过的文件、有多少文件被修改了以及被修改过的文件的哪些行被移除或是添加了。

查看指定作者，某个时间内的提交：`$ git log --author=wb-cxh444861 --since="2020-01-01" --before="2020-01-03"`


