import { Input } from "@material-ui/core";
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createModel } from "../../../service/models";
import { ModelsRequest } from "../../../service/models/types";
import "./CreateModelForm.css";
import BasicTabs from "./Tabs/Tabs";
import { Button } from "@mui/material";

export default function CreateModelForm() {
  // const alert = useAlert();

  const [indexes, setIndexes] = useState<[]>([]);
  const handleIndexesChanges = (indexesList: []) => {
    setIndexes(indexesList);
  }
  const [models, setModels] = useState<[]>([]);
  const handleModelsChanges = (modelsList: []) => {
    setModels(modelsList);
  }

  const { control, handleSubmit, /*watch,*/ formState: { errors } } = useForm<ModelsRequest>();
  const onSubmit: SubmitHandler<ModelsRequest> = async data => {
    let request = data;
    request.indexes = indexes;
    request.models = models;
    console.log(request);

    const response = await createModel(request);
    if (response?.id) {
      alert(`Model ${response.id} created successfully`);
    }
  }

  // console.log(watch("name")) // watch input value by passing the name of it

  return (
    <form>
      <h5>Create Model</h5>
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
        control={control}
        defaultValue=""
      />
      {errors.description && "Description is required"}

      <BasicTabs handleIndexesChanges={handleIndexesChanges} handleModelsChanges={handleModelsChanges} />

      <div>Formula</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="formula"
        rules={{ required: true }}
        control={control}
        defaultValue=""
      />
      {errors.formula && "formula is required"}

      <div className="submit-button">
        <Button onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </form>
  );
}