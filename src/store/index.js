import { createStore } from "vuex";
import classes from "../services/classes_service.js";

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
		},
		clearClasses(state) {
			state.selectedClasses = [];
			state.selectedClassesDetail = [];
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
				(c) =>
					c.Thu != "*" &&
					classDetail.Thu != "*" &&
					c.Tiet != "*" &&
					classDetail.Tiet != "*" &&
					c.Thu == classDetail.Thu &&
					hasCommon(c.Tiet, classDetail.Tiet)
			);
			if (conflictedClasses.length > 0) {
				return { classWasConflicted: _class };
			}

			commit("addClass", _class);
		},
		addClasses({ state, dispatch, commit }, classes) {
			if (classes.length == 0) {
				commit("clearClasses");
				return;
			}

			let newClasses = classes.filter(
				(c) => !state.selectedClasses.includes(c)
			);
			let removeClasses = state.selectedClasses.filter(
				(c) => !classes.includes(c)
			);

			removeClasses.forEach((c) => {
				commit("removeClass", c);
			});

			let conflictedClasses = [];
			let nonExistClasses = [];

			newClasses.forEach((c) => {
				dispatch("addClass", c).then((res) => {
					if (res) {
						const { classDoesNotExist, classWasConflicted } = res;
						if (classDoesNotExist) nonExistClasses.push(classDoesNotExist);
						else if (classWasConflicted)
							conflictedClasses.push(classWasConflicted);
					}
				});
			});
			return { conflictedClasses, nonExistClasses };
		}
	},
	modules: {}
});
