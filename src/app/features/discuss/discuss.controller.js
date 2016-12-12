import moment from 'moment';
import * as DiscussActions from '../../actions/discuss';

export default class DiscussController {
  constructor ($state, $cookies, acl, restful, $scope, $ngRedux) {
    this.state = $state;
    this.cookies = $cookies;
    this.restful = restful;
    this.conversation = [];

    if (!acl.checkStatus(this.cookies.get('status'))) {
      this.state.go('login');
    } else {
      this.userID = this.cookies.get('id');
      this.editable = this.cookies.get('isAdmin') === 'true';
    }

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), DiscussActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.restful.getMockRequest()
    .then(req => {
      this.loadRequest(req);
    });
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      conversation: state.discuss,
      request: state.requestToBeEdit
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

  editHotel (hotel) {
    this.state.go('request.itemconfirm', hotel);
  }

  deleteHotel (id) {

  }
}

DiscussController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope', '$ngRedux'];
