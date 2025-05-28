import React from "react";

const getPasswordStrength = (password) => {
  let score = 0;
  if (!password) return score;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  return score;
};

const PasswordStrengthMeter = ({ password }) => {
  const score = getPasswordStrength(password);

  const strengthLabels = [
    "Too weak",
    "Weak",
    "Medium",
    "Strong",
    "Very strong",
  ];
  const colors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];

  return (
    <div>
      <progress max="4" value={score} style={{ width: "100%" }} />
      {password && (
        <p style={{ color: colors[score] }}>{strengthLabels[score]}</p>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
