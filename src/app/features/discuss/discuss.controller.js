import moment from 'moment';
import * as DiscussActions from '../../actions/discuss';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, DiscussActions, RouterActions);

export default class DiscussController {
  constructor ($ngRedux, $scope, $stateParams) {
    this.conversation = [];

    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    this.userID = localStorage.getItem('username');
    this.editable = this.userID === 'usert';
    this.requestId = $stateParams.requestId;

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.fetchRequest($stateParams.requestId);
    this.fetchJPConversation($stateParams.requestId);
    this.fetchTWConversation($stateParams.requestId);
    // this.fetchGreetings();
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      channel: state.channel,
      request: state.requestToBeEdit,
      greetings: state.greetings,
      token: state.login,
      orders: state.orders,
      japanLogs: state.discuss.japan,
      taiwanLogs: state.discuss.taiwan,
      peopleEditable: state.peopleEditable,
      titleEditable: state.titleEditable
    };
  }

  // 一個 Request 裡應該要有一個 Conversation Array 來存所有的留言
  leaveComment (region) {
    if (!!this.newComment) {
      // FIXME: should reduce code redundency here
      if (region === 'Taiwan') {
        this.addTWComment({
          id: this.userID,
          comment: this.newComment,
          timestamp: moment().format('YYYY 年 MM 月 DD 日 HH:mm:ss')
        });
      } else {
        this.addJPComment({
          id: this.userID,
          comment: this.newComment,
          timestamp: moment().format('YYYY 年 MM 月 DD 日 HH:mm:ss')
        });
      }
      this.newComment = '';
    }
  }

  test () {
    console.log(this.token);
    this.fetchOrders(this.token);
  }

  editHotel (acco) {
    this.stateGo('request.acco-edit', {
      hotelId: acco.hotelId,
      accoId: acco.accoId
    });
  }
}

DiscussController.$inject = ['$ngRedux', '$scope', '$stateParams'];
