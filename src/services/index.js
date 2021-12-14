const isStorageSupported = typeof Storage !== 'undefined'
const CLASSES = 'classes'
const SELECTED_CLASSES = 'selectedClasses'
const SELECTED_CLASSES_DETAIL = 'selectedClassesDetail'
const STORE_TIME = 'storeTime'
// const EXPIRE_DAYS = 30;

// function getDiffDate(a, b) {
// 	let diffTime = Math.abs(a.getTime() - b.getTime());
// 	return Math.round(diffTime / (24 * 3600 * 1000));
// }

function setStoreTime() {
  if (isStorageSupported) {
    localStorage.setItem(STORE_TIME, Date.now())
  }
}

// function checkIfExpired() {
// 	if (isStorageSupported) {
// 		let time = localStorage.getItem(STORE_TIME);
// 		if (!time) {
// 			localStorage.clear();
// 			return true;
// 		}
// 		let currentTime = new Date();
// 		let storedTime = new Date(parseInt(time, 10));
// 		let diffDate = getDiffDate(storedTime, currentTime);
// 		if (diffDate > EXPIRE_DAYS) {
// 			localStorage.clear();
// 			return true;
// 		}
// 		return false;
// 	}
// 	return false;
// }

function storeClasses(classes) {
  if (isStorageSupported) {
    localStorage.setItem(CLASSES, JSON.stringify(classes))
    setStoreTime()
  }
}

function storeSelectedClasses(classes) {
  if (isStorageSupported) {
    localStorage.setItem(SELECTED_CLASSES, JSON.stringify(classes))
  }
}

function storeSelectedClassesDetail(classesDetail) {
  if (isStorageSupported) {
    localStorage.setItem(SELECTED_CLASSES_DETAIL, JSON.stringify(classesDetail))
  }
}

function retrieveClasses() {
  let classes = null
  if (isStorageSupported) {
    // if (!checkIfExpired()) {
    // 	let data = localStorage.getItem(CLASSES);
    // 	if (data) {
    // 		classes = JSON.parse(data);
    // 	} else {
    // 		classes = require("../assets/TKB.json");
    // 		storeClasses(classes);
    // 	}
    // } else {
    classes = require('../assets/TKB.json')
    storeClasses(classes)
    // }
  } else {
    classes = require('../assets/TKB.json')
  }
  return classes['TKB LT'].concat(classes['TKB TH'])
}

function retrieveSelectedClasses() {
  if (isStorageSupported) {
    let data = localStorage.getItem(SELECTED_CLASSES)
    if (data) {
      return JSON.parse(data)
    }
    return []
  }
  return []
}

function retrieveSelectedClassesDetail() {
  if (isStorageSupported) {
    let data = localStorage.getItem(SELECTED_CLASSES_DETAIL)
    if (data) {
      return JSON.parse(data)
    }
    return []
  }
  return []
}

const convertData = (data) =>
  data
    .filter((item) => typeof item[0] == 'number')
    .map((item) => ({
      STT: item[0],
      MaMH: item[1],
      MaLop: item[2],
      TenMH: item[3],
      MaGV: item[4],
      TenGV: item[5],
      SiSo: item[6],
      SoTC: item[7],
      TH: item[8],
      HTGD: item[9],
      Thu: item[10],
      Tiet: item[11],
      CachTuan: item[12],
      KhoaHoc: item[13],
      HocKy: item[14],
      NamHoc: item[15],
      HeDT: item[16],
      KhoaQL: item[17],
      NBD: item[18], //NOTE: xu li ngay
      NKT: item[19], //NOTE: xu li ngay
      Lang: item[20],
    }))

export {
  retrieveClasses as classes,
  retrieveSelectedClasses as selectedClasses,
  storeSelectedClasses,
  retrieveSelectedClassesDetail as selectedClassesDetail,
  storeSelectedClassesDetail,
  convertData,
  storeClasses,
}
