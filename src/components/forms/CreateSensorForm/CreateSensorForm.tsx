import { Checkbox, Input } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createSensor } from "../../../service/sensors";
import { SensorsRequest } from "../../../service/sensors/types";
import "./CreateSensorForm.css";
import { useAlert } from "react-alert";

export default function CreateSensorForm() {
  // const alert = useAlert();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SensorsRequest>();
  const onSubmit: SubmitHandler<SensorsRequest> = async data => {
    // console.log(data);
    const response = await createSensor(data);
    if(response?.id){
      alert(`Index ${response.id} created successfully`);
    }
  }

  // console.log(watch("name")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Create Sensor</h5>
      <div>Latitude</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="latitude"
        control={control}
        defaultValue={0}
      />
      <div>Longitude</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="longitude"
        control={control}
        defaultValue={0}
      />
      <div>Distinct</div>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="distinct"
        control={control}
        defaultValue=""
      />

      <div>
        <input type="submit" />
      </div>
    </form>
  );
}