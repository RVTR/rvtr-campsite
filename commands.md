
cd rvtr-app-campsite/
git rebase upstream
git rebase
git rebase upstream/master
git fetch upstream
git remote add upstream https://github.com/RVTR/rvtr-app-campsite.git
git fetch upstream
git rebase upstream/master
git checkout -b 172282283-datamodel -t upstream/master
git push
git branch
git push origin
git add .
git commit
cd angular/src/app/
cd -
git rebase origin/master
git push
git push origin

# Steps:
# 1. Fork the original repo
# 2. Add upstream repo
# 2. Create a new branch, and set it to track the upstream branch we forked from 
# 3. Commit our changes to origin repo (our forker repo)
# 4. Rebase from upstream repo

