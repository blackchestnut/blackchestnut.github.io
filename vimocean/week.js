var ProfileBox = React.createClass({
  displayName: 'ProfileBox',

  handleProfileSubmit: function(profile) {
    this.setState(profile)
  },

  getInitialState: function() {
    //return {name: '', birthday: '', age: 0};
    return {name: 'Alexander (example)', birthday: Date.parse('1982-11-19'), age: 75};
  },

  render: function() {
    return (
      <div className='profileBox'>
        <h1>Configuring your life</h1>
        <ProfileForm onProfileSubmit={this.handleProfileSubmit} />
        <Profile name={this.state.name} birthday={this.state.birthday} age={this.state.age} />
      </div>
    );
  }
});

var ProfileForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var birthday = React.findDOMNode(this.refs.birthday).value.trim();
    var age = React.findDOMNode(this.refs.age).value.trim();

    this.props.onProfileSubmit({name: name, birthday: Date.parse(birthday), age: parseInt(age)});
    return;
  },

  render: function() {
    return (
      <form className='profileForm' onSubmit={this.handleSubmit}>
        <input type='text' ref='name' placeholder='Your name' />
        <input type='text' ref='birthday' placeholder='Your birthday, e.g. 1982-11-19' />
        <input type='text' ref='age' placeholder='Years at the time of death, e.g. 85' />
        <input type='submit' value='Build' />
      </form>
    );
  }
});

var Profile = React.createClass({
  render: function() {
    return (
      <div className='profile'>
        <h2 className='profileName'>
          {this.props.name}
        </h2>
        <div className='profileBirthday'>
          Birthday: {new Date(this.props.birthday).toLocaleDateString()}
        </div>
        <div className='profileAgeCurrent'>
          {this.currentAge()} years old
        </div>
        <div className='profileAgeForecast'>
          {this.props.age} years (forecast)
        </div>
        <br />
        <LifeMap date_from={this.props.birthday} years={this.props.age} />
      </div>
    );
  },

  currentAge: function() {
    return Math.ceil((new Date() - new Date(this.props.birthday)) / (1000*60*60*24*365));
  },
});

var LifeMap = React.createClass({
  render: function() {
    var weeks = [];
    var now = new Date();
    for (var i = 0; i < this.daysTotal() / 7; i++) {
      var isPast = new Date(this.props.date_from + (1000*60*60*24) * i * 7) < now;
      weeks.push(<LifeWeek progressStatus={isPast ? 'x' : 'o'} />);
    }
    return (
      <div className='lifeMap'>
        <div><b>Start:</b> {new Date(this.props.date_from).toLocaleDateString()}</div>
        <div><b>Finish:</b> {this.dateTo().toLocaleDateString()}</div>
        <div>
          {this.daysTotal()} days total
        </div>
        <div>
          {this.daysLeft()} days left, it is {Math.round(this.daysLeft()/this.daysTotal()*100)}%
        </div>
        <h2>Your weeks</h2>
        <div className='canvas'>{weeks}</div>
      </div>
    );
  },

  dateTo: function() {
    return new Date(this.props.date_from + (1000*60*60*24) * 365 * this.props.years);
  },

  diffDays: function(dateFrom, dateTo) {
    return Math.round((dateFrom - dateTo) / (1000*60*60*24));
  },

  daysTotal: function() {
    return this.diffDays(this.dateTo().getTime(), this.props.date_from)
  },

  daysLeft: function() {
    return this.diffDays(this.dateTo().getTime(), new Date())
  }
});

var LifeWeek = React.createClass({
  render: function() {
    if (this.props.progressStatus == 'x') {
      return (
        <span className='week past'>{this.props.progressStatus}</span>
      )
    } else {
      return (
        <span className='week'>{this.props.progressStatus}</span>
      )
    }
  }
});

React.render(
  React.createElement(ProfileBox, null),
  document.getElementById('profile')
);
