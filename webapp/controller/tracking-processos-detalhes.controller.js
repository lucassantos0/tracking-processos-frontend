sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,History) {
		"use strict";

		return Controller.extend("com.brf.trackingprocessos.trackingprocessosfrontend.controller.tracking-processos-detalhes", {
			onInit: function () {

			},
			onVoltar: function(oEvent) {
					this.getOwnerComponent().getRouter().navTo("tracking-processos-home");
			},
		});
	});
