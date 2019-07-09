import React, {Component} from 'react';
import Recepie from './Recepie';
import RecepieSearch from './RecepieSearch';

export default class RecepieList extends Component{
  render(){
    const {recipes,handleDetails, value, handleSubmit, handleChange, error }=this.props;
    return(
      <React.Fragment>
      <RecepieSearch value={value} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <div className="container my-5">
      <div className="row">
      <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
        <h1 className="text-slanted">Recepie List</h1>
      </div>
      </div>
      <div className="row">
      {error? (<h1 className="text-danger text-center">{error}</h1>):
      (  recipes.map(recipe=>{
        return(
          <Recepie
          key={recipe.recipe_id}
          recipe={recipe}
          handleDetails={()=>handleDetails(0,recipe.recipe_id)}
          />);
      })
    )}

      </div>
      </div>

      </React.Fragment>
    );
  }
}
