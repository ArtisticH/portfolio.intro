class BootingProfile {
  constructor() {
    // 부팅 화면
    this.$booting = document.getElementById('booting');
    this.$profile = document.getElementById('profile');
    this.$main = document.getElementById('main');
    this.$apple = document.querySelector('.booting-apple-box');
    this.$empty = document.querySelector('.booting-bar-empty');
    this.$fill = document.querySelector('.booting-bar-filled');
    this.init = this.init.bind(this);
    // 프로필 화면
    this.$profileImg = document.querySelector('.profile-img-box img');
    this.$profileBtn = document.querySelector('.profile-btn');
    this.$profileEmpty = document.querySelector('.profile-bar-empty');
    this.$profileFill = document.querySelector('.profile-bar-filled');
    this.$profileBtn.onpointerenter = this.imgChange.bind(this);
    this.$profileBtn.onpointerleave = this.imgOriginal.bind(this);
    this.$profileBtn.onclick = this.clickProfile.bind(this);
  }
  // 0.5초 후에 애플 보이고
  // 다시 0.5초 후에 바 보이고
  // 다시 0.5초 후에 5초간 바 채워진다.
  // 바 채워지고 1초 후에 다음 챕터로
  async init() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    this.visibility(this.$apple);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    this.visibility(this.$empty);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    this.fill(this.$fill);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 6000);
    });
    this.toProfile();
  }
  visibility(elem) {
    elem.style.visibility = 'visible';
  }
  fill(elem) {
    elem.classList.add('fill');
  }
  toProfile() {
    this.$booting.style.display = 'none';
    this.$profile.style.display = 'flex';
  }
  imgChange() {
    this.$profileImg.src = `/public/img/profile/profileChange.jpg`;
  }
  imgOriginal() {
    this.$profileImg.src = `/public/img/profile/profile.png`;
  }
  toMain() {
    this.$main.style.display = 'block';
    this.$profile.style.display = 'none';
  }
  async clickProfile() {
    this.imgChange();
    this.$profileEmpty.style.visibility = 'visible';
    this.$profileFill.classList.add('fill');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3500);
    });
    this.toMain();
  }
}
const bootingProfile = new BootingProfile();
// document.addEventListener('DOMContentLoaded', bootingProfile.init);

// 상단에 시간
class Time {
  constructor() {
    this.$date = document.querySelector('.nav-date');
    this.$time = document.querySelector('.nav-time');
    this.$today = new Date();
    this._month = this.$today.getMonth();
    this._date = this.$today.getDate();
    this._day = this.$today.getDay();
    this._dayNames = [
      '(일)',
      '(월)',
      '(화)',
      '(수)',
      '(목)',
      '(금)',
      '(토)',
    ];
    this._hours;
    this._minutes;
    this._ampm;
  }
  date() {
    this.$date.textContent = `${this._month + 1}월 ${this._date}일 ${this._dayNames[this._day]}`;
  }
  time() {
    this.$today = new Date();
    this._hours = this.$today.getHours();
    this._minutes = this.$today.getMinutes();
    this._ampm = this._hours >= 12 ? '오후' : '오전';
    this._hours %= 12;
    this._hours = this._hours || 12; 
    this._minutes = this._minutes < 10 ? '0' + this._minutes : this._minutes;
    this.$time.textContent = `${this._ampm} ${this._hours} : ${this._minutes}`;  
  }
}
const time = new Time();
time.date();
time.time();
setInterval(() => {
  time.time();
}, 1000);

