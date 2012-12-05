var Accordion = function(options) {
	if ( !(this instanceof Accordion ) ) {
		return new Accordion(id, speed);
	}
	this.$id = $(options.id);
	this.$paneLabels = this.$id.find('div.paneLabel');
	this.$paneContents = this.$id.find('div.paneContent');
	this.init();
};

Accordion.prototype = {
	constructor: Accordion,
	init: function() {
		var that = this;
		this.$paneContents.hide();
	
		this.$paneLabels.on('click', function() {
			var $this = $(this);
		
			if ($this.hasClass('active')) {
				$this.removeClass('active').next('div.paneContent').slideUp(this.speed);
			} else {
				that.collapse();
				$this.addClass('active').next('div.paneContent').slideDown(this.speed);
			}
		});
	},
	collapse: function() {
		this.$paneLabels.removeClass('active');
		this.$paneContents.slideUp(this.speed);
	}
};