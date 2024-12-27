import React, { Dispatch, SetStateAction } from "react";
import {
  Option,
  QuestionNumInput,
  SelectInput,
  SettingContainer,
} from "./Setting.styles";
import { Difficulty } from "../API";

type SettingProps = {
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  setTotalQuestions: Dispatch<SetStateAction<number>>;
};

const Settings: React.FC<SettingProps> = ({
  setDifficulty,
  setTotalQuestions,
}) => {
  return (
    <SettingContainer>
      <SelectInput
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setDifficulty(e.target.value as Difficulty);
        }}
      >
        <Option value="easy">EASY</Option>
        <Option value="medium">MEDIUM</Option>
        <Option value="hard">HARD</Option>
      </SelectInput>

      <QuestionNumInput
        type="number"
        defaultValue={10}
        min={10}
        max={100}
        onChange={(e) => setTotalQuestions(parseInt(e.target.value))}
      />
    </SettingContainer>
  );
};

export default Settings;
