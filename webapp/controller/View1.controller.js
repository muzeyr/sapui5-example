sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "../mobxStore/MainStore",
    "../thirdParty/mobxModel/MobxModel",

    "sap/m/MessageToast",
  ],
  (Controller, MainStore, MobxModel, MessageToast) => {
    "use strict";

    return Controller.extend("sit.demoapp.demoapp.controller.View1", {
      onInit() {
        this._strModel = new MainStore();
        var mobxStore = new MobxModel(this._strModel);
        mobxStore.setSizeLimit(9999);
        this.getView().setModel(mobxStore);

        this._loadData();
      },

      _loadData() {
        var oMyCityData = new sap.ui.model.json.JSONModel();
        oMyCityData.loadData("data/city.json", null, false);
        var oMydata = new sap.ui.model.json.JSONModel();

        oMydata.loadData("data/data.json", null, false);

        var model = this.getView().getModel();
        var data = model.getData();
        data.form = {
          citiesCount: oMyCityData.getData().cities.length,
          itemsCount: oMydata.getData().results.length,
        };
        data.cities = oMyCityData.getData().cities;
        data.itemsOrj = oMydata.getData().results;
        data.items = oMydata.getData().results;
        model.refresh();
      },

      onItemPressed: function (oEvent) {
        var oSelectedItem = oEvent.getSource();
        var oContext = oSelectedItem.getBindingContext();

        // Verileri almak için gerekli alanları bağlayın
        var sOrderId = oContext.getProperty("OrderID");
        var sShipCountry = oContext.getProperty("ShipCountry");

        // İstediğiniz işlemi burada gerçekleştirebilirsiniz
        MessageToast.show(
          "Seçilen Sipariş ID: " + sOrderId + ", Ülke: " + sShipCountry
        );
      },
      onCityChange: function (oEvent) {
        var oSelect = oEvent.getSource(); // Select kontrolüne referans
        var sSelectedKey = oSelect.getSelectedKey(); // Seçilen anahtar

        console.log("Seçilen şehir ID'si:", sSelectedKey);
        var model = this.getView().getModel();
        var data = model.getData();
        const findCity = data.cities.find((city) => city.id === sSelectedKey);
        data.items = data.itemsOrj.filter(
          (item) => item.ShipCountry === findCity.Country
        );
        model.refresh();
      },
    });
  }
);
