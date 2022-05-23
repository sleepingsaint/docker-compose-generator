import React, { useEffect, useState } from "react";
import DynamicLabelInput from "./DynamicLabelInput";
import DynamicList from "./DynamicList";

interface NestedFormProps<T = any> {
    data: T;
    handleStateChange: (new_state: any) => void;
}

const NestedForm: React.FC<NestedFormProps> = (props) => {
    const [data, setData] = useState(props.data);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const _data = {
            ...data,
            [name]: value,
        };
        setData(_data);
    };

    const handleUpdatedOptions = (key: any) => {
        const _updateFunc = (new_opts: any) => {
            const _data = { ...data, [key]: new_opts };
            setData(_data);
        };
        return _updateFunc;
    };

    useEffect(() => {
        if (props.data !== data && props.handleStateChange) {
            props.handleStateChange(data);
        }
    }, [data]);

    if (!data) {
        return <div></div>;
    }
    return (
        <div>
            {Object.entries(data).map(([key, value], idx) => {
                if (typeof value === "string") {
                    return (
                        <div key={idx}>
                            <label htmlFor={`nested_form_${key}`}>{key}</label>
                            <input
                                type="text"
                                id={`nested_form_${value}`}
                                value={value}
                                name={key}
                                onChange={handleChange}
                            />
                        </div>
                    );
                }

                if (value instanceof Map) {
                    return (
                        <div key={idx}>
                            <label htmlFor={`nested_form_${key}`}>{key}</label>
                            <DynamicLabelInput data={value} handleUpdatedOptions={handleUpdatedOptions(key)} />
                        </div>
                    );
                }
                if (value instanceof Array) {
                    return (
                        <div key={idx}>
                            <label htmlFor={`nested_form_${key}`}>{key}</label>
                            <DynamicList data={value} handleUpdatedOpts={handleUpdatedOptions(key)} />
                        </div>
                    );
                }

                if (typeof value === "object") {
                    return (
                        <div key={idx}>
                            <label htmlFor={`nested_form_${key}`}>{key}</label>
                            <NestedForm data={value} handleStateChange={handleUpdatedOptions(key)} />
                        </div>
                    );
                }

                return <div>Unsupported Data Type</div>;
            })}
        </div>
    );
};

export default NestedForm;
