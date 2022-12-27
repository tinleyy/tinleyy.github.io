import { Checkbox, Input } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { createIndex } from '../../../service/indexes';
import { IndexesRequest } from "../../../service/indexes/types";
import "./CreateIndexForm.css";
import "../style.css";

export default function CreateIndexForm() {
  // const alert = useAlert();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<IndexesRequest>();
  const onSubmit: SubmitHandler<IndexesRequest> = async data => {
    // console.log(data);
    const response = await createIndex(data);
    if (response?.id) {
      alert(`Index ${response.id} created successfully`);
    }
  }

  // console.log(watch("name")) // watch input value by passing the name of it

  return (
    <form>
      <h5>Create Index</h5>
      <div>Name</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="name"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {errors.name && <div className="form-error-text">Name is required*</div>}
      <div>Description</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" multiline minRows="3" />}
        name="description"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {errors.description && <div className="form-error-text">Description is required*</div>}
      <div>Standard</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="standard"
        rules={{ required: true }}
        control={control}
        defaultValue={0}
      />
      <div>Low</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="low"
        rules={{ required: true }}
        control={control}
        defaultValue={0}
      />
      <div>Middle</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="middle"
        rules={{ required: true }}
        control={control}
        defaultValue={0}
      />
      <div>High</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="high"
        rules={{ required: true }}
        control={control}
        defaultValue={0}
      />
      <div>Very High</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="very_high"
        rules={{ required: true }}
        control={control}
        defaultValue={0}
      />
      <div>Unit</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" placeholder="e.g. μg/m3" />}
        name="unit"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {errors.unit && <div className="form-error-text">Unit is required*</div>}
      <div>Hidden</div>
      <Controller
        name="hidden"
        control={control}
        render={({ field }) => <Checkbox {...field} />}
        defaultValue={false}
      />

      <div className="submit-button">
        <Button onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </form>
  );
}