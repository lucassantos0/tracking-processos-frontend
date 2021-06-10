sap.ui.define([], function () {
	"use strict";
	return {
		formatStatusState: function (sStatus) {
			switch (sStatus) {
				case "Concluído":
					return "Success";
				case "Em Andamento":
					return "Warning";
				case "Atrasado":
					return "Error";
				default:
					return "None";
			}
		},
		formatStatusIconColor: function (sStatus) {
			switch (sStatus) {
				case "Concluído":
					return "Positive";
				case "Em Andamento":
					return "Critical";
				case "Atrasado":
					return "Negative";
				default:
					return "Neutral";
			}
		},
		formatIconAprovador: function (sStatus) {
			switch (sStatus) {
				case "Concluído":
					return "sap-icon://message-success";
				case "Em Andamento":
					return "sap-icon://pending";
				case "Atrasado":
					return "sap-icon://error";
				default:
					return "sap-icon://lateness";
			}
		}		
	};
});