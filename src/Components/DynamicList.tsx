import React, { useEffect, useState } from "react";

interface DynamicListProps {
    data: string[];
    handleUpdatedOpts: (opts: string[]) => void;
}
const DynamicList: React.FC<DynamicListProps> = (props) => {
    const [opts, setOpts] = useState<string[]>(props.data);

    useEffect(() => {
        const _opts: string[] = [];
        opts.forEach((option) => {
            if(option) _opts.push(option);
        })
        props.handleUpdatedOpts(_opts);
    }, [opts])
    
    const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const _opts = [...opts];
        _opts[idx] = e.target.value;
        setOpts(_opts);
    };

    const handleRemoveOption = (idx: number) => {
        const _opts = [...opts];
        _opts.splice(idx, 1);
        setOpts(_opts);
    };

    const handleAddOption = () => {
        setOpts((_opts) => [...opts, ""]);
    };

    return (
        <div>
            {opts.map((opt, idx) => {
                return (
                    <div key={idx}>
                        <input type="text" value={opt} onChange={(e) => handleChangeOption(e, idx)} />
                        <button type="button" onClick={() => handleRemoveOption(idx)}>
                            Remove
                        </button>
                    </div>
                );
            })}

            <button onClick={handleAddOption}>Add</button>
        </div>
    );
};

export default DynamicList;
