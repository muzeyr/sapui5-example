sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/model/odata/ODataModel"],
	function (JSONModel, ODataModel) {
		var MainData = {};

		MainData.url = "/sap/opu/odata/SAP/ZBC_DOKUMAN_SRV";
		
		MainData.getDocument = function (sapObject, objectId) {
			var def = jQuery.Deferred();
			var filterStr = ["SAP_OBJECT eq '", sapObject, "' and OBJECT_ID eq '", objectId, "'"].join("");

			var linkMaster = this.url + "/DocumentReadSet?$filter=" + filterStr + " &$format=json";

			var encodeLink = encodeURI(linkMaster);

			var oMasterModel = new JSONModel();
			oMasterModel.loadData(encodeLink, null, true, "GET", false, false, null);

			oMasterModel.attachRequestCompleted(function (data) {
				var resultData = data.getSource().getData();
				def.resolve(resultData.d.results);
				if (resultData.d && resultData.d.results.length > 0) {
					def.resolve(resultData.d.results);
				} else {
					def.reject("Veri bulunamadı.");
				}
			});

			oMasterModel.attachRequestFailed(function (data) {
				//	def.reject("Sistem hatası ile karşılaşıldı.");
			});

			return def.promise();

		};
		MainData.getDocumentData = function (arcDocId,sapObject, objectId) {
			var def = jQuery.Deferred();
			var filterStr = ["ARC_DOC_ID eq '", arcDocId,"'"].join("");

			var linkMaster = this.url + "/DocumentDataSet?$filter=" + filterStr + " &$format=json";

			var encodeLink = encodeURI(linkMaster);

			var oMasterModel = new JSONModel();
			oMasterModel.loadData(encodeLink, null, true, "GET", false, false, null);

			oMasterModel.attachRequestCompleted(function (data) {
				var resultData = data.getSource().getData();
				def.resolve(resultData.d.results);
				if (resultData.d && resultData.d.results.length > 0) {
					def.resolve(resultData.d.results);
				} else {
					def.reject("Veri bulunamadı.");
				}
			});

			oMasterModel.attachRequestFailed(function (data) {
				//	def.reject("Sistem hatası ile karşılaşıldı.");
			});

			return def.promise();

		};
		MainData.DocumentWrite = function (fileItem) {
			var def = jQuery.Deferred();
			var oModel = new ODataModel(this.url);
			var link = "/DocumentWriteSet";
			var obj = {};
			obj.DOCUMENT= fileItem.DOCUMENT_SIGNED; 
			obj.ARC_DOC_ID = fileItem.ARC_DOC_ID;


			oModel.create(link, obj, {
				async: true,
				success: function (oData, oResponse) {
					
					def.resolve(oData);
				},
				error: function (oError) {
					def.reject("Sistem hatası ile karşılaşıldı.");
				}
			});

			return def.promise();


		};
		return MainData;
	});