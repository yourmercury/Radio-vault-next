import { useRef } from "react";
import Input, { TextArea } from "./input";
import Text from "./texts";

export default function Web2Metadata({form, setForm}){
    const errors = useRef({});

    let keys = Object.keys(form);


    return (
        <div>
            <div className="bg-theme-light-grey p-5 mb-10">
                <Text cls={`text-[14px] text-theme-red`}>
                    Ensure you fill out the form and cross-examine the data inputed by you as you are at liberty to omit any and even all fields
                </Text>
            </div>

            <div>
                {keys.map((name, index)=>{
                    let title = name.replaceAll("_", " ");
                    
                    if(name == "public_domain") title += " (Yes or No)"
                    if(name == "has_vocals") title += " (Yes or No)"
                    if(name == "explicit") title += " (Yes or No)"
                    if(name == "cue_type") title += " (Instrumental or Vocals)"
                    if(name == "tempo") title += " (Slow, Medium, Fast, etc.)"
                    if(name == "bpm") title += " (Beats per Minutes)"
                    if(name == "instrument_type") title += " (Band, Guitar)"
                    if(name == "writer_PRO_affiliation") title += " (BMI)"
                    if(name == "IPI_number") title += " (Yes or No)"
                    if(name == "public_domain") title = ("Writer CAE/"+ title + " (Comes with PRO website)");


                    if (name == "description") {
                        return (
                          <TextArea
                            name={name}
                            title={title}
                            setForm={setForm}
                            form={form}
                            key={index}
                            errors={errors}
                          />
                        );
                      }

                    return <Input 
                        name={name}
                        title={title}
                        setForm={setForm}
                        form={form}
                        key={index}
                    />
                })}
            </div>
        </div>
    )
}