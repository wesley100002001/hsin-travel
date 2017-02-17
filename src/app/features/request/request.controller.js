import moment from 'moment';
import * as RequestActions from '../../actions/request';
import * as RouterActions from 'redux-ui-router';

const combinedActions = Object.assign({}, RequestActions, RouterActions);

export default class RequestController {
  constructor ($stateParams, $ngRedux, $scope) {
    if (!localStorage.getItem('token')) {
      this.stateGo('login');
    }

    this.userID = localStorage.getItem('username');
    this.editable = this.userID === 'usert';
    this.requestId = $stateParams.requestId;
    this.isNew = this.requestId === '0';

    const unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), combinedActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.startOpened = false;
    this.endOpened = false;
    this.timeOption = {
      max: moment().subtract(1, 'days').format()
    };

    if (!!this.requestId) {
      this.fetchRequest(this.requestId);
      this.fetchJPConversation(this.requestId);
      this.fetchTWConversation(this.requestId);
    }
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      items: state.request.items,
      channel: state.channel,
      tourPackage: state.tour_package,
      token: state.login,
      orders: state.orders,
      japanLogs: state.request.japan,
      taiwanLogs: state.request.taiwan,
      peopleEditable: state.request.peopleEditable,
      titleEditable: state.request.titleEditable,
      tempTitle: state.request.tempTitle,
      tempPeople: state.request.tempPeople
    };
  }

  startOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.startOpened = !this.startOpened;
  };

  endOpen ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.endOpened = !this.endOpened;
  };

  confirm () {
    if (this.items.length < 1) {
      alert('尚未新增任何項目');
    } else {
      alert('yes');
      // this.addRequest({});
      // this.stateGo('requests');
    }
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
    this.setTempTitle(this.detail.title);
    this.onEditTitle();
  }

  editPeople () {
    this.setTempPeople(this.detail.people);
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
    this.updateTitle(this.detail.title);
    this.offEditTitle();
  }

  submitPeople () {
    this.updatePeople(this.detail.people);
    this.offEditPeople();
  }
}

RequestController.$inject = ['$stateParams', '$ngRedux', '$scope'];
