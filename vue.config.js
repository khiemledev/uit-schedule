module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/uit-schedule/" : "/",
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "UIT Schedule";
			args[0].description =
				"Công cụ cho sinh viên UIT, dễ dàng sắp xếp TKB của mình!";
			args[0].url = "https://khiemledev.github.io/uit-schedule";
			args[0].domain = "khiemledev.github.io";
			return args;
		});
	}
};
