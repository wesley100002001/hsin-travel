export default class OrderImportController {
  constructor ($state, $cookies, acl, $http, restful, xlsxReader) {
    var scope = this;
    scope.state = $state;
    scope.cookies = $cookies;
    scope.xlsxReader = xlsxReader;

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }

	  scope.showPreview = false;        //以表格預覽
    scope.showJSONPreview = true;     //以json預覽
    scope.items = [];   //存放資料物件之陣列，一列為一個物件，key為欄名
    scope.sheets = [];  //工作表 array
  }

  fileChanged (files) {
    this.sheets = [];   //工作表 array
    this.excelFile = files[0];        //選擇之excel檔(.xlsx格式)
    this.xlsxReader.readFile(this.excelFile, this.showPreview, this.showJSONPreview)
    .then(xlsxData => {
      this.sheets = xlsxData.sheets;
    });
  }

  updateItems () {
    this.items = this.sheets[this.selectedSheetName];
  }
}

OrderImportController.$inject = ['$state', '$cookies', 'acl', '$http',
  'restful', 'xlsxReader'];
