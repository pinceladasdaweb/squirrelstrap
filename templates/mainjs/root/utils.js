/* Author: Artem Sapegin, http://sapegin.me, 2012 */

;(function ($) {
	'use strict';

	function _getContainers() {
		if (document.querySelectorAll) {
			return document.querySelectorAll('[data-component]');
		}
		else {
			var elems = document.getElementsByTagName('*'),
				containers = [];
			for (var elemIdx = 0, elemCnt = elems.length; elemIdx < elemCnt; elemIdx++) {
				var elem = elems[elemIdx];
				if (elem.getAttribute('data-component')) {
					containers.push(elem);
				}
			}
			return containers;
		}
	}
	var _containersCache;


	/**
	 * Initialize components
	 *
	 * @param {Object} funcs Initializers for each component: { pony: function(elem) { $(elem)... }, ... }
	 *
	 * <div data-component="pony"></div>
	 */
	function initComponents(funcs) {
		var containers = _containersCache || (_containersCache = _getContainers());
		for (var containerIdx = 0, containerCnt = containers.length; containerIdx < containerCnt; containerIdx++) {
			var container = containers[containerIdx],
				component = container.getAttribute('data-component');
			if (funcs[component]) {
				funcs[component](container);
			}
		}
	}


	/**
	 * Controls
	 *
	 * <span data-fire="slider-next" data-to=".portfolio" data-attrs="1,2,3">Next</span>
	 */
	$(document).click(function(e) {
		var target = e.target;
		if (target.getAttribute('data-fire') && target.getAttribute('data-to')) {
			target = $(target);
			var attrs = (''+target.data('attrs')).split(/[;, ]/);
			$(target.data('to')).trigger(target.data('fire'), attrs);
			e.preventDefault();
		}
	});


	window.utils = {
		initComponents: initComponents
	};

}(jQuery));