// document에 클릭 이벤트가 발생했을 때
class Click {
  constructor() {
    // 모달창
    this.$modal = document.getElementById('modal');
    this.$modalBack = document.getElementById('modal-back');
    // nav클릭 시 navlist 보여주는 효과
    // 현재 클릭한 PORTFOLIO나 SKILLS..
    this.$currentList = null;
    this._navClicked = false;
    this.$nav = document.querySelector('.nav');
    this.$nav.onpointerover = this.onlyOneList.bind(this);
    this.$navLis = document.querySelectorAll('.nav-list-li');
    // ul을 보여주는 li에 호버한 경우
    this.parentLi = this.parentLi.bind(this);
    this.$currentLiParent = null;
    [...this.$navLis].forEach(item => {
      item.addEventListener('pointerenter', this.parentLi);
    });
    // 음악
    // 음악 창 호버 효과
    this.$music = document.querySelector('.music');
    this.$musicBtn = document.querySelector('.music-btns');
    this.$musicOper = document.querySelector('.music-opers');
    this.invisible = this.invisible.bind(this);
    this.$music.onpointerenter = this.visible.bind(this);
    // 재생, 이전, 다음
    this.$audio = document.getElementById('audio');
    this.$playBtn = document.querySelector('.music-play');
    this.$playImg = this.$playBtn.querySelector('img');
    this.$musicImg = document.querySelector('.music-img');
    this.$song = document.querySelector('.music-info-song');
    this.$singer = document.querySelector('.music-info-singer');
    this.nextMusic = this.nextMusic.bind(this);
    this._playIndex  = 0;
    this._playlist = [
      ["Cool", "Dua Lipa"],
      ["love is embarrassing", "Olivia Rodrigo"],
      ["The Alchemy", "Taylor Swift"],
      ["idontwannabeyouanymore", "Billie Eilish"],
      ["Cruel Summer", "Taylor Swift"],
      ["Houdini", "Dua Lipa"],
      ["What Was I Made For", "Billie Eilish"],
      ["obsessed", "Olivia Rodrigo"],
    ];
    // 폴더 클릭
    this.$folderIcon = null;
    this.$folderName = null;
    this.$folder = null;
    // 파일 클릭
    this._fileClicked = false;
    this.$file = null;
    this.$fileIcon = null;
    this.$fileName = null;


    // 버튼 클릭
    this.$root = null;
    // 노랑
    this.yellowDisabled = null;
    this.shrinkElem = null;
    this.greenBtnElem = null;
    this.isYellowClicked = null;

    // 초록
    this.greenDisabled = null;
    this.goalWidth = null;
    this.goalHeight = null;
    this.isGreenClicked = null;
    this.yellowBtnElem = null;

    /* 클릭 이벤트 - 취소 버튼 + 스티커 혹은 음악 앱 */
    this.$project = null;
    this.app = null;
    this.circleElem = null;

  }
  // 모든 클릭 이벤트는 여기를 거쳐서 각자의 함수를 찾아간다. 
  handleEvent(event) {
    // HTML에서 data-click="modal...에서 값이 함수의 이름이 된다. 
    const target = event.target.closest('[data-click]');
    if(!target) {
      // 빈 영역을 클릭하면 nav-list활성화 사라진다.
      if(this.$currentList) {
        this.removeClassList(this.$currentList, 'nav-background');
        this.hiddenT(this.$currentList.querySelector('.nav-list-ul'));
        this.$currentList = null;
        this._navClicked = false;
        // 다른 빈영역을 호버하거나, 빈 영역을 클릭하거나, 다른 nav-list를 호버할때
        // portfolio 영역의 nav-list-li-ul는 다 hidden = true여야 한다. 
        this.hiddenT(this.$currentLiParent.querySelector('.nav-list-li-ul'));
      } else if(this.folderBox) {
        this.removeClassList(this.folderBox, 'clicked');
        this.removeClassList(this.folderName, 'clicked');  
      }
      return;
    } else {
      // 띄어쓰기를 기준으로 나누고 
      // 각각 함수를 실행
      // target은 [data-click]을 가진 상위 요소
      const func = target.dataset.click;
      this[func](event, target);
    }
  }
  // 공통 칭구들
  hiddenF(elem) {
    elem.hidden = false;
  }
  hiddenT(elem) {
    elem.hidden = true;
  }
  addClassList(elem, name) {
    elem.classList.add(name);
  }
  removeClassList(elem, name) {
    elem.classList.remove(name);
  }
  // 모달 보여주는 함수
  modal() {
    this.hiddenF(this.$modalBack);
    this.hiddenF(this.$modal);
    this.pauseMusic();
  }  
  modaldisappear() {
    this.hiddenT(this.$modalBack);
    this.hiddenT(this.$modal);
    this.playMusic();
  }
  // 상단 메뉴 클릭
  // PORTFOLIO나 SKILLS...
  navlist(e, target) {
    this._navClicked = true;
    this.showLists(target);
  }
  // 내용물 보여주기
  // 하나를 클릭하면 다른 하나 비활성화
  showLists(target) {
    const ul = target.querySelector('.nav-list-ul');
    if(this.$currentList) {
      // 한 요소가 활성화되어있는 상태에서 다른 요소를 선택했다면..
      // 배경 효과 없애고
      this.removeClassList(this.$currentList, 'nav-background');
      // 그 아래 보여주는 요소 없애기
      this.hiddenT(this.$currentList.querySelector('.nav-list-ul'));
    } 
    // ul을 보여준다.
    this.hiddenF(ul);
    // PORTFOLIO나 SKILLS에 배경 효과 주기 
    this.addClassList(target, 'nav-background');
    this.$currentList = target;
  }
  // 포인터엔터이벤트에서도 하나씩만 보여줘야 한다. 
  // 이 호버 효과는 이미 nav-list를 클릭한 상태에서만 유효하다.
  // 클릭하지 않고 그냥 호버만 하면 내용물을 보여주지 않는다.
  // PORTFOLIO의 경우 항상 처음의 모습을 보여주기 위해
  // 포인터호버하거나, 다른 곳 클릭해서 사라질때 두번째 ul도 사라지게 해야한다. 
  onlyOneList(e) {
    if(!this._navClicked) return;
    // nav-list들을 호버한 경우
    const target = e.target.closest('.nav-list');
    const isPortfolio = target && target.dataset.navList;
    if(!target) {
      // 만약 다른 nav-list가 아닌 빈 공간에 포인터엔터라면 현재꺼 없애기
      this.removeClassList(this.$currentList, 'nav-background');
      // 그 아래 보여주는 요소 없애기
      this.hiddenT(this.$currentList.querySelector('.nav-list-ul'));
      // 이걸 해야 다시 클릭 다음에 호버 효과가 활성화되지
      // 안 하면 호버대기만 해도 다시 내용물 보여주기 때문에 안 된다.
      this._navClicked = false;
      this.$currentList = null;
      // 다른 빈영역을 호버하거나, 빈 영역을 클릭하거나, 다른 nav-list를 호버할때
      // portfolio 영역의 nav-list-li-ul는 다 hidden = true여야 한다. 
    } else {
      this.showLists(target);
    }
    // 만약 portfolio를 벗어났다면 portfolio의 두번째 ul을 초기화
    if(isPortfolio !== 'portfolio') {
      this.hiddenT(this.$currentLiParent.querySelector('.nav-list-li-ul'));
    }
  }
  parentLi(e) {
    const target = e.currentTarget;
    const hasChild = target.dataset.child;
    // data-child="true"인 애들만 가능해
    if(!hasChild) return;
    const ul = target.querySelector('.nav-list-li-ul');
    if(this.$currentLiParent) {
      // 한번에 하나씩
      this.hiddenT(this.$currentLiParent.querySelector('.nav-list-li-ul'));
    } 
    this.hiddenF(ul);
    this.$currentLiParent = target;
  }
  // 음악
  visible(e) {
    const target = e.currentTarget;
    this.$musicBtn.classList.add('visible');
    this.$musicOper.classList.add('visible');
    target.onpointerleave = this.invisible;
  }
  invisible() {
    this.$musicBtn.classList.remove('visible');
    this.$musicOper.classList.remove('visible');
  }
  playMusic() {
    // 재생하면 play -> pause로 아이콘 바꾸기
    this.$playImg.src = `/public/img/main/music/pause-btn.png`
    this.$playBtn.dataset.click = 'pauseMusic';
    this.$audio.play();
    this.$audio.addEventListener('ended', this.nextMusic);
  }
  pauseMusic() {
    this.$playImg.src = `/public/img/main/music/play-btn.png`
    this.$playBtn.dataset.click = 'playMusic';
    this.$audio.pause();
  }
  prevMusic() {
    if(this._playIndex === 0) {
      this._playIndex = 7;
    } else {
      this._playIndex--;
    }
    this.changeMusic(this._playIndex);
    this.playMusic();
  }
  nextMusic() {
    if(this._playIndex === (this._playlist.length - 1)) {
      this._playIndex = 0;
    } else {
      this._playIndex++;
    }
    this.changeMusic(this._playIndex);
    this.playMusic();
  }
  changeMusic(index) {
    this.$song.textContent = this._playlist[index][0];
    this.$singer.textContent = this._playlist[index][1];
    this.$musicImg.src = `/public/img/main/music/${this._playlist[index][0]}.jpeg`;
    this.$audio.src = `/public/audio/${this._playlist[index][0]}.mp3`;
  }
  // 폴더 클릭 시 색상 강조 효과
  // 클릭당 하나만
  folder(e, target) {
    if(!this.$folder) {
      // 처음 폴더 클릭할때
      this.$folderIcon = target.querySelector('.folder-icon');
      this.$folderName = target.querySelector('.folder-name');
      this.addClassList(this.$folderIcon, 'clicked');
      this.addClassList(this.$folderName, 'clicked');  
    } else {
      this.removeClassList(this.$folderIcon, 'clicked');
      this.removeClassList(this.$folderName, 'clicked');
      this.$folderIcon = target.querySelector('.folder-icon');
      this.$folderName = target.querySelector('.folder-name');
      this.addClassList(this.$folderIcon, 'clicked');
      this.addClassList(this.$folderName, 'clicked');  
    }
    this.$folder = target;
  }
  // 파일 클릭 시 강조 효과
  file(e, target) {
    console.log(target);
    if(!this.$file) {
      this.$fileIcon = target.querySelector('.file-icon');
      this.$fileName = target.querySelector('.file-name');
      this.addClassList(this.$fileIcon, 'clicked');
      this.addClassList(this.$fileName, 'clicked');  
    } else {
      this.removeClassList(this.$fileIcon, 'clicked');
      this.removeClassList(this.$fileName, 'clicked');
      this.$fileIcon = target.querySelector('.file-icon');
      this.$fileName = target.querySelector('.file-name');
      this.addClassList(this.$fileIcon, 'clicked');
      this.addClassList(this.$fileName, 'clicked');  
    }
    this.$file = target;
    this._fileClicked = true;
  }
  // 버튼 클릭
  /*
  빨강: 삭제
  노랑: 축소
  그린: 확대
  노랑과 그린을 클릭했을때, 서로 공존할 수 없다. 
  노랑을 클릭하면 그린 비활성화, 
  그린을 선택하면 노랑 비활성화
  */
  red(e, target) {
    this.$root = target.closest('[data-project]');
    // file창인지 gif창인지
    // 파일 창 삭제면 폴더 강조 효과 + 클릭한 파일 없애고
    // 움짝 창 삭제면 움짝 파일 강조 효과 없애야 한다.
    const type = this.$root.classList[0];
    const project = this.$root.dataset.project;
    this.hiddenT(this.$root);
    this.removeHighlight(type, project);
  }
  removeHighlight(type, project) {
    if(type === 'file') {
      // 파일 창이 열린 경우는 폴더가 명백히 클릭되었지만
      // 파일 창이 열렸다고 무조건 파일을 클릭하진 않았따. 
      // 그래서 _fileClicked로 체크하고 삭제해야 한다. 
      this.removeClassList(this.$folderIcon, 'clicked');
      this.removeClassList(this.$folderName, 'clicked'); 
      // 파일을 클릭한 경우 현재 강조된 파일 삭제
      if(!this._fileClicked) return;
      this.removeClassList(this.$fileIcon, 'clicked');
      this.removeClassList(this.$fileName, 'clicked');
      this._fileClicked = false;
    } else if(type === 'gif') {
      // 움짤 창을 열게 만든 움짤 파일을 삭제
      const file = document.querySelector(`.file-${project}`);
      const gif = file.querySelector('.file-box-gif');
      const icon = gif.querySelector('.file-icon');
      const name = gif.querySelector('.file-name');
      this.removeClassList(icon, 'clicked');
      this.removeClassList(name, 'clicked');
    }
  }
  redApp(e, target) {
    this.btnParent = target.closest('[data-project]');
    this.$project = this.btnParent.dataset.project;
    this.app = document.querySelector(`[data-app='${this.$project}']`);
    this.app.dataset.isappclosed = 'true';
    this.removeClassList(this.app, 'dblclicked');
    this.circleElem = this.app.querySelector('.main-apps__main__app__circle');
    this.hiddenT(this.circleElem);
    this.hiddenT(this.btnParent);
  }
  yellow(e, target) {
    // disabled: 비활성화 여부
    this.yellowDisabled = target.dataset.disabled;
    // 비활성화 되어있다면 줄어들기 기능을 실현할 수 없음.
    if(this.yellowDisabled == 'true') return;

    this.btnParent = target.closest('[data-project]');
    this.shrinkElem = this.btnParent.querySelector('.shrink');
    this.greenBtnElem = this.btnParent.querySelector(`[data-click='greenBtn']`);
    this.isYellowClicked = target.dataset.isclicked;

    // 줄어들때
    if(this.isYellowClicked === 'false') {
      this.hiddenT(this.shrinkElem);
      target.dataset.isclicked = 'true';
      this.greenBtnElem.style.backgroundColor = '#323131';
      this.greenBtnElem.dataset.disabled = 'true';  
      // 원상복귀
    } else if(this.isYellowClicked === 'true') {
      this.hiddenF(this.shrinkElem);
      target.dataset.isclicked = 'false';
      this.greenBtnElem.style.backgroundColor = '';
      this.greenBtnElem.dataset.disabled = 'false';
    }
  }
  green(e, target) {
    this.greenDisabled = target.dataset.disabled;
    if(this.greenDisabled == 'true') return;
    this.goalWidth = document.documentElement.clientWidth;
    this.goalHeight = document.querySelector('.main').offsetHeight;
    this.btnParent = target.closest('[data-project]');
    this.isGreenClicked = target.dataset.isclicked;
    this.yellowBtnElem = this.btnParent.querySelector(`[data-click='yellowBtn']`);

    if(this.isGreenClicked === 'false') {
      this.btnParent.style.width = this.goalWidth + 'px';
      this.btnParent.style.height = this.goalHeight + 'px';
      this.btnParent.style.left = '0px';
      this.btnParent.style.top = '0px';
      target.dataset.isclicked = 'true';
      this.yellowBtnElem.style.backgroundColor = '#323131';
      this.yellowBtnElem.dataset.disabled = 'true';
    } else if(this.isGreenClicked === 'true') {
      this.btnParent.style.width = '';
      this.btnParent.style.height = '';
      this.btnParent.style.left = '';
      this.btnParent.style.top = '';
      target.dataset.isclicked = 'false';
      this.yellowBtnElem.style.backgroundColor = '';
      this.yellowBtnElem.dataset.disabled = 'false';
    }
  }
}
const click = new Click();
document.addEventListener('click', click);
/*
📍 click과 드래그앤드롭을 모두 가지고 있는 요소는(같은 부모 요소가 아니라 부모 - 자식간), 
클릭을 하면 pointerdown => .. 이런식으로 pointerdown이벤트가 발생하기 때문에
실제 버튼을 클릭해도 조금씩 움직인다. 
드래그앤드롭 이벤트 => 클릭이벤트 이런 식으로 발생..
이거 고쳐야 한다.
*/
// 드래그앤드롭
class DragAndDrop {
  constructor() {
    this._navHeight = document.querySelector('.nav').getBoundingClientRect().height;
    this._shiftX = null;
    this._shiftY = null;
    this.$target = null;
    this._zIndex = 20;
    this.moveAt = this.moveAt.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
  }
  handleEvent(event) {
    const target = event.target.closest('[data-pointerdown]');
    if(!target) return;
    const func = target.dataset.pointerdown;
    this[func](event, target);
  }
  dragAndDrop(e, target) {
    this._shiftX = e.clientX - target.getBoundingClientRect().left;
    this._shiftY = e.clientY - target.getBoundingClientRect().top;
    this.$target = target;  
    this.$target.style.zIndex = `${++this._zIndex}`;
    this.moveAt(e.clientX, e.clientY);
    document.addEventListener('pointermove', this.pointerMove);
    this.$target.addEventListener('pointerup', this.pointerUp);
    this.$target.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }
  moveAt(clientX, clientY) {
    this.$target.style.left = clientX - this._shiftX + 'px';
    // 왜냐면 드래그드롭되는 애들은 .main소속이니까
    // .main의 absolute임, nav는 갈 수 없음
    this.$target.style.top = clientY - this._shiftY - this._navHeight + 'px';
  }
  pointerMove(e) {
    this.moveAt(e.clientX, e.clientY);
  }
  pointerUp() {
    document.removeEventListener('pointermove', this.pointerMove);
    this.$target.removeEventListener('pointerup', this.pointerUp);
  }
}
const dragAndDrop = new DragAndDrop();
document.addEventListener('pointerdown', dragAndDrop);

