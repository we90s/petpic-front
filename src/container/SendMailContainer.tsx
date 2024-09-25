"use client";

import Input from "@components/Input";
import { useInput } from "@hooks/useInput";
import { ImgSrcContext } from "app/provider";
import { useContext, useState } from "react";
import styles from "@styles/page/sendMail.module.css";
import Checkbox from "@components/Checkbox";
import { uploadImage } from "@actions/uploadImage";
import { useFormState } from "react-dom";
import SubmitButton from "@components/SubmitButton";

function SendMailContainer({ email }: { email: string }) {
  const { imgSrc } = useContext(ImgSrcContext);
  const [isChecked, setIsChecked] = useState(false);
  const { input: emailValue, onChange: onChangeNewEmail } = useInput(email);
  const [state, action] = useFormState(uploadImage.bind(null, ""), {
    message: "",
  });
  return (
    <form className={styles.form} action={action}>
      <Input
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={onChangeNewEmail}
        value={emailValue}
        isError={state?.message !== ""}
        errorLabel={state.message}
      />
      <div className={styles.checkboxWrapper}>
        <Checkbox
          id="emailCheck"
          checked={isChecked}
          setChecked={setIsChecked}
        />
        <label>
          이메일 수신에 동의합니다. <br />
          <span>광고성 메일 없이 사진을 보내드리는 용도로만 사용해요.</span>
        </label>
      </div>
      <SubmitButton disabled={(!emailValue && !email) || !isChecked}>
        완료
      </SubmitButton>
    </form>
  );
}

export default SendMailContainer;
