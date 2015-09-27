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
          {new Date(this.props.birthday).toLocaleDateString()}
        </div>
        <div className='profileAge'>
          {this.props.age} years old
        </div>
        <LifeMap date_from={this.props.birthday} years={this.props.age} />
      </div>
    );
  },
});

var LifeMap = React.createClass({
  render: function() {
    return (
      <div className='lifeMap'>
        <h3>
          From: {new Date(this.props.date_from).toLocaleDateString()}
        </h3>
        <h3>
          To: {this.dateTo().toLocaleDateString()}
        </h3>
        <div>
          {this.daysTotal()} days total
        </div>
        <div>
          {this.daysLeft()} days left, it is {Math.round(this.daysLeft()/this.daysTotal()*100)}%
        </div>
        <div className='canvas'>
        </div>
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
    return this.diffDays(new Date(), this.props.date_from)
  }
});

React.render(
  React.createElement(ProfileBox, null),
  document.getElementById('profile')
);
