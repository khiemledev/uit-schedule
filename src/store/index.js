import { createStore } from "vuex";
import {
	classes,
	selectedClasses,
	selectedClassesDetail,
	storeSelectedClasses,
	storeSelectedClassesDetail
} from "../services/index.js";

function hasCommon(a, b) {
	if (a == "" || b == "") return false;

	a = a.split("");
	for (let i = 0; i < a.length; i++) if (b.includes(a[i])) return true;
	return false;
}

export default createStore({
	state: {
		classes: classes(),
		selectedClasses: selectedClasses(),
		selectedClassesDetail: selectedClassesDetail(),
		displayFields: [
			"MaMH",
			"MaLop",
			"TenMH",
			"TenGV",
			"SoTC",
			"Thu",
			"Tiet",
			"PhongHoc",
			"KhoaQL"
		]
	},
	getters: {
		soTC(state) {
			return state.selectedClassesDetail
				.map((c) => c.SoTC)
				.reduce((a, b) => a + b, 0);
		},
		tenGV(state) {
			return state.selectedClassesDetail
				.map((c) => c.TenGV)
				.filter((v, i, self) => v && self.indexOf(v) == i);
		},
		tenMH(state) {
			return state.selectedClassesDetail
				.map((c) => c.TenMH)
				.filter((v, i, self) => v && self.indexOf(v) == i);
		}
	},
	mutations: {
		resetFilter(state) {
			state.displayFields = [
				"MaMH",
				"MaLop",
				"TenMH",
				"TenGV",
				"SoTC",
				"Thu",
				"Tiet",
				"PhongHoc",
				"KhoaQL"
			];
		},
		addClass(state, _class) {
			state.selectedClasses = [...state.selectedClasses, _class];
			let classDetail = state.classes.find((c) => c.MaLop == _class);
			classDetail.Tiet = classDetail.Tiet.toString()
			state.selectedClassesDetail = [
				...state.selectedClassesDetail,
				classDetail
			];
			storeSelectedClasses(state.selectedClasses);
			storeSelectedClassesDetail(state.selectedClassesDetail);
		},
		removeClass(state, _class) {
			state.selectedClasses = state.selectedClasses.filter((c) => c != _class);
			state.selectedClassesDetail = state.selectedClassesDetail.filter(
				(c) => c.MaLop != _class
			);
			storeSelectedClasses(state.selectedClasses);
			storeSelectedClassesDetail(state.selectedClassesDetail);
		},
		clearClasses(state) {
			state.selectedClasses = [];
			state.selectedClassesDetail = [];
			storeSelectedClasses(state.selectedClasses);
			storeSelectedClassesDetail(state.selectedClassesDetail);
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
