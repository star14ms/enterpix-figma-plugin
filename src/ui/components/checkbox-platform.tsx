import React from 'react';
import { RowCSS } from './styled'
import styled from 'styled-components';



export const RowMarginTop = styled.div`
  ${RowCSS}
  margin-top: 16px;
`;


const Label = styled.label`
  /* Customize the label (the container) */
  & {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Hide the browser's default checkbox */
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }
  
  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  /* When the checkbox is checked, add a blue background */
  & input:checked ~ .checkmark {
    background-color: #2196F3;
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  & input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  & .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`


function CheckboxPlatform({ state, setState }) {

  //값을 가져오기 위해 inputs에 name으로 가져왔다
  const { midjourney, stableDiffusion } = state   
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target   
  
    const nextInputs = {            
      ...state,  
      [name]: checked,
    }

    setState(nextInputs)
  }

  return (
    <RowMarginTop>
      <Label htmlFor='midjourney' className='container'>
        Midjourney
        <input 
          type='checkbox' checked={midjourney} onChange={e => onChange(e)} 
          id='midjourney' name='midjourney' 
        />
        <span className='checkmark'></span>
      </Label>

      <Label htmlFor='stable-diffusion'>
        Stable-Diffusion
        <input 
          type='checkbox' checked={stableDiffusion} onChange={e => onChange(e)} 
          id='stable-diffusion' name='stableDiffusion'
        />
        <span className='checkmark'></span>
      </Label>
    </RowMarginTop>
  );
}

export default CheckboxPlatform;
