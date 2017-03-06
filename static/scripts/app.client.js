/* global $ */
var React = require('react'),
    ReactDOM = require('react-dom'),
    bs = require('react-bootstrap');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 0, feed: null, inputUrl: '', loading:false};
        
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.messages = {
            0: 'Enter a RSS feed URL and click Load',
            200: 'Loaded. Enjoy reading!',
            400: 'There was an error in the URL you provided',
            500: 'There was an error on the server. Try again'
        };
    }
    
    update() {
        this.setState({loading: true});
        $.ajax({
            data: {
                url: this.state.inputUrl
            },
            url: '/feed',
            dataType: 'json',
            complete: (data) => {
                data = JSON.parse(data.responseText);
                this.setState({feed: data.feed, status: data.status, loading: false});
                
            }
        });
    }
    
    handleChange(e) {
        this.setState({inputUrl: e.target.value});
    }
    
    render() {
        return (
            <div>
                <Logo />
                <bs.Col xs={12} md={3}>
                    <Toolbar forUpdate = {this.update} forChange = {this.handleChange} message = {this.messages[this.state.status]} />
                </bs.Col>
                
                <bs.Col xs={12} md={9}>
                    <FeedContainer loading={this.state.loading} status={this.state.status} feedProp={this.state.feed} />
                </bs.Col>
            </div>
        );
    }
}

class Logo extends React.Component {
    render() {
        return (
            <bs.Row>
                <bs.Col xs={12}  style={{textAlign:'center'}}>
                    <bs.Well>
                        <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/rss-512.png" height="100"/>
                        <h1>Ignite<b>RSS</b></h1>
                        <hr />
                        <h3>Sample application made by <a href="https://www.linkedin.com/in/aditya-medhe-0b103830/" target="_blank">@adityamedhe</a> for Ignite solutions</h3>
                    </bs.Well>
                </bs.Col>
            </bs.Row>
        );
    }
}

class Toolbar extends React.Component {
    render () {
        return (
            <bs.Row>
                <bs.Col xs={12}>
                    <bs.Panel bsStyle="primary" header="RSS Feed Link">
                        <bs.Alert bsStyle="info">
                            <bs.Glyphicon glyph="info-sign" />
                            &nbsp;
                            {this.props.message}
                        </bs.Alert>
                        
                        <input className="form-control" type="text" onChange={this.props.forChange} />
                        <hr />
                        <bs.Button bsSize="large" bsStyle="success" onClick={this.props.forUpdate}>
                            <bs.Glyphicon glyph="ok" />
                            &nbsp;
                            Load 
                        </bs.Button>
                    </bs.Panel>
                </bs.Col>
            </bs.Row>
        )
    }
}

class FeedContainer extends React.Component {
    render () {
        return (
            <bs.Row>
                <bs.Col xs={12}>
                    {(this.props.loading)?<bs.ProgressBar active now={100} />: null}
                    {
                        (this.props.status == 200)?
                        (<bs.Panel bsStyle="primary" header={this.props.feedProp.title}>
                            
                            <h2>{this.props.feedProp.description}</h2>
                            <a href={this.props.feedProp.link}>{this.props.feedProp.link}</a>
                            <hr/>
                            <div  style={{maxHeight:'400px', overflowY:'auto'}}>
                            {this.props.feedProp.entries.map(function(e) {
                                return (<Feed key = {e.guid} content = {e}/>)
                            })}
                            </div>
                        </bs.Panel>):
                        
                        (this.props.status == 0)?
                        (<bs.Panel bsStyle="info" header="Welcome">
                            Enter a URL to get started
                        </bs.Panel>):
                        (<bs.Panel bsStyle="danger" header="Oops">
                            Something has gone wrong. Cannot display feeds.
                        </bs.Panel>)
                    }
                </bs.Col>
            </bs.Row>
        );
    }
}

class Feed extends React.Component {
    render() {
        return (
            <bs.Panel bsStyle="info" 
                header = {<h3>{this.props.content.title}</h3>}>
                
                <a href = {this.props.content.link}>{this.props.content.link}</a><br/>
                <i>{this.props.content.pubDate}</i>
                <hr />
                
                <p>{this.props.content.contentSnippet}</p>
                
                
            </bs.Panel>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));