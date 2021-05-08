import React from 'react';
import axios from 'axios';
import s from './weather.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class  WeatherPage extends React.Component{
    state = {
        weather: {
            forecast:[]
        }
      }
     
      constructor(props) {
        super(props);
        this.myRef = React.createRef();
      
      }
 
     
       render(){
      const forecastJsx=this.state.weather.forecast.map(item=>{
            return ( 
            <ul key={Math.random()}  className={s.ulForecast}> 
                <li>day:{item.day}</li>
                <li>temperature:{item.temperature}</li>
                <li>wind:{item.wind}</li>
            </ul>
            
        )})
       
            return(
                
        <div className={s.weatherPage}><h1 className={s.header}> weather forecast</h1>
               <div className={s.inputDiv}>
                   
                   <input type="text" name="name" placeholder="Insert the name of the city"  className={s.cityInput}  ref={ this.myRef} />
                 
                   <button className={s.searchBtn} onClick={this.handleForecast}><FontAwesomeIcon icon={faSearch}  color='blue'/></button>
               </div>
               <div className={s.response}>
               <p className='cityName'></p>
               <div className='resp' >
               </div> 
               {forecastJsx}
               </div>
        </div> 
      
    )
       }
       handleForecast=(e)=>{
        
        e.preventDefault();
        const cityName=document.querySelector('.cityName');
        const respDiv=document.querySelector('.resp');
        cityName.style.fontSize='30px';
        cityName.innerHTML=`The weather in ${this.myRef.current.value} `;
       if(this.myRef.current.value){
               axios.get(`https://goweather.herokuapp.com/weather/+${this.myRef.current.value}`)
       .then(res => {
         const weather = res.data;
         this.setState({ weather }); console.log(weather);
        
         respDiv.innerHTML=`
         <p >The temperature is  ${weather.temperature}</p>
         <p>The wind is          ${weather.wind}</p>
         <p>The discription is  ${weather.description}</p>
         <p>Forecast: </p>

         `;
       }) 
        }
       
        this.myRef.current.value='';
       
        
          
     }
   
 
 
}
export default WeatherPage;