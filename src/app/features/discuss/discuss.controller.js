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
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      channel: state.channel,
      request: state.requestToBeEdit,
      token: state.login,
      orders: state.orders,
      japanLogs: state.discuss.japan,
      taiwanLogs: state.discuss.taiwan,
      peopleEditable: state.discuss.peopleEditable,
      titleEditable: state.discuss.titleEditable,
      tempTitle: state.discuss.tempTitle,
      tempPeople: state.discuss.tempPeople
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

  editAccomodation (acco) {
    this.stateGo('request.accomodation', {
      hotelId: acco.hotelId,
      accoId: acco.accoId
    });
  }

  editTitle () {
    this.setTempTitle(this.request.title);
    this.onEditTitle();
  }

  editPeople () {
    this.setTempPeople(this.request.people);
    this.onEditPeople();
  }

  cancelEditTitle () {
    this.undoTitle(this.tempTitle);
    this.offEditTitle();
  }

  cancelEditPeople () {
    this.undoPeople(this.tempPeople);
    this.offEditPeople();
  }

  submitTitle () {
    this.updateTitle(this.request.title);
    this.offEditTitle();
  }

  submitPeople () {
    this.updatePeople(this.request.people);
    this.offEditPeople();
  }
}

DiscussController.$inject = ['$ngRedux', '$scope', '$stateParams'];
