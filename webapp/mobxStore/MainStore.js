sap.ui.define([], function () {
  var MainStore = function () {
    return mobx.observable({
      items: [],
      cities: [],
      form: {
        itemsCount: 0,
        citiesCount: 0,
        selectedCity: "",
      },
    });
  };
  return MainStore;
});

//https://b413f-188-119-23-53.ngrok-free.app/api/v1/signer
//https://b43f-188-119-23-53.ngrok-free.app
