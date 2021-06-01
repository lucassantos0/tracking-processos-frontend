sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("com.brf.trackingprocessos.trackingprocessosfrontend.controller.tracking-processos-home", {
			onInit: function () {

			},

			onPressItem: function (oEvent)  {
				this.getOwnerComponent().getRouter().navTo("tracking-processos-detalhes");
			},

		});
	});
