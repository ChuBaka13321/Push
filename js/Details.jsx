const React = require('react');
const { connector } = require('./Store');

const Details = React.createClass({
  render() {
    console.log(this.props,'this is details page')
    // const { title, link } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <pre><code>
          {JSON.stringify(this.props, null, 4)}
        </code></pre>
      </div>
    )
  }
})

module.exports = connector(Details)