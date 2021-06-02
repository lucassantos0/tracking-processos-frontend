sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,Fragment) {
		"use strict";

		return Controller.extend("com.brf.trackingprocessos.trackingprocessosfrontend.controller.tracking-processos-detalhes", {
			onInit: function () {

			},
			onVoltar: function(oEvent) {
					this.getOwnerComponent().getRouter().navTo("tracking-processos-home");
			},

			onSlaDetail: function (oEvent) {
				this.openQuickView(oEvent);
			},

			openQuickView: function (oEvent) {

				var oButton = oEvent.getSource(),
					oView = this.getView();

				if (!this._pQuickView) {
					this._pQuickView = Fragment.load({
						id: oView.getId(),
						name: "com.brf.trackingprocessos.trackingprocessosfrontend.view.detalhes.sla-detail",
						controller: this
					}).then(function (oQuickView) {
						oView.addDependent(oQuickView);
						return oQuickView;
					});
				}
				this._pQuickView.then(function (oQuickView){
					oQuickView.openBy(oButton);
				});
			}			

		});
	});
