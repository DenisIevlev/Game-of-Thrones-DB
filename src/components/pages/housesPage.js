import React, {Component} from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

export default class HousesPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
       }

    render(){

        if(this.state.error){
            return <ErrorMessage></ErrorMessage>;
        }
        const itemList = (
            <ItemList 
            getData={this.gotService.getAllHouses}
            onItemSelected={this.onItemSelected} 
            renderItem={({name, region}) => `${name} (${region})`}/>
        )
        const houseDetails = (
            <ItemDetails 
            itemId={this.state.selectedHouse}
            getData={this.gotService.getHouse}>
            <Field field='name' label='Name'/>
            <Field field='region' label='Region'/>
            <Field field='words' label='Words'/>
            <Field field='titles' label='Titles'/>
            </ItemDetails>
        )
        return (
           <RowBlock left={itemList} right={houseDetails}></RowBlock>
        )

    }
}
