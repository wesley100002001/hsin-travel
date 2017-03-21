import moment from 'moment';
import loading from '../../../assets/imgs/loading.gif';
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

    this.loading = loading;
    this.startOpened = false;
    this.endOpened = false;

    this.timeOption = {
      minDate: new Date()
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
    this.newPkg.accommodations = this.newAccommodation;
    this.submitRequest(this.newPkg);
  }

  addAccommodation () {
    if (this.isNew) {
      if (!this.newPkg.startsOn && !this.newPkg.endsOn) {
        alert('請先選擇開始、結束日期');
        return;
      }
    }
    var timeFrame = this.isNew ? 
      { startsOn: this.newPkg.startsOn, endsOn: this.newPkg.endsOn } :
      { startsOn: this.tourPackage.startsOn, endsOn: this.tourPackage.endsOn };
    this.setBoundTimeFrame(timeFrame);
    this.stateGo('request.hotels');
  }

  changeDate (scope) {
    scope.reqForm.$setValidity('date', !moment(this.newPkg.startsOn).isAfter(this.newPkg.endsOn));
  }

  /*
    我是新增 / 編輯的分隔線
  */

  getFareSum (fares) {
    return fares.map(fare => {
      return fare.amount * fare.multiplier;
    }).reduce((sum, cur) => {
      return sum + cur;
    });
  }

  getTotalCost () {
    if (!this.tourPackage.accommodations) {
      return 0;
    }
    var feeSum = this.fee.length > 0 ? this.fee.map(f => {
      return f.amount;
    }).reduce((sum, cur) => {
      return sum + cur;
    }) : 0;
    var fareSum = this.tourPackage.accommodations.length > 0 ? this.tourPackage.accommodations.map(acco => {
      return this.getFareSum(acco.fares);
    }).reduce((sum, cur) => {
      return sum + cur;
    }) : 0;
    return feeSum + fareSum;
  }

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
    this.updateRequest(this.tourPackage.id, this.tempPkg);
    this.pkgEditable = false;
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