// 더블 클릭
class Dblclick {
  constructor() {
    // folder
    this.$project = null;
    this.$file = null;
    this.shrinkElem = null;
    this.yellowBtnElem = null;
    this.greenBtnElem = null;
    // gif
    this.$gif = null;

    /* app */
    this.isAppClosed = null;
    this.projectElem = null;
    this.circleElem = null;
  }

  handleEvent(event) {
    const target = event.target.closest('[data-dblclick]');
    if(!target) return;
    const func = target.dataset.dblclick;
    this[func](event, target);
  }
  // 폴더에 맞는 파일 창 보여주기
  folder(e, target) {
    // 폴더의 프로젝트 이름과 같은 파일 클래스 찾기
    // 어차피 css에서 위치를 정해놨기 때문에 클래스 이름 있음.
    this.$project = target.dataset.project;
    this.$file = document.querySelector(`.file-${this.$project}`);
    this.$file.hidden = false;

    // this.shrinkElem = this.fileElem.querySelector('.shrink');
    // this.yellowBtnElem = this.fileElem.querySelector(`[data-click='yellowBtn']`);
    // this.greenBtnElem = this.fileElem.querySelector(`[data-click='greenBtn']`);
    // this.original(this.fileElem);
  }
  // 움짤 파일 더블클릭 => 움짤 창 연다
  gif(e, target) {
    this.$project = target.closest('[data-project]').dataset.project;
    this.$gif = document.querySelector(`.gif-${this.$project}`);
    this.$gif.hidden = false;

    // this.shrinkElem = this.$gif.querySelector('.shrink');
    // this.yellowBtnElem = this.$gif.querySelector(`[data-click='yellowBtn']`);
    // this.greenBtnElem = this.$gif.querySelector(`[data-click='greenBtn']`);
    // this.original(this.$gif);
  }

