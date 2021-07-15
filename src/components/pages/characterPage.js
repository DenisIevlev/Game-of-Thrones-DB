import React, {Component} from 'react';
import RowBlock from '../rowBlock/rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedCharacter: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedCharacter: id
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
            getData={this.gotService.getAllCharacters}
            onItemSelected={this.onItemSelected} 
            renderItem={({name, gender}) => `${name} (${gender})`}/>
        )
        const charDetails = (
            <ItemDetails 
            itemId={this.state.selectedCharacter}
            getData={this.gotService.getCharacter}>
            <Field field='gender' label='Gender'/>
            <Field field='born' label='Born'/>
            <Field field='died' label='Died'/>
            <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        return (
           <RowBlock left={itemList} right={charDetails}></RowBlock>
        )

    }
}
