import { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldType {
    type: string,
    defaultValue: string | number,
    label: string,
    fieldName: string,
    errors: FieldError | undefined,
    register: UseFormRegister<any>
}

export default function FormField({type, defaultValue, label, fieldName, errors, register}: FormFieldType) {
    let field;
    switch(type) {
        case 'textarea':
            field = <textarea className="admin-form-field border-black border-b" defaultValue={defaultValue} {...register(fieldName, {required: true})} />
            break;
        default:
            field = <input className="admin-form-field border-black border-b" defaultValue={defaultValue} {...register(fieldName, {required: true})} />

    }

    return <div className="flex flex-col mb-3">
        <label className="admin-form-field-title">{label}</label>
        {field}
        {errors && <span>This field is required</span>}
    </div>
}