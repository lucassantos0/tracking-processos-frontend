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
				var sPreviousHash = History.getInstance().getPreviousHash();

				//The history contains a previous entry
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					// There is no history!
					// replace the current hash with page 1 (will not add an history entry)
					this.getOwnerComponent().getRouter().navTo("tracking-processos-home", null, true);
				}
			},
		});
	});
