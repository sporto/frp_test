(function () {

	"use strict";

	var Control = can.Control({

		init: function(element, options) {
			this.state = new can.Observe({
				makeEnabled: false,
				bgLoading: false,
				bgLoaded: false,
				fgLoading: false,
				fgLoaded: false
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
				console.log('allLoaded', allLoaded);
				this.attr('makeEnabled', allLoaded);
			});
		},

		'.btn_bg click': function(ele, ev) {
			this.loadImg('bg', ele.data('id'));
		},
		'.btn_fg click': function(ele, ev) {
			this.loadImg('fg', ele.data('id'));
		},
		'.btn_make click': function(ele, ev) {
			this.make();
		},

		loadImg: function(kind, id) {
			var self = this;
			this.state.attr(kind + 'Loading', true);
			this.state.attr(kind + 'Loaded', false);
			setTimeout(function() {
				self.state.attr(kind + 'Loading', false);
				self.state.attr(kind + 'Loaded', true);
			}, 1500);
		},

		make: function() {
			console.log('make');
		}
	});

	var control = new Control('#control');

}());