  original(elem) {
    this.shrinkElem.hidden = false;
    this.yellowBtnElem.dataset.isclicked = 'false';
    this.greenBtnElem.dataset.disabled = 'false';
    this.greenBtnElem.style.backgroundColor = '';
    this.yellowBtnElem.style.backgroundColor = '';
    this.greenBtnElem.dataset.isclicked = 'false';
    this.yellowBtnElem.dataset.disabled = 'false';
    elem.style.width = '';
    elem.style.height = '';
    elem.style.left = '';
    elem.style.top = '';    
  }

  app(e, target) {
    this.isAppClosed = target.dataset.isappclosed;
    // 앱이 꺼지지 않았으면 나가
    if(this.isAppClosed === 'false') return;
    this.$project = target.dataset.app;
    this.projectElem = document.querySelector(`[data-project='${this.$project}']`);
    this.circleElem = target.querySelector('.main-apps__main__app__circle');

    target.classList.add('dblclicked');
    this.projectElem.hidden = false;
    this.circleElem.hidden = false;

    this.shrinkElem = this.projectElem.querySelector('.shrink');
    this.yellowBtnElem = this.projectElem.querySelector(`[data-click='yellowBtn']`);
    this.greenBtnElem = this.projectElem.querySelector(`[data-click='greenBtn']`);
    this.original(this.projectElem);
  }
  // 파일과 gif에서 타이틀 더블 클릭하면 창 커짐
  greenBtn(e, target) {
    this.greenBtnElem = target.closest('[data-project]').querySelector(`[data-click='greenBtn']`);
    click.greenBtn(undefined, this.greenBtnElem);
  }
  // 스티커 윗부분 더블 클릭하면 줄어드는 효과
  yellowBtn(e, target) {
    this.yellowBtnElem = target.closest('[data-project]').querySelector('[data-click="yellowBtn"]');
    click.yellowBtn(undefined, this.yellowBtnElem);
  }
}

