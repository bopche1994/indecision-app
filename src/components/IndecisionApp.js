import React from 'react'
import AddOption from './AddOption'
import Action from './Action'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'


export default class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
    }
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}))
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    };
    handleClearSeletedOption = () => {
        this.setState(() => ({selectedOption: undefined}))
    };
    handlePick = () => {
        const randonNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randonNum]
        // alert(option)
        this.setState(() => ({
            selectedOption: option
        }))

    };

    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add'
        }else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}))
    }
    render(){
        
        const subtitle = 'Put your life in the hands of a computer'
        return (
            <div>
                <Header  subtitle={subtitle}/>
                <div className='container'>
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className='widget'>
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    
                </div>
                
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSeletedOption={this.handleClearSeletedOption}
                />
                  
            </div>
        )
    };
    componentDidMount(){
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options){
                this.setState(() => ({options}))
            }
        } catch (e) {
            // Do nothing 
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json =JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
        
    };
    componentwillUnmount(){
        console.log('componentwillUnmount')
    };    
}








// import React from 'react'
// import AddOption from './AddOption'
// import Action from './Action'
// import Header from './Header'
// import Options from './Options'

// export default class IndecisionApp extends React.Component{
//     constructor(props){
//         super(props)
//         this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
//         this.handlePick = this.handlePick.bind(this)
//         this.handleAddOption = this.handleAddOption.bind(this)
//         this.handleDeleteOption = this.handleDeleteOption.bind(this)
//         this.state = {
//             options: props.options
//         }
//     }
//     componentDidMount(){
//         try {
//             const json = localStorage.getItem('options')
//             const options = JSON.parse(json)
//             if(options){
//                 this.setState(() => ({options}))
//             }
//         } catch (e) {
//             // Do nothing 
//         }
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if(prevState.options.length !== this.state.options.length){
//             const json =JSON.stringify(this.state.options)
//             localStorage.setItem('options', json)
//         }
        
//     }
//     componentwillUnmount(){
//         console.log('componentwillUnmount')
//     }
//     handleDeleteOptions() {
//         this.setState(() => ({options: []}))
//     }
//     handleDeleteOption(optionToRemove) {
//         this.setState((prevState) => ({
//             options: prevState.options.filter((option) => optionToRemove !== option)
//         }))
//     }
//     handlePick(){
//         const randonNum = Math.floor(Math.random() * this.state.options.length)
//         const option = this.state.options[randonNum]
//         alert(option)
//     }

//     handleAddOption(option){
//         if(!option){
//             return 'Enter valid value to add'
//         }else if (this.state.options.indexOf(option) > -1){
//             return 'This option already exists'
//         }
//         this.setState((prevState) => ({options: prevState.options.concat(option)}))
//     }
//     render(){
        
//         const subtitle = 'Put your life in the hands of a computer'
//         return (
//             <div>
//                 <Header  subtitle={subtitle}/>
//                 <Action 
//                     hasOptions={this.state.options.length > 0}
//                     handlePick={this.handlePick}
//                 />
//                 <Options 
//                     options={this.state.options}
//                     handleDeleteOptions={this.handleDeleteOptions}
//                     handleDeleteOption={this.handleDeleteOption}
//                 />
//                 <AddOption
//                     handleAddOption={this.handleAddOption}
//                 />
                  
//             </div>
//         )
//     }
// }
// IndecisionApp.defaultProps = {
//     options: []
// }