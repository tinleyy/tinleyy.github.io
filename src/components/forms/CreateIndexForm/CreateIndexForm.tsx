import { Checkbox, Input } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createIndex } from '../../../service/indexes';
import { IndexesRequest } from "../../../service/indexes/types";
import "./CreateIndexForm.css";

export default function CreateIndexForm() {
  // const alert = useAlert();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<IndexesRequest>();
  const onSubmit: SubmitHandler<IndexesRequest> = async data => {
    // console.log(data);
    const response = await createIndex(data);
    if(response?.id){
      alert(`Index ${response.id} created successfully`);
    }
  }

  // console.log(watch("name")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Create Index</h5>
      <div>Name</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="name"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {errors.name && "Name is required"}
      <div>Description</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="description"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {errors.description && "Description is required"}
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
      <div>Hidden</div>
      <Controller
        name="hidden"
        control={control}
        render={({ field }) => <Checkbox {...field} />}
        defaultValue={false}
      />

      <div>
        <input type="submit" />
      </div>
    </form>
  );
}