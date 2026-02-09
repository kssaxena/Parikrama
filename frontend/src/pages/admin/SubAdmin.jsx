import React, { useRef } from "react";
import InputBox from "../../components/InputBox";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../../components/LoadingUI";
import Button from "../../components/Button";

const SubAdmin = ({ startLoading, stopLoading }) => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fromData = new FormData(formRef.current);
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      startLoading();
      const response = await FetchData(
        `admin/register-sub-admin`,
        "post",
        fromData,
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };
  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <InputBox Name="name" LabelName="Name" Placeholder="Name" Type="text" />
        <InputBox
          Name="email"
          LabelName="Email"
          Placeholder="Email"
          Type="text"
        />
        <InputBox
          Name="employeeId"
          LabelName="Employee ID"
          Placeholder="Employee ID"
          Type="text"
        />
        <InputBox
          Name="phoneNumber"
          LabelName="Contact Number"
          Placeholder="Contact Number"
          Type="text"
        />
        <InputBox Name="password" LabelName="Password" Placeholder="*****" />
        <Button label={"Submit"} type={"submit"} />
      </form>
    </div>
  );
};

export default LoadingUI(SubAdmin);
