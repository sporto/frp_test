(function () {

	"use strict";

	var Control = can.Control({

		init: function(element, options) {
			this.state = new can.Observe({
				loadingImage: false,
				loadingText: false,
				text: '',
				image: '',
				making: false,
				download: ""
			});

			var template = can.view("#template", {
				state: this.state
			});

			can.$(element).append(template);
			this.bindEvents();
		},

		bindEvents: function() {
			var self = this;
			this.state.bind('change', function(ev, attr, how, newVal, oldVal) {
				console.log('attr changed ' + attr)
				if (attr === 'text' || attr === 'image') self.checkMake();
			});
		},

		'.btn_text click': function(ele, ev) {
			var self = this;
		
			this.state.attr('loadingText', true);
			this.state.attr('text', '');
			
			var keyword = $('input[name=input_text]').val();

			APP.loadTextService(keyword, function (res) {
				console.log("text retrieved " + res);
				self.state.attr('loadingText', false);
				self.state.attr('text', res);
			});
		},
	
		'.btn_image click': function(ele, ev) {
			var self = this;
			
			this.state.attr('loadingImage', true);
			this.state.attr('image', '');

			var keyword = $('input[name=input_image]').val();

			APP.loadImageService(keyword, function (res) {
				console.log("image retrieved " + res);
				self.state.attr('loadingImage', false);
				self.state.attr('image', res);
			});
		},

		checkMake: function () {
			console.log('checkMake');
			var allLoaded = this.state.attr('text') && this.state.attr('image');
			if (allLoaded) {
				this.make();
			} else {
				this.state.attr('making', false);
				this.state.attr('download', '');
			}
		},

		make: function() {
			var self = this;
			this.state.attr('making', true);
			APP.makeService(function (res) {
				console.log('making done');
				self.state.attr('making', false);
				self.state.attr('download', res);
			});
		}

	});

	var control = new Control('#control');

}());