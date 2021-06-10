sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/brf/trackingprocessos/trackingprocessosfrontend/model/formatter"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,Fragment,Filter, FilterOperator,formatter) {
		"use strict";

		return Controller.extend("com.brf.trackingprocessos.trackingprocessosfrontend.controller.tracking-processos-home", {
			formatter: formatter,
			onInit  : function() {							
				this.setInitialDateRange();			
			},

			setInitialDateRange: function(){
				var aFilter = [];
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");	
				var firstDate = new Date;
				firstDate.setMonth( firstDate.getMonth() - 4 );
				this.getView().byId("filtroData").setDateValue( firstDate );
				var lastDate = new Date;
				lastDate.setMonth( lastDate.getMonth() + 2 );
				this.getView().byId("filtroData").setSecondDateValue( lastDate );
				var sDateIni = this.getView().byId("filtroData").getDateValue().toISOString().split('T')[0].replace(/-/g,'');
				var sDateFim = this.getView().byId("filtroData").getSecondDateValue().toISOString().split('T')[0].replace(/-/g,'');	
				aFilter.push(new Filter("estimatedProcessEndDate", FilterOperator.BT, sDateIni,sDateFim));
				oBinding.filter(aFilter);	
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
				var oDataCabec = this.getView().getModel("ProcurementProcesses").getObject(oEvent.oSource.getBindingContextPath());
				var oDataDetail = this.getView().getModel("ProcessDetails").oData.detailList;
				for ( var i = 0; i < oDataDetail.length; i++) {
					if( oDataCabec.id === oDataDetail[i].id ){
						this.getView().setModel(new sap.ui.model.json.JSONModel(oDataCabec),"Header");
						this.getView().setModel(new sap.ui.model.json.JSONModel(oDataDetail[i]),"Details");
						break;
					} 				
				}
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

			onCommentTask: function (oEvent) {
				var oDataComment = this.getView().getModel("Details").getObject(oEvent.oSource.getBindingContextPath());
				this.getView().setModel(new sap.ui.model.json.JSONModel(oDataComment),"Comment");
				if(oDataComment.comment !== ""){
					this.openQuickViewComment(oEvent);
				}				
			},

			onDateRange: function(oEvent){
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");				
				var aFilter = oBinding.aFilters;
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath === "estimatedProcessEndDate"){ 
						aFilter.splice(i,1);
					}
				}	
				var sDateIni = this.getView().byId("filtroData").getDateValue().toISOString().split('T')[0].replace(/-/g,'');
				var sDateFim = this.getView().byId("filtroData").getSecondDateValue().toISOString().split('T')[0].replace(/-/g,'');	
				aFilter.push(new Filter("estimatedProcessEndDate", FilterOperator.BT, sDateIni,sDateFim));
				oBinding.filter(aFilter);
			},

			onFiltrarProcesso: function (oEvent) {
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");				
				var aFilter = oBinding.aFilters;
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath === "id"){ 
						aFilter.splice(i,1);
					}
				}	
				var sQuery = oEvent.mParameters.newValue;			
				if(sQuery !== ""){										
					aFilter.push(new Filter("id", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{	
					oBinding.filter(aFilter);
				}
			},

			onSelectMeusProcessos: function (oEvent) {				
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");				
				var aFilter = oBinding.aFilters;
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath === "owner"){ 
						aFilter.splice(i,1);
					}
				}				
				if(oEvent.oSource.mProperties.selected === true){
					var sQuery = "João da Silva";					
					aFilter.push(new Filter("owner", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{	
					oBinding.filter(aFilter);
				}
			},

			onSelectUrgente: function (oEvent) {				
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");				
				var aFilter = oBinding.aFilters;
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath === "priority"){ 
						aFilter.splice(i,1);
					}
				}				
				if(oEvent.oSource.mProperties.selected === true){
					var sQuery = "Urgente";					
					aFilter.push(new Filter("priority", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{	
					oBinding.filter(aFilter);
				}
			},

			onSelectEtapa: function (oEvent) {				
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");
				var aFilter = oBinding.aFilters;
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath === "actualTask"){ 
						aFilter.splice(i,1);
					}
				}				
				if(oEvent.oSource.mProperties.selectedKey !== "todos"){
					var sQuery = oEvent.oSource.mProperties.selectedKey;					
					aFilter.push(new Filter("actualTask", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{
					oBinding.filter(aFilter);
				}
			},

			onSelectStatus: function (oEvent) {				
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");
				var aFilter = oBinding.aFilters;
				for (var i = 0; i < aFilter.length; i++) {
					if (aFilter[i].sPath === "status"){ 
						aFilter.splice(i,1);
					}
				}				
				if(oEvent.oSource.mProperties.selectedKey !== "todos"){
					var sQuery = oEvent.oSource.mProperties.selectedKey;					
					aFilter.push(new Filter("status", FilterOperator.Contains, sQuery));
					oBinding.filter(aFilter);
				}else{
					oBinding.filter(aFilter);
				}
			},

			onLimparFiltros: function (oEvent) {
				this.byId("ckMeusProcessos").setSelected(false);				
				this.byId("ckUrgente").setSelected(false);	
				this.byId("slEtapa").setSelectedKey("todos");	
				this.byId("slStatus").setSelectedKey("todos");
				this.byId("inpDoc").setValue("");
				var oList = this.byId("listProcessos");
				var oBinding = oList.getBinding("items");
				var aFilter = [];
				oBinding.filter(aFilter);
				this.setInitialDateRange();				
			},

			openQuickViewComment: function (oEvent) {

				var oButton = oEvent.getSource(),
					oView = this.getView();

				if (!this._pQuickViewComment) {
					this._pQuickViewComment = Fragment.load({
						id: oView.getId(),
						name: "com.brf.trackingprocessos.trackingprocessosfrontend.view.detalhes.comentario-task",
						controller: this
					}).then(function (oQuickView) {
						oView.addDependent(oQuickView);
						return oQuickView;
					});
				}
				this._pQuickViewComment.then(function (oQuickView){
					oQuickView.openBy(oButton);
				});
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
