import angular from 'angular';
import * as lodash from 'lodash';
import XLSX from 'xlsx';

class xlsxReader {
  constructor ($q, $rootScope) {
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

  readFile (file, readCells, toJSON) {
    var intializeFromFile = function (file, readCells, toJSON, handler) {
      var reader = new FileReader();
      var obj = {};
      reader.onload = e => {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
              type: 'binary'
          });
          var result = {};
          workbook.SheetNames.forEach(function(sheetName) {
              var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              if (roa.length > 0) {
                  result[sheetName] = roa;
              }
          });
          obj.sheets = result;
          handler(obj);
      }
      reader.readAsBinaryString(file);
    };

    return this.$q(function (resolve, reject) {
      intializeFromFile(file, readCells, toJSON, function(data) {
        resolve(data);
      });
    });
  }
}

export default angular.module('services.xlsxReader', [])
  .service('xlsxReader', xlsxReader)
  .name;
