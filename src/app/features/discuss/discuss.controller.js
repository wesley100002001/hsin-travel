import moment from 'moment';

export default class DiscussController {
  constructor ($state, $cookies, acl, restful, $scope) {
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

    this.restful.getMockRequest()
    .then(req => {
      this.request = req;
    });
  }

  // 一個 Request 裡應該要有一個 Conversation Array 來存所有的留言
  addComment () {
    if (!!this.newComment) {
      this.conversation.push({
        id: this.userID,
        comment: this.newComment,
        timestamp: moment().format('YYYY 年 MM 月 DD 日 HH:mm:ss')
      });
      this.newComment = '';
    }
  }

  editRequest (id) {
    alert(id);
  }
}

DiscussController.$inject = ['$state', '$cookies', 'acl', 'restful', '$scope'];
