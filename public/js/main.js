/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
/* 메인 화면 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
/* 메인 화면 - 메뉴 - 시간 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

class MenuTime {
  constructor() {
    this.menuDateElem = document.querySelector('.menu-datetime__date');
    this.menuTimeElem = document.querySelector('.menu-datetime__time');
    this.today = new Date();
    this.month = this.today.getMonth();
    this.date = this.today.getDate();
    this.day = this.today.getDay();
    this.hours;
    this.minutes;
    this.ampm;
    this.dayNames = [
      '(일)',
      '(월)',
      '(화)',
      '(수)',
      '(목)',
      '(금)',
      '(토)',
    ];
  }

  showDate() {
    this.menuDateElem.textContent = `${this.month + 1}월 ${this.date}일 ${this.dayNames[this.day]}`;
  }

  showTime() {
    this.today = new Date();
    this.hours = this.today.getHours();
    this.minutes = this.today.getMinutes();
  
    this.ampm = this.hours >= 12 ? '오후' : '오전';
    this.hours %= 12;
    this.hours = this.hours || 12;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.menuTimeElem.textContent = `${this.ampm} ${this.hours} : ${this.minutes}`;  
  }
}

let menuTime = new MenuTime();
menuTime.showDate();
menuTime.showTime();
setInterval(() => {
  menuTime.showTime();
}, 1000);


/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
/* 클릭 이벤트 처리 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

class HandleClickEvents {
  constructor() {
    /* 클릭 이벤트 - 모달 & 메뉴 */

    this.modal = document.getElementById('modal');
    this.menuBackgrounds = [];
    this.currentMenuDiv = null;
    this.menubarDivs = document.querySelectorAll('.menubar-div');
    this.menubarLies = Array.from(document.querySelectorAll('.menubar-first-ul__li')).filter(elem => elem.dataset.secondul === 'true');
    this.currentSecondLi = null;
    this.menubarSecondUls = document.querySelectorAll('.menubar-second-ul');

    this.moveToAnotherBar = this.moveToAnotherBar.bind(this);
    this.activateSecondLi = this.activateSecondLi.bind(this);
    this.deactivateSecondLi = this.deactivateSecondLi.bind(this);

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

  handleEvent(event) {
    const target = event.target.closest('[data-click]');
    if(!target) {
      // 언더 메뉴 바 다른 곳 클릭하면 사라질때
      if(this.currentMenuDiv) {
        this.hiddenTrue(this.currentMenuDiv.querySelector('.menubar-first-ul'));
        this.removeMenuBackgrounds();
        this.currentMenuDiv = null;
        this.currentSecondLi = null;
      } else if(this.folderBox) {
        this.removeClassList(this.folderBox, 'clicked');
        this.removeClassList(this.folderName, 'clicked');  
      }
      return;
    } else {
      const clickEvents = target.dataset.click.split(' ');
      for(let clickEvent of clickEvents) {
        this[clickEvent](event, target);
      }  
    }
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 공통 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

  hiddenFalse(elem) {
    elem.hidden = false;
  }

  hiddenTrue(elem) {
    elem.hidden = true;
  }

  addClassList(elem, className) {
    elem.classList.add(className);
  }

  removeClassList(elem, className) {
    elem.classList.remove(className);
  }

  addMenuBackground(target) {
    this.addClassList(target, 'menu-background');
  }

  removeMenuBackgrounds() {
    this.menuBackgrounds = document.querySelectorAll('.menu-background');
    for(let menuBackground of this.menuBackgrounds) {
      this.removeClassList(menuBackground, 'menu-background');
    }
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 모달 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

  // 모달 보여줌
  modalShow() {
    this.hiddenFalse(this.modal);
  }

  // 모달 사라짐
  modalDisappear() {
    this.hiddenTrue(this.modal);
    // 메뉴 배경 효과도 사라짐
    this.removeMenuBackgrounds();
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */
  /* 클릭 이벤트 - 메뉴 */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */

  // 메뉴 클릭시 배경 효과
  menuBackground(e, target) {
    this.removeMenuBackgrounds();
    this.addMenuBackground(target);
  }

  // 메뉴 클릭시 메뉴 바
  menuBar(e, target) {
    // 모달창이 활성화됐을때 제거
    this.modalDisappear();
    this.activateMenuBar(target);

    for(let menubarDiv of this.menubarDivs) {
      menubarDiv.addEventListener('pointerenter', this.moveToAnotherBar);
    } 
    
    for(let menubarLi of this.menubarLies) {
      menubarLi.addEventListener('pointerenter', this.activateSecondLi);
      menubarLi.addEventListener('pointerleave', this.deactivateSecondLi);
    }    

    for(let menubarSecondUl of this.menubarSecondUls) {
      menubarSecondUl.addEventListener('pointerleave', this.deactivateSecondLi);
    }
  }

  activateMenuBar(target) {
    const menuLi = target.querySelector('.menubar-first-ul');
    if(!this.currentMenuDiv) {
      this.addMenuBackground(target);
      this.hiddenFalse(menuLi);
    } else {
      this.removeMenuBackgrounds();
      this.addMenuBackground(target);
      this.hiddenTrue(this.currentMenuDiv.querySelector('.menubar-first-ul'));
      this.hiddenFalse(menuLi);
    }
    this.currentMenuDiv = target;
  }

  moveToAnotherBar(e) {
    if(!this.currentMenuDiv) return;
    this.activateMenuBar(e.target);  
  }

  activateSecondLi(e) {
    const secondLi = e.target.querySelector('.menubar-second-ul');
    if(!this.currentSecondLi) {
      this.hiddenFalse(secondLi);
    } else {
      this.hiddenTrue(this.currentSecondLi);
      this.hiddenFalse(secondLi);
    }
    this.currentSecondLi = secondLi;
  }

  deactivateSecondLi(e) {
    this.hiddenTrue(this.currentSecondLi);
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
    this.hiddenTrue(this.btnParent);
  }

  redBtnRelatedApp(e, target) {
    this.btnParent = target.closest('[data-project]');
    this.projectName = this.btnParent.dataset.project;
    this.app = document.querySelector(`[data-app='${this.projectName}']`);
    this.app.dataset.isappclosed = 'true';
    this.removeClassList(this.app, 'dblclicked');
    this.circleElem = this.app.querySelector('.main-apps__main__app__circle');
    this.hiddenTrue(this.circleElem);
    this.hiddenTrue(this.btnParent);
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
      this.hiddenTrue(this.shrinkElem);
      target.dataset.isclicked = 'true';
      this.greenBtnElem.style.backgroundColor = '#323131';
      this.greenBtnElem.dataset.disabled = 'true';  
      // 원상복귀
    } else if(this.isYellowClicked === 'true') {
      this.hiddenFalse(this.shrinkElem);
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

let handleClickEvents = new HandleClickEvents();
document.addEventListener('click', handleClickEvents);

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
    handleClickEvents.greenBtn(undefined, this.greenBtnElem);
  }
  // 스티커 윗부분 더블 클릭하면 줄어드는 효과
  yellowBtn(e, target) {
    this.yellowBtnElem = target.closest('[data-project]').querySelector('[data-click="yellowBtn"]');
    handleClickEvents.yellowBtn(undefined, this.yellowBtnElem);
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



