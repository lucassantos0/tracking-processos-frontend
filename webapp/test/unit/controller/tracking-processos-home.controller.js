/*global QUnit*/

sap.ui.define([
	"combrf.trackingprocessos./tracking-processos-frontend/controller/tracking-processos-home.controller"
], function (Controller) {
	"use strict";

	QUnit.module("tracking-processos-home Controller");

	QUnit.test("I should test the tracking-processos-home controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
