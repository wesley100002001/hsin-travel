export default class OrderImportController {
  constructor ($state, $cookies, acl, $http, restful, xlsxReader, $q) {
    var scope = this;
    this.restful = restful;
    this.$q = $q;
    scope.state = $state;
    scope.cookies = $cookies;
    scope.xlsxReader = xlsxReader;

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    }

    scope.items = [];   //存放資料物件之陣列，一列為一個物件，key為欄名
    scope.sheets = [];  //工作表 array
  }

  fileChanged (files) {
    var showPreview = false;        //以表格預覽
    var showJSONPreview = true;     //以json預覽
    this.sheets = [];   //工作表 array
    this.excelFile = files[0];        //選擇之excel檔(.xlsx格式)
    this.xlsxReader.readFile(this.excelFile, showPreview, showJSONPreview)
    .then(xlsxData => {
      this.sheets = xlsxData.sheets;
    });
  }

  updateItems () {
    this.items = this.sheets[this.selectedSheetName];
  }

  uploadSheet () {
    this.uploading = true;
    var orderlist = [];
    this.sheets[this.selectedSheetName].forEach(order => {
      var normalizedOrder = {
        id: order['金流單號'],
        product: !!order['贊助細節'] ? order['贊助細節'] : '無',
        amount: !!order['總數量'] ? order['總數量'] : '無',
        extra: !!order['額外贊助'] ? order['額外贊助'] : '無',
        currency: !!order['幣別'] ? order['幣別'] : '無',
        cost: !!order['總金額'] ? order['總金額'] : '無',
        status: !!order['狀態'] ? order['狀態'] : '無',
        notes: !!order['備註'] ? order['備註'] : '無',
        marks: !!order['商家註記'] ? order['商家註記'] : '無',
        tags: !!order['標籤'] ? order['標籤'] : '無',
        options: !!order['選項'] ? order['選項'] : '無',
        receiver_name: !!order['收件者姓名'] ? order['收件者姓名'] : '無',
        receiver_email: !!order['收件者Email'] ? order['收件者Email'] : '無',
        receiver_phone: !!order['收件者電話'] ? order['收件者電話'] : '無',
        receiver_address: !!order['收件者地址'] ? order['收件者地址'] : '無',
        country: !!order['所在國家'] ? order['所在國家'] : '無',
        city: !!order['居住城市'] ? order['居住城市'] : '無',
        area: !!order['居住區域'] ? order['居住區域'] : '無',
        postcode: !!order['郵遞區號'] ? order['郵遞區號'] : '無',
        wanttosay: !!order['想說的話'] ? order['想說的話'] : '無',
        sponsor_id: !!order['贊助者ID'] ? order['贊助者ID'] : '無',
        sponsor_name: !!order['贊助者姓名'] ? order['贊助者姓名'] : '無',
        sponsor_email: !!order['贊助者Email'] ? order['贊助者Email'] : '無',
        pay_method: !!order['付款方式'] ? order['付款方式'] : '無',
        create_time: !!order['訂單建立時間'] ? order['訂單建立時間'] : '無',
        pay_time: !!order['付款時間'] ? order['付款時間'] : '無',
        refund_time: !!order['退款時間'] ? order['退款時間'] : '無',
        actual_amount: !!order['實際單位數量'] ? order['實際單位數量'] : '無'
      };
      orderlist.push(this.restful.updateOrder(normalizedOrder.id, normalizedOrder));
    });
    this.$q.all(orderlist).then(response => {
      return this.restful.updateLastUpdateTime();
    }).then(response => {
      this.uploading = false;
      alert('同步完成');
    });
  }
}

OrderImportController.$inject = ['$state', '$cookies', 'acl', '$http',
  'restful', 'xlsxReader', '$q'];
