#git常用操作指令

## 1.删除分支

###删除本地分支
	git branch -d branch-name

###强制删除
	git branch -D branch-name

###删除远程分支
	git push origin :branch-name(直接分支名) (origin后面有空格)

## 2.版本回退

###本地版本回退
	git reset --hard commit-id 回滚到commint-id，将commit-id之后提交的commit都去除
	git reset --hard HEAD^
	git reset --hard HEAD~3

###远程库版本回退
> 参考地址：http://www.cnblogs.com/hqbhonker/p/5092300.html<br />
 先将本地的分支回退到某个commit，然后删除远程分支，再重新push本地分支。
操作步骤：<br />
1.git checkout branch-name<br />
2.git pull<br />
3.git branch branch-name-backup 备份当前的分支<br />
4.git reset --hard commit 回滚<br />
5.git push origin :branch-name 删除远程分支<br />
6.git push origin branch-name 用回滚后的本地分支重新建立远程分支<br />
7.git push origin :branch-name-backup 如果前面成功了，就删除备份分支<br />


### 回退工作区代码

	git checkout -- file 

### 本地代码git add 但是未git commit回退
	
	git reset HEAD file


## 3.git查看远程仓库地址

	git remote -v


## 4.git保存工作区
	
	// 暂存当前状态
	git stash
	
	// 显示已暂存列表
	git stash list

	// 恢复暂存区和工作区进度
	git stash pop --index stash@{0}


## 5.打标签tag

Git完整工作流程
就我目前的工作流程来看，在开发测试完毕达到上线的要求后，通常按照以下的步骤来进行操作打tag。

1.修改文件中的版本号
在项目文件中会有一个表示版本号的变量，每次上线时会对这个变量进行修改。

2.切换分支
原本是在dev分支上进行开发，需要上线时，切换至master分支。
$git checkout master

3.合并分支
切换至master分支后，将dev分支merge到master分支，使得master分支上的内容是最新的。
$git merge dev

4.commit
将此次版本号的修改提交至仓库中
$git add -A
$git commit -m 'newtag'

5.增加tag
比如说本期上线的需求为1.2.2版本，则使用如下命令添加tag，添加一些注释信息。
$git tag -a v1.2.2 -m 'v1.2.2'

6.将commit信息push至仓库
$git push origin master

7.将tag信息push仓库中
$git push --tag
至此，一个完整的打tag流程就结束了。


	切换标签
	$git checkout [tagname]
	
	查看标签信息
	$git show [tagversion]
	
	删除本地标签
	$git tag -d [tagversion]
	
	删除远程标签
	$git push origin --delete tag [tagversion]
	
	发布本地标签
	$git push [tagversion]
	$git push --tags
	
	发布标签到远程
	$git push origin [tagversion]
	$git push origin --tags