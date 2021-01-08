import { createStore } from "vuex";

import classesJSON from "../assets/TKB.json";
var classes = classesJSON["TKB LT"].concat(classesJSON["TKB TH"]);

function hasCommon(a, b) {
	if (a == "" || b == "") return false;

	a = a.split("");
	for (let i = 0; i < a.length; i++) if (b.includes(a[i])) return true;
	return false;
}

export default createStore({
	state: {
		classes: classes,
		selectedClasses: [],
		selectedClassesDetail: []
	},
	getters: {},
	mutations: {
		addClass(state, _class) {
			state.selectedClasses = [...state.selectedClasses, _class];
			let classDetail = state.classes.find((c) => c.MaLop == _class);
			state.selectedClassesDetail = [
				...state.selectedClassesDetail,
				classDetail
			];
		},
		removeClass(state, _class) {
			state.selectedClasses = state.selectedClasses.filter((c) => c != _class);
			state.selectedClassesDetail = state.selectedClassesDetail.filter(
				(c) => c.MaLop != _class
			);
		}
	},
	actions: {
		addClass({ state, commit }, _class) {
			if (!_class || _class == "") return;
			let classDetail = state.classes.find((c) => c.MaLop == _class);
			if (!classDetail) {
				return { classDoesNotExist: _class };
			}
			if (state.selectedClasses.length == 0) {
				commit("addClass", _class);
				return;
			}
			let conflictedClasses = state.selectedClassesDetail.filter(
				(c) => c.Thu == classDetail.Thu && hasCommon(c.Tiet, classDetail.Tiet)
			);
			if (conflictedClasses.length > 0) {
				return { classWasConflicted: _class };
			}

			commit("addClass", _class);
		}
	},
	modules: {}
});
