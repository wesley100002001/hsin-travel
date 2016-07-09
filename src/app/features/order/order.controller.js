import moment from 'moment';

export default class OrderController {
  constructor ($state, $cookies, acl, $stateParams, restful) {
    if (!acl.checkStatus($cookies.get('status'))) {
      $state.go('login');
    }
    var orderId = $stateParams.orderId;

    this.restful = restful;
    this.restful.getOrder(orderId)
    .then(response => {
      this.info = response;
      this.info.ship_status = this.info.ship_status ? this.info.ship_status : 'stateless';
      this.info.ship_id = this.info.ship_id ? this.info.ship_id : '';
      this.info.receipt_id = this.info.receipt_id ? this.info.receipt_id : '';
      this.info.donated = this.info.donated ? this.info.donated : false;
      this.info.ship_notes = this.info.ship_notes ? this.info.ship_notes : '';
      this.info.create_time = this.info.create_time ? moment(this.info.create_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss') : '';
      this.info.pay_time = this.info.pay_time ? moment(this.info.pay_time).format('YYYY 年 MM 月 DD 日 HH:mm:ss') : '';
    });
  }

  save () {
    this.restful.updateOrder(this.info.id, {
      ship_status: this.info.ship_status,
      ship_id: this.info.ship_id,
      receipt_id: this.info.receipt_id,
      donated: this.info.donated,
      ship_notes: this.info.ship_notes
    }).then(function () {
      alert('儲存成功');
    });
  }
}

OrderController.$inject = ['$state', '$cookies', 'acl', '$stateParams', 'restful'];
