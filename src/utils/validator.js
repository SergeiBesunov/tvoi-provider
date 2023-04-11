
export default function validator(data, config){
    const errors = {}
    
    function validate(validMethod, data, config){
                    let statusValidate;
                    switch(validMethod) {
                        case "isRequired":{
                            if(typeof data === "boolean"){
                                    statusValidate = !data}
                                else{
                                    statusValidate = data.trim() === ""
                                }
                            break;
                        }
                        
                        case "minLength":
                            let cleanData = data.replaceAll("-", "")
                            cleanData = cleanData.replaceAll(" ", "")
                            cleanData = cleanData.replace("+", "")
                            cleanData = cleanData.replace(")", "")
                            cleanData = cleanData.replace("(", "")
                            statusValidate = cleanData.length < 11
                            break;
    
                        default:
                            break;
                    }   
    
                    if(statusValidate) return config.message
    }
    
        for(const FieldName in data){
            for(const validMethod in config[FieldName]){
                const error = validate(validMethod, data[FieldName], config[FieldName][validMethod])
               if(error && !errors[FieldName])
                    {errors[FieldName] = error}
            }
         }
    
    return errors
    }