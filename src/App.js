import React,{Component} from 'react';
import './App.css';
import {recipes} from './tempList';
import RecepieList from './components/RecepieList';
import RecepieDetails from './components/RecepieDetails';


class App extends Component {

state={
  recepies: recipes,
  url:"https://www.food2fork.com/api/search?key=638e7cdca25359a78419c2e774026e96",
  base_url:"https://www.food2fork.com/api/search?key=638e7cdca25359a78419c2e774026e96",
  details_id:35384,
  pageIndex: 1,
  search: "",
  query:'&q=',
  error:''
};

async getRecepies(){
  try{
  const data = await fetch(this.state.url);
  const jsonData = await data.json();
  console.log(jsonData)
  if(jsonData.recipes.length === 0){
    this.setState(()=>{
      return {error:'Sorry your search did not match any result'}
    })
  }
  else{
    this.setState(()=>{
      return {recepies:jsonData.recipes}
    })
  }
}
catch(error){
console.log(error)
}
}

componentDidMount(){
  this.getRecepies();
}


handleChange = e  =>{
  this.setState({
    search:e.target.value
  },()=> {
    console.log(this.state.search)
  })
}

handleSubmit = e =>{
  e.preventDefault();
  console.log("Submit pressed")
  const{base_url,query,search} = this.state;
  this.setState(()=>{
    return {url:`${base_url}${query}${search}`,search:"",error:""}
  },()=>{
    this.getRecepies();


  })
};

displayPage = index => {
  switch(index) {
    default:
    case 1:
    return <RecepieList
    recipes={this.state.recepies}
    handleDetails={this.handleDetails}
    value={this.state.search}
    handleChange={this.handleChange}
    handleSubmit={this.handleSubmit}
    error={this.state.error}
    />;
    case 0:
    return <RecepieDetails id={this.state.details_id} handleIndex={this.handleIndex}/>;

  }
}


handleIndex = index => {
  this.setState({
    pageIndex: index
  })
}

handleDetails = (index,id) => {
  this.setState({
    pageIndex: index,
    details_id: id
  })
}


render(){
//  console.log(this.state.recepies)
  return(
    <React.Fragment>
      {this.displayPage(this.state.pageIndex)}
    </React.Fragment>
  )
}

}

export default App;
