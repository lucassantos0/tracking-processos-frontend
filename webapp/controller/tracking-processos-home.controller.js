sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"	
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,Fragment,Filter, FilterOperator) {
		"use strict";

		return Controller.extend("com.brf.trackingprocessos.trackingprocessosfrontend.controller.tracking-processos-home", {
			
			onInit  : function() {							
				
			},

			onRender: function(oEvent) {

				var chart = oEvent.oSource.getId().substring(12);
				var ctx = document.getElementById(chart).getContext('2d');
				var type = 'bar';
				switch (chart) {
					case 'myChart':
						var type = 'bar';
					  	break;
					case 'myChart2':
						var type = 'doughnut';
						break;
					case 'myChart3':
						var type = 'line';
						break;
					case 'myChart4':
						var type = 'polarArea';
					  	break;		
					default:
						var type = 'line';	
						break;					  			
				}		
				var myChart	= Chart.getChart(chart);
				if ( myChart !== undefined ){
					myChart.destroy();
				}
				myChart = new Chart(ctx, {
					type: type,
					data: {
						labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
						datasets: [{
							label: '# of Votes',
							data: [12, 19, 3, 5, 2, 3],
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							y: {
								beginAtZero: true
							}
						}
					}
				});
			},

			onPressItem: function (oEvent)  {
				this.byId("pageContainer").to(this.getView().createId("detalhes"));
			},

			onSideNavButtonPress: function () {
				var oToolPage = this.byId("toolPage");
				var bSideExpanded = oToolPage.getSideExpanded();
	
				this.setToggleButtonTooltip(bSideExpanded);
	
				oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
			},

			setToggleButtonTooltip: function (bLarge) {
				var oToggleButton = this.byId('sideNavigationToggleButton');
				if (bLarge) {
					oToggleButton.setTooltip('Large Size Navigation');
				} else {
					oToggleButton.setTooltip('Small Size Navigation');
				}
			},

			onItemSelect: function (oEvent) {
				var oItem = oEvent.getParameter("item");
				this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
			},
			
			onVoltarTracking: function(oEvent) {
				this.byId("pageContainer").to(this.getView().createId("tracking"));
			},

			handleUserNamePress: function (event) {
				var oPopover = new sap.m.Popover({
					showHeader: false,
					placement: sap.m.PlacementType.Bottom,
					content: [
						new sap.m.Button({
							text: 'Suporte',
							type: sap.m.ButtonType.Transparent
						})
					]
				}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
	
				oPopover.openBy(event.getSource());
			},

			onSlaDetail: function (oEvent) {
				this.openQuickView(oEvent);
			},

			onSelectMeusProcessos: function (oEvent) {				
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");				
				var aFilter = oBinding.aFilters;
				if(oEvent.oSource.mProperties.selected === true){
					var sQuery = "João da Silva";					
					aFilter.push(new Filter("owner", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{
					for (var i = 0; i < aFilter.length; i++) {
						if (aFilter[i].sPath === "owner"){ 
							aFilter.splice(i,1);
						}
					}
					oBinding.filter(aFilter);
				}
			},

			onSelectEtapa: function (oEvent) {				
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");
				var aFilter = oBinding.aFilters;
				if(oEvent.oSource.mProperties.selectedKey !== "todos"){
					var sQuery = oEvent.oSource.mProperties.selectedKey;					
					aFilter.push(new Filter("taskName", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{
					for (var i = 0; i < aFilter.length; i++) {
						if (aFilter[i].sPath === "taskName"){ 
							aFilter.splice(i,1);
						}
					}
					oBinding.filter(aFilter);
				}
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
