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
    this.$navLists = document.querySelectorAll('.nav-list');
    this.$nav.onpointerover = this.onlyOneList.bind(this);
    this.$navLis = document.querySelectorAll('.nav-list-li');
    // ul을 보여주는 li에 호버한 경우
    this.parentLi = this.parentLi.bind(this);
    this.$currentLiParent = null;
    [...this.$navLis].forEach(item => {
      item.addEventListener('pointerenter', this.parentLi);
    });

    /* 클릭 이벤트 - 음악 */
    this.Audio = document.getElementById('musicAudio');
    this.PlayBtn = document.querySelector('.main-music__operation__btns__play');
    this.PlayBtnImg = document.querySelector('.main-music__operation__btns__play > img');
    this.musicImg = document.querySelector('.main-music__img-box__img');
    this.song = document.querySelector('.main-music__operation__info__song');
    this.singer = document.querySelector('.main-music__operation__info__singer');
    this.playCount = 0;
    this.playIndex = 0;
    this.playlist = [
      // [audio이름(사진 이름), 노래 제목, 가수]
      ["Anti-Hero", `Anti-Hero (feat. Bleachers)`, `Taylor Swift - Anti-Hero (feat. Bleachers) - Single`],
      ["Training Season", `Training Season`, `Dua Lipa - Training Season - Single`],
      ["Flowers", `Flowers`, `Milely Cyrus - Endless Summer Vacation`],
      ["Houdini", `Houdini`, `Dua Lipa - Houdini - Single`],
      ["Cruel Summer", `Cruel Summer`, `Taylor Swift - Lover`],
      ["Drivers License", `drivers License`, `Olivia Rodrigo - SOUR`],
      ["Suburban Legends", `Suburban Legends(Taylor's Version)`, `Taylor Swift - 1989 (Taylor's Version)`],
    ];
    this.PLAYLIST_LENGTH = this.playlist.length;

    /* 클릭 이벤트 - 버튼 */
    this.btnParent = null;
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
    this.projectName = null;
    this.app = null;
    this.circleElem = null;

    /* 클릭 이벤트 - 폴더 */
    this.folderBox = null;
    this.folderName = null;
    this.currentFolder = null;

    /* 클릭 이벤트 - 파일 */
    this.fileBox = null;
    this.fileName = null;
    this.currentFile = null;
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
      } else if(this.folderBox) {
        this.removeClassList(this.folderBox, 'clicked');
        this.removeClassList(this.folderName, 'clicked');  
      }
      return;
    } else {
      // 띄어쓰기를 기준으로 나누고 
      // 각각 함수를 실행
      // target은 [data-click]을 가진 상위 요소
      const events = target.dataset.click.split(' ');
      for(let item of events) {
        this[item](event, target);
      }  
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
  }  
  modaldisappear() {
    this.hiddenT(this.$modalBack);
    this.hiddenT(this.$modal);
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
    const target = e.target.closest('.nav-list');
    if(!target) {
      // 만약 다른 nav-list가 아닌 빈 공간에 포인터엔터라면 현재꺼 없애기
      this.removeClassList(this.$currentList, 'nav-background');
      // 그 아래 보여주는 요소 없애기
      this.hiddenT(this.$currentList.querySelector('.nav-list-ul'));
      // 이걸 해야 다시 클릭 다음에 호버 효과가 활성화되지
      // 안 하면 호버대기만 해도 다시 내용물 보여주기 때문에 안 된다.
      this._navClicked = false;
      this.$currentList = null;
    } else {
      this.showLists(target);
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



  


  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 음악 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  
  playMusic() {
    this.PlayBtnImg.src = `/public/img/main/contents/music/pause-btn.png`
    this.PlayBtn.dataset.click = 'pauseMusic';
    this.Audio.play();
    this.Audio.addEventListener('ended', this.nextMusic);
  }

  pauseMusic() {
    this.PlayBtnImg.src = `/public/img/main/contents/music/play-btn.png`
    this.PlayBtn.dataset.click = 'playMusic';
    this.Audio.pause();
  }

  prevMusic() {
    if(this.playCount === 0) this.playCount = 7;
    this.playIndex = --this.playCount % this.PLAYLIST_LENGTH;
    this.changeMusic();
    this.playMusic();
  }

  nextMusic() {
    this.playIndex = ++this.playCount % this.PLAYLIST_LENGTH;
    this.changeMusic();
    this.playMusic();
  }

  changeMusic() {
    this.song.textContent = this.playlist[this.playIndex][1];
    this.singer.textContent = this.playlist[this.playIndex][2];
    this.musicImg.src = `/public/img/main/contents/music/${this.playlist[this.playIndex][0]}.png`;
    this.musicImg.alt = this.playlist[this.playIndex][0];
    this.Audio.src = `/public/audio/${this.playlist[this.playIndex][0]}.mp3`;
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 버튼 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

  redBtn(e, target) {
    this.btnParent = target.closest('[data-project]');
    this.hiddenT(this.btnParent);
  }

  redBtnRelatedApp(e, target) {
    this.btnParent = target.closest('[data-project]');
    this.projectName = this.btnParent.dataset.project;
    this.app = document.querySelector(`[data-app='${this.projectName}']`);
    this.app.dataset.isappclosed = 'true';
    this.removeClassList(this.app, 'dblclicked');
    this.circleElem = this.app.querySelector('.main-apps__main__app__circle');
    this.hiddenT(this.circleElem);
    this.hiddenT(this.btnParent);
  }

  yellowBtn(e, target) {
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

  greenBtn(e, target) {
    this.greenDisabled = target.dataset.disabled;
    if(this.greenDisabled == 'true') return;
    this.goalWidth = document.documentElement.clientWidth;
    this.goalHeight = document.querySelector('.main-contents').offsetHeight;
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

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 폴더 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

  folder(e, target) {
    if(!this.currentFolder) {
      this.folderBox = target.querySelector('.main-folder__icon-box');
      this.folderName = target.querySelector('.main-folder__icon-name');
      this.addClassList(this.folderBox, 'clicked');
      this.addClassList(this.folderName, 'clicked');  
    } else {
      this.removeClassList(this.folderBox, 'clicked');
      this.removeClassList(this.folderName, 'clicked');
      this.folderBox = target.querySelector('.main-folder__icon-box');
      this.folderName = target.querySelector('.main-folder__icon-name');
      this.addClassList(this.folderBox, 'clicked');
      this.addClassList(this.folderName, 'clicked');  
    }
    this.currentFolder = target;
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 파일 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

  file(e, target) {
    if(!this.currentFile) {
      this.fileBox = target.querySelector('.main-file__file__icon-box');
      this.fileName = target.querySelector('.main-file__file__name');
      this.addClassList(this.fileBox, 'clicked');
      this.addClassList(this.fileName, 'clicked');  
    } else {
      this.removeClassList(this.fileBox, 'clicked');
      this.removeClassList(this.fileName, 'clicked');
      this.fileBox = target.querySelector('.main-file__file__icon-box');
      this.fileName = target.querySelector('.main-file__file__name');
      this.addClassList(this.fileBox, 'clicked');
      this.addClassList(this.fileName, 'clicked');  
    }
    this.currentFile = target;
  }
}
const click = new Click();
document.addEventListener('click', click);

/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
/* 음악 앱 포인터 이벤트 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

class Music {
  constructor() {
    this.musicElem = document.querySelector('.main-music');
    this.musicBtnElem = document.querySelector('.main-music__btns');
    this.musicOperation = document.querySelector('.main-music__operation');

    this.visible = this.visible.bind(this);
    this.invisible = this.invisible.bind(this);
  }

  pointerEvent() {
    this.musicElem.addEventListener('pointerenter', this.visible);
    this.musicElem.addEventListener('pointerleave', this.invisible);
  }

  visible() {
    this.musicBtnElem.classList.add('visible');
    this.musicOperation.classList.add('visible');
  }

  invisible() {
    this.musicBtnElem.classList.remove('visible');
    this.musicOperation.classList.remove('visible');
  }
}

let music = new Music();
music.pointerEvent();

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// 드래그앤드롭

class HandleDragEvents {
  constructor() {
    this.menuHeight = document.querySelector('.nav').getBoundingClientRect().height;
    this.shiftX = null;
    this.shiftY = null;
    this.target = null;

    this.moveAt = this.moveAt.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
  }

  handleEvent(event) {
    const target = event.target.closest('[data-pointerdown]');
    if(!target) return;
    const clickType = target.dataset.pointerdown;
    this[clickType](event, target);
  }

  dragAndDrop(e, target) {
    this.shiftX = e.clientX - target.getBoundingClientRect().left;
    this.shiftY = e.clientY - target.getBoundingClientRect().top;
    this.target = target;  
    this.target.style.zIndex = 1000;

    this.moveAt(e.clientX, e.clientY);
    
    document.addEventListener('pointermove', this.pointerMove);
    this.target.addEventListener('pointerup', this.pointerUp);
    this.target.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  moveAt(clientX, clientY) {
    this.target.style.left = clientX - this.shiftX + 'px';
    this.target.style.top = clientY - this.shiftY - this.menuHeight + 'px';
  }

  pointerMove(e) {
    this.moveAt(e.clientX, e.clientY);
  }

  pointerUp() {
    document.removeEventListener('pointermove', this.pointerMove);
    this.target.removeEventListener('pointerup', this.pointerUp);
  }
}

let handleDragEvents = new HandleDragEvents();
document.addEventListener('pointerdown', handleDragEvents);

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// 더블 클릭

class HandleDblclickEvents {
  constructor() {
    /* 폴더 */
    this.projectName = null;
    this.fileElem = null;
    this.shrinkElem = null;
    this.yellowBtnElem = null;
    this.greenBtnElem = null;

    /* gif */
    this.gifElem = null;

    /* app */
    this.isAppClosed = null;
    this.projectElem = null;
    this.circleElem = null;
  }

  handleEvent(event) {
    const target = event.target.closest('[data-dblclick]');
    if(!target) return;
    const clickType = target.dataset.dblclick;
    this[clickType](event, target);
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

  folder(e, target) {
    // 폴더에 맞는 파일 창 보여주기
    this.projectName = target.closest('[data-project]').dataset.project;
    this.fileElem = document.querySelector(`.file-${this.projectName}`);
    this.fileElem.hidden = false;

    this.shrinkElem = this.fileElem.querySelector('.shrink');
    this.yellowBtnElem = this.fileElem.querySelector(`[data-click='yellowBtn']`);
    this.greenBtnElem = this.fileElem.querySelector(`[data-click='greenBtn']`);
    this.original(this.fileElem);
  }

  replay(e, target) {
    this.projectName = target.closest('[data-project]').dataset.project;
    this.gifElem = document.querySelector(`.gif-${this.projectName}`);
    this.gifElem.hidden = false;

    this.shrinkElem = this.gifElem.querySelector('.shrink');
    this.yellowBtnElem = this.gifElem.querySelector(`[data-click='yellowBtn']`);
    this.greenBtnElem = this.gifElem.querySelector(`[data-click='greenBtn']`);
    this.original(this.gifElem);
  }

  app(e, target) {
    this.isAppClosed = target.dataset.isappclosed;
    // 앱이 꺼지지 않았으면 나가
    if(this.isAppClosed === 'false') return;
    this.projectName = target.dataset.app;
    this.projectElem = document.querySelector(`[data-project='${this.projectName}']`);
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

let handleDblclickEvents = new HandleDblclickEvents();
document.addEventListener('dblclick', handleDblclickEvents);

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



