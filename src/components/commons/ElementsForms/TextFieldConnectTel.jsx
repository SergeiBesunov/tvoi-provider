import React from 'react';

export default function TextFieldConnect({ placeholder, value, onChange, name, error }) {

    let getInputNumbersValue = (input) => {
        return input.value.replace(/\D/g, "")
    }

    let onPhoneInput = function (e){
        let input = e.target
        let inputNumbersValue = getInputNumbersValue(input)
        let formattedInputValue = ""
        let selectionStart = input.selectionStart

        if(!inputNumbersValue){
            return input.value = ""
        }

        if(input.value.length != selectionStart){
            if(e.nativeEvent.data &&  /\D/g.test(e.data)){
                input.value = inputNumbersValue
            }
            return
        }

        if(["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1){
            //Russian number
            if(inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue
            let firstSymbol = (inputNumbersValue[0] == "8") ? "8" : "+7"
            formattedInputValue = firstSymbol + " "
            if(inputNumbersValue.length > 1){
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4)
            }
            if(inputNumbersValue.length >= 5){
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7)
            }
            if(inputNumbersValue.length >= 8){
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9)
            }
            if(inputNumbersValue.length >= 10){
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11)
            }
            input.value = formattedInputValue

           
        }else{
            // Not Russian number
          return input.value = "+" + inputNumbersValue.substring(0, 16)
        }
    }

    let onPhoneKeyDown = function(e){
        let input = e.target
        let inputNumbersValue = getInputNumbersValue(input)
        if(e.keyCode == 8 && getInputNumbersValue(input).length == 1){
            input.value = inputNumbersValue
        }
    }

    let onPhonePaste = function(e){
        let pasted = e.clipboardData || window.clipboardData
        let input = e.target
        let inputNumbersValue = getInputNumbersValue(input)

        if(pasted){
            let pastedText = pasted.getData("Text")
            if(/\D/g.test(pastedText)){
                input.value = inputNumbersValue
            }
        }
    }

   return (
      <div className="form__textfield-container">
         <input
            className="form__textfield"
            value={value}
            name={name}
            type="tel"
            maxLength={18}
            placeholder={placeholder}
            onChange={onChange}
            onInput={onPhoneInput}
            onKeyDown={onPhoneKeyDown}
            onPaste={onPhonePaste}
         />
         <p className="form__textfield-error">{error && error}</p>
      </div>
   );
}