import Button from "#components/Button";
import Input from "#components/Input";
import StartLayout from "#components/StartLayout";
import { useInput } from "#hooks/useInput";
import { AuthContext } from "app/provider";
import React, { useContext, useState } from "react";
import styles from "#styles/page/sendMail.module.css";
import Checkbox from "#components/Checkbox";
import { uploadImage } from "#actions/uploadImage";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

type Props = {
  imgSrc: string;
};

function SendMailContainer({ imgSrc }: Props) {
  const router = useRouter();
  const { email } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const { input: newEmail, onChange: onChangeNewEmail } = useInput(email || "");
  const [state, action] = useFormState(uploadImage.bind(null, imgSrc), {
    message: "",
  });
  if (state?.success) {
    router.push("/start/uploadImage/success");
  }
  return (
    <StartLayout progress="third" title="완성된 사진은 메일로 보내드려요">
      <form className={styles.form} action={action}>
        <Input
          name="email"
          placeholder="이메일을 입력해주세요"
          defaultValue={email}
          onChange={onChangeNewEmail}
          value={newEmail}
          isError={!state?.success}
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
        <Button
          theme="main"
          fontSize="xl"
          disabled={email === "" || newEmail === "" || !isChecked}
        >
          완료
        </Button>
      </form>
    </StartLayout>
  );
}

export default SendMailContainer;
