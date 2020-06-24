import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button , Icon} from 'semantic-ui-react'
import {blue} from './Components/icons/blue.png';
import {PinkUmbrella} from './Components/icons/PinkUmbrella.png';
import {YelloUmbrella} from './Components/icons/YelloUmbrella.png';


function returnUmbrella(color){
}

class App extends React.Component {
    state={
        color:'yellow',
        image:'',
        loading: false
    }
    componentWillMount(){
        localStorage.setItem('color','yellow')
        this.setState({ color:'yellow'})
    }
    selectColor =(color)=>{
        this.setState({color:color})
        localStorage.setItem('color',color)
    }
    componentDidUpdate(prevProps,prevState){
        const{image} = this.state
        if(prevState.image !== image)
            localStorage.getItem("fileBase64") &&
                this.setState({image : localStorage["fileBase64"]})
    }
    getBase64 = (file) => {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
    fileSelectHandler=(e)=>{
        this.setState({loading:true})
        console.log(e.target.files[0])
        this.setState({selectedFile:e.target.files[0]})
        this.getBase64(e.target.files[0]).then(base64 => {
            localStorage["fileBase64"] = base64;
            this.setState({image : localStorage["fileBase64"]})
        });
        this.setState({loading:false})
    }

        renderImage(color,upload){

        let renderHtml=[];

        renderHtml.push(
            <span> <img src={require('./Components/icons/YelloUmbrella.png')} className="umberlla-logo" alt="logo"/>
                 if (upload !== "")
            <img src={require('./Components/icons/upload_icon.svg')} className="renderImage"/>
            </span>
        )

    }


    render() {
        const{color,image,loading} = this.state;

        let bg = (color === 'yellow')  ? "#ffffcc":((color === 'blue') ? "#62b2ff": "#ff99cc" )
            return (
            <div className="App">
                <body className="App-header" style={{"background-color": bg}}>
                {loading && <span> <img src={require('./Components/icons/loader_icon.svg')} className="loaderImage"/> </span>}
                {!loading && <span>
                    {(color === 'yellow') &&
                    (<img src={require('./Components/icons/YelloUmbrella.png')} className="umberlla-logo" alt="logo"/>)}
                    {(color === 'blue') &&
                    (<img src={require('./Components/icons/BlueUmbrella.png')} className="umberlla-logo" alt="logo"/>)}
                    {(color === 'pink') &&
                    (<img src={require('./Components/icons/PinkUmbrella.png')} className="umberlla-logo" alt="logo"/>)}
                    {console.log(image)}
                    {(image !== "") &&
                    <img src={image} className="renderImage"/>}
                </span >
                }
                {!loading &&
                <span style={{"marginLeft": "4%","color":"black"}}>
                        <h2>Custom Umbrella</h2>
                         <Icon onClick={() => this.selectColor('blue')}>
                          <img src={require('./Components/icons/blue.png')}></img>
                         </Icon>

                         <Icon onClick={() => this.selectColor('pink')}><img
                             src={require('./Components/icons/pink.png')}/></Icon>
                         <Icon onClick={() => this.selectColor('yellow')}><img
                             src={require('./Components/icons/yellow.png')}/></Icon>
                        <h4>Customize your umbrella</h4>
                        <h5>Upload a logo for an instant preview</h5>

                        <Button as='label' htmlFor="file" class="ui secondary button"> <img
                            src={require('./Components/icons/upload_icon.svg')}
                            className="upload-logo"/> UPLOAD LOGO</Button>
                         <input type='file' id='file' onChange={this.fileSelectHandler} hidden ref={this.fileInputRef}/>

                    </span>
                }
                </body>
            </div>
        );
    }
}

export default App;
