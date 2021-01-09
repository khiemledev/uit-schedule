module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/uit-schedule/" : "/",
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "UIT Schedule";
			return args;
		});
	}
};
