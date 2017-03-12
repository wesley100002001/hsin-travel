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
      this.newPkg = {
        serialNo: '－－Ｈ'
      };
    } else {
      this.fetchRequest(this.requestId);
      this.fetchJPConversation(this.requestId);
      this.fetchTWConversation(this.requestId);
      this.fee = [];
    }
  }

  mapStateToThis (state) {
    console.log('request');
    console.log(state);
    return {
      channel: state.channel,
      tourPackage: state.tour_package,
      token: state.login,
      orders: state.orders,
      isCreated: state.request.isCreated,
      japanLogs: state.request.japan,
      taiwanLogs: state.request.taiwan,
      tempPkg: state.request.tempPkg,
      newAccommodation: state.new_accommodation
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
    this.newPkg.startsOn = moment(this.newPkg.startsOn).format('YYYY-MM-DD');
    this.newPkg.endsOn = moment(this.newPkg.endsOn).format('YYYY-MM-DD');
    this.newPkg.region = localStorage.getItem('region');
    this.newPkg.accommodations = this.newAccommodation.map(acco => {
      var purifiedAcco = {
        roomId: acco.roomId,
        checkinAt: acco.checkinAt,
        checkoutAt: acco.checkoutAt,
        quantity: acco.quantity
      };
      return purifiedAcco;
    });
    this.submitRequest(this.newPkg);
  }

  addAccommodation () {
    this.stateGo('request.hotels');
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
          timestamp: moment()
        });
      } else {
        this.addJPComment({
          id: this.userID,
          comment: this.newComment,
          timestamp: moment()
        });
      }
      this.newComment = '';
    }
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
      peopleNote: this.tourPackage.peopleNote,
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

  showFeeInput () {
    this.feeInputVisible = true;
    this.feeInput = {};
  }

  submitFee () {
    this.fee.push({
      title: this.feeInput.title,
      amount: this.feeInput.amount
    });
    this.feeInputVisible = false;
    delete this.feeInput;
  }

  cancelAddFee () {
    this.feeInputVisible = false;
    delete this.feeInput;
  }
}

RequestController.$inject = ['$stateParams', '$ngRedux', '$scope'];
