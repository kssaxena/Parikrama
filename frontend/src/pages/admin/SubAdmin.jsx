import React, { useRef } from "react";
import InputBox from "../../components/InputBox";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../../components/LoadingUI";
import Button from "../../components/Button";
import { parseErrorMessage } from "../../utils/ErrorMessageParser";
import { subAdminFormInputs } from "../../constants/Constants";

const SubAdmin = ({ startLoading, stopLoading, onCancel }) => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fromData = new FormData(formRef.current);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      startLoading();
      const response = await FetchData(
        `admin/register-sub-admin`,
        "post",
        fromData,
      );
      console.log(response);
      formRef.current.reset();
      alert(response.data.message);
      onCancel();
    } catch (err) {
      console.log(err);
      alert(parseErrorMessage(err.response.data));
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {subAdminFormInputs.map((i) => {
            <InputBox
              LabelName={i.label}
              Name={i.name}
              Placeholder={i.placeHolder}
              Type={i.type}
              PasswordIndication={i.passwordTrue}
            />;
          })}
        </div>
        <Button
          label={"Cancel"}
          onClick={() => {
            formRef.current.reset();
            onCancel();
          }}
        />
        <Button label={"Submit"} type={"submit"} />
      </form>
    </div>
  );
};

export default LoadingUI(SubAdmin);
