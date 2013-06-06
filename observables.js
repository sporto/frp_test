(function () {

	"use strict";

	var Control = can.Control({

		init: function(element, options) {
			this.state = new can.Observe({
				makeEnabled: false,
				bgLoading: false,
				bgLoaded: false,
				fgLoading: false,
				fgLoaded: false,
				making: false
			});
			var template = can.view("#template", {
				state: this.state
			})
			can.$(element).append(template);
			this.bindEvents();
		},

		bindEvents: function() {
			var self = this;
			this.state.bind('change', function(ev, attr, how, newVal, oldVal) {
				var allLoaded = this.attr('bgLoaded') && this.attr('fgLoaded');
				//console.log('allLoaded', allLoaded);
				this.attr('makeEnabled', allLoaded);
			});
		},

		'.selectors button click': function(ele, ev) {
			console.log('selector');
			var kind = ele.data('kind');
			var theme = ele.data('theme');
			this.state.attr('making', false);
			this.loadImg(kind, theme);
		},
	
		'.btn_make click': function(ele, ev) {
			this.make();
		},

		loadImg: function(kind, theme) {
			var self = this;
			this.state.attr(kind + 'Loading', true);
			this.state.attr(kind + 'Loaded', false);

			this.loadImageService(theme, function (res) {
				self.state.attr(kind + 'Url', res);
				self.state.attr(kind + 'Loading', false);
				self.state.attr(kind + 'Loaded', true);
			});

		},

		// This is a simulated external service that
		// gets a parameter
		// and returns an image url
		loadImageService: function (theme, cb) {
			return setTimeout(function() {
				cb("http://lorempixel.com/600/200/" + theme);
			}, 1500);
		},

		make: function() {
			this.state.attr('making', true);
		}
	});

	var control = new Control('#control');

}());