import { Input } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createTag } from "../../../service/tags";
import { TagsRequest } from "../../../service/tags/types";
import "./CreateTagForm.css";

export default function CreateTagForm() {
  // const alert = useAlert();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<TagsRequest>();
  const onSubmit: SubmitHandler<TagsRequest> = async data => {
    // console.log(data);
    const response = await createTag(data);
    if (response?.id) {
      alert(`Index ${response.id} created successfully`);
    }
  }

  // console.log(watch("name")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Create Tag</h5>
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
        // rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {/* {errors.description && "Description is required"} */}

      <div>
        <input type="submit" />
      </div>
    </form>
  );
}