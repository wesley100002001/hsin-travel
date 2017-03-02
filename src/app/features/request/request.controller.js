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

    if (this.isNew) {
      this.clearRequest();
    } else {
      this.fetchRequest(this.requestId);
      this.fetchJPConversation(this.requestId);
      this.fetchTWConversation(this.requestId);
    }
  }

  mapStateToThis (state) {
    console.log(state);
    return {
      channel: state.channel,
      tourPackage: state.tour_package,
      token: state.login,
      orders: state.orders,
      isCreated: state.request.isCreated,
      japanLogs: state.request.japan,
      taiwanLogs: state.request.taiwan,
      tempPkg: state.request.tempPkg
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
    this.tourPackage.startsOn = moment(this.tourPackage.startsOn).format('YYYY-MM-DD');
    this.tourPackage.endsOn = moment(this.tourPackage.endsOn).format('YYYY-MM-DD');
    this.tourPackage.region = 'Osaka';
    delete this.tourPackage.notes;
    delete this.tourPackage.serialNo;
    this.submitRequest(this.tourPackage);
  }

  addAccommodation () {
    this.onAddAccommodation();
    this.stateGo('request.hotels');
  }

  submitKnockingAcco () {
    if (!!this.newAccoDate && !!this.newAccoHotel) {
      var knockingAcco = {
        date: this.newAccoDate,
        hotel: this.newAccoHotel
      };
      this.addKnockingAcco(knockingAcco);
    }
  }

  /*
    我是新增 / 編輯的分隔線
  */

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

  editAccommodation (acco) {
    this.stateGo('request.accommodation', {
      hotelId: acco.hotelId,
      accoId: acco.accoId
    });
  }

  onEditPkg () {
    this.pkgEditable = true;
    this.tempPkg = {
      title: this.tourPackage.title,
      people: this.tourPackage.people,
      serialNo: this.tourPackage.serialNo
    };
  }

  cancelEditPkg () {
    delete this.tempPkg;
    this.pkgEditable = false;
  }

  submitPkg () {
    this.updateRequest(this.tourPackage.requestId, this.tempPkg);
    this.offEditTitle();
  }
}

RequestController.$inject = ['$stateParams', '$ngRedux', '$scope'];
