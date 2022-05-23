import React, { useCallback, useEffect, useState } from "react";

interface DynamicLabelInputInterface {
    data: Map<string, string> | undefined;
    handleUpdatedOptions: (opts: Map<string, string>) => void;
}

const DynamicLabelInput: React.FC<DynamicLabelInputInterface> = (props) => {
    const initial_opts = useCallback(() => {
        if (props.data) {
            return Object.entries(props.data).map(([key, value]) => {
                return {
                    key,
                    value,
                };
            });
        }
        return [];
    }, [props.data]);

    const [opts, setOpts] = useState<{ key: string; value: string }[]>(initial_opts());

    useEffect(() => {
        let _opts = new Map<string, string>();
        opts.forEach((option) => {
            if (option.key) {
                _opts.set(option.key, option.value);
            }
        });

        props.handleUpdatedOptions(_opts);
    }, [opts]);
    
    const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>, idx: number, keyChange: boolean) => {
        const _new_opts = [...opts];
        if (keyChange) {
            _new_opts[idx].key = e.target.value;
        } else _new_opts[idx].value = e.target.value;
        setOpts(_new_opts);
    };

    const handleAddOption = () => {
        setOpts((_opts) => [...opts, { key: "", value: "" }]);
    };
    const handleRemoveOption = (idx: number) => {
        const _opts = [...opts];
        _opts.splice(idx, 1);
        setOpts(_opts);
    };

    return (
        <form>
            {opts.map((opt, idx) => {
                return (
                    <div key={idx}>
                        <input type="text" value={opt.key} onChange={(e) => handleChangeOption(e, idx, true)} />
                        <input
                            type="text"
                            value={opt.value}
                            disabled={opt.key === ""}
                            onChange={(e) => handleChangeOption(e, idx, false)}
                        />
                        <button type="button" onClick={() => handleRemoveOption(idx)}>
                            Remove
                        </button>
                    </div>
                );
            })}
            <button onClick={handleAddOption} type="button">
                Add
            </button>
        </form>
    );
};

export default DynamicLabelInput;