const dblclick = new Dblclick();
document.addEventListener('dblclick', dblclick);

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// 앱

class App {
  constructor() {
    this.appArea = document.querySelector('.main-apps__main');
    this.eachApp = document.querySelectorAll('.main-apps__main__app');
    this.eachTooltip = document.querySelectorAll('.main-apps__main__app__tooltip');
    this.prevTooltip = null;
    this.currentTooltip = null;

    this.showTooltip = this.showTooltip.bind(this);
    this.removeAllTooltips = this.removeAllTooltips.bind(this);
  }

  tooltipEvent() {
    for(let app of this.eachApp) {
      app.addEventListener('pointerenter', this.showTooltip);
    }  
    this.appArea.addEventListener('pointerleave', this.removeAllTooltips);
  }

  showTooltip(e) {
    this.currentTooltip = e.target.querySelector('.main-apps__main__app__tooltip');
    if(!this.prevTooltip) {
      this.currentTooltip.style.display = 'block';
    } else {
      this.prevTooltip.style.display = 'none';
      this.currentTooltip.style.display = 'block';
    }
    this.prevTooltip = this.currentTooltip;  
  }
  
  removeAllTooltips(e) {
    this.prevTooltip.style.display = 'none';  
  }
}

let app = new App();
app.tooltipEvent();



