# 아이콘 사용

mdi icon을 기본으로 사용합니다. vue-icon 컴포넌트를 통해 사용할 수 있으며
class name으로 직접 지정도 가능합니다.

```
<v-icon>mdi-account</v-icon>
<i class="mdi mdi-home"></i>
```

아이콘 목록은 아래에서 찾아보시면 됩니다.
https://pictogrammers.com/library/mdi/

# Tailwind

tailwind는 v4를 사용합니다.
vuetify와의 충돌을 막기 위해 prefix를 세팅했습니다
접두사로 'tw:'를 붙인 채 사용하면 됩니다.

```
<div class="tw:bg-blue"></div>
```

Figma에서 사용한 컬러 테마가 적용되어 있습니다.
네이밍 룰은 Figma variant 값을 그대로 따왔습니다.
bg-main-400 하면 프로젝트에 사용한 main 컬러가 적용됩니다.

tailwind 버전이 올라가며 사용하지 못하게 된 속성들이 있습니다.
반드시 공식문서를 확인해보시길 바랍니다.
https://tailwindcss.com/docs/upgrade-guide

# 사용된 VSC extension 목록

Tailwind CSS Inteligent
Auto Import
Auto Rename Tag
Color Hightlight
Vue3 Support - All in one
MDI Vuetify Intellisense

# Git Commit conventions

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Docs: 문서 수정
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- Refactor: 코드 리팩토링
- Test: 테스트 코드, 리팩토링 테스트 코드 추가
- Chore: 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
- Design: CSS 등 사용자 UI 디자인 변경
- Comment: 필요한 주석 추가 및 변경
- Rename: 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
- Remove: 파일을 삭제하는 작업만 수행한 경우
- !BREAKING CHANGE: 커다란 API 변경의 경우
- !HOTFIX: 급하게 치명적인 버그를 고쳐야 하는 경우

Husky 적용해서 위 태그 안 적거나 종류에 없는 것 쓰면 commit 거부됩니다.

# Git 명령어 모음

### Issue / 원격에서 새 브랜치 생성후 작업하기

git fetch origin
git checkout <브랜치 이름>
git pull origin main 
<!-- 작업 후 커밋 생성 -->
git push origin 브랜치명

### 로컬에서 바로 브랜치 생성하고 원격에 branch를 넣는 방법

git pull origin main
git checkout -b 브랜치명
git pull origin main
<!-- 작업 후 커밋 생성 -->
git push origin 브랜치명

### Push 이후
<!-- 로컬 브랜치 삭제 -->
git checkout main
git branch -d <로컬 브랜치 이름>
git branch -D <로컬 브랜치 이름> <!-- 강제삭제 (원격 머지 후엔 하셔도 됩니다!) -->

### 아직 push하지 않은 로컬 commit log 합치기 
<!-- N은 HEAD로부터 합칠 커밋 개수 입력 -->
git rebase -i HEAD~N