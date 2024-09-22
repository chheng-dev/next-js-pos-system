import moment from "moment/moment";


class Humanize {
  constructor(dateString) {
    this.date = moment(dateString);
  }


  format() {
    return this.date.format('MMM, DD, YYYY');
  }

  ago() {
    return this.date.fromNow();
  }
}

export default Humanize;