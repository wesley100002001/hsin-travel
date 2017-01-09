import moment from 'moment';
import * as DiscussActions from '../../actions/discuss';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, DiscussActions, RouterActions);

export default class DiscussController {
  constructor (acl, $ngRedux, $scope, $stateParams) {
    this.conversation = [];

    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    this.userID = localStorage.getItem('username');
    this.editable = this.userID === 'usert';

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchRequest($stateParams.requestId);
    // this.fetchGreetings();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      conversation: state.discuss,
      request: state.requestToBeEdit,
      greetings: state.greetings,
      token: state.login,
      orders: state.orders
    };
  }

  // 一個 Request 裡應該要有一個 Conversation Array 來存所有的留言
  leaveComment () {
    if (!!this.newComment) {
      this.addComment({
        id: this.userID,
        comment: this.newComment,
        timestamp: moment().format('YYYY 年 MM 月 DD 日 HH:mm:ss')
      });
      this.newComment = '';
    }
  }

  test () {
    console.log(this.token);
    this.fetchOrders(this.token);
  }

  editHotel (hotel) {
    this.stateGo('request.itemconfirm', hotel);
  }

  deleteAccomodation (acco) {
    // for now is just a mock
    this.removeAccomodation(acco);
  }
}

DiscussController.$inject = ['acl', '$ngRedux', '$scope', '$stateParams'];
