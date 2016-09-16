const React = require('react');

const Details = React.createClass({
  render() {
    console.log(this.props)
    return (
      <div style={{textAlign: 'left'}}>
        <pre><code>
          {JSON.stringify(this.props, null, 4)}
        </code></pre>
      </div>
    )
  }
})

module.exports = Details;