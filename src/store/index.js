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
		selectClasses(state, classes) {
			state.selectedClasses = classes;
			// Get detail of selected classes
			const classesDetail = state.classes.filter((c) =>
				classes.includes(c.MaLop)
			);
			state.selectedClassesDetail = classesDetail;
		}
	},
	actions: {
		selectClasses({ state, commit }, classes) {
			// Non-check confict if selectedClasses is empty
			if (state.selectedClasses.length == 0) {
				commit("selectClasses", classes);
				return;
			}
			// This case is unselect a class
			if (classes.length <= state.selectedClasses.length) {
				commit("selectClasses", classes);
				return;
			}
			// A new class was selected
			// Get the last selected class and its detail
			const lastClass = classes.filter(
				(c) => !state.selectedClasses.includes(c)
			)[0];
			const lastClassDetail = state.classes.find((c) => c.MaLop == lastClass);

			// Check if conflict with selected classes
			const conflictedClasses = state.selectedClassesDetail.filter(
				(c) =>
					c.Thu == lastClassDetail.Thu &&
					hasCommon(c.Tiet, lastClassDetail.Tiet)
			);
			// No conflict
			if (conflictedClasses.length == 0) {
				commit("selectClasses", classes);
				return;
			}
			return { conflictedClasses };
		},
		unselectClass({ state, commit }, payload) {
			const { MaLop } = payload;
			commit(
				"selectClasses",
				state.selectedClasses.filter((c) => c != MaLop)
			);
		}
	},
	modules: {}
});
