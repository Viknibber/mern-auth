import { useState } from 'react';

const useForm = (initialData, submitCallback) => {
    const [formData, setFormData] = useState(initialData);
    const [errorData, setErrorData] = useState({
        server: undefined,
        ...Object.keys(initialData).reduce((obj, key) => ({ ...obj, [key]: undefined }), {}),
    });

    const onChange = (e) => {
        e.persist();
        setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
        setErrorData((ed) => ({ ...ed, [e.target.name]: undefined }));
    };

    const onSubmit = (e) => {
        if (e?.key && e.key !== 'Enter') return;
        e?.preventDefault();
        submitCallback();
    };

    const handleErrors = (res) => {
        const error = res.response.data;

        if (error.err) {
            for (let i = 0; i < error.err.length; i++) {
                setErrorData((ed) => {
                    if (typeof ed[error.err[i].path] !== 'undefined') return { ...ed };
                    return { ...ed, [error.err[i].path]: error.err[i].msg };
                });
            }
        }

        if (error.msg) {
            setErrorData((ed) => ({ ...ed, server: error.msg }));
        }
    };

    return { formData, errorData, onChange, onSubmit, handleErrors };
};

export default useForm;
