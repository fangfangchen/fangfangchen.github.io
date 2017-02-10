#git常用操作指令

##删除分支

###删除本地分支
	git branch -d branch-name

###强制删除
	git branch -D branch-name

###删除远程分支
	git push origin :branch-name (origin后面有空格)

##版本回退

###本地版本回退
	git reset --hard commit-id 回滚到commint-id，将commit-id之后提交的commit都去除
	git reset --hard HEAD^
	git reset --hard HEAD~3

###远程库版本回退
 先将本地的分支回退到某个commit，然后删除远程分支，再重新push本地分支。
操作步骤：<br />
1.git checkout branch-name<br />
2.git pull<br />
3.git branch branch-name-backup 备份当前的分支<br />
4.git reset --hard commit 回滚<br />
5.git push origin :branch-name 删除远程分支<br />
6.git push origin branch-name 用回滚后的本地分支重新建立远程分支<br />
7.git push origin :branch-name-backup 如果前面成功了，就删除备份分支<br />

