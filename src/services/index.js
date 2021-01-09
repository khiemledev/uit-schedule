const isStorageSupported = typeof Storage !== "undefined";
const CLASSES = "classes";
const SELECTED_CLASSES = "selectedClasses";
const SELECTED_CLASSES_DETAIL = "selectedClassesDetail";

function storeClasses(classes) {
	if (isStorageSupported) {
		localStorage.setItem(CLASSES, JSON.stringify(classes));
	}
}

function storeSelectedClasses(classes) {
	if (isStorageSupported) {
		localStorage.setItem(SELECTED_CLASSES, JSON.stringify(classes));
	}
}

function storeSelectedClassesDetail(classesDetail) {
	if (isStorageSupported) {
		localStorage.setItem(
			SELECTED_CLASSES_DETAIL,
			JSON.stringify(classesDetail)
		);
	}
}

function retrieveClasses() {
	let classes = null;
	if (isStorageSupported) {
		let data = localStorage.getItem(CLASSES);
		if (data) {
			classes = JSON.parse(data);
		} else {
			classes = require("../assets/TKB.json");
			storeClasses(classes);
		}
	} else {
		classes = require("../assets/TKB.json");
	}
	return classes["TKB LT"].concat(classes["TKB TH"]);
}

function retrieveSelectedClasses() {
	if (isStorageSupported) {
		let data = localStorage.getItem(SELECTED_CLASSES);
		if (data) {
			return JSON.parse(data);
		}
		return [];
	}
	return [];
}

function retrieveSelectedClassesDetail() {
	if (isStorageSupported) {
		let data = localStorage.getItem(SELECTED_CLASSES_DETAIL);
		if (data) {
			return JSON.parse(data);
		}
		return [];
	}
	return [];
}

export {
	retrieveClasses as classes,
	retrieveSelectedClasses as selectedClasses,
	storeSelectedClasses,
	retrieveSelectedClassesDetail as selectedClassesDetail,
	storeSelectedClassesDetail
};
