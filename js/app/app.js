(function () {

	function loadTextService(keyword, cb) {
		return setTimeout(function() {
			// cb("http://lorempixel.com/600/200/" + keyword);
			cb('Some tweet about ' + keyword);
		}, 1500);
	}

	function loadImageService(keyword, cb) {
		return setTimeout(function() {
			cb("http://flickholdr.com/500/200/");
		}, 1500);
	}

	function makeService(cb) {
		return setTimeout(function() {
			cb("http://link/to/meme");
		}, 1500);
	}

	var self = {};
	self.loadTextService   = loadTextService;
	self.loadImageService  = loadImageService;
	self.makeService       = makeService;

	window.APP = self;

}